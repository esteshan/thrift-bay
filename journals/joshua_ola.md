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


### Journal Entry - 10/10/2023

---

#### Task:

- Added authenticator requirements on all of the endpoints that need it


#### Objective:

Added requirement in all the endpoints that you need to have an access token in order to be able to get or fetch data from the endpoints.

---

#### Steps Taken:

imported authenticator into the routers directory for `categories.py`, `checkout.py`, `products.py`, `reviews.py`, and added a requirement for access token specifically on POST, PUT, DELETE endpoints.

---

#### Key Code Snippets:
Code snippets are in the files mentioned above

---

#### Challenges:
- Ensuring that the API endpoints work as intended.
- Made sure that each of the endpoints that need a token to get data works.
- Making sure that I have a good and better understanding of how React and Redux work

---

#### Solutions:



---

#### Lessons Learned:
- Deeper understanding of how authentication works for the backend.

---


### Journal Entry - 10/11/2023

-- Just gonna keep it short from this point forward

- Worked on adding auth headers to all of our backend endpoints to protect them and ensure that only users with an access token can access them
- Also fixed post endpoint for users that's preventing users from being created in the endpoint.
- Also started to implement a detailed view for each individual products in the frontend.

### Journal Entry - 10/12/2023

- just kept on working detailed products view for the frontend and making sure everything renders right and working also still learning how i would convert everything to redux/ rtk query.

### Journal Entry - 10/13/2023

- Faced a bug with git that made my branch for detailed products for frontend not pushable so had to delete and recreate another branch for it but it all worked out because now i would be able to rewrite everything from scratch and fully implement redux and rtk onto the page.

### Journal Entry - 10/16/2023

- For this day I just polished and try to figure out and fix all of our endpoints that were buggy.

### Journal Entry - 10/17/2023

- For this day I finally finished and got rid most of the bugs that we had for our backend endpoints also because we keep on changing our minds on what we have for our endpoints so I just keep changing them because it really wasnt that much of a hassle to me.
- Also created a issue to create a unit test for products and have that done by end of day.
- Finished my detail page as well with fully functional redux and rtk query implemented on it.

### Journal Entry - 10/18/2023

- For this day I had a bug with the product detail page so I created an issue to go and try to fix it which i did and when that was finished i went ahead and started styling with the most basic style for that page of mine.

### Journal Entry - 10/19/2023

- For this day I had to mess with my child(the migrations table) to add a unique field to username and email because we've discussed as a group that we need to make those 2 fields unique so we don't have duplicates when users are creating accounts in our Web server.
- Also went back into my unit test for products because I realized that I may have made a mistake at first and kinda cheated through making it pass but after this I did it properly and it was passing it the right way(because before i was accessing the database which turns out we're not supposed to when we create those unit tests.)

### Journal Entry - 10/23/2023

- For this day I went and tackled deployment which kicked my butt and i basically just spent the whole day trying to figure out how I would make this work and get our database, backend, and frontend deployed.

### Journal Entry - 10/24/2023

- This day was a lot so get ready whoever's going through and reading my Journal, Okay so basically I was still trying to figure out how deployment works and I had to finish this today because Jordan mentioned the other day that we need to get everything deployed by end of day yesterday but I was struggling on figuring out how to. I also fixed the database because we've made another decision as a group to change something in the product field because before when creating those tables I had user_id written as user_product as a field and it was confusing to my groupmates so i went ahead and changed that to user_id. Then I went back to focusing on deploying everything and I was finally able to deploy our database YAYYY but I ran into a bug that I was able to quickly solve by looking at HMU because a lot of my peers were also having a lot of struggle with deploying everything Thank god for HMU. But I was also able to deploy the Frontend by the end of today and we finally had our project deployed on a web server woohoooo (with some bugs of course hehe).

### Journal Entry - 10/25/2023

- For today since I finally finished deploying our project, I went ahead and created another frontend page because I wanted to tackle how mutations work in redux and I created the checkout form which checksout a specific product from the product detail page to be bought( we haven't added a payment system yet but that's most likely a stretch goal thats why ) But i was able to work on this and by the end of the day I was just trying to figure out how i would implement something that updates the sold status of a product from false to true and i couldn't really figure out how I would do that with a slice so i just went old school and did what we learned from last mod with just a regular function hehe.

### Journal Entry - 10/26/2023

- 2nd to last day so on this day I finally finished my checkout page and styled it as well and thats mostly what consisted of today which is just styling and bug fixing and trying to help my groupmates get their work done. Also tried cleaning up our code which was a LOT but adjustments and styling were my main focus and bug fixing of course because (not to sound egotistic hehe) i'm pretty gifted with debugging hehe.

### Journal Entry - 10/27/2023

- The last and final day of the project i can feel a tear coming out my eyes but today just like yesterday is mostly bug fixing and getting our deployed server polished and ready for presentations. Also updating our read me today and working on our individual journals which is quite fun and this is my goodbye basically to whoever is reading this My group and I have come a long way and I am very proud of us and hopefully all of our hardwork will come to fruition I have high hopes for everyone <3. But to whoevers reading my journal and made it this far, thank you for reading my journal and read through my struggles which i know most of em were probably simple to solve hehehe but we've made it and I wish everyone good luck and thats including yourself whoever is reading this <3.
