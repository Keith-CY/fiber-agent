import type { Fiber } from '../types/fiber'
import type { Database } from '../db'
import { InvoiceStatus } from '../common'
import { RPC } from './rpc'
import { bytesToHex } from '@nervosnetwork/ckb-sdk-utils'
import { Merchant } from './merchant'
import { Order } from './order'

export class Invoice {
  private _rpc: RPC
  private _db: Database
  private _merchant: Merchant
  private _order: Order

  constructor(uri: string, db: Database, merchant: Merchant, order: Order) {
    this._rpc = new RPC(uri)
    this._db = db
    this._merchant = merchant
    this._order = order
  }

  public list = async (statusList?: Array<InvoiceStatus>, p?: { pageNo: number; pageSize: number }) => {
    return this._db.invoices.get_many(
      statusList?.length ? statusList : undefined,
      p
        ? {
            page_no: p.pageNo,
            page_size: p.pageSize,
          }
        : undefined,
    )
  }

  public get = async (paymentHash: string) => {
    return this._db.invoices.get_one(paymentHash)
  }

  public getCounts = async () => {
    return this._db.invoices.get_counts()
  }

  public issue = async (invoice: Fiber.Params.NewInvoice, order?: Omit<Fiber.Params.NewOrder, 'payment_hash'>) => {
    if (invoice.paymentPreimage && order) {
      throw new Error(`preimage and order cannot be submitted together`)
    }

    let preimage: string
    if (invoice.paymentPreimage) {
      preimage = invoice.paymentPreimage
    } else if (order) {
      const encoder = new TextEncoder()
      const merchant = await this._merchant.get(order.merchant_id)
      if (!merchant) {
        throw new Error('Please add merchant before creating an invoice')
      }
      preimage = await crypto.subtle
        .digest('SHA-256', encoder.encode(JSON.stringify(order)))
        .then((res) => bytesToHex(new Uint8Array(res)))
    } else {
      throw new Error('Preimage or order is required to create an invoice')
    }

    const res = await this._rpc.post<Fiber.NewInvoiceResult>('new_invoice', [
      {
        amount: `0x${invoice.amount.toString(16)}`,
        currency: invoice.currency,
        description: invoice.description,
        payment_preimage: preimage,
        hash_algorithm: invoice.hashAlgorithm,
        udt_type_script: invoice.udtTypeScript,
      },
    ])
    if (!res) {
      throw new Error('No response on creating invoice')
    }
    const i = await this._db.invoices.add({ ...invoice, paymentPreimage: preimage }, res)
    if (order) {
      await this._order.addOne({ ...order, payment_hash: i.paymentHash })
    }
    return res
  }

  public cancel = async (paymentHash: string) => {
    const res = await this._rpc
      .post<{
        invoice_address: string
        invoice: Fiber.NewInvoiceResult
        status: InvoiceStatus
      }>('cancel_invoice', [{ payment_hash: paymentHash }])
      .then((res) => res?.status ?? null)
    if (res === InvoiceStatus.Cancelled) {
      await this._db.invoices.cancel(paymentHash)
      return null
    }
  }

  public getStatus = async (paymentHash: string): Promise<InvoiceStatus | null> => {
    const res = await this._rpc
      .post<{
        invoice_address: string
        invoice: Fiber.NewInvoiceResult
        status: InvoiceStatus
      }>('get_invoice', [{ payment_hash: paymentHash }])
      .then((res) => res?.status)
    if (!res) {
      console.error('No response from invoice status')
      return null
    }
    return res
  }

  public sendPayment = async (params: Fiber.Params.NewPayment) => {
    const res = await this._rpc
      .post<{
        payment_hash: string
        status: string
        created_at: string
        last_updated_at: string
        failed_error?: string
      }>('send_payment', [
        {
          invoice: params.invoice,
        },
      ])
      .then((res) => {
        if (res.failed_error) {
          throw new Error(res.failed_error)
        }
        return {
          status: res.status,
        }
      })
    return res
  }

  public updateStatus = async (paymentHash: string) => {
    const status = await this.getStatus(paymentHash)
    if (!status) return
    await this._db.invoices.update_status(paymentHash, status)
  }

  public archive = async (paymentHash: string) => {
    await this._db.invoices.archive(paymentHash)
  }

  public sync = async () => {
    for (const i of await this._db.invoices.get_all_open()) {
      await this.updateStatus(i.payment_hash)
    }
  }
}
