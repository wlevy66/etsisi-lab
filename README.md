# 📚 Sistema de Gestión de Reservas de Laboratorios

## 📝 Descripción  
Aplicación web para la gestión de reservas de laboratorios en la **ETSISI**.
- **Administradores**: Gestionan usuarios, supervisan las reservas y configuran permisos de acceso.
- **Profesores**: Configuran horarios y capacidades de las aulas.  
- **Estudiantes**: Realizan y gestionan sus reservas.  

---

## 🎯 Funcionalidades principales
- Los administradores pueden gestionar usuarios, asignar roles, supervisar las reservas realizadas y configurar los permisos de acceso al sistema.  
- Los profesores pueden crear y gestionar aulas, estableciendo horarios disponibles.  
- Los estudiantes pueden realizar, modificar y cancelar reservas de aulas.  

---

## ⚙️ Tecnologías utilizadas  

### **Frontend** 🎨  
- **React** – Construcción de interfaces dinámicas y reutilizables.  
- **React-Hook-Form** – Gestión optimizada de formularios con validación.  
- **Day.js** – Manejo eficiente de fechas y horas.  
- **JS-Cookie** – Gestión de cookies en el navegador.  
- **React-Responsive-Modal** – Creación de modales accesibles y personalizables.  
- **Axios** – Cliente HTTP para consumir APIs.  
- **Tailwind CSS** – Framework de utilidades para diseño rápido y eficiente.  

### **Backend** 🔧  
- **Express** – Framework minimalista para Node.js.  
- **Cors** – Middleware para gestionar permisos entre dominios.  
- **Mongoose** – Modelado y gestión de datos en MongoDB.  
- **dotenv** – Manejo de variables de entorno.  
- **bcryptjs** – Encriptación segura de contraseñas.  
- **Cookie-parser** – Middleware para gestionar cookies.  
- **Joi** – Validación de datos del usuario.  
- **JsonWebToken (JWT)** – Autenticación y autorización segura.  

---

## 📋 Requisitos previos  

Antes de comenzar, asegúrate de tener instalados:  

- **Node.js** 
- **npm** (se instala con Node.js)  
- **Docker (opcional)** 
- **Git (opcional)** 
- **MongoDB (opcional si usas Docker)**

---

## 🗂️ Estructura del repositorio  
```
├── backend/             # Código del servidor
├── frontend/            # Código del cliente
├── docker/              # Configuración y ejecución de Docker
```

---

## 🛠️ Configuración del Entorno  

1️⃣ **Clona el repositorio:**  
```bash
git clone https://github.com/wlevy66/etsisi-lab
cd etsisi-lab
```

2️⃣ **Configura el backend:**  
```bash
cd backend
```
Crea un archivo `.env` con las variables de entorno necesarias:  
```env
PORT=3000
DB_HOST=hostname-bb-dd
DB_PORT=puerto-bbdd
DB_NAME=database-name
JWT_SECRET=your-secret-token
```

3️⃣ **Instala dependencias del backend:**  
```bash
npm install
```

4️⃣ **Configura el frontend:**  
```bash
cd ../frontend
npm install
```

5️⃣ **Inicia la base de datos (si usas Docker):**  
```bash
cd ../docker
docker-compose up -d
```

6️⃣ **Ejecuta el backend:**  
```bash
cd ../backend
npm start
```

7️⃣ **Ejecuta el frontend:**  
```bash
cd ../frontend
npm run dev
```

---

## 🚀 ¡Listo para usar!  
Ahora puedes acceder a la aplicación y empezar a gestionar reservas.  
