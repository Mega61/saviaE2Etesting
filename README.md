---
title: 'Documentación pruebas automatizadas SAVIA'
---

Pruebas automatizadas SAVIA
===


[TOC]

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

| Tag | TestSuite |
| -------- | -------- |
| Regression     | Todas las test suites     |
| ListOrders     | 01ListOrdersTestSuite     |
| ViewOrders     | 02ViewOrdersTestSuite     |
| CreateOrders     | 03CreateOrdersTestSuite     |
| EditOrders     | 04EditOrdersTestSuite     |
| InvoiceOrders     | 05InvoiceOrdersTestSuite     |


