# 🏛️ Comparativa de Arquitecturas Puras

## Tabla Comparativa Rápida

| Aspecto          | Clean Architecture   | Onion Architecture | Hexagonal Architecture          | Vertical Slice Architecture |
| ---------------- | -------------------- | ------------------ | ------------------------------- | --------------------------- |
| **Autor**        | Robert C. Martin     | Jeffrey Palermo    | Alistair Cockburn               | Jimmy Bogard                |
| **Año**          | ~2012                | ~2008              | ~2005                           | ~2015                       |
| **Capas**        | 4 capas concéntricas | Capas tipo cebolla | Sin capas (puertos/adaptadores) | Por feature/slice           |
| **Enfoque**      | Casos de uso         | Modelo de dominio  | Puertos y adaptadores           | Feature completa            |
| **Dependencias** | Hacia el centro      | Hacia el centro    | Hacia el núcleo                 | Minimizadas                 |
| **Estado**       | ✅ Implementado      | 🔄 Pendiente       | 🔄 Pendiente                    | 🔄 Pendiente                |

---

## 🎯 Clean Architecture

### Estructura:

```
┌─────────────────────────────────────────┐
│  Frameworks & Drivers (Web, DB, APIs)   │ Capa 3
│  ┌───────────────────────────────────┐  │
│  │  Interface Adapters               │  │ Capa 2
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Application Business Rules │  │  │ Capa 1
│  │  │  ┌───────────────────────┐  │  │  │
│  │  │  │ Enterprise Business   │  │  │  │ Capa 0
│  │  │  │      Rules            │  │  │  │
│  │  │  └───────────────────────┘  │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Componentes Clave:

- **Entities**: Lógica de negocio enterprise
- **Use Cases**: Lógica de aplicación
- **Controllers/Presenters**: Adaptadores de interfaz
- **Frameworks**: Detalles externos

### Ventajas:

✅ Separación muy clara de responsabilidades  
✅ Altamente testable  
✅ Independiente de frameworks  
✅ Reglas de negocio protegidas

### Desafíos:

⚠️ Curva de aprendizaje alta  
⚠️ Muchos archivos/carpetas  
⚠️ Puede ser over-engineering para apps simples

---

## 🧅 Onion Architecture

### Estructura (Teórica):

```
┌───────────────────────────────────────────┐
│             Infrastructure                │
│  ┌─────────────────────────────────────┐  │
│  │          Application Services       │  │
│  │  ┌───────────────────────────────┐  │  │
│  │  │       Domain Services         │  │  │
│  │  │  ┌─────────────────────────┐  │  │  │
│  │  │  │    Domain Model         │  │  │  │
│  │  │  └─────────────────────────┘  │  │  │
│  │  └───────────────────────────────┘  │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

**Flujo de Dependencias:** Infrastructure → Application → Domain Services → Domain Model

### Diferencias con Clean:

- Más énfasis en el **Domain Model** rico
- **Domain Services** como capa intermedia
- Interfaces de infraestructura en el dominio
- Menos prescriptiva en la cantidad de capas

### Ventajas Esperadas:

✅ Modelo de dominio más rico  
✅ Mejor encapsulación  
✅ Flexibilidad en capas

### A Implementar:

🔄 Domain Model rico con comportamiento  
🔄 Domain Services  
🔄 Application Services  
🔄 Infrastructure

---

## ⬡ Hexagonal Architecture (Ports & Adapters)

### Estructura (Teórica):

```
        ┌─────────────────┐
        │  REST Adapter   │ ◄── Driving
        └────────┬────────┘     (Primary)
                 │
    ┌────────────▼────────────┐
    │                         │
    │   ┌──────────────┐      │
    │   │              │      │
    │   │  Application │      │
    │   │     Core     │      │
    │   │   (Domain)   │      │
    │   │              │      │
    │   └──────────────┘      │
    │         Hexágono        │
    └────────────┬────────────┘
                 │
        ┌────────▼────────┐
        │  DB Adapter     │ ◄── Driven
        └─────────────────┘     (Secondary)
```

### Conceptos Clave:

- **Puertos**: Interfaces (contratos)
- **Adaptadores**: Implementaciones
- **Lado Izquierdo**: Driving adapters (UI, API)
- **Lado Derecho**: Driven adapters (DB, APIs externas)

### Diferencias:

- No usa capas, usa **simetría**
- Más simple conceptualmente
- Enfoque en **boundaries**
- Menos prescriptiva en organización interna

### Ventajas Esperadas:

✅ Más simple de entender  
✅ Muy flexible  
✅ Simetría entre adaptadores  
✅ Fácil de testear

### A Implementar:

🔄 Application Core  
🔄 Driving Ports & Adapters  
🔄 Driven Ports & Adapters

---

## 📐 Vertical Slice Architecture

### Estructura (Teórica):

```
features/
├── create-cart/
│   ├── CreateCart.cs           # Handler completo
│   ├── CreateCartValidator.cs  # Validación
│   └── CreateCartEndpoint.cs   # Endpoint
├── add-product-to-cart/
│   ├── AddProductToCart.cs
│   ├── AddProductValidator.cs
│   └── AddProductEndpoint.cs
├── get-cart/
│   ├── GetCart.cs
│   └── GetCartEndpoint.cs
└── shared/
    ├── Cart.cs                 # Entidad compartida (mínima)
    └── ICartRepository.cs      # Abstracción compartida (mínima)
```

### Conceptos Clave:

- **Vertical Slice**: Feature completa end-to-end
- **Minimal Coupling**: Cada slice es independiente
- **No Capas**: No separación técnica horizontal
- **Shared Kernel**: Solo lo esencial compartido

### Filosofía:

> "Organiza por lo que cambia junto, no por tipo técnico"

- Las capas asumen que toda la capa cambia junta
- Vertical Slice asume que cada feature cambia independientemente
- Minimiza abstracciones prematuras
- Maximiza cohesión por caso de uso

### Ventajas Esperadas:

✅ Extremadamente simple de entender  
✅ Cambios localizados (toda la feature en un lugar)  
✅ Menos abstracciones innecesarias  
✅ Fácil agregar/remover features  
✅ Ideal para equipos pequeños

### Desafíos Esperados:

⚠️ Puede haber duplicación de código  
⚠️ Menos reutilización  
⚠️ Requiere disciplina para mantener slices independientes  
⚠️ Puede crecer mucho en proyectos grandes

### A Implementar:

🔄 Features por slice  
🔄 Handlers con MediatR/similar  
🔄 Minimal shared kernel  
🔄 Endpoints independientes

---

## 🎭 Similitudes Entre las Cuatro

| Principio                   | Clean | Onion | Hexagonal | Vertical Slice |
| --------------------------- | ----- | ----- | --------- | -------------- |
| Inversión de Dependencias   | ✅    | ✅    | ✅        | ⚠️ Mínima      |
| Dominio en el Centro        | ✅    | ✅    | ✅        | ⚠️ Distribuido |
| Independencia de Frameworks | ✅    | ✅    | ✅        | ✅             |
| Testabilidad                | ✅    | ✅    | ✅        | ✅             |
| Boundaries Explícitos       | ✅    | ✅    | ✅        | ⚠️ Por Feature |

---

## 🔄 Diferencias Clave

### Clean vs Onion:

- **Clean**: 4 capas fijas, enfoque en use cases
- **Onion**: Capas flexibles, enfoque en domain model

### Clean vs Hexagonal:

- **Clean**: Capas concéntricas verticales
- **Hexagonal**: Simetría horizontal (puertos/adaptadores)

### Onion vs Hexagonal:

- **Onion**: Capas anidadas
- **Hexagonal**: Sin capas, solo núcleo + adaptadores

### Capas vs Slices:

- **Clean/Onion/Hexagonal**: Organización horizontal por tipo técnico
- **Vertical Slice**: Organización vertical por feature/caso de uso
- **Trade-off**: Reutilización vs. Simplicidad

---

## 📊 Cuándo Usar Cada Una

### Clean Architecture

**Ideal para:**

- Proyectos enterprise grandes
- Equipos que valoran estructura clara
- Sistemas con múltiples use cases complejos
- Cuando se requiere máxima testabilidad

**Evitar en:**

- Proyectos pequeños/MVPs
- Cuando el tiempo de desarrollo es crítico
- Equipos sin experiencia en arquitecturas limpias

### Onion Architecture

**Ideal para:**

- Aplicaciones con dominio rico
- Cuando DDD es importante
- Necesidad de evolución del modelo de dominio
- Proyectos con lógica de negocio compleja

**Evitar en:**

- CRUDs simples
- Dominios anémicos
- Proyectos con poco comportamiento de negocio

### Hexagonal Architecture

**Ideal para:**

- Proyectos con muchas integraciones
- Microservicios
- Cuando simplicidad es prioridad
- Testing intensivo

**Evitar en:**

- Cuando se necesita más estructura
- Equipos que prefieren capas claras
- Primera vez implementando arquitectura limpia

### Vertical Slice Architecture

**Ideal para:**

- Proyectos nuevos/MVPs que necesitan velocidad
- Equipos pequeños que valoran simplicidad
- Aplicaciones CRUD-heavy con features independientes
- Cuando el código cambia frecuentemente por feature
- Reducir ceremony y boilerplate

**Evitar en:**

- Dominios complejos con mucha lógica compartida
- Cuando se requiere máxima reutilización
- Equipos grandes que necesitan estructura clara
- Proyectos con alta complejidad algorítmica

---

## 🎯 Roadmap del Proyecto

### ✅ Fase 1: Clean Architecture (COMPLETADA)

- [x] Implementación de 4 capas
- [x] 5 use cases funcionales
- [x] Repositorios in-memory
- [x] Web API con Express
- [x] Análisis y reporte completo

### 🔄 Fase 2: Onion Architecture (EN PROGRESO)

- [ ] Setup del proyecto
- [ ] Domain Model rico
- [ ] Domain Services
- [ ] Application Services
- [ ] Infrastructure layer
- [ ] Comparativa con Clean

### 🔄 Fase 3: Hexagonal Architecture (PENDIENTE)

- [ ] Setup del proyecto
- [ ] Application Core
- [ ] Driving Ports & Adapters
- [ ] Driven Ports & Adapters
- [ ] Comparativa con Clean y Onion

### 🔄 Fase 4: Vertical Slice Architecture (PENDIENTE)

- [ ] Setup del proyecto
- [ ] Features por slice
- [ ] Handlers independientes
- [ ] Minimal abstracciones
- [ ] Comparativa con arquitecturas en capas

### 🔄Fase 5: Documentación Final

- [ ] Comparativa detallada de las 4
- [ ] Guía de decisión: cuándo usar cada una
- [ ] Casos de estudio
- [ ] Conclusiones y recomendaciones
- [ ] Trade-offs: Capas vs. Slices

---

## 📚 Referencias

### Clean Architecture

- 📘 [Clean Architecture Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
- 🎥 [Uncle Bob - Clean Architecture](https://www.youtube.com/watch?v=Nsjsiz2A9mg)
- 📝 [Clean Architecture Blog](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### Onion Architecture

- 📝 [Onion Architecture Original](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- 📝 [Understanding Onion Architecture](https://www.codeguru.com/csharp/understanding-onion-architecture/)

### Hexagonal Architecture

- 📝 [Hexagonal Architecture Original](https://alistair.cockburn.us/hexagonal-architecture/)
- 📝 [Ports and Adapters Pattern](https://herbertograca.com/2017/09/14/ports-adapters-architecture/)
- 📘 [Hexagonal Architecture Explained](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)

### Vertical Slice Architecture

- 📝 [Vertical Slice Architecture - Jimmy Bogard](https://www.jimmybogard.com/vertical-slice-architecture/)
- 🎥 [GOTO 2018 - Vertical Slice Architecture](https://www.youtube.com/watch?v=SUiWfhAhgQw)
- 📝 [Restructuring to a Vertical Slice Architecture](https://codeopinion.com/restructuring-to-a-vertical-slice-architecture/)

---

**Última Actualización**: 8 de marzo de 2026
