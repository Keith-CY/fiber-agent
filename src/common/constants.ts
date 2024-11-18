export const FETCH_LIST_INTERVAL = 5000
export const APP_NAME = 'Fiber Agent'
export const TMP_DB_PATH = 'tmp/database'

export const CHAIN_TYPE = global.process?.env['CHAIN_TYPE'] ?? 'testnet'
export const FNN_ENDPOINT = global.process?.env['FNN_ENDPOINT']
export const CKB_NODE_ENDPOINT = global.process?.env['CKB_NODE_ENDPOINT']

export const EXPLORER_URL =
  CHAIN_TYPE === 'mainnet' ? 'https://explorer.nervos.org' : 'https://testnet.explorer.nervos.org'

export const DEFAULT_FEE_RATE = 1000

export enum ServerResponseCode {
  Success = 0,
  Error = 1,
}

export enum ChannelStateName {
  NegotiatingFunding = 'NEGOTIATING_FUNDING',
  CollaboratingFundingTx = 'COLLABORATING_FUNDING_TX',
  SigningCommitment = 'SIGNING_COMMITMENT',
  AwaitingTxSignatures = 'AWAITING_TX_SIGNATURES',
  AwaitingChannelReady = 'AWAITING_CHANNEL_READY',
  ChannelReady = 'CHANNEL_READY',
  ShuttingDown = 'SHUTTING_DOWN',
  Closed = 'CLOSED',
}

export enum Currency {
  Fibb = 'Fibb',
  Fibt = 'Fibt',
  Fibd = 'Fibd',
}

export enum InvoiceStatus {
  Open = 'Open',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  Received = 'Received',
  Paid = 'Paid',
  // fiber agent
  BeingCancelled = 'BeingCancelled',
  Archived = 'Archived',
}

export enum AccountRole {
  Admin = 'Admin',
}

export enum EventTopic {
  Account = 'Account',
  Peer = 'Peer',
  Channel = 'Channel',
  Merchant = 'Merchant',
  Invoice = 'Order',
}

export enum EventType {
  New = 'New',
  Delete = 'Delete',
  Update = 'Update',
  Archive = 'Archive',
  Cancel = 'Cancel',
}
