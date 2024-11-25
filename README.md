# Fiber Agent

[Demo on YouTube](https://youtu.be/U2vp5cUSjk4)

## Description

Fiber Agent is a project designed to streamline server management and operations. Follow the steps below to install, configure, and run the project.

## Prerequisites

1. **Install Bun**

- [Bun Installation Guide](https://bun.sh)
- Ensure Bun is properly installed before proceeding.

## Installation

1. Clone the repository:

```bash
$ git clone https://github.com/Keith-CY/fiber-agent.git
```

2. Navigate into the project directory:

```bash
$ cd fiber-agent
```

3. Install the dependencies using pnpm:

```bash
$ pnpm install
```

## Configuration and Usage

1. Initialize the database:

```bash
$ npm run db
```

This command will create a temporary database inside the project, set `NODE_ENV=production` to set the database in app directory

2. Set the admin of the server:

```bash
$ npm run cli set-admin --code_hash <value> --hash_type <value> --args <value>
```

Replace <value> placeholders with the appropriate values for your setup.

This admin will claim balances when channels are closed proactively.

3. Start the development server:

```bash
$ npm run dev:server
```

4. Access the management panel:

Open your browser and visit: http://127.0.0.1:3000/dashboard

Notes
• Ensure all dependencies are correctly installed before running commands.
• Replace placeholder values in set-admin command with valid inputs.

## CLI

Several cli commands are provided for convenient operations.

```bash
$ npm run cli [command]
# Commands:
#   set-admin [options]  Set admin script for fiber agent
#   admin                Check admin info
#   local-node           Sync local fnn node
#   channels             List open channels
#   sync                 Sync data from node
#   clear-cache          Clear Nodes, Channels and Invoices
#   events
#   help [command]       display help for command
```
