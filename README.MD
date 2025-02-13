# 📦 API de Gestión de Proyectos

Esta API permite gestionar usuarios, proyectos, movimientos y líneas dentro de un sistema de seguimiento financiero.

## 📌 Instalación
```bash
git clone https://github.com/cristianCor19/test
cd test
npm install
npm start

🔐 Autenticación
📝 Registro de Usuario
Endpoint: POST /user/register
Descripción: Crea un nuevo usuario en el sistema y devuelve un token JWT.
Body (JSON):{
  "name": "Juan Pérez",
  "email": "juanperez@example.com",
  "password": "P@ssw0rd123"
}

Respuesta exitosa (201):{
  "message": "Usuario registrado correctamente",
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

🔑 Login de Usuario
Endpoint: POST /auth/login
Descripción: Inicia sesión y devuelve un token JWT.
Body (JSON):{
  "email": "juanperez@example.com",
  "password": "P@ssw0rd123"
}

Respuesta exitosa (200):{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

📂 Gestión de Proyectos
📌 Crear Proyecto
Endpoint: POST /project/create
Headers: 
{
  "Authorization": "Bearer <token>"
}

{
  "name": "Proyecto Ejemplo",
  "creator": "65a72f9e4f1d8e001c12e345",
}

📑 Paginación en el Buscador de Proyectos
Endpoint: GET /project/search
Query Params:

| Parámetro | Tipo   | Descripción                |
|-----------|--------|---------------------------|
| value     | String | Nombre a buscar           |
| page      | Number | Número de página          |
| limit     | Number | Resultados por página     |

Ejemplo de Request:

GET /project/search?value=Ejemplo&page=1&limit=10

Respuesta (200):
{
  "projects": [
    { "id": "1", "name": "Proyecto Ejemplo 1" },
    { "id": "2", "name": "Proyecto Ejemplo 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2
  }
}






