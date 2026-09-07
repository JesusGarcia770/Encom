# ENCOM

Tienda en línea de tecnología para El Salvador. Monorepo con tres partes:

- [`backend/`](backend) — API REST (Express + MongoDB): autenticación, productos, categorías, carrito y checkout con Wompi.
- [`frontend/`](frontend) — Sitio web (React + Vite): catálogo público, carrito, checkout y panel de administración.
- [`Movil/`](Movil) — App móvil para clientes (Expo / React Native): catálogo, carrito y pago con Wompi, consumiendo la misma API.

## Cómo correr el proyecto

1. **Backend**: `cd backend && npm install && npm run dev` (ver `backend/.env`, no versionado).
2. **Frontend web**: `cd frontend && npm install && npm run dev`.
3. **App móvil**: `cd Movil && npm install && npm run start` (ver [`Movil/README.md`](Movil/README.md) para la configuración de red).
