describe('My First Test', () => {
  it('Visits the initial project page', () => {
    // cypress/e2e/checkout.cy.ts
    
    describe('Prueba E2E: Flujo de Compra Completo (Checkout)', () => {
    
        // 🛑 AJUSTA ESTAS CREDENCIALES para un usuario real en tu base de datos 🛑
        const user = {
            email: 'testuser@ecommerce.com', 
            password: 'password123'
        };
        
        // Asume que tu servidor Front-end está corriendo en localhost:4200
        const baseUrl = 'http://localhost:4200';
    
        it('Debe completar el flujo de Login, Añadir a Carrito y Finalizar la Compra', () => {
            
            // --- 1. LOGIN ---
            cy.log('Paso 1: Iniciando sesión...');
            cy.visit(`${baseUrl}/login`);
            
            cy.get('#email-input').type(user.email); // 🛑 AJUSTAR SELECTOR 🛑
            cy.get('#password-input').type(user.password); // 🛑 AJUSTAR SELECTOR 🛑
            cy.get('button[type="submit"]').contains('Iniciar sesión').click();
            
            // Verificar que el login fue exitoso (URL de la página principal)
            cy.url().should('not.include', '/login');
            
            // --- 2. AÑADIR PRODUCTO AL CARRITO ---
            cy.log('Paso 2: Añadiendo un producto al carrito...');
            cy.visit(`${baseUrl}/products`);
            
            // Selecciona el primer botón "Añadir al carrito" que encuentre
            // Asegúrate de que el botón tenga la clase 'add-to-cart' o un ID.
            cy.get('.product-card').first().find('button.add-to-cart').click(); // 🛑 AJUSTAR SELECTOR 🛑
            
            // --- 3. PROCESAR CHECKOUT ---
            cy.log('Paso 3: Navegando y confirmando el Checkout...');
            cy.visit(`${baseUrl}/cart`); // Navega al carrito
            
            // Botón para ir a la página de pago
            cy.get('button.checkout-button').contains('Proceder al Pago').click(); // 🛑 AJUSTAR SELECTOR 🛑
            
            // 4. VERIFICACIÓN FINAL (Página de Pago/Éxito)
            cy.url().should('include', '/checkout'); 
            
            // Finaliza la compra en la página de Checkout (simulando pago exitoso)
            cy.get('button.confirm-order-button').contains('Finalizar Compra').click(); // 🛑 AJUSTAR SELECTOR 🛑
            
            // 5. VERIFICACIÓN DEL ÉXITO DE LA TRANSACCIÓN
            // Debe redirigir a una página de éxito
            cy.url().should('include', '/order-success'); 
            cy.contains('Tu Orden ha sido Procesada con Éxito').should('be.visible');
        });
    });
  })
})
