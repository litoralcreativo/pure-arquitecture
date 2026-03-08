# Proyecto de Arquitecturas Puras

Proyecto comparativo que implementa el mismo dominio de negocio (carrito de compras) usando multiples arquitecturas de software populares:

## 📊 Dominio de Negocio

**Sistema de Carrito de Compras** - Un sistema simplificado de e-commerce que permite:

- Crear carritos personales por cliente
- Agregar/remover productos
- Gestionar cantidades
- Aplicar y remover cupones de descuento
- Realizar checkout y completar compras
- Consultar historial de compras

📖 **Ver documentación completa del dominio**: [BUSINESS.md](./BUSINESS.md)

**Datos de Prueba:**

- Clientes: `c1`, `c2`, `c3`
- Productos: `p1` (Laptop), `p2` (Mouse), `p3` (Keyboard)

## 🏗️ Arquitecturas Implementadas

### 1. **MVC Architecture** (Model-View-Controller)

Ubicación: `./mvc-architecture` _(Próximamente)_

Patrón arquitectónico clásico de separación en tres componentes:

- **Model**: Lógica de negocio y datos
- **View**: Presentación e interfaz de usuario
- **Controller**: Manejo de requests y coordinación

### 2. **N-Layer Architecture** (Arquitectura en Capas Tradicional)

Ubicación: `./n-layer-architecture` _(Próximamente)_

Arquitectura tradicional organizada en capas horizontales:

- **Presentation Layer**: UI/API
- **Business Logic Layer**: Lógica de negocio
- **Data Access Layer**: Acceso a datos
- Dependencias pueden fluir en ambas direcciones

### 3. **Hexagonal Architecture** (Alistair Cockburn - Ports & Adapters)

Ubicación: `./hexagonal-architecture` _(Próximamente)_

Arquitectura basada en puertos y adaptadores:

- Núcleo de aplicación (dominio)
- Puertos (interfaces)
- Adaptadores (implementaciones concretas)
- Lado izquierdo (driving adapters) y derecho (driven adapters)

### 4. **Onion Architecture** (Jeffrey Palermo)

Ubicación: `./onion-architecture` _(Próximamente)_

Similar a Clean Architecture pero con énfasis en:

- Domain Model en el centro
- Capas de servicios de dominio
- Interfaces de infraestructura en capas externas

### 5. **Clean Architecture** (Robert C. Martin - Uncle Bob)

Ubicación: `./clean-architecture`

Organización en capas concéntricas donde las dependencias apuntan hacia el centro:

- **Capa 0**: Enterprise Business Rules (Entidades)
- **Capa 1**: Application Business Rules (Casos de Uso)
- **Capa 2**: Interface Adapters (Controladores, Presenters, Gateways)
- **Capa 3**: Frameworks & Drivers (Web, DB, External Services)

### 6. **Vertical Slice Architecture** (Jimmy Bogard)

Ubicación: `./vertical-slice-architecture` _(Próximamente)_

Arquitectura organizada por features/casos de uso en lugar de capas técnicas:

- Cada slice es autónomo y contiene todo lo necesario
- Minimiza acoplamiento entre features
- Enfocada en casos de uso individuales
- Reduce abstracciones innecesarias

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar todas las dependencias
npm run install:all

# O instalar individualmente
npm install
cd clean-architecture && npm install
```

### Desarrollo

```bash
# Ejecutar MVC Architecture (próximamente)
npm run dev:mvc

# Ejecutar N-Layer Architecture (próximamente)
npm run dev:nlayer

# Ejecutar Hexagonal Architecture (próximamente)
npm run dev:hexagonal

# Ejecutar Onion Architecture (próximamente)
npm run dev:onion

# Ejecutar Clean Architecture
npm run dev:clean

# Ejecutar Vertical Slice Architecture (próximamente)
npm run dev:vertical
```

### Build y Testing

```bash
# Compilar todos los proyectos
npm run build:all

# Ejecutar tests de todos los proyectos
npm run test:all

# Limpiar todos los proyectos
npm run clean:all
```

## 📋 Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

## 📚 Documentación

### Documentos Principales

- 📊 [BUSINESS.md](./BUSINESS.md) - **Dominio de negocio y casos de uso** (EMPEZAR AQUÍ)
- 🏛️ [ARCHITECTURE_COMPARISON.md](./docs/ARCHITECTURE_COMPARISON.md) - Comparativa de arquitecturas

### Por Arquitectura

#### MVC Architecture 🔄

- _(Próximamente)_

#### N-Layer Architecture 🔄

- _(Próximamente)_

#### Hexagonal Architecture 🔄

- _(Próximamente)_

#### Onion Architecture 🔄

- _(Próximamente)_

#### Clean Architecture ✅

- 📖 [README](./clean-architecture/README.md) - Documentación del proyecto

#### Vertical Slice Architecture 🔄

- _(Próximamente)_

## 🎯 Objetivo del Proyecto

Comparar y contrastar las seis arquitecturas:

- Similitudes y diferencias
- Ventajas y desventajas
- Cuándo usar cada una
- Patrones de diseño aplicados
- Gestión de dependencias
- Testabilidad
- Complejidad vs. Simplicidad

## 📖 Recursos

- [MVC Pattern - Martin Fowler](https://martinfowler.com/eaaDev/uiArchs.html)
- [N-Layer Architecture - Microsoft Docs](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/common-web-application-architectures)
- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Onion Architecture - Jeffrey Palermo](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Clean Architecture Book - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Vertical Slice Architecture - Jimmy Bogard](https://www.jimmybogard.com/vertical-slice-architecture/)

## 📄 Licencia

MIT
