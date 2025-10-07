


# 📘 Proyecto: Sistema de Gestión de Eventos

## 🧩 Descripción general

Este proyecto es una **API REST** desarrollada en **Node.js + TypeScript** con **Express**, que permite la **gestión de eventos** (creación, consulta, actualización y eliminación) y el **registro/login de usuarios** con autenticación **JWT**.  

Además, implementa:
- 🔐 **Control de roles** (admin, organizador, participante).  
- 💾 **Conexión a dos bases de datos:**  
  - PostgreSQL (para usuarios y eventos).  
  - MongoDB (para logs u otros datos secundarios).  
- 🧱 **Validaciones y middleware** de autenticación.

---

## ⚙️ Tecnologías principales

| Tecnología | Uso |
|-------------|-----|
| **Node.js** | Entorno de ejecución |
| **TypeScript** | Tipado estático |
| **Express** | Framework web |
| **Sequelize** | ORM para PostgreSQL |
| **Mongoose** | ODM para MongoDB |
| **bcrypt** | Encriptación de contraseñas |
| **jsonwebtoken (JWT)** | Autenticación |
| **dotenv** | Variables de entorno |

---

## 🧱 Estructura de carpetas

```

src/
│
├── controllers/
│   ├── usuarioController.ts     # Registro, login, perfil
│   └── eventoController.ts      # CRUD de eventos
│
├── dbconfig/
│   ├── pg.ts                    # Configuración de PostgreSQL
│   └── mongo.ts                 # Configuración de MongoDB
│
├── middlewares/
│   ├── authMiddleware.ts        # Verificación de JWT
│   └── verificarRol.ts          # Verificación de rol de usuario
│
├── models/
│   ├── usuarioModel.ts          # Modelo Sequelize para usuarios
│   ├── eventoModel.ts           # Modelo Sequelize para eventos
│   └── relaciones.ts            # Relaciones entre modelos
│
├── routes/
│   ├── usuarioRoutes.ts         # Rutas de usuario
│   └── eventoRoutes.ts          # Rutas de eventos
│
└── index.ts                     # Punto de entrada principal

````

---

## 🔧 Instalación

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/Cristian-ZXZ/SimulacroNode.1.git

# 2️⃣ Entrar a la carpeta
cd simulacroNode

# 3️⃣ Instalar dependencias
npm install

# 4️⃣ Configurar variables de entorno
touch .env
````

---

## 🔐 Variables de entorno `.env`

```bash
PORT=3007
DB_NAME=eventos
DB_USER=cristian
DB_PASS=190208
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=miclaveultrasecreta123
MONGO_URL=mongodb://127.0.0.1:27017/eventos_logs
```

---

## 🚀 Ejecución del servidor

```bash
npm run dev
```

Deberías ver en consola:

```
✅ Conexión a PostgreSQL exitosa
✅ Conexión existosa a MongoDB
Servidor escuchando en el puerto 3007
```

---

## 🧪 Endpoints (Postman)

### 👤 **Usuarios**

#### 1️⃣ Registro

**POST** `http://localhost:3007/api/usuarios/registro`

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "654321",
  "rol": "participante"
}
```

✅ **Responde:**

```json
{ "message": "Usuario registrado con éxito" }
```

---

#### 2️⃣ Login

**POST** `http://localhost:3007/api/usuarios/login`

```json
{
  "email": "juan@example.com",
  "password": "654321"
}
```

✅ **Responde:**

```json
{
  "message": "Login exitoso",
  "token": "JWT_GENERADO"
}
```

Guarda el `token` — lo usarás para las rutas protegidas 👇

---

#### 3️⃣ Perfil del usuario autenticado

**GET** `http://localhost:3007/api/usuarios/perfil`
👉 Header:
`Authorization: Bearer TU_TOKEN`

✅ **Responde:**

```json
{
  "message": "Perfil accedido con éxito",
  "usuario": {
    "id": 2,
    "rol": "participante"
  }
}
```

---

### 🎟️ **Eventos**

#### 4️⃣ Obtener todos los eventos

**GET** `http://localhost:3007/api/eventos`

✅ **Responde:**

```json
[
  {
    "id": 1,
    "titulo": "Conferencia de Tecnología",
    "descripcion": "Evento sobre IA y desarrollo web",
    "fecha": "2025-12-01",
    "ubicacion": "Medellín",
    "capacidad": 200,
    "organizadorId": 1
  }
]
```

---

#### 5️⃣ Obtener evento por ID

**GET** `http://localhost:3007/api/eventos/1`

✅ Devuelve los datos del evento con ID 1.

---

#### 6️⃣ Crear evento (solo organizador o admin)

**POST** `http://localhost:3007/api/eventos`

👉 Header:
`Authorization: Bearer TU_TOKEN_DE_ADMIN`

👉 Body:

```json
{
  "titulo": "Conferencia de Tecnología e Innovación",
  "descripcion": "Evento donde expertos presentan los últimos avances en IA y desarrollo web.",
  "fecha": "2025-12-10",
  "ubicacion": "Medellín",
  "capacidad": 300
}
```

✅ **Responde:**

```json
{
  "message": "Evento creado correctamente",
  "evento": { ... }
}
```

---

#### 7️⃣ Actualizar evento

**PUT** `http://localhost:3007/api/eventos/1`
👉 Header:
`Authorization: Bearer TU_TOKEN_DE_ADMIN`

👉 Body:

```json
{ "titulo": "Conferencia Internacional de IA" }
```

✅ **Responde:**

```json
{
  "message": "Evento actualizado correctamente"
}
```

---

#### 8️⃣ Eliminar evento

**DELETE** `http://localhost:3007/api/eventos/1`
👉 Header:
`Authorization: Bearer TU_TOKEN_DE_ADMIN`

✅ **Responde:**

```json
{ "message": "Evento eliminado correctamente" }
```

---

## 🧠 Lógica de roles

| Rol              | Permisos                                            |
| ---------------- | --------------------------------------------------- |
| **admin**        | Crear, leer, actualizar y eliminar cualquier evento |
| **organizador**  | Crear y actualizar sus propios eventos              |
| **participante** | Solo puede leer los eventos                         |

---

## 🧩 Posibles mejoras futuras

* 🔄 Integrar **validaciones con Joi o Zod**.
* 📅 Agregar **inscripciones** a eventos (usuarios registrados).
* 💬 Guardar logs detallados de acciones en MongoDB.
* 🧪 Añadir **tests automatizados** con Jest o Supertest.
* 🌐 Desplegar en **Render / Railway / Vercel**.

---

## 🧑‍💻 Autor

**Cristian**
Desarrollador Backend en formación 💻
Proyecto desarrollado con Node.js, TypeScript y pasión por aprender 🚀
