# Meteorological Application 
This app allows the user to explore a weather forecast for a specific coordinates, with the feature of autocomplete serach by a city name in Saudi Arabia (preferably run on a desktop).

API used: Meteomatics Weather API


Frameworks used: 
- Django
- React

Database structure:


1- Users Schema, which includes  ('id','name') to store app users. In the meantime, the user id is 3


2- Cities Schema, which includes ('id', 'region_id', 'name_ar','name_en','center_lat','center_lon') to store Saudi Arabia's cities' info retrieved from https://github.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts


3- Coordinates Schema, which includes ('id','user_id','timestamp','lat','lon') that connects every user with their coordinates

## Requirements

install Pipenv using pip:


`pip install pipenv`


activate a new virtual environment:


`pipenv shell`


cd to the 'backend' directory and start up the server:


`python manage.py runserver`


open a new terminal window and navigate to the 'frontend' directory and run the following command


`npm start`


## Screenshots
<img width="939" alt="1" src="https://user-images.githubusercontent.com/80160006/205721668-35d2baeb-6cc2-4700-b7b6-54e6a796776e.png">

<img width="944" alt="2" src="https://user-images.githubusercontent.com/80160006/205720928-7a224ab1-12ae-47a1-ba7d-0819e6236b4c.png">

![chart](https://user-images.githubusercontent.com/80160006/205721163-e964967e-9227-47f7-83bf-d20344969fee.png)


