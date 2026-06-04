# Voidly Admin

[Українська версія](./README.uk.md)

Voidly Admin is the Next.js administrative interface for Voidly.

Use it to manage store configuration, categories, products, users, images, and operational e-commerce data exposed by the Voidly backend API.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- axios

## Deployment

For production or VPS deployment, use the `stack` repository:

```bash
git clone --recurse-submodules https://github.com/VoidlyLabs/stack.git
cd stack
sh deploy.sh init
nano .env
sh deploy.sh up
```

In `stack/.env`, the admin panel is configured by these values:

```env
PUBLIC_CORE_URL=http://YOUR_IP:3000
ADMIN_BIND=0.0.0.0
ADMIN_PORT=3001
```

`PUBLIC_CORE_URL` is passed as `NEXT_PUBLIC_BACKEND_URL` during the Docker build. Rebuild the admin panel after changing it:

```bash
sh deploy.sh up admin
```

The default production URL is:

```text
http://YOUR_IP:3001
```

See `VoidlyLabs/stack` for the full deployment guide, including Docker setup, HTTPS, updates, logs, memory tuning, and volumes.

## Local Requirements

- Node.js 20+
- npm
- Running Voidly backend API

## Local Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Set the backend URL:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

## Local Development

```bash
npm install
npm run dev -- -p 3001
```

Open:

```text
http://localhost:3001
```

## Build

```bash
npm run build
npm run start -- -p 3001
```

## Checks

```bash
npm run lint
npm run prettier:check
```
