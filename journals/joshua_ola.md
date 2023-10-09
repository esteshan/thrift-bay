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

### Journal Entry - 9/28/2023

---

#### Task:

Created API endpoints for Categories. (POST/GET)
Completed AUTH with everyone in the group.
Fixed our data tables again.


#### Objective:

Create API endpoints that sends a GET request and a POST request to /category
Finish and implement Auth to users
Add created_at field for the tables besides user tables

---

#### Steps Taken:

-Created a categories.py in both routers and queries folder, added some code in there that shows up on the fastAPI server
-We finished our AUTH for users by basically going back and forth thru the documentation and asking for help in helpmeunderstand on how we would have a user_id show up in the response for when we create a user
---

#### Key Code Snippets:
Code snippets are in `api.queries.categories.py` and `api.routers.categories.py`, `authenticator.py`, `api.migrations.001_create_tables.py`, `api.routers.users.py`, `api.queries.users.py`.

---

#### Challenges:
- Ensuring that the API endpoints work as intended.
- We get an access and login token and be able to delete those tokens as well.
- Delete, Create, and view all the existing users in the database.
- Able to view all the categories inside the database in the API.

---

#### Solutions:
We finished our AUTH for users by basically going back and forth thru the documentation and asking for help in helpmeunderstand on how we would have a user_id show up in the response for when we create a user.
Created a categories.py in both routers and queries folder, added some code in there that shows up on the fastAPI server.
Read a lot of documentation and watched a lot of videos about authorization and jwt.


---

#### Lessons Learned:
- Learned how to create API's using FASTAPI and learned that it allows you to create API's much more faster and efficiently.
- Learned a lot more about how API's work and how pydantic models work in fastAPI.
- Got more knowledgeable with JWT.
- Got more used to and familiarized git and how merging and creating issues work.

---


### Journal Entry - 10/09/2023

---

#### Task:

Created POST, PUT, and DELETE endpoints for reviews. (Create/Update/Delete)


#### Objective:

Create three endpoints for our backend API's
Do some research with React and Redux

---

#### Steps Taken:

Created a reviews.py in routers and queries and used FASTAPI to create the API for the create reviews, update reviews, and delete reviews.
Went online and watched some videos about React and React redux as well as making use of the material provided for us in Learn.

---

#### Key Code Snippets:
Code snippets are in `api.queries.reviews.py` and `api.routers.reviews.py`.

---

#### Challenges:
- Ensuring that the API endpoints work as intended.
- Making sure that I have a good and better understanding of how React and Redux work

---

#### Solutions:



---

#### Lessons Learned:
- Deeper understanding of React and Redux toolkit

---
