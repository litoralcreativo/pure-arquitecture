# 📊 Requerimientos de Negocio: Sistema de Carrito de Compras

## 🎯 Contexto del Negocio

Necesitamos un sistema que permita a nuestros clientes gestionar su carrito de compras de manera eficiente. Los clientes deben poder agregar productos, ajustar cantidades y ver el total de su compra antes de proceder al pago.

### Objetivos

- Facilitar la experiencia de compra del cliente
- Mantener un registro temporal de los productos seleccionados
- Calcular automáticamente los totales de la compra
- Permitir modificaciones antes de finalizar la compra

### Alcance del Proyecto

**Incluido en esta fase:**

- ✅ Gestión del carrito de compras
- ✅ Consulta de productos en el carrito
- ✅ Cálculo automático de totales
- ✅ Sistema de cupones de descuento
- ✅ Proceso de checkout (finalización de compra)
- ✅ Historial de compras realizadas

**Fuera del alcance (futuras fases):**

- ❌ Proceso de pago con pasarela
- ❌ Gestión de inventario
- ❌ Seguimiento de envíos
- ❌ Sistema de usuarios y autenticación completa
- ❌ Cancelación de compras
- ❌ Reembolsos

---

## 📖 Glosario del Dominio

### Cliente (Customer)

Persona que utiliza nuestra plataforma para realizar compras. Cada cliente puede tener un carrito de compras personal.

### Producto (Product)

Artículo disponible para la venta en nuestro catálogo. Cada producto tiene un identificador único y un nombre descriptivo.

### Carrito de Compras (Shopping Cart)

Espacio personal donde el cliente acumula temporalmente los productos que desea comprar. Es como una "canasta virtual".

### Línea de Carrito (Cart Line/Item)

Representa un producto específico dentro del carrito, junto con la cantidad deseada y el precio al momento de agregarlo.

### Precio Capturado (Price Lock)

El precio que se guarda cuando un producto se agrega al carrito. Este precio se mantiene aunque el precio del catálogo cambie posteriormente.

### Cupón de Descuento (Discount Coupon)

Código promocional que el cliente puede ingresar para obtener un descuento en su compra. Los cupones pueden ofrecer descuentos porcentuales o montos fijos.

### Descuento

Reducción en el precio total del carrito aplicada mediante un cupón válido. El descuento se calcula sobre el subtotal antes de mostrar el total final.

### Checkout (Finalización de Compra)

Proceso mediante el cual el cliente confirma su intención de compra. Al hacer checkout, el contenido del carrito se convierte en una orden de compra (Purchase) permanente.

### Compra / Orden (Purchase/Order)

Registro permanente e inmutable de una transacción completada. Representa un snapshot del carrito en el momento del checkout, incluyendo todos los productos, precios, descuentos y total pagado.

### Estado de Compra (Purchase Status)

Indicador del estado actual de una compra. En esta fase solo manejamos estados simples: completada o pendiente.

---

## 🎯 Requerimientos Funcionales

### RF-1: Inicializar Carrito de Compras

**Descripción:** Cuando un cliente ingresa a la tienda, debe poder iniciar su experiencia de compra creando un carrito personal.

**Condiciones:**

- El cliente debe estar registrado en el sistema
- Un cliente solo puede tener un carrito activo a la vez
- Si el cliente ya tiene un carrito, debe usar ese mismo

**Resultado esperado:**

- Se crea un carrito vacío asociado al cliente
- El sistema confirma que el carrito está listo para usar

---

### RF-2: Consultar Contenido del Carrito

**Descripción:** El cliente debe poder ver en cualquier momento qué productos tiene en su carrito y cuánto va a pagar.

**Información a mostrar:**

- Lista de todos los productos en el carrito
- Por cada producto: nombre, cantidad, precio unitario y subtotal
- Total de unidades en el carrito
- Monto total a pagar

**Condiciones:**

- El cliente debe tener un carrito creado
- Si el carrito está vacío, mostrar mensaje apropiado

---

### RF-3: Agregar Producto al Carrito

**Descripción:** El cliente selecciona un producto del catálogo y lo agrega a su carrito.

**Comportamiento esperado:**

**Si el producto NO está en el carrito:**

- Agregar el producto con cantidad 1
- Capturar y guardar el precio actual del producto

**Si el producto YA está en el carrito:**

- Incrementar la cantidad en 1
- Mantener el precio capturado originalmente (no actualizar)

**Condiciones:**

- El cliente debe tener un carrito activo
- El producto debe existir en el catálogo
- El precio debe obtenerse del sistema de precios

---

### RF-4: Eliminar Producto del Carrito

**Descripción:** El cliente decide que ya no quiere un producto y lo elimina completamente de su carrito.

**Comportamiento esperado:**

- Remover el producto del carrito sin importar la cantidad que tenga
- El producto ya no debe aparecer en el carrito

**Condiciones:**

- El producto debe estar actualmente en el carrito
- No se puede eliminar un producto que no está en el carrito

---

### RF-5: Aumentar Cantidad de un Producto

**Descripción:** El cliente quiere más unidades de un producto que ya tiene en su carrito.

**Comportamiento esperado:**

- Incrementar la cantidad del producto en 1 unidad
- Mantener el mismo precio unitario

**Condiciones:**

- El producto debe estar en el carrito
- No se puede incrementar un producto que no está en el carrito

---

### RF-6: Disminuir Cantidad de un Producto

**Descripción:** El cliente decide que quiere menos unidades de un producto.

**Comportamiento esperado:**

**Si la cantidad es mayor a 1:**

- Reducir la cantidad en 1 unidad

**Si la cantidad es 1:**

- Eliminar completamente el producto del carrito

**Condiciones:**

- El producto debe estar en el carrito
- La cantidad nunca puede ser menor a 1
- Si llega a 0, el producto se elimina automáticamente

---

### RF-7: Aplicar Cupón de Descuento

**Descripción:** El cliente ingresa un código de cupón para recibir un descuento en su compra.

**Tipos de cupón:**

1. **Cupón Porcentual:** Descuento basado en un porcentaje del total (ej: 10%, 25%)
2. **Cupón de Monto Fijo:** Descuento de una cantidad específica (ej: \$50, \$100)

**Comportamiento esperado:**

- El cliente ingresa el código del cupón
- El sistema valida que el cupón existe y es válido
- El sistema verifica que cumple las condiciones requeridas
- Se aplica el descuento correspondiente
- Se recalcula el total del carrito mostrando el descuento

**Condiciones:**

- El cupón debe existir en el sistema
- El cupón debe estar activo (no expirado)
- El carrito debe cumplir el monto mínimo (si aplica)
- Solo se permite un cupón activo por carrito
- Si ya hay un cupón aplicado, debe removerse primero

**Validaciones específicas:**

**Para cupón porcentual:**

- El porcentaje debe ser mayor a 0 y menor o igual a 100
- El descuento se calcula: `subtotal × (porcentaje / 100)`

**Para cupón de monto fijo:**

- El descuento no puede ser mayor al subtotal del carrito
- Si el descuento es mayor al subtotal, se ajusta al monto del subtotal

---

### RF-8: Remover Cupón de Descuento

**Descripción:** El cliente decide no usar el cupón aplicado o desea cambiarlo por otro.

**Comportamiento esperado:**

- Se remueve el cupón actualmente aplicado
- Se recalcula el total sin descuento
- El carrito vuelve a su estado sin cupón

**Condiciones:**

- Debe haber un cupón aplicado actualmente

---

### RF-9: Realizar Checkout (Finalizar Compra)

**Descripción:** El cliente confirma su intención de compra y convierte su carrito en una orden de compra permanente.

**Comportamiento esperado:**

1. Validar que el carrito no esté vacío
2. Crear una orden de compra (Purchase) con:
   - Snapshot de todos los productos con sus cantidades y precios
   - Subtotal, descuento (si aplica) y total
   - Información del cupón usado (si aplica)
   - Fecha y hora de la compra
   - Estado inicial: "completed"
3. Vaciar el carrito del cliente (prepararlo para nueva compra)
4. Retornar confirmación con ID de la compra y detalles

**Información capturada en la Purchase:**

- ID único de la compra
- ID del cliente
- Lista de productos comprados (con nombre, cantidad, precio unitario)
- Subtotal de la compra
- Descuento aplicado
- Total pagado
- Código de cupón usado (si aplica)
- Fecha y hora de creación
- Estado de la compra

**Condiciones:**

- El carrito debe tener al menos un producto
- El cliente debe tener un carrito activo
- Los precios capturados en el carrito se mantienen en la Purchase

**Resultado esperado:**

- Purchase creada y almacenada permanentemente
- Carrito vaciado (listo para nueva compra)
- Cliente recibe confirmación con:
  - ID de la compra
  - Resumen de items
  - Total pagado
  - Mensaje de éxito

---

### RF-10: Consultar Historial de Compras

**Descripción:** El cliente puede ver todas las compras que ha realizado previamente en el sistema.

**Comportamiento esperado:**

- Recuperar todas las compras (Purchases) del cliente
- Ordenar por fecha descendente (más reciente primero)
- Mostrar información resumida de cada compra

**Información a mostrar por compra:**

- ID de la compra
- Fecha de la compra
- Cantidad total de items
- Total pagado
- Estado de la compra
- Cupón usado (si aplica)

**Condiciones:**

- El cliente debe estar registrado en el sistema
- Si no tiene compras, mostrar mensaje apropiado

---

### RF-11: Consultar Detalle de una Compra

**Descripción:** El cliente puede ver el detalle completo de una compra específica que realizó.

**Comportamiento esperado:**

- Recuperar la compra por su ID
- Validar que la compra pertenece al cliente solicitante
- Mostrar información completa

**Información detallada a mostrar:**

- ID de la compra
- Fecha y hora de la compra
- Lista completa de productos:
  - Nombre del producto
  - Cantidad
  - Precio unitario
  - Subtotal por producto
- Subtotal de la compra
- Descuento aplicado (si aplica)
- Cupón usado (si aplica)
- Total pagado
- Estado de la compra

**Condiciones:**

- La compra debe existir en el sistema
- La compra debe pertenecer al cliente que la consulta

---

## 📐 Reglas de Negocio

### RN-1: Unicidad del Carrito

Un cliente solo puede tener un carrito activo a la vez. No se permite crear múltiples carritos para el mismo cliente.

### RN-2: Precio Inmutable en el Carrito

El precio de un producto se captura al momento de agregarlo al carrito y NO cambia aunque el precio del catálogo varíe. Esto protege al cliente de incrementos de precio durante su proceso de compra.

### RN-3: Cantidades Positivas

La cantidad de cualquier producto en el carrito debe ser siempre al menos 1. No existen cantidades de 0 o negativas. Si la cantidad llega a 0, el producto desaparece del carrito.

### RN-4: Producto Único

Un mismo producto solo puede aparecer una vez en el carrito. Si se agrega repetidamente, solo aumenta su cantidad.

### RN-5: Aislamiento de Carritos

Los carritos de diferentes clientes son completamente independientes. Las acciones de un cliente no afectan al carrito de otro.

### RN-6: Cálculos Automáticos

El sistema debe calcular automáticamente:

- **Subtotal por producto** = Cantidad × Precio unitario
- **Subtotal del carrito** = Suma de todos los subtotales de productos
- **Descuento** = Calculado según tipo de cupón aplicado
- **Total de unidades** = Suma de todas las cantidades
- **Total a pagar** = Subtotal del carrito - Descuento

### RN-7: Un Cupón por Carrito

Solo se permite aplicar un cupón de descuento a la vez. Si el cliente desea usar otro cupón, debe remover el actual primero.

### RN-8: Validación de Cupones

Los cupones deben validarse antes de aplicarse:

- Deben existir en el sistema
- Deben estar activos (no expirados)
- El carrito debe cumplir con el monto mínimo de compra (si el cupón lo requiere)
- El código debe ingresarse exactamente como está registrado

### RN-9: Límites de Descuento

- El descuento nunca puede ser mayor al subtotal del carrito
- Si un cupón de monto fijo excede el subtotal, el descuento se ajusta al monto del subtotal
- El total final nunca puede ser negativo (mínimo \$0)

### RN-10: Recálculo Automático

Cuando se aplica o remueve un cupón, todos los totales deben recalcularse automáticamente. Los cambios en el carrito (agregar/remover productos) también deben recalcular el descuento.

### RN-11: Checkout Requiere Carrito No Vacío

No se puede realizar checkout de un carrito vacío. El sistema debe validar que exista al menos un producto en el carrito antes de crear una Purchase.

### RN-12: Purchase es Inmutable

Una vez creada una compra (Purchase), esta no puede modificarse. Es un registro histórico permanente que refleja exactamente lo que el cliente compró en ese momento.

### RN-13: Snapshot de Precios en Purchase

La Purchase captura los precios exactos que tenía el carrito en el momento del checkout. Estos precios NO cambian aunque el catálogo actualice sus precios posteriormente.

### RN-14: Carrito se Vacía después del Checkout

Después de un checkout exitoso, el carrito del cliente queda vacío automáticamente, listo para iniciar una nueva compra.

### RN-15: Aislamiento de Compras

Las compras de diferentes clientes son completamente independientes. Un cliente solo puede consultar sus propias compras, no las de otros clientes.

### RN-16: Unicidad de Purchase ID

Cada compra debe tener un identificador único que permita consultarla posteriormente de manera inequívoca.

---

## 🔄 Integraciones Requeridas

### Sistema de Precios

El sistema debe consultar los precios actuales de los productos desde una fuente externa. Los precios no están almacenados localmente y pueden cambiar en cualquier momento.

**Nota:** Para esta fase, se aceptará una simulación de este servicio con precios fijos.

### Sistema de Cupones

El sistema debe validar los cupones ingresados por los clientes. Debe verificar que el cupón existe, está activo y cumple con las condiciones necesarias.

**Nota:** Para esta fase, se aceptará un repositorio simple de cupones precargados.

---

## 🧪 Datos de Referencia para Pruebas

### Clientes de Prueba

| ID  | Nombre       |
| --- | ------------ |
| c1  | Cliente Uno  |
| c2  | Cliente Dos  |
| c3  | Cliente Tres |

### Productos de Prueba

| ID  | Nombre  | Precio de Referencia |
| --- | ------- | -------------------- |
| p1  | Laptop  | \$1,000              |
| p2  | Mouse   | \$25                 |
| p3  | Teclado | \$75                 |

### Cupones de Prueba

| Código        | Tipo       | Valor | Monto Mínimo | Estado   |
| ------------- | ---------- | ----- | ------------ | -------- |
| DESCUENTO10   | Porcentual | 10%   | \$0          | Activo   |
| DESCUENTO20   | Porcentual | 20%   | \$500        | Activo   |
| VERANO50      | Monto Fijo | \$50  | \$200        | Activo   |
| PRIMERACOMPRA | Monto Fijo | \$100 | \$300        | Activo   |
| VERANO98      | Porcentual | 15%   | \$0          | Inactivo |

---

## 📊 Escenarios de Uso

### Escenario 1: Primera Compra

1. Cliente c1 inicia su carrito
2. Agrega una Laptop (p1) a su carrito
3. Agrega un Mouse (p2) a su carrito
4. Decide comprar 2 Laptops (aumenta cantidad)
5. Consulta su carrito para ver el total

**Resultado:** Carrito con 2 Laptops y 1 Mouse, mostrando total de 3 unidades

---

### Escenario 2: Cambio de Opinión

1. Cliente c1 tiene productos en su carrito
2. Aumenta la cantidad de un producto
3. Disminuye la cantidad de otro producto
4. Elimina un producto completamente
5. Verifica que los cambios se reflejaron correctamente

---

### Escenario 3: Múltiples Clientes Simultáneos

1. Cliente c1 crea su carrito y agrega p1
2. Cliente c2 crea su carrito y agrega p2
3. Cliente c1 consulta su carrito (solo debe ver p1)
4. Cliente c2 consulta su carrito (solo debe ver p2)

**Resultado:** Cada cliente ve únicamente sus propios productos

---

### Escenario 4: Uso de Cupón Porcentual

1. Cliente c1 tiene un carrito con 2 Laptops (p1) = \$2,000
2. Ingresa el cupón "DESCUENTO10" (10% de descuento)
3. Sistema valida el cupón
4. Se aplica descuento de \$200 (10% de \$2,000)
5. Consulta su carrito y ve: Subtotal \$2,000, Descuento -\$200, Total \$1,800

**Resultado:** El cliente paga \$1,800 en lugar de \$2,000

---

### Escenario 5: Uso de Cupón de Monto Fijo

1. Cliente c2 tiene un carrito con 1 Laptop (p1) y 1 Mouse (p2) = \$1,025
2. Ingresa el cupón "VERANO50" (\$50 de descuento, mínimo \$200)
3. Sistema valida que cumple el monto mínimo
4. Se aplica descuento de \$50
5. Total final: \$975

**Resultado:** El cliente ahorra \$50 en su compra

---

### Escenario 6: Cupón Rechazado por Monto Mínimo

1. Cliente c3 tiene un carrito con 1 Mouse (p2) = \$25
2. Intenta aplicar cupón "PRIMERACOMPRA" (\$100 descuento, mínimo \$300)
3. Sistema rechaza el cupón porque el subtotal (\$25) no alcanza el mínimo (\$300)
4. Se muestra mensaje: "El carrito debe tener un mínimo de \$300 para usar este cupón"

**Resultado:** El cupón no se aplica y el total permanece en \$25

---

### Escenario 7: Cambio de Cupón

1. Cliente c1 tiene cupón "DESCUENTO10" aplicado
2. Cliente decide usar cupón "DESCUENTO20" en su lugar
3. Primero remueve el cupón actual
4. Luego aplica el nuevo cupón "DESCUENTO20"
5. Se recalcula el total con el nuevo descuento

**Resultado:** Solo un cupón activo a la vez

---

### Escenario 8: Checkout Exitoso

1. Cliente c1 tiene un carrito con:
   - 2x Laptop (p1) @ $1000 = $2000
   - 1x Mouse (p2) @ $25 = $25
   - Cupón DESCUENTO10 aplicado
   - Subtotal: $2025, Descuento: $202.50, Total: $1822.50
2. Cliente ejecuta checkout
3. Sistema crea Purchase con ID "pur-001"
4. Sistema captura snapshot completo del carrito
5. Sistema vacía el carrito de c1
6. Cliente recibe confirmación:
   - "Compra realizada exitosamente"
   - Purchase ID: pur-001
   - Total pagado: $1822.50

**Resultado:**

- Purchase pur-001 creada y almacenada
- Carrito de c1 vacío (listo para nueva compra)

---

### Escenario 9: Error al Hacer Checkout de Carrito Vacío

1. Cliente c2 tiene un carrito vacío
2. Intenta hacer checkout
3. Sistema rechaza la operación
4. Se muestra mensaje: "No se puede hacer checkout de un carrito vacío"

**Resultado:** No se crea Purchase, carrito permanece vacío

---

### Escenario 10: Consultar Historial de Compras

1. Cliente c1 ya realizó 2 compras anteriormente:
   - Purchase pur-001: 8 marzo 2026, Total $1822.50
   - Purchase pur-002: 7 marzo 2026, Total $950.00
2. Cliente consulta su historial
3. Sistema muestra lista ordenada por fecha descendente:
   ```
   [
     { id: "pur-001", date: "2026-03-08", items: 3, total: $1822.50 },
     { id: "pur-002", date: "2026-03-07", items: 2, total: $950.00 }
   ]
   ```

**Resultado:** Cliente ve todas sus compras, más reciente primero

---

### Escenario 11: Consultar Detalle de Compra Específica

1. Cliente c1 consulta detalle de purchase "pur-001"
2. Sistema muestra información completa:

   ```
   Purchase ID: pur-001
   Fecha: 8 marzo 2026, 10:30 AM
   Cliente: c1

   Productos:
   - Laptop x2 @ $1000 = $2000
   - Mouse x1 @ $25 = $25

   Subtotal: $2025
   Cupón: DESCUENTO10 (-$202.50)
   Total Pagado: $1822.50
   Estado: Completed
   ```

**Resultado:** Cliente ve todos los detalles de su compra histórica

---

### Escenario 12: Flujo Completo de Compra

1. Cliente c2 crea nuevo carrito
2. Agrega 1x Teclado (p3) @ $75
3. Agrega 1x Mouse (p2) @ $25
4. Consulta carrito: Subtotal $100, Total $100
5. Aplica cupón VERANO50 (descuento $50, mínimo $200)
6. Sistema rechaza cupón (no cumple mínimo)
7. Cliente agrega 2x Mouse más (ahora tiene 3x Mouse)
8. Consulta carrito: Subtotal $150, Total $150
9. Cliente agrega 1x Teclado más (ahora tiene 2x Teclado)
10. Consulta carrito: Subtotal $225, Total $225
11. Aplica cupón VERANO50 nuevamente
12. Sistema acepta cupón: Subtotal $225, Descuento $50, Total $175
13. Cliente hace checkout
14. Sistema crea Purchase pur-003
15. Carrito queda vacío
16. Cliente consulta historial y ve su nueva compra

**Resultado:** Compra completada exitosamente, carrito listo para nueva compra

---

## ⚠️ Restricciones y Supuestos

### Restricciones Actuales

- No se valida disponibilidad de stock
- No hay límite de cantidad por producto
- No hay validación de montos mínimos o máximos de compra
- No se implementa pasarela de pago real
- No se permite cancelación de compras
- No se gestionan reembolsos
- No hay seguimiento de estados complejos (enviado, entregado, etc.)

### Supuestos

- Los clientes ya están registrados en el sistema
- Los productos ya existen en el catálogo
- Existe un servicio que provee los precios
- La persistencia de datos es temporal (para esta fase)
- El checkout es automático (no requiere confirmación de pago)
- Las compras se marcan como "completadas" inmediatamente

---

## 📋 Criterios de Aceptación

### Para Inicializar Carrito

- ✅ Se puede crear un carrito para un cliente existente
- ✅ No se puede crear múltiples carritos para el mismo cliente
- ✅ Se muestra error si el cliente no existe

### Para Consultar Carrito

- ✅ Se muestra lista completa de productos
- ✅ Se muestran cantidades correctas
- ✅ Los subtotales son precisos (cantidad × precio)
- ✅ El total general es correcto
- ✅ Se muestra apropiadamente si el carrito está vacío

### Para Agregar Producto

- ✅ Producto nuevo se agrega con cantidad 1
- ✅ Producto existente incrementa su cantidad
- ✅ El precio se captura al agregar
- ✅ Se valida que el producto exista
- ✅ Se valida que el carrito exista

### Para Eliminar Producto

- ✅ El producto se remueve completamente
- ✅ No queda rastro del producto en el carrito
- ✅ Se valida que el producto esté en el carrito

### Para Aumentar/Disminuir Cantidad

- ✅ La cantidad se modifica correctamente
- ✅ Al disminuir a 0, el producto se elimina
- ✅ No se permiten cantidades negativas
- ✅ Se valida que el producto esté en el carrito

### Para Aplicar Cupón

- ✅ Se valida que el cupón existe en el sistema
- ✅ Se valida que el cupón está activo (no expirado)
- ✅ Se verifica el monto mínimo de compra (si aplica)
- ✅ El descuento porcentual se calcula correctamente
- ✅ El descuento de monto fijo no excede el subtotal
- ✅ Solo se permite un cupón a la vez
- ✅ Se recalculan correctamente todos los totales
- ✅ Se muestra el desglose: subtotal, descuento y total final

### Para Remover Cupón

- ✅ El cupón se remueve completamente
- ✅ Se recalcula el total sin descuento
- ✅ El carrito vuelve a mostrar el subtotal como total

### Para Realizar Checkout

- ✅ Se valida que el carrito no esté vacío
- ✅ Se crea una Purchase con todos los datos del carrito
- ✅ La Purchase captura snapshot exacto del carrito (productos, precios, descuentos)
- ✅ Se genera un ID único para la Purchase
- ✅ La Purchase se marca como "completed"
- ✅ El carrito se vacía automáticamente después del checkout
- ✅ Se retorna confirmación con ID de compra y total pagado
- ✅ No se puede hacer checkout de carrito vacío

### Para Consultar Historial de Compras

- ✅ Se muestran todas las compras del cliente
- ✅ Las compras están ordenadas por fecha descendente
- ✅ Cada compra muestra: ID, fecha, cantidad de items, total
- ✅ Se muestra mensaje apropiado si no hay compras
- ✅ Un cliente solo ve sus propias compras

### Para Consultar Detalle de Compra

- ✅ Se muestra información completa de la compra
- ✅ Se valida que la compra existe
- ✅ Se valida que la compra pertenece al cliente
- ✅ Se muestran todos los productos con cantidades y precios
- ✅ Se muestra el subtotal, descuento y total
- ✅ Se muestra el cupón usado (si aplica)
- ✅ Se muestra la fecha de la compra

### Para Inmutabilidad de Purchase

- ✅ Una Purchase creada no puede modificarse
- ✅ Los precios en la Purchase no cambian aunque el catálogo cambie
- ✅ La Purchase es un registro histórico permanente

### Para Cálculos con Descuento

- ✅ Subtotal = Suma de (cantidad × precio) de todos los productos
- ✅ Descuento porcentual = Subtotal × (porcentaje / 100)
- ✅ Descuento fijo = Monto del cupón (máximo: subtotal)
- ✅ Total = Subtotal - Descuento
- ✅ El total nunca es negativo

---

**Documento preparado por:** Área de Producto  
**Fecha:** 8 de marzo de 2026  
**Versión:** 2.0  
**Última actualización:** 8 de marzo de 2026  
**Estado:** Aprobado para desarrollo

**Cambios en v2.0:**

- ✅ Agregado proceso de Checkout (RF-9)
- ✅ Agregado consulta de Historial de Compras (RF-10)
- ✅ Agregado consulta de Detalle de Compra (RF-11)
- ✅ Nuevas entidades: Purchase, PurchaseItem, PurchaseStatus
- ✅ Nuevas reglas de negocio: RN-11 a RN-16
- ✅ 5 nuevos escenarios de uso (8-12)
- ✅ Criterios de aceptación para checkout y compras
