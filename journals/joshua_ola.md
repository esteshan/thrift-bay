### Journal Entry - 9/27/2023

---

#### Task:

Create Database and initialized tables in the migrations folder, Also created a POST endpoint for categories.


#### Objective:

To have Database ready to be stored data to and have a working endpoint that sends a POST request that stores data into the categories table.

---

#### Steps Taken:

Created a 001_create_tables.py and initialized tables there, such as users, products, categories, etc.
Created a pool.py file that makes a connection to the postgres database
I also completed a working endpoint for categories that sends a post request and returns a response of both success and error.

---

#### Key Code Snippets:
Code snippets are in `api.queries.categories.py` and `api.queries.pool` and `api.migrations.001_create_tables.py`

---

#### Challenges:
- Relating the tables to each other
- Generating a UUID everytime a post request gets sent
- Storing Data in the tables.

---

#### Solutions:

- Basically did a bunch of research on how I would relate the tables to each other and i had a bunch of different changes to it, but i finally got it to work by not making too much references of tables that makes them go back and forth with each other with foreign keys.
- Also rewatched most of the fastAPI videos from learn and it helped me come up with a way to generate a uuid by implementing what was taught in the video and by reading a bunch of documentations about UUID.

---

#### Lessons Learned:
- Learned how to properly create tables and how to properly relate them to each other.
- Learned how to generate a UUID and how to have it returned as a response in the server.
- Also learned how to make a connection to the database and how to use that connection to pull the table out of the database and store data inside it using the pydantic models.

---
