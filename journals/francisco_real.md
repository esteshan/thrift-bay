### Journal Entry - 09/24/2023

---

#### Task:
Set up a Dockerized Project with PostgreSQL

#### Objective:
The aim was to create a multi-container environment with Docker to manage the FastAPI backend, Node.js frontend, and PostgreSQL database services. This is done using `docker-compose` to orchestrate the different containers.

---

#### Steps Taken:

1. **Define Services in `docker-compose.yml`**: Updated the `docker-compose.yml` file to specify how Docker should build and manage our services.

2. **Setup Environment Variables**: Specified necessary environment variables for FastAPI and PostgreSQL to connect and authenticate.

3. **Port Forwarding**: Defined port mappings to expose our FastAPI and PostgreSQL services.

4. **Volumes**: Used Docker volumes to persist data and enable code changes without rebuilding the container.

5. **Testing**: Ran `docker-compose up` to start all services and tested by hitting the FastAPI and Node.js endpoints. Also connected to the PostgreSQL database using Beekeeper Studio.

---

#### Key Code Snippets:
The `docker-compose.yml` was a crucial part of this task. The configurations for the FastAPI, Node.js, and PostgreSQL services were defined here.

---

#### Challenges:

- **Database Connection**: Ensuring that the FastAPI service connects to the PostgreSQL database required precise environment variables.

- **External Volumes**: Initially, an issue arose with the `external: true` flag for volumes, which was solved by removing it for the first run.

---

#### Solutions:

- **Database Connection**: Checked FastAPI logs to verify a successful database connection.

- **External Volumes**: Removed the `external: true` flag for the first run to auto-create the volume.

---

#### Lessons Learned:

- Understanding Docker's role in creating isolated environments for each service (FastAPI, Node.js, PostgreSQL).

- Grasped the importance of `docker-compose` in managing multi-container applications.

- Learned how to debug issues using Docker logs and how to connect to a Dockerized PostgreSQL database using Beekeeper Studio.
