# backend API Docs

> Archivo generado automáticamente por OKO.
> Actualizado: 2026-02-16T18:15:15

- **Base URL:** `http://localhost:3000`
- **Colecciones:** `3`

## Variables Globales

- `base_url` = `http://localhost:3000`

## Colecciones y Endpoints

### categories

| Alias | Method | URL | Variables |
|---|---|---|---|
| `CreateCategory` | `POST` | `{{base_url}}/categories` | `base_url` |
| `Delete` | `DELETE` | `{{base_url}}/categories/{{id}}` | `base_url`, `id` |
| `FindAll` | `GET` | `{{base_url}}/categories` | `base_url` |
| `FindById` | `GET` | `{{base_url}}/categories/{{id}}` | `base_url`, `id` |
| `Update` | `PATCH` | `{{base_url}}/categories/{{id}}` | `base_url`, `id` |

### products

| Alias | Method | URL | Variables |
|---|---|---|---|
| `Create` | `POST` | `{{base_url}}/products` | `base_url` |
| `Delete` | `DELETE` | `{{base_url}}/products/{{id}}` | `base_url`, `id` |
| `FindAll` | `GET` | `{{base_url}}/products` | `base_url` |
| `FindAllByCategory` | `GET` | `{{base_url}}/products?category_id={{category_id}}` | `base_url`, `category_id` |
| `FindAllTake` | `GET` | `{{base_url}}/products?take={{take}}` | `base_url`, `take` |
| `FindByCategorieAndTake` | `GET` | `{{base_url}}/products?category_id={{category_id}}&take={{take}}` | `base_url`, `category_id`, `take` |
| `FindById` | `GET` | `{{base_url}}/products/{{id}}` | `base_url`, `id` |
| `FindCategorieTakeAndSkip` | `GET` | `{{base_url}}/products?category_id={{category_id}}&take={{take}}&skip={{skip}}` | `base_url`, `category_id`, `take`, `skip` |
| `FindTakeAndSkip` | `GET` | `{{base_url}}/products?take={{take}}&skip={{skip}}` | `base_url`, `take`, `skip` |
| `Update` | `PUT` | `{{base_url}}/products/{{id}}` | `base_url`, `id` |

### transactions

| Alias | Method | URL | Variables |
|---|---|---|---|
| `Create` | `POST` | `{{base_url}}/transactions` | `base_url` |
