#!/usr/bin/env bun

import { Command } from 'commander'
import { fiberAgent } from '../core'
import { scriptToAddress } from '@nervosnetwork/ckb-sdk-utils'

const program = new Command()

program.name('fiber-agent').description('CLI for fiber agent').version('0.0.1')

program
  .command('set-admin')
  .description('Set admin script for fiber agent')
  .requiredOption('--code_hash <value>', 'Code hash of close script')
  .requiredOption('--hash_type <data | type | data1 | data2>', 'Hash type of close script')
  .requiredOption('--args <value>', 'Args of close script')
  .action(async (options) => {
    const { code_hash, hash_type, args } = options
    await fiberAgent.account.setAdmin({ code_hash, hash_type, args })
    const script = { codeHash: code_hash, hashType: hash_type, args }

    const address = {
      mainnet: scriptToAddress(script, true),
      testnet: scriptToAddress(script, false),
    }

    console.info(`Admin script is set as\nMainnet: ${address.mainnet}\nTestnet: ${address.testnet}`)
  })

program
  .command('admin')
  .description('Check admin info')
  .action(async () => {
    const admin = await fiberAgent.account.getAdmin()
    if (!admin) {
      console.info('Admin not set')
      return
    }
    console.table({ script_hash: admin.script_hash, ...admin.script })
  })

program
  .command('local-node')
  .description('Sync local fnn node')
  .action(async () => {
    const info = await fiberAgent.peer.getInfo()
    console.info(JSON.stringify(info, null, 2))
  })

program
  .command('channels')
  .description('List open channels')
  .action(async () => {
    const list = await fiberAgent.channel.list()
    console.table(
      list.map((ch) => ({
        id: ch.channel_id,
        local_balance: ch.local_balance,
        state: ch.state_name,
        udt: ch.udt,
      })),
    )
  })

program
  .command('sync')
  .description('Sync data from node')
  .action(async () => {
    fiberAgent.syncStart()
  })

program
  .command('clear-cache')
  .description('Clear Nodes, Channels and Invoices')
  .action(async () => {
    await fiberAgent.clearCache()
    console.info(`Cache cleared`)
  })

program.command('events').action(async () => {
  const events = await fiberAgent.event.getMany(1, 10)
  console.table(
    events.list.map((item) => ({
      topic: item.topic,
      type: item.type,
      target: item.target,
      quantity: item.quantity,
      description: item.description,
    })),
  )
})

program.parse(process.argv)
