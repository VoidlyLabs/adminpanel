# Voidly Admin

[English version](./README.md)

Voidly Admin - це адміністративний інтерфейс Voidly на Next.js.

Він використовується для керування конфігурацією магазину, категоріями, товарами, користувачами, зображеннями та e-commerce даними, які надає Voidly backend API.

## Стек

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- axios

## Розгортання

Для production або VPS deployment використовуйте репозиторій `stack`:

```bash
git clone --recurse-submodules https://github.com/VoidlyLabs/stack.git
cd stack
sh deploy.sh init
nano .env
sh deploy.sh up
```

У `stack/.env` адмін-панель налаштовується цими значеннями:

```env
PUBLIC_CORE_URL=http://YOUR_IP:3000
ADMIN_BIND=0.0.0.0
ADMIN_PORT=3001
```

`PUBLIC_CORE_URL` передається як `NEXT_PUBLIC_BACKEND_URL` під час Docker build. Після його зміни перебудуйте адмін-панель:

```bash
sh deploy.sh up admin
```

Production URL за замовчуванням:

```text
http://YOUR_IP:3001
```

Повний guide з Docker setup, HTTPS, оновленнями, logs, memory tuning і volumes знаходиться у `VoidlyLabs/stack`.

## Локальні Вимоги

- Node.js 20+
- npm
- Запущений Voidly backend API

## Локальне Середовище

Створіть `.env` з `.env.example`:

```bash
cp .env.example .env
```

Задайте backend URL:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

## Локальна Розробка

```bash
npm install
npm run dev -- -p 3001
```

Відкрийте:

```text
http://localhost:3001
```

## Build

```bash
npm run build
npm run start -- -p 3001
```

## Перевірки

```bash
npm run lint
npm run prettier:check
```
