# 🏛️ Comparativa de Arquitecturas Puras

## Tabla Comparativa Rápida

| Aspecto          | Clean Architecture   | Onion Architecture | Hexagonal Architecture          |
| ---------------- | -------------------- | ------------------ | ------------------------------- |
| **Autor**        | Robert C. Martin     | Jeffrey Palermo    | Alistair Cockburn               |
| **Año**          | ~2012                | ~2008              | ~2005                           |
| **Capas**        | 4 capas concéntricas | Capas tipo cebolla | Sin capas (puertos/adaptadores) |
| **Enfoque**      | Casos de uso         | Modelo de dominio  | Puertos y adaptadores           |
| **Dependencias** | Hacia el centro      | Hacia el centro    | Hacia el núcleo                 |
| **Estado**       | ✅ Implementado      | 🔄 Pendiente       | 🔄 Pendiente                    |

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
┌─────────────────────────────────┐
│    Infrastructure               │ Capa Externa
│  ┌───────────────────────────┐  │
│  │  Application Services     │  │ Capa de Servicios
│  │  ┌─────────────────────┐  │  │
│  │  │  Domain Services    │  │  │ Servicios de Dominio
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │ Domain Model  │  │  │  │ Núcleo
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

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

## 🎭 Similitudes Entre las Tres

| Principio                   | Clean | Onion | Hexagonal |
| --------------------------- | ----- | ----- | --------- |
| Inversión de Dependencias   | ✅    | ✅    | ✅        |
| Dominio en el Centro        | ✅    | ✅    | ✅        |
| Independencia de Frameworks | ✅    | ✅    | ✅        |
| Testabilidad                | ✅    | ✅    | ✅        |
| Boundaries Explícitos       | ✅    | ✅    | ✅        |

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

### 📝 Fase 4: Documentación Final

- [ ] Comparativa detallada de las 3
- [ ] Guía de decisión: cuándo usar cada una
- [ ] Casos de estudio
- [ ] Conclusiones y recomendaciones

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

---

**Última Actualización**: 8 de marzo de 2026  
**Estado**: Clean Architecture ✅ | Onion 🔄 | Hexagonal 🔄
