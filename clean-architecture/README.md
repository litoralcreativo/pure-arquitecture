# Clean Architecture - Sistema de Carrito de Compras

Implementación ortodoxa de **Clean Architecture** (Uncle Bob) usando TypeScript y Node.js.

## 📋 Descripción

Este proyecto implementa un sistema de carrito de compras siguiendo estrictamente los principios de Clean Architecture con 4 capas concéntricas:

```
┌─────────────────────────────────────────┐
│  3. Frameworks & Drivers                │
│     - Express, In-Memory Repos          │
│  ┌───────────────────────────────────┐  │
│  │  2. Interface Adapters           │  │
│  │     - Controllers, Presenters    │  │
│  │  ┌─────────────────────────────┐ │  │
│  │  │  1. Application Rules       │ │  │
│  │  │     - Use Cases             │ │  │
│  │  │  ┌───────────────────────┐  │ │  │
│  │  │  │  0. Entities          │  │ │  │
│  │  │  │     - Cart, Product   │  │ │  │
│  │  │  └───────────────────────┘  │ │  │
│  │  └─────────────────────────────┘ │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar
npm run build

# Ejecutar producción
npm start
```

### Servidor

El servidor estará disponible en: `http://localhost:3000`

## 📡 API Endpoints

- **POST** `/cart` - Crear carrito
- **GET** `/cart/:customerId` - Obtener carrito (con productos, cantidades y total)
- **POST** `/cart/add-product` - Agregar producto
- **DELETE** `/cart/remove-product` - Remover producto
- **PATCH** `/cart/increase-quantity` - Incrementar cantidad
- **PATCH** `/cart/decrease-quantity` - Decrementar cantidad

📖 Ver documentación completa: [API.md](./API.md)

## 🧪 Testing

### Opción 1: Automatizado con httpYac (Recomendado) 🚀

Ejecutar los **77 tests** automáticamente en orden:

```bash
# Iniciar servidor (terminal 1)
npm run dev

# Ejecutar todos los tests (terminal 2)
npm run test:api

# O con salida detallada
npm run test:api:verbose
```

### Opción 2: Manual con REST Client

Usar VS Code con la extensión **REST Client**:

1. Abrir `api-tests.http`
2. Click en "Send Request" sobre cada test
3. Ver respuestas en panel lateral

📖 Ver guía completa: [TESTING.md](./TESTING.md)

### Opción 3: curl

```bash
# Crear carrito
curl -X POST http://localhost:3000/cart \
  -H "Content-Type: application/json" \
  -d '{"customerId": "customer-1"}'

# Consultar carrito
curl http://localhost:3000/cart/customer-1
```

### Opción 4: Postman / Thunder Client

Importar los endpoints desde `api-tests.http`

## 🏗️ Estructura del Proyecto

```
src/
├── 0-enterprise-business-rules/    # Entidades de dominio
│   ├── cart.ts
│   ├── product.ts
│   ├── customer.ts
│   └── line-item.ts
├── 1-application-business-rules/   # Casos de uso
│   ├── abstractions/               # Interfaces de repositorios
│   └── use-cases/
│       ├── create-cart/
│       ├── get-cart/               # ✨ Nuevo
│       ├── add-product-to-cart/
│       ├── remove-product-from-cart/
│       ├── increase-quantity/
│       └── decrease-quantity/
├── 2-interface-adapters/           # Adaptadores
│   ├── controllers/
│   ├── presenters/
│   └── gateways/
├── 3-frameworks-and-drivers/       # Frameworks externos
│   ├── web/                        # Express
│   ├── persistence/                # Repositorios in-memory
│   └── external-services/          # APIs externas
└── main/
    └── composition-root.ts         # Dependency injection manual
```

## 📐 Principios Aplicados

### SOLID

- ✅ **S**ingle Responsibility
- ✅ **O**pen/Closed
- ✅ **L**iskov Substitution
- ✅ **I**nterface Segregation
- ✅ **D**ependency Inversion

### Clean Architecture

- ✅ Regla de Dependencia (hacia el centro)
- ✅ Boundaries explícitos (Input/Output)
- ✅ Independencia de frameworks
- ✅ Testabilidad por diseño
- ✅ Separation of Concerns

## 🔍 Patrones de Diseño

1. **Repository Pattern** - Abstracción de persistencia
2. **Gateway Pattern** - Aislamiento de servicios externos
3. **Use Case Pattern** - Lógica de aplicación encapsulada
4. **Presenter Pattern** - Formateo de respuestas
5. **Dependency Injection** - Inversión de control
6. **Boundary Pattern** - Input/Output boundaries

## 📦 Tecnologías

- **TypeScript** 5.1+ - Tipado estático
- **Node.js** 18+ - Runtime
- **Express** 4.18 - Framework web
- **ts-node** - Ejecución de TypeScript
- **Jest** - Testing (configurado, pendiente implementar)

## 🎯 Casos de Uso Implementados

1. **CreateCart** - Crear un carrito para un cliente
2. **GetCart** - Obtener carrito con productos y totales ✨
3. **AddProductToCart** - Agregar producto (incrementa si existe)
4. **RemoveProductFromCart** - Eliminar producto del carrito
5. **IncreaseQuantity** - Incrementar cantidad de un producto
6. **DecreaseQuantity** - Decrementar cantidad (elimina si llega a 0)

## 📊 Datos de Prueba

### Customers Precargados

- `customer-1`
- `customer-2`
- `customer-3`

### Products Precargados

- `prod-1` - Laptop
- `prod-2` - Mouse
- `prod-3` - Keyboard

## ✅ Features

- [x] Crear carrito
- [x] Consultar carrito con detalles
- [x] Agregar productos
- [x] Gestionar cantidades
- [x] Remover productos
- [x] API REST completa
- [x] Inversión de dependencias
- [x] Repositorios in-memory
- [ ] Tests unitarios
- [ ] Tests de integración
- [ ] Persistencia real (DB)
- [ ] Value Objects
- [ ] Domain Events

## 📚 Documentación

- 📖 [API.md](./API.md) - Documentación de endpoints
- 🧪 [TESTING.md](./TESTING.md) - Guía de testing
- 📊 [../CLEAN_ARCHITECTURE_REPORT.md](../CLEAN_ARCHITECTURE_REPORT.md) - Análisis detallado
- 🏛️ [../ARCHITECTURE_COMPARISON.md](../ARCHITECTURE_COMPARISON.md) - Comparativa de arquitecturas

## 🎓 Aprendizaje

Este proyecto es ideal para:

- Aprender Clean Architecture de forma práctica
- Entender la inversión de dependencias
- Ver la separación de capas en acción
- Comparar con otras arquitecturas (Onion, Hexagonal)
- Servir como base para proyectos enterprise

## 🔗 Referencias

- [Clean Architecture Book - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Clean Architecture Blog - Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 📝 Notas

- Los datos son **in-memory**: se pierden al reiniciar
- Proyecto educativo: optimizado para claridad
- Production-ready: requiere más trabajo (DB, tests, logging)

## 📄 Licencia

MIT
