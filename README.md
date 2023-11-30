
  

  

# Ticket App 
  

  

## Official Documentation

  

  

  
Documentation Platform  [NodeJs](https://nodejs.org/en/).


Documentation NodeJs Framework  [Express](https://expressjs.com/).


Documentation SQL Database Module  [Knex](https://knexjs.org/).



  
## Requirment
  

#### Install Knex and Knex Command Line Tool

Install  `knex`  **globally**  on your local computer.

>  npm install knex -g

This will allow us to use  `knex`  as a command line tool that helps you create and manage your knex files.


#### Nodemon Global for Development
> npm install nodemon --global
  


## Intallation

  

  

#### Execute in your terminal

  

  

> npm install 

> cp .env.example .env


#### !! Setup your database on .env file !!


Migrate database
> knex migrate:latest 
  

Seed Database
 
> knex seed:run --specific=users.js 

  

  Run Application

> nodemon start      

  

  

open http://localhost:8080 to make sure it's work

  

Enjoy coding

  
 
 


  

  

### Created with ❤️