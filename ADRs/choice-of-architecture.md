## Complaint Management System (CMS)
### Architecture Style
**Context and Problem Statement**

The Complaint Management System (CMS) supports customers, companies, and internal staff in submitting, tracking, and resolving complaints. Existing complaint-handling processes are often manual, lack transparency, and do not scale well as the number of users and companies grows. The system must support multiple user roles, company-specific complaint management, and a clear complaint lifecycle.

The goal is to design a maintainable and modular architecture suitable for a proof-of-concept while allowing future extension into a production-ready system.

**Decision Drivers**

Maintainability: The system must be easy to understand and modify.

Separation of Concerns: Business responsibilities should be clearly divided.

Scalability (Design-Level): The architecture should support future growth.

Development Simplicity: The solution must remain practical for a proof-of-concept.

### Considered Options

 - Service-Oriented Architecture (SOA) within a monolith

 - Microservices Architecture

 - Three-Tier Architecture

### Decision Outcome

A Service-Oriented Architecture (SOA) implemented within a monolithic application was chosen. The system is structured into logical services such as User, Complaint, Company, and Notification services, each with clear responsibilities. This approach provides modularity without the complexity of distributed deployment.

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