### Journal Entry - 9/26/2023

---

#### Task:

Created API endpoints for products. (Create/view)


#### Objective:

Create two endpoints for our backend API's

---

#### Steps Taken:

Created a products.py in routers and queries and used FASTAPI to create the API for the list products view and the create products view

---

#### Key Code Snippets:
Code snippets are in `api.queries.products.py` and `api.routers.products.py`.

---

#### Challenges:
- Ensuring that the API endpoints work as intended.

---

#### Solutions:



---

#### Lessons Learned:
- Learned how to create API's using FASTAPI and learned that it allows you to create API's much more faster and efficiently.

---




### Journal Entry - 9/27/2023

---

#### Task:

Created API endpoints for products. (Delete)
Fixed blockers previously had for other endpoints (Create/View)


#### Objective:

Create new endpoint for delete and fix previous endpoints that were not working with the database before.

---

#### Steps Taken:

Fixed my products.py in terms of my create and view endpoints and also created a delete endpoint

---

#### Key Code Snippets:
Code snippets are in `api.queries.products.py` and `api.routers.products.py`.

---

#### Challenges:
- Ensuring that the API endpoints work as intended.

---

#### Solutions:

- Added a UUID auto generator and got it to auto generate a UUID every time a POST request was made.

---

#### Lessons Learned:
- Learned how to create API's using FASTAPI and learned how to add a UUID and attach it to the object each time a POST request is made.

---



### Journal Entry - 9/28/2023

---

#### Task:

Created more API endpoints for products, categories, and checkout.


#### Objective:

Finish the rest of the endpoints a part of our first milestone.

---

#### Steps Taken:

Finished the rest of the endpoints we had decided to make and helped teammates create theirs.

---

#### Key Code Snippets:
Code snippets are in `api.queries.products.py` and `api.routers.products.py`.

---

#### Challenges:
- Ensuring that the API endpoints work as intended.

---

#### Solutions:



---

#### Lessons Learned:
- Learned how to create API's using FASTAPI and learned that it allows you to create API's much more faster and efficiently.
Also better learned how to use the database.

---

### Journal Entry - 10/9/2023 - 10/18/2023

---

#### Task:

- Created and finished the rest of the endpoints we needed, along with some stretch goal endpoints that we may touch upon later in the front end.

- Created the front end auth login and signup page.

- Created a user profile page that lists the user's information, along with the user's products that they have listed.


#### Objective:

Create and finish a working product that can work towards our MVP.

---

#### Steps Taken:

- Finished the rest of the endpoints so that we can use the API's to retrieve data in our front end.

- Created the login page and signup page and worked with front end auth so that a user can create an account, and log into their account with a unique token that is attached to them when they log in.

- Created a profile page that displays a certain user's data, along with the data regarding any product they have listed. In the future, a link will be added to the products to direct them to it. Another stretch goal would be to add reviews to the profile.

---

#### Key Code Snippets:
- Key code snippets are inside of the fastapi backend endpoints, `src.pages.login` and `src.pages.home`, inside of `src.store.userProfileApi.js`, `src.store.productsApi.js`, and `src.components.UserProfile.jsx`
---

#### Challenges:
- Ensuring that the right data is shown within the front end pages, along with ensuring the the back end endpoints work as intended.

---

#### Solutions:



---

#### Lessons Learned:
- Gained proficiency in working with FastAPI and with React. Furthermore, I also learned how to use redux and work with slices, store, and the actual page that I am attempting to render data onto.

---
