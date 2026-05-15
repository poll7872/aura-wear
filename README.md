# AuraWear

Aplicación full-stack de comercio electrónico y punto de venta para una tienda de moda deportiva. Desarrollada como proyecto de aprendizaje, cubre el ciclo completo: catálogo de productos, carrito de compras con cupones de descuento, gestión de inventario y panel de ventas para administradores.

---

## Descripcion

AuraWear tiene dos áreas principales:

- **Tienda:** los clientes navegan productos por categoría, los agregan al carrito, aplican cupones de descuento y confirman su compra. Cada compra descuenta el inventario de forma atómica.
- **Panel de administración:** los administradores crean, editan y eliminan productos (con carga de imágenes a Cloudinary), y consultan el historial de ventas filtrando por fecha desde un calendario interactivo.

---

## Funcionalidades

**Tienda**

- Navegación de productos por categoría (Sudaderas, Tenis, Lentes)
- Carrito de compras con ajuste de cantidad y eliminación de items
- Aplicación de cupones de descuento con validación de expiración
- Confirmación de pedido con actualización de inventario en tiempo real
- Paginación de productos

**Administración**

- Tabla paginada de productos con acciones de edición y eliminación
- Formulario de creación y edición de productos con validación Zod
- Carga de imagen con drag-and-drop (almacenamiento en Cloudinary)
- Dashboard de ventas con filtro por fecha (calendario) y resumen por transacción
- Notificaciones toast para feedback de acciones

**Backend**

- API REST completa con NestJS
- Gestión de categorías, productos, cupones y transacciones
- Transacciones de base de datos atómicas (TypeORM)
- Servicio de carga de imágenes integrado con Cloudinary
- Seeder para poblar la base de datos con datos de prueba

---

## Stack Tecnológico

| Capa                       | Tecnología                         |
| -------------------------- | ---------------------------------- |
| Backend                    | NestJS 11, TypeORM 0.3, PostgreSQL |
| Frontend                   | Next.js 16 (App Router), React 19  |
| Estilos                    | Tailwind CSS v4                    |
| Estado global              | Zustand (carrito)                  |
| Fetching / caché           | TanStack React Query v5            |
| Validación backend         | class-validator, class-transformer |
| Validación frontend        | Zod v4                             |
| Almacenamiento de imágenes | Cloudinary                         |
| Notificaciones             | sileo                              |
| Lenguaje                   | TypeScript (backend y frontend)    |
| Gestor de paquetes         | pnpm                               |

---

## Arquitectura

```
┌─────────────────────────────────┐     ┌──────────────────────────────────────┐
│         Next.js Frontend        │     │           NestJS Backend              │
│  (App Router, React 19, SSR)    │     │         (REST API, puerto 3001)       │
│                                 │     │                                       │
│  ┌──────────┐  ┌─────────────┐  │     │  ┌────────────┐  ┌────────────────┐  │
│  │  Tienda  │  │    Admin    │  │     │  │ Categorías │  │   Productos    │  │
│  │          │  │             │  │     │  ├────────────┤  ├────────────────┤  │
│  │ Carrito  │  │  Productos  │  │     │  │  Cupones   │  │ Transacciones  │  │
│  │ Zustand  │  │  (CRUD)     │  │     │  ├────────────┴──┴────────────────┤  │
│  └──────────┘  │             │  │     │  │    TypeORM + PostgreSQL         │  │
│                │   Ventas    │  │─────▶  └────────────────────────────────┘  │
│                │  (Dash.)    │  │     │                                       │
│  ┌─────────────┴─────────────┘  │     │  ┌─────────────────────────────────┐ │
│  │     Server Actions /          │     │  │        Cloudinary               │ │
│  │     Route Handlers            │     │  │  (upload de imágenes)           │ │
│  └──────────────────────────────┘     │  └─────────────────────────────────┘ │
└─────────────────────────────────┘     └──────────────────────────────────────┘
```

El frontend usa **Server Actions** para mutaciones (crear/editar producto, confirmar pedido) y **Route Handlers internos** para que el cliente nunca exponga la URL del backend directamente ni genere peticiones cross-origin.

---

## Requisitos

- Node.js >= 20
- pnpm >= 9
- PostgreSQL (local o remoto, ej. Render)
- Cuenta de Cloudinary

---

## Variables de Entorno

### `backend/.env`

```env
DATABASE_HOST=
DATABASE_PORT=5432
DATABASE_USER=
DATABASE_PASS=
DATABASE_NAME=aurawear

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### `frontend/.env`

```env
# Usada en Server Components y Route Handlers (server-side)
API_URL=http://localhost:3001
DOMAIN=localhost

# Expuesta al cliente (browser)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

> `DOMAIN` debe ser el hostname del backend sin protocolo. Next.js lo usa para permitir la carga de imágenes remotas.

---

## Instalacion

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd aura-wear

# --- Backend ---
cd backend
pnpm install
cp .env.example .env   # completar con tus credenciales
pnpm start:dev

# --- Frontend (en otra terminal) ---
cd ../frontend
pnpm install
cp .env.example .env   # ajustar las URLs
pnpm dev
```

La API queda disponible en `http://localhost:3001` y el frontend en `http://localhost:3000`.

---

## Scripts

### Backend (`backend/`)

| Script            | Descripcion                                           |
| ----------------- | ----------------------------------------------------- |
| `pnpm start:dev`  | Servidor en modo desarrollo con watch                 |
| `pnpm build`      | Compila TypeScript a `dist/`                          |
| `pnpm start:prod` | Ejecuta el build de producción                        |
| `pnpm seed`       | Limpia la BD y carga categorías y productos de prueba |
| `pnpm test`       | Ejecuta tests unitarios con Jest                      |
| `pnpm test:e2e`   | Ejecuta tests end-to-end                              |
| `pnpm lint`       | Lint y autofix con ESLint                             |

### Frontend (`frontend/`)

| Script       | Descripcion                    |
| ------------ | ------------------------------ |
| `pnpm dev`   | Servidor de desarrollo Next.js |
| `pnpm build` | Build de producción            |
| `pnpm start` | Ejecuta el build de producción |
| `pnpm lint`  | Lint con ESLint                |

---

## Endpoints Principales

Base URL: `http://localhost:3001`

### Categorias

| Metodo   | Ruta                            | Descripcion                 |
| -------- | ------------------------------- | --------------------------- |
| `GET`    | `/categories`                   | Listar todas las categorías |
| `GET`    | `/categories/:id`               | Obtener una categoría       |
| `GET`    | `/categories/:id?products=true` | Categoría con sus productos |
| `POST`   | `/categories`                   | Crear categoría             |
| `PATCH`  | `/categories/:id`               | Actualizar categoría        |
| `DELETE` | `/categories/:id`               | Eliminar categoría          |

### Productos

| Metodo   | Ruta                                     | Descripcion                |
| -------- | ---------------------------------------- | -------------------------- |
| `GET`    | `/products`                              | Listar todos los productos |
| `GET`    | `/products?category_id=1&take=10&skip=0` | Filtrado y paginación      |
| `GET`    | `/products/:id`                          | Obtener un producto        |
| `POST`   | `/products`                              | Crear producto             |
| `PUT`    | `/products/:id`                          | Actualizar producto        |
| `DELETE` | `/products/:id`                          | Eliminar producto          |
| `POST`   | `/products/upload-image`                 | Subir imagen a Cloudinary  |

### Cupones

| Metodo   | Ruta                    | Descripcion                        |
| -------- | ----------------------- | ---------------------------------- |
| `GET`    | `/coupons`              | Listar cupones                     |
| `GET`    | `/coupons/:id`          | Obtener un cupón                   |
| `POST`   | `/coupons`              | Crear cupón                        |
| `PUT`    | `/coupons/:id`          | Actualizar cupón                   |
| `DELETE` | `/coupons/:id`          | Eliminar cupón                     |
| `POST`   | `/coupons/apply-coupon` | Validar y aplicar cupón `{ name }` |

### Transacciones

| Metodo   | Ruta                                       | Descripcion                    |
| -------- | ------------------------------------------ | ------------------------------ |
| `GET`    | `/transactions`                            | Listar transacciones           |
| `GET`    | `/transactions?transactionDate=YYYY-MM-DD` | Filtrar por fecha              |
| `GET`    | `/transactions/:id`                        | Obtener una transacción        |
| `POST`   | `/transactions`                            | Crear transacción (compra)     |
| `DELETE` | `/transactions/:id`                        | Eliminar y revertir inventario |

---

## Estructura del Proyecto

```
aura-wear/
├── backend/
│   ├── src/
│   │   ├── main.ts                  # Bootstrap (puerto 3001)
│   │   ├── app.module.ts            # Módulo raíz
│   │   ├── config/
│   │   │   └── typeorm.config.ts    # Configuracion PostgreSQL
│   │   ├── categories/              # CRUD categorías
│   │   ├── products/                # CRUD productos + upload
│   │   ├── coupons/                 # CRUD cupones + validacion
│   │   ├── transactions/            # Compras + logica de inventario
│   │   ├── upload-image/            # Servicio Cloudinary
│   │   ├── common/pipes/            # Pipes reutilizables
│   │   └── seeder/                  # Datos de prueba
│   └── public/img/                  # Imagenes estaticas (1.jpg–40.jpg)
│
└── frontend/
    ├── app/
    │   ├── (store)/                 # Rutas de la tienda
    │   │   └── [categoryId]/        # Productos por categoria
    │   ├── admin/
    │   │   ├── products/            # CRUD productos (tabla + formularios)
    │   │   └── sales/               # Dashboard de ventas + route handler
    │   └── coupons/api/             # Route handler para validar cupones
    ├── actions/                     # Server Actions (mutaciones)
    ├── components/
    │   ├── cart/                    # Carrito, cupón, confirmación
    │   ├── products/                # Cards, formularios, tabla
    │   ├── transactions/            # Filtro de ventas y resumen
    │   └── ui/                      # Navegación, logo, paginación, toast
    └── src/
        ├── schemas.ts               # Esquemas Zod + tipos TypeScript
        ├── store.ts                 # Zustand (estado del carrito)
        ├── api.ts                   # Funciones de fetching (TanStack Query)
        └── utils.ts                 # Helpers: moneda, rutas de imagen, etc.
```

---

## Base de Datos

El seeder (`pnpm seed` desde `/backend`) limpia y recrea los datos con:

- **3 categorías:** Sudaderas, Tenis, Lentes
- **40 productos** distribuidos entre las categorías con precios en COP

Los precios se muestran formateados en pesos colombianos (`Intl.NumberFormat("es-CO")`).

---

## Notas

- **Sin Docker:** el proyecto se conecta directamente a una instancia PostgreSQL externa (por ejemplo, Render). No se incluye `docker-compose.yml`.
- **Autenticacion:** no implementada en esta version. El panel de administración es de acceso libre.
- **Imagenes:** las imágenes del seeder se sirven como archivos estáticos desde `backend/public/img/`. Las imágenes subidas por el administrador se almacenan en Cloudinary y se diferencian por el prefijo `https://res.cloudinary.com` en la URL.
- **Atomicidad:** la creación de transacciones usa una transacción de base de datos TypeORM. Si el inventario de cualquier producto es insuficiente, toda la operación se revierte.
- **Colecciones OKO:** el directorio `backend/.oko/` contiene colecciones de endpoints equivalentes a Postman para probar la API localmente.
