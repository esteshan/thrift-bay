# Module3 Project Gamma

## Welcome to ThriftBay - Your Ultimate Destination for Affordable Fashion!

thriftBay is your go-to online marketplace for affordable, stylish, and sustainable fashion. Our web application is designed to provide a seamless and enjoyable shopping experience, much like eBay, but with a distinct focus on budget-friendly clothing. Whether you're on the hunt for affordable pants, shoes, shirts, hats, or any other wearable fashion items, ThriftBay has got you covered.

## What makes thriftBay Unique

thriftBay stands out from the crowd by prioritizing affordability without compromising quality or style. We understand the importance of staying on budget while looking your best. Our platform is your gateway to a vast and diverse selection of gently-used, vintage, and brand-new clothing items that won't break the bank. Whether you're a fashion enthusiast or simply looking for everyday wear, ThriftBay's unique offerings ensure you'll find something that suits your style.

## Project URLS

#### Frontend Deployment URL:

https://thriftbay.gitlab.io/thrift-bay/

#### Gitlab project URL:

https://gitlab.com/thriftbay/thrift-bay

#### Cirrus URL:

https://jun-3-pt-thriftbayapi.mod3projects.com/

## How to Initiate thriftBay on your Local computer.

1. In your terminal and specific folder type this command:

```
git clone https://gitlab.com/thriftbay/thrift-bay.git
```

2. Go into the project folder:

```
cd thrift-bay
```

3.  Ensure that Docker is running and in your terminal type these docker commands:

```
docker compose build
```
- This command will create the docker containers and images.

```
docker compose up
```
- And this command will run all the Docker containers defined in the yaml.

4. Once the containers are up open up the browser and go to http://localhost:8000/docs to access and view all of the endpoints we've created

5. To access the front end you would open the browser and go to http://localhost:3000/ instead to view the pages we've created.

## Diagrams









## thriftBay Overview

All of our work will be find in the thrift-bay folder. Inside of this folder you will then find:

- migrations
  - This folder holds our tables where we defined the properties needed for our models and this would be in file called `001_create_tables.py`
- queries
  - This is where we wrote and defined all of our pydantic models to be used and interact with in our endpoints.
- routers
  - This is where we connect the endpoints so that they're usable in the backend to fetch, post, update, delete data in our backend.
- tests
  - This is where all our unit tests are resting and waiting to go to war whenever they're sent to test backend endpoints to make sure everything is working.
- `authenticator.py`
  - This file has all the code that we need to help our auth to create accounts, login, and logout.
- `main.py`
  - Basically the settings.py and connects all of our existing endpoints into fastAPI.
- `requirements.txt`
  - This is where we write every external functions that we'll need for the porject that docker installs for us by specifying and running the txt file.
