# TechNova Enterprise Java Backend (Spring Boot 3)

Enterprise REST API service for **TechNova Learning Hub** built with **Java 21 & Spring Boot 3**.

## Architecture & Features
- **Dual Authentication**: Enforces Email and Phone validation in `AuthController.java`.
- **Spring Web REST Controllers**: Modular course queries and progress endpoints in `CourseController.java`.
- **Relational JPA Persistence**: Mapped to PostgreSQL/MySQL relational tables using `User.java` and `Course.java`.

## Setup & Running with Maven

1. **Prerequisites**:
   - Java 21+ JDK installed
   - Maven 3.9+ installed

2. **Build and package**:
   ```bash
   mvn clean package
   ```

3. **Run the Spring Boot application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Verify Endpoint**:
   Open browser at: `http://localhost:8080/api/v1/courses`
