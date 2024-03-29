# Shopaholic

## Tech Stack

- [create-t3-app](https://create.t3.gg/) - boilerplate

- [Next.js](https://nextjs.org) - Full-stack react framework

- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

- [Prisma](https://prisma.io) - TypeScript ORM(Object Relational Mapping)

- [tRPC](https://trpc.io) - End-to-end type safe APIs

- [PlanetScale](https://planetscale.com) - MySQL-compatible serverless database platform

## Descriptions

Full-stack type safe, serverless shopping mall website.

This is a personal web project for my portfolio.

## Features

- Responsive Design

- CRUD operations with tRPC and Prisma

- Full-stack type safety

- Passwordless - login

- Rate limiting using upstash

- Store and optimize images using Cloudflare Images

- Live streaming using Cloudflare Stream

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Peter-Roh/shopaholic.git
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Create a `.env` file

Create a `.env` file in the root directory and add the environment variables as shown in the `.env.example` file.

### 4. Run the application

```bash
pscale connect DATABASE_NAME
yarn run dev
```
