# Mini-project-CRUD-app

## Setup Instructions
1. Install Node.js (Versions older than 11 may not work) 
2. Clone the repository to your local environment
3. Go to the root directory of your local repository and use the following commands: `npm run setup` and `npm install`.

## Testing
The testing framework we have set up is [Jest](https://jestjs.io/docs/en/api). Local unit tests (anything ending in test.js) can be run if you use the `npm test` command. To test only the changes you have on your local environment, use `npm test -- -o`.

![webpage view](/readme.img/basic_view.jpg)

## Part 1: Create a CRUD webpage w/ firebase and a pipeline.

#### The website need to have following function:
  - Login and logout
  - Two input tags and ADD to firebase
  - Ajax update a table / Dynamic insert and delete row
  - UPDATE and DELETE each row

#### The pipeline need to test:
  - Automatically trigger when push to github
  - Style enforcing
  - Unit Test

## Part 2: Deploy the webpage. Create API endpoint w/ data sanitization.

#### The website need to have following function:
  - Deploy the website (Maybe use Amazon lambda function or Google Cloud function)
  - Use API endpoint instead of stright update to firebase for data santiization 

#### The pipeline need to test:
 - Auto deploy new version when pass test
 - API test
 - End to end test for website
 - Minification
