# Sistema de Gestión de Reservas de Laboratorios 📚


## Descripción 📝
Aplicación web para gestionar reservas de laboratorios en la ETSISI. Los profesores pueden configurar horarios y capacidades, mientras que los estudiantes tienen la posibilidad de realizar y gestionar sus reservas.


## Funcionalidades principales 🎯
- Creación y edición de aulas y horarios por parte de los profesores.
- Gestión de reservas por los estudiantes (crear, modificar, cancelar).
- Visualización de reservas activas e historial de reservas.


## Tecnologías utilizadas ⚙️
### **Frontend** 🎨
- **React**: Librería de JavaScript para construir interfaces de usuario dinámicas y reutilizables mediante componentes.
- **React-Hook-Form**: Librería ligera para gestionar formularios en React, optimizando el rendimiento mediante un enfoque basado en hooks y facilitando la validación.
- **dayjs**: Librería para manejar fechas y horas de manera eficiente, ofreciendo una alternativa liviana a Moment.js con soporte para formateo, manipulación y localización.
- **js-cookie**: Librería para manejar cookies en el navegador, permitiendo su creación, lectura y eliminación de manera sencilla.
- **React-Responsive-Modal**: Componente de React para crear modales accesibles y personalizables, con opciones de animación y cierre intuitivo.
- **Axios**: Cliente HTTP basado en promesas para realizar peticiones a APIs, con soporte para interceptores, cancelación de solicitudes y manejo automático de JSON.
- **Tailwind CSS**: Framework de utilidades para diseñar interfaces modernas y responsivas sin necesidad de escribir CSS personalizado, permitiendo un desarrollo rápido y eficiente.

### **Backend** 🔧
- **Express**: Framework minimalista para Node.js que facilita la creación de servidores web y APIs con un sistema de rutas eficiente y soporte para middlewares.
- **Cors**: Middleware de Node.js que permite gestionar las políticas de Cross-Origin Resource Sharing (CORS), habilitando o restringiendo solicitudes entre diferentes dominios.
- **Mongoose**: Librería de Node.js para interactuar con bases de datos MongoDB, proporcionando un modelo basado en esquemas para estructurar los datos.
- **dotenv**: Librería que permite gestionar variables de entorno desde un archivo .env, facilitando la configuración y seguridad de la aplicación.
- **bcryptjs**: Librería para encriptar contraseñas mediante el algoritmo bcrypt, mejorando la seguridad del almacenamiento de credenciales.
- **cookie-parser**: Middleware para Express que facilita la lectura y gestión de cookies en las solicitudes HTTP.
- **joi**: Librería para la validación de datos en JavaScript, permitiendo definir esquemas y reglas para validar la entrada del usuario.
- **JsonWebToekn**: Librería para generar y verificar JSON Web Tokens (JWT), utilizados en la autenticación y autorización segura de usuarios en aplicaciones web.


## Requisitos previos 📋

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js (v18 o superior)**: Entorno de ejecución para JavaScript. Puedes descargarlo desde nodejs.org. Para verificar tu versión, ejecuta node --version en tu terminal.
- **npm(v9 o superior)**: Gestor de paquetes de Node.js que se instala automáticamente con Node.js. Verifica tu versión con npm --version.
- **Docker (opcional)**: Plataforma para desarrollar y ejecutar aplicaciones en contenedores. Si decides usarlo, descárgalo desde docker.com. Verifica la instalación con docker --version.
- **Git (opcional)**: Sistema de control de versiones. Si lo necesitas, descárgalo desde git-scm.com. Verifica la instalación con git --version.
- **MongoDB (opcional si usas Docker)**: Base de datos NoSQL necesaria para el proyecto. Si no usas Docker, descárgala desde mongodb.com.


## Estructura del repositorio 🗂️
```
├── backend         # Código del servidor y lógica de negocio
├── frontend        # Código del cliente y componentes de la interfaz
├── docker-compose.yml # Configuración para orquestar los contenedores
├── data.js         # Datos de ejemplo (opcional)
├── init.js         # Archivo de inicialización del proyecto (opcional)
```


## Configuración del Entorno 🛠️

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/etsisi-lab.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd etsisi-lab
    ```

3. Navega al directorio del backend, crea un archivo `.env` configura las variables de entorno necesarias:

    ```bash
    cd backend
    ```

    ```env
    PORT=3000
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=etsisi
    ```

4. Instala las dependencias del backend

    ```bash
    cd backend
    npm install
    ```

5. Instala las dependencias del frontend

    ```bash
    cd frontend
    npm install
    ```

6. Inicia la base de datos (si estás usando Docker):

    ```bash
    docker-compose up -d
    ```

7. Inicia el backend

    ```bash
    cd backend
    npm start
    ```

8. Inicia el frontend

    ```bash
    cd frontend
    npm run dev
    ```