# SportVar API

API demostrativa desarrollada con **Node.js + Express** para la evidencia **GA7-220501096-AA5-EV03**.

## Objetivo
Simular los servicios web necesarios para el proyecto **SportVar**, una herramienta orientada a la consulta y visualización de variantes genéticas de interés deportivo a partir de archivos VCF.

## Requisitos
- Node.js 18 o superior
- npm

## Instalación
```bash
npm install
npm start
```

Servidor:
```bash
http://localhost:3000
```

## Credenciales de prueba
- usuario: `alejandro`
- clave: `sportvar123`

## Servicios incluidos
- `POST /api/auth/login`
- `GET /api/auth/validate`
- `POST /api/auth/logout`
- `GET /api/variants`
- `GET /api/variants/:id`
- `POST /api/variants/search`
- `GET /api/variants/summary/report`
- `GET /api/variants/export/csv`
- `POST /api/variants/files/connect-drive`
