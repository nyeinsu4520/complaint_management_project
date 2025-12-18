## Complaint Management System (CMS)
### Architecture Style
**Context and Problem Statement**

The Complaint Management System (CMS) is designed to support customers, companies, and internal staff in submitting, tracking, and resolving complaints. Traditional complaint-handling processes are often manual, lack transparency, and do not scale effectively as the number of users and organisations increases. The system must support multiple user roles, company-specific complaint handling, and a well-defined complaint lifecycle.

As this project is a proof-of-concept, the architecture must balance modularity and maintainability with implementation simplicity, while still supporting future extension into a production-ready system.

**Decision Drivers**

Maintainability: The system must be easy to understand, modify and extend.

Separation of Concerns: Business responsibilities should be clearly divided.

Scalability (Design-Level): The architecture should support future growth and decomposition.

Development Simplicity: The architecture must be practical for a proof-of-concept implementation.

### Considered Options

 - Service-Oriented Architecture (SOA) within a monolith

 - Microservices Architecture

 - Three-Tier Architecture

### Decision Outcome

A Service-Oriented Architecture (SOA) implemented within a monolithic application was chosen. The system is structured into logical services such as User, Complaint, Company, and Notification services, each with clear responsibilities. All services are deployed within a single application. This approach provides clear separation of concerns and modularity while avoiding the operational complexity associated with distributed systems.

**Rationale**
SOA within a monolith was chosen because it aligns with the scope and constraints of a proof-of-concept. It enables service-level responsibility boundaries while maintaining a simple deployment model. The architecture also supports future refactoring into microservices if required, without major redesign.

**Consequences**

**Positive**

 - Clear service boundaries improve maintainability

 - Modular design supports future system evolution

 - Simpler deployment compared to microservices

**Negative**

 - Services cannot be independently scaled at runtime

 - Failures may impact the entire application

**Summary of Other Options**

Microservices: Offers independent scaling and deployment but introduces unnecessary complexity for a proof-of-concept.

Three-Tier Architecture: Provides layered separation but lacks explicit service boundaries and flexibility for future decomposition.

**Relationship to System Design**
This decision is reflected in the C4 Container and Component diagrams, where logical services are shown within a single backend application. Role-based access control is applied within services rather than through separate deployments.