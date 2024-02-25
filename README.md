Pruebas automatizadas SAVIA
===

## Uso del framework NIGHTWATCH

### Ejecución de pruebas

1. Clona el repositorio en tu máquina local:

   ```bash
   git clone https://github.com/savia-product/regression-testing.git
   cd regression-testing

2. Instala la dependencia

    ```
    npm init nightwatch
    
3. Ejecutar las pruebas

    ```
    npm test -- --tag "tag de pruebas"

Se debe reemplazar el "tag de pruebas" por un tag válido.
Actualmente existen los siguientes tags.

## Lista de testSuites

| Tag | TestSuite |
| -------- | -------- |
| Regression     | Todas las test suites     |
| ListOrders     | 01ListOrdersTestSuite     |
| ViewOrders     | 02ViewOrdersTestSuite     |
| CreateOrders     | 03CreateOrdersTestSuite     |
| EditOrders     | 04EditOrdersTestSuite     |
| InvoiceOrders     | 05InvoiceOrdersTestSuite     |

## Lista de tareas iteración 2

- [X] Añadir dependencias **standard**, **husky**, **snazzy**.
- [X] Implementación de BYPASS para LOGIN con OTP permanente.
- [X] Construcción de pipeline para PROD y DEVELOP.
