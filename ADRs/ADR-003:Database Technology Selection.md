## Choice of Database (ADR)

**Context and Problem Statement**

The CMS requires persistent storage for users, companies, complaints, roles, and complaint status history. The database must support relational data, enforce data integrity, and integrate well with the chosen backend framework.

**Decision Drivers**

Data Integrity: Strong support for relationships and constraints

Query Flexibility: Efficient querying for complaint tracking and reporting

Reliability: Stable and widely supported technology

Ease of Development: Simple setup with good tooling support

### Considered Options

 - Relational Database (MySQL)

 - NoSQL Database (MongoDB)

 - In-Memory Database (H2)

### Decision Outcome

A relational database (MySQL) was selected. The system relies on clearly defined relationships between entities such as users, companies, complaints, and feedback, which are naturally modelled using relational tables. MySQL provides strong data consistency, referential integrity through foreign keys, and reliable query performance. Its ease of setup and widespread support make it well suited for both the proof-of-concept and potential future extension.

**Rationale**

MySQL provides strong relational support, is widely used in industry, and integrates seamlessly with Spring Boot through Spring Data JPA and Hibernate. It is well-suited for managing structured complaint and user data in a proof-of-concept environment. 

**Consequences**

**Positive**

 - Strong data consistency and integrity

 - Clear modelling of relationships using foreign keys

 - Good performance for transactional workloads.

**Negative**

 -  Requires schema change for future data model updates

 - Less flexible than schema-less NoSQL solutions

**Rejected Alternatives**

MongoDB: Offers flexible schemas but provides weaker support for complex relational constraints required by the system.

H2: Useful for lightweight testing but not suitable for realistic, persistent data storage.

**Relationship to System Design**
This decision is reflected in the ER diagram and JPA entity mappings used in the application.