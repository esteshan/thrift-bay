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



### Journal Entry - 10/19/2023

---

#### Task:

- Create a Unit Test


#### Objective:

Create and finish a working unit test for users.

---

#### Steps Taken:

- Created a unit test for getting users.

---

#### Key Code Snippets:
- Key code snippets are inside of `api.tests.test_get_users.py`
---

#### Challenges:
- Ensuring that the test runs fully and correctly

---

#### Solutions:



---

#### Lessons Learned:
- Learned how to create a unit test

---


### Journal Entry - 10/23/2023 - 10/27/2023

---

#### Task:

- Fully finish profile page
- Fully finish reviews page
- Fully finish home page

#### Objective:

- Fully finish the profile page, which includes a list of all the user's information, along with all the products they have listed. Along with this, the profile includes a reivews section that shows all the reviews the person has and allow users to add a review for that user. The profile page should also have filters to filter which kinds of products the user has listed, along with rendering something when they have no products listed. There is also a sold filter that shows which items the user has sold.
- The reviews page should allow a user to create a review for another user. This also should allow a user to see what reviews have been left for another user.
- The home page should include filters that allows a user to filter out what kind of items they want. This should include categories (such as shirts or pants), along with sizes and any colors they may want to add.
---

#### Steps Taken:

- Created the profile page using the back-end endpoints to gather data of the user along with all the products data. This data was used to list out the user data onto the profile page along with and products that are tied to the user so that it can list any products that they are currently attempting to sell, or any products that they have sold.
- Created the reviews page that allows a rendering of the list views that show what reviews have been left for a certain user. It also allows a user to create a review for another user.
- Created filters on the home product page that allows a user to filter through any type of product they may be searching for. This is done through the filters of sizes, colors and categories.

---

#### Key Code Snippets:
- Key code snippets are inside of `../ghi/src/components/Products.jsx`, `../ghi/src/components/form/reviewsForm.js`, `../ghi/src/components/UserProfile.jsx`, `../ghi/src/store/userProfileApi.js`, `../ghi/src/store/reviewsApi.js`, `../ghi/src/store/productsApi.js`, `../ghi/src/App.js`, and `../ghi/src/store/store.js`
---

#### Challenges:
- Ensuring that each page renders correctly and that each function is added and working correctly

---

#### Solutions:



---

#### Lessons Learned:
- Learned a lot about tailwind and styling as I had to style my pages and get everything in the right place that I wanted it. Learned how to filter certain pieces of data so that I can have the frontend render only certain kinds of data that I wanted it to. This would be things like only items that are sold, or filters of categories, colors, or sizes. Learned how to work with redux better and render pages and my data correctly.

---
