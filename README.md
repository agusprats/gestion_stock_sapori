# Sapori di Casa

## Descripción

Sapori de Casa es una aplicación de backend + frontend estático para administrar productos de una tienda gourmet. Permite registrar usuarios, iniciar sesión, crear y editar productos, y filtrar por categorías.

## Estructura del proyecto

- `backend/`
  - `src/`
    - `app.js` - servidor Express principal
    - `routes/` - rutas API para usuarios y productos
    - `controllers/` - controladores que manejan las peticiones
    - `services/` - lógica del negocio para usuarios y productos
    - `models/` - creación de objetos `user` y `product`
    - `schemas/` - validación con Zod
    - `middlewares/` - autenticación y manejo de errores
    - `utils/` - helpers para leer/escribir JSON
    - `data/` - datos persistentes en archivos JSON
  - `public/` - frontend estático servido por Express
  - `.env` - configuración de entorno (no versionada)
  - `package.json` - dependencias y scripts

## Funcionalidades

- Registro de usuarios
- Inicio de sesión con JWT
- Listado público de productos
- Agregar producto autenticado
- Editar y eliminar producto autenticado
- Filtrado por categoría en el front-end
- Frontend servido desde `backend/public`

## Requisitos previos

- Node.js 18+ instalado
- npm instalado

## Inicialización

1. Abrir terminal en `backend/`
2. Instalar dependencias:

```bash
cd backend
npm install
```

3. Crear el archivo `.env` con contenido como:

```env
PORT=3001
JWT_SECRET=tu_secreto_aqui
```

4. Iniciar la aplicación:

```bash
npm start
```

5. Abrir el navegador en:

```
http://localhost:3001
```

## Notas

- El frontend ya no se sirve desde la carpeta `frontend/`; ahora el app estática vive en `backend/public/`.
- El archivo `.env` debe agregarse a `.gitignore` para no versionar secretos.
- Si `3001` está ocupado, cambiar `PORT` en `.env` o detener el proceso que usa ese puerto.

## Despliegue

Pasos rápidos para publicar la app:

- Vercel (frontend estático):
  1. En tu cuenta de Vercel, crear un nuevo proyecto y conectar el repositorio `gestion_stock_sapori`.
  2. En las opciones del proyecto, usar la **root** del repo como origen y asegurarte de que los archivos estáticos se sirvan desde `backend/public`. Si Vercel no detecta automáticamente la carpeta, configura el `Framework Preset` en `Other` y añade `vercel.json` (ya incluido en el repo).
  3. Desplegar — Vercel servirá la SPA desde `backend/public`.

- Render (backend API):
  1. Entra a Render y crea un nuevo **Web Service** conectado al repo `gestion_stock_sapori` y la rama `main`.
  2. En `Build Command` pon: `cd backend && npm install`.
  3. En `Start Command` pon: `cd backend && npm start`.
  4. Añade las variables de entorno en la sección **Environment**:
     - `JWT_SECRET` = (tu secreto JWT)
     - `PORT` no es necesario normalmente; Render asigna `PORT` automáticamente, pero puedes definirla si lo deseas.
  5. Desplegar — Render construirá e iniciará el servicio Node desde `backend`.

Notas de seguridad:
- No subas tu `.env`. El repo ya ignora `backend/.env`.
- Usa los secretos/variables de entorno del panel de Render y Vercel en lugar de commit.

