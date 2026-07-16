# 🚀 StoreMX - E-Commerce Escalable & Seguro (MEAN Stack)

¡Bienvenido a **StoreMX**! Este proyecto es una solución integral de comercio electrónico diseñada para gestionar operaciones de almacén, ventas y movimientos de inventario de forma intuitiva y segura. 

Debido a su estructura limpia y modular, sirve perfectamente como un **excelente cascarón (boilerplate)** para construir cualquier otra aplicación web robusta que requiera autenticación, base de datos y un frontend moderno en Angular.

---

## 📁 Estructura del Proyecto

El repositorio está dividido en dos partes principales:
*   [ecommerce-api](file:///c:/Users/Public/devPublic/proyectos/MEAN/storeMX-retos/ecommerce-api): Servidor backend construido con Node.js, Express y MongoDB (Mongoose).
*   [ecommerce-app](file:///c:/Users/Public/devPublic/proyectos/MEAN/storeMX-retos/ecommerce-app): Aplicación frontend construida con Angular 19 y estilizada con Tailwind CSS v4.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu laptop:
1.  **Node.js** (Versión 18 o superior recomendada).
2.  **MongoDB** corriendo localmente en el puerto `27017` o una URI de MongoDB Atlas activa.
    *   *Tip rápido con Docker:* Puedes levantar una base de datos local en segundos con:
        ```bash
        docker run -d --name mongodb -p 27017:27017 mongo:latest
        ```
3.  **pnpm** (opcional, pero recomendado ya que el backend cuenta con `pnpm-lock.yaml`) o **npm**.

---

## 🔌 Guía de Inicio Rápido

Sigue estos pasos en orden para levantar todo el proyecto localmente.

### 1. Levantar el Backend (API)

El backend gestiona la base de datos, autenticación con JWT y control de inventarios.

1.  **Abre una terminal** y navega a la carpeta del backend:
    ```powershell
    cd ecommerce-api
    ```
2.  **Configurar variables de entorno:**
    Verifica el archivo [.env](file:///c:/Users/Public/devPublic/proyectos/MEAN/storeMX-retos/ecommerce-api/.env). Ya cuenta con una configuración por defecto. Si necesitas cambiar la URI de la base de datos o el puerto, edítalo.
3.  **Instalar dependencias:**
    ```powershell
    pnpm install
    # O si prefieres npm:
    npm install
    ```
4.  **Iniciar el servidor en modo de desarrollo:**
    ```powershell
    pnpm run dev
    # O si prefieres npm:
    npm run dev
    ```
    El servidor iniciará en [http://localhost:3000](http://localhost:3000).
    
    > 💡 **Sembrado de Datos Automático:** La primera vez que el servidor se conecte a la base de datos, si detecta que las colecciones están vacías, sembrará automáticamente usuarios de prueba, categorías y productos gracias al módulo `initializeData()`.

---

### 2. Levantar el Frontend (Angular)

El frontend contiene la interfaz de usuario para navegar por la tienda, gestionar el carrito y realizar el checkout.

1.  **Abre una nueva terminal** (sin cerrar la de la API) y navega a la carpeta del frontend:
    ```powershell
    cd ecommerce-app
    ```
2.  **Instalar dependencias:**
    ```powershell
    npm install
    ```
3.  **Iniciar la aplicación Angular:**
    ```powershell
    npm start
    ```
    La aplicación se compilará y estará disponible en [http://localhost:4200](http://localhost:4200).

---

## 👤 Cuentas de Prueba Pre-configuradas

Una vez que el backend se inicie y siembre los datos automáticamente, podrás iniciar sesión utilizando las siguientes credenciales:

| Rol | Correo Electrónico (Email) | Contraseña | Propósito |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@ecommerce.com` | `adminpassword` | Gestión total, ver dashboard, etc. |
| **Administrador** | `Finux@Finux.com` | `finux123` | Perfil administrativo alternativo |
| **Cliente** | `johndoe@ecommerce.com` | `randompassword` | Flujo de compra estándar |

---

## 💡 ¿En qué puedes trabajar el día de hoy? (Propuestas)

Al ser un cascarón completo, tienes varias rutas interesantes para empezar:

1.  **Panel de Administración (Dashboard):** 
    Implementar el frontend para que un usuario con rol `admin` pueda agregar, editar o eliminar productos en tiempo real a través de los endpoints de la API.
2.  **Historial de Pedidos:** 
    Crear la vista de "Mis Órdenes" en el perfil del usuario utilizando los datos de compras ya guardados en MongoDB.
3.  **Búsqueda y Filtros de Productos:** 
    Mejorar la barra de búsqueda y filtros en la página de catálogo para filtrar por categorías, rangos de precio o stock disponible.
4.  **Integración de Pasarela de Pago:** 
    Simular un flujo completo de pasarela de pago (tipo Stripe / PayPal Sandbox) en el componente de checkout.

---

¡Disfruta desarrollando con **StoreMX**! Si tienes alguna duda sobre algún componente o ruta del código, ¡pregúntame! 🚀
