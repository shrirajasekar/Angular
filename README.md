# NewsApplication

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Steps to run the application
1. Download the application source code from git
2. Open command prompt / terminal and navigate to newsArticlesApp folder
3. Install necessary node_modules to run the application by running `npm install` command in the terminal
4. Start the UI server using `ng serve` command
5. Now, start the express server by following the below steps
6. Open a new terminal / command prompt and navigate to newsArticlesApp/server folder and run `npm start` command. 
   It should start the server in port 4500
7. The ranks will be saved in newsArticlesApp/src/assets/ranks.json
8. The articles data is pulled from newsArticlesApp/src/assets/ and a dynamic HTML is created

## UI server

Run `ng serve` for UI server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Requirements: 
*node_modules
*bootsrap
*jQuery

## Express server serving in port 4500 (for GET and POST)

Navigate to server folder and run `npm start` for express server. The app handles get and post requests via `http://localhost:4500/getRank`
`http://localhost:4500/setRank` respectively.


Requirements:
*node.js
*Express 
*Babel
(See package.json for more information)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
