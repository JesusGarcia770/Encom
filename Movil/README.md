# ENCOM Móvil

App móvil (Expo / React Native) para que los **clientes** naveguen el catálogo,
arme su carrito y paguen con Wompi — mismo backend y mismo diseño que
[`../frontend`](../frontend), sin las funciones de administración.

## Diseño

Identidad visual propia de ENCOM (no calcada del frontend web ni de una plantilla
genérica): sistema de tokens en [`src/theme/colors.js`](src/theme/colors.js).

- **ink** (`#111820`) — superficie de marca: panel superior de las pantallas de
  autenticación, tab bar, splash y pantalla de carga.
- **action** (`#2C5CF6`) — el único color interactivo de la app; si algo es azul,
  se puede tocar. En toda la app, sin excepción.
- **signal** (`#FFB020`) — acento cálido reservado para énfasis puntual (badges
  de "agotado" invertido, wordmark, barra de carga). No se usa en botones.
- Tipografía **Manrope** (vía `@expo-google-fonts/manrope`) en vez de la fuente
  de sistema, con una escala real (display/h1/h2/body/eyebrow/micro).
- Radios deliberadamente desiguales (`hairline` en fotos de producto, `control`
  en botones/inputs, `soft` en paneles grandes, `sheet` en el panel de auth) en
  vez de un único "rounded-xl" repetido en todo.
- Casi sin sombras: las superficies se separan con líneas finas (`border`/`divider`),
  no con elevación.
- Iconografía con `@expo/vector-icons` (set Feather, trazo fino) — nada de emojis
  como elemento de UI.
- Pantallas de login/registro/recuperar contraseña con un layout propio
  (`src/components/AuthShell.js`): panel de marca oscuro arriba + una "hoja"
  clara montada encima, en vez del típico card centrado flotando sobre un
  fondo con gradiente.

## Estructura

```
src/
  api/          fetch a la misma API REST del backend (auth, products, categories, cart, checkout)
  context/      AuthContext y CartContext (idénticos en espíritu a frontend/src/context)
  hooks/        useAuth, useCart, useProducts, useCategories
  navigation/   Stack (Login/Register/Checkout/...) + Bottom Tabs (Inicio/Catálogo/Carrito/Perfil)
  screens/      una pantalla por ruta del flujo de compra
  components/   ProductCard, PrimaryButton, FormInput, AuthShell, LoadingScreen
```

### Splash y pantalla de carga

El splash nativo (configurado en `app.json`, plugin `expo-splash-screen`) usa el
fondo "ink" de marca en vez del azul/blanco por defecto de Expo. Al terminar de
cargar las tipografías, `App.js` cede el control a `LoadingScreen`
(`src/components/LoadingScreen.js`): una pantalla propia con el wordmark ENCOM y
una barra animada, visible mientras se resuelve la sesión (`GET /api/auth/me`).

## Antes de correrla

1. Levanta el backend (`cd ../backend && npm run dev`) — debe quedar escuchando en el puerto 4000.
2. Copia `.env.example` a `.env` y pon ahí la IP de tu computadora en la red local
   (no `localhost`: el celular o el emulador no comparten red local con tu PC de la misma forma
   que el navegador). En Windows: `ipconfig` → "Dirección IPv4".
   ```
   EXPO_PUBLIC_API_URL=http://192.168.1.100:4000/api
   ```
3. En `backend/app.js`, agrega el origin de Expo (o simplemente prueba: CORS no aplica a apps
   nativas, solo a navegadores, así que normalmente no hace falta tocar nada ahí).

## Correr la app

```bash
npm install
npm run start      # abre Expo Dev Tools / QR para Expo Go
npm run android     # emulador/dispositivo Android
npm run ios         # simulador iOS (requiere macOS)
```

Escanea el QR con la app **Expo Go** desde tu celular (debe estar en la misma red WiFi que tu PC).

## Flujo de compra implementado

- Catálogo público con filtro por categoría (`Inicio`, `Catálogo`).
- Detalle de producto y "Agregar al carrito".
- Carrito con incrementar/disminuir/quitar y resumen de total.
- Checkout: crea el enlace de pago de Wompi (`POST /api/checkout`) y lo abre en un WebView
  dentro de la app; cuando Wompi redirige a `/checkout/return`, la app intercepta esa
  navegación, confirma el pago contra la API y muestra una pantalla de resultado nativa
  (aprobado / rechazado / error) — sin salir nunca de la app.
- Login / Registro / "Olvidé mi contraseña" contra los mismos endpoints de `/api/auth`.
  El restablecimiento de contraseña pide pegar el código que llega por correo (el enlace
  del correo abre la web, no la app, así que se evitó configurar deep linking para esta primera versión).
- Perfil: datos de la cuenta y cerrar sesión.

## Notas

- La sesión de carrito (invitado) y la de usuario logueado usan cookies, igual que la web;
  React Native las persiste automáticamente durante la vida de la app.
- No incluye login/CRUD de administrador — esta app es solo para clientes finales.
