# Proyecto de Arquitecturas Puras

Proyecto comparativo que implementa el mismo dominio de negocio (carrito de compras) usando cuatro arquitecturas de software populares:

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

### 1. **Clean Architecture** (Robert C. Martin - Uncle Bob)

Ubicación: `./clean-architecture`

Organización en capas concéntricas donde las dependencias apuntan hacia el centro:

- **Capa 0**: Enterprise Business Rules (Entidades)
- **Capa 1**: Application Business Rules (Casos de Uso)
- **Capa 2**: Interface Adapters (Controladores, Presenters, Gateways)
- **Capa 3**: Frameworks & Drivers (Web, DB, External Services)

### 2. **Onion Architecture** (Jeffrey Palermo)

Ubicación: `./onion-architecture` _(Próximamente)_

Similar a Clean Architecture pero con énfasis en:

- Domain Model en el centro
- Capas de servicios de dominio
- Interfaces de infraestructura en capas externas

### 3. **Hexagonal Architecture** (Alistair Cockburn - Ports & Adapters)

Ubicación: `./hexagonal-architecture` _(Próximamente)_

Arquitectura basada en puertos y adaptadores:

- Núcleo de aplicación (dominio)
- Puertos (interfaces)
- Adaptadores (implementaciones concretas)
- Lado izquierdo (driving adapters) y derecho (driven adapters)

### 4. **Vertical Slice Architecture** (Jimmy Bogard)

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
# Ejecutar Clean Architecture
npm run dev:clean

# Ejecutar Onion Architecture (próximamente)
npm run dev:onion

# Ejecutar Hexagonal Architecture (próximamente)
npm run dev:hexagonal

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

#### Clean Architecture ✅

- 📖 [README](./clean-architecture/README.md) - Documentación del proyecto

#### Onion Architecture 🔄

- _(Próximamente)_

#### Hexagonal Architecture 🔄

- _(Próximamente)_

#### Vertical Slice Architecture 🔄

- _(Próximamente)_

## 🎯 Objetivo del Proyecto

Comparar y contrastar las cuatro arquitecturas:

- Similitudes y diferencias
- Ventajas y desventajas
- Cuándo usar cada una
- Patrones de diseño aplicados
- Gestión de dependencias
- Testabilidad
- Complejidad vs. Simplicidad

## 📖 Recursos

- [Clean Architecture Book - Robert C. Martin](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- [Onion Architecture - Jeffrey Palermo](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Hexagonal Architecture - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Vertical Slice Architecture - Jimmy Bogard](https://www.jimmybogard.com/vertical-slice-architecture/)

## 📄 Licencia

MIT
