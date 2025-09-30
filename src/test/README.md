# README: Análisis de Tests para Validación del Frontend

## Herramientas Utilizadas

- **Vitest**: Framework principal para ejecutar los tests, similar a Jest pero optimizado para proyectos Vite y TypeScript.
- **Testing Library (React Testing Library)**: Utilizada para renderizar componentes y simular interacciones de usuario en el entorno de pruebas.
- **Mocks y Spies (`vi.fn()`)**: Permiten simular funciones, stores y servicios para aislar el comportamiento de los componentes y lógica.
- **@testing-library/jest-dom**: Extiende los matchers de Testing Library para facilitar aserciones sobre el DOM.

## Archivos y Qué Testean

### 1. `cartStore.test.ts`
- **Qué testea**: La lógica del store del carrito, incluyendo agregar, quitar productos, modificar cantidades, limpiar el carrito, y filtros de productos.
- **Cómo ayuda**: Garantiza que las funciones del store se llamen correctamente y que la lógica de gestión del carrito funcione como se espera, validando la experiencia de compra.
- **Herramientas**: Vitest, mocks de funciones y servicios.

### 2. `Producto.test.tsx`
- **Qué testea**: El componente `Producto` de la tienda. Verifica que la información del producto se renderiza correctamente, que los botones funcionan (ej. agregar al carrito), y que las interacciones del usuario disparan las acciones esperadas.
- **Cómo ayuda**: Asegura que la UI muestra correctamente los datos y responde a las acciones del usuario, validando la usabilidad y accesibilidad del frontend.
- **Herramientas**: Vitest, React Testing Library, mocks de stores y dependencias.

### 3. `ProductosRecomendados.test.tsx`
- **Qué testea**: Pruebas básicas de dependencias y mocks, asegurando que las funciones simuladas funcionan y pueden manejar operaciones asíncronas.
- **Cómo ayuda**: Valida la infraestructura de testing y la capacidad de simular dependencias, lo que es esencial para pruebas más complejas.
- **Herramientas**: Vitest.

### 4. `setupTests.ts`
- **Qué testea**: No contiene tests, pero configura el entorno de pruebas. Simula el objeto `window.matchMedia` y extiende los matchers para Testing Library.
- **Cómo ayuda**: Permite que los tests funcionen correctamente en entornos que no tienen todas las APIs del navegador, asegurando compatibilidad y robustez.

### 5. `utils.test.ts`
- **Qué testea**: Funciones utilitarias como formateo de precios, fechas, transformación de estados, colores de estado y el adaptador de productos.
- **Cómo ayuda**: Garantiza que la lógica de presentación y transformación de datos en el frontend sea correcta, evitando errores visuales y de formato.
- **Herramientas**: Vitest.

## ¿Cómo ayudan estos tests a validar el frontend?

- **Aseguran la funcionalidad**: Verifican que los componentes y stores respondan correctamente a las acciones del usuario.
- **Previenen regresiones**: Si se modifica el código, los tests alertan sobre posibles errores antes de que lleguen a producción.
- **Mejoran la calidad**: Validan que la UI y la lógica de negocio se comporten como se espera, mejorando la experiencia del usuario.
- **Facilitan el refactor**: Permiten modificar el código con confianza, sabiendo que los tests cubrirán los casos importantes.

---

¿Te gustaría agregar ejemplos de ejecución o instrucciones para correr los tests?
