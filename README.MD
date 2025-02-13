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
Endpoint: POST /user/save
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
  "name: "juan",
  "email": "juanperez@example.com",
  "password": "P@ssw0rd123"
}

Respuesta exitosa (200):{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}

📂 Gestión de Proyectos
📌 Crear Proyecto
Endpoint: POST /project/save
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: 
{
  "Authorization": "Bearer <token>"
}

Body (JSON):{
  "name": "Proyecto Ejemplo"
}

📤 Respuesta exitosa (201):
{
  "status": true,
  "project": {
    "_id": "65a7306e4f1d8e001c12e678",
    "name": "Proyecto Ejemplo",
    "creator": "65a72f9e4f1d8e001c12e345",
  },
  "message": "Proyecto creado"
}

📋 Obtener todos los proyectos del usuario
📌 Endpoint: GET /project/
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: 
{
  "Authorization": "Bearer <token>"
}

📤 Respuesta exitosa (200):
{
  "status": true,
  "projects": [
    {
      "_id": "65a7306e4f1d8e001c12e678",
      "name": "Proyecto 1",
      "creator": "65a72f9e4f1d8e001c12e345"
    },
    {
      "_id": "65a7306e4f1d8e001c12e679",
      "name": "Proyecto 2",
      "creator": "65a72f9e4f1d8e001c12e345"
    }
  ]
}

🗑 Eliminar uno o más proyectos
📌 Endpoint: DELETE /project/delete
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: {
  "Authorization": "Bearer <token>"
}

📥 Body (JSON):
{
  "projectIds": ["65a7306e4f1d8e001c12e678", "65a7306e4f1d8e001c12e679"]
} 

📤 Respuesta exitosa (200):
{
  "status": true,
  "message": "proyectos borrados correctamente"
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


📂 Gestión de Movimientos
🚀 Crear un Movimiento
📌 Endpoint: POST /movement/save/:projectId/
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: {
  "Authorization": "Bearer <token>"
}
📥 Body (JSON)" {
  "name": "Movimiento Ejemplo"
}

📤 Respuesta exitosa (201):{
  "status": true,
  "Movimiento": {
    "_id": "65a7312f4f1d8e001c12e789",
    "name": "Movimiento Ejemplo",
    "project": "65a7306e4f1d8e001c12e678",
    "createdAt": "2025-02-12T10:00:00.000Z",
    "updatedAt": "2025-02-12T10:00:00.000Z"
  },
  "message": "Movimiento creado"
}

📋 Obtener todos los movimientos de un proyecto
📌 Endpoint: GET /movement/:projectId
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: {
  "Authorization": "Bearer <token>"
}

📤 Respuesta exitosa (200):{
  "status": true,
  "movements": [
    {
      "_id": "65a7312f4f1d8e001c12e789",
      "name": "Movimiento 1",
      "project": "65a7306e4f1d8e001c12e678"
    },
    {
      "_id": "65a7313e4f1d8e001c12e790",
      "name": "Movimiento 2",
      "project": "65a7306e4f1d8e001c12e678"
    }
  ]
}

🗑 Eliminar uno o más movimientos
📌 Endpoint: DELETE /movement/delete/:projectId
🔑 Requiere autenticación: ✅ Sí (Token JWT en Headers)
Headers: {
  "Authorization": "Bearer <token>"
}
📥 Body (JSON): {
  "movementIds": ["65a7312f4f1d8e001c12e789", "65a7313e4f1d8e001c12e790"]
}

📤 Respuesta exitosa (200):{
  "status": true,
  "message": "movimientos borrados correctamente"
}





