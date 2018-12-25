# dataTable

### Deployed app:

https://cryptic-savannah-27358.herokuapp.com/

## Approach with Timeline

### Day 1

* Dec - 11 / 1 Hour
* Solved initial puzzles
* Create a Vue CLI project

### Day 2

* Dec - 15 / 3-4 Hours
* Identified npm package for csv read/write
* Setup node server and API for csv read/write
* Setup basic table component with data display

### Day 3

* Dec - 16 / 3 Hours
* Setup a loader component
* Add base styles to the project
* Add styles to the table and loader components
* Add sort functionality to the tables

### Day 4

* Dec - 17 / 2-3 Hours
* Setup a button component 
* Setup a Payment page component
* Add edit functionality for Description
* Add more styles as needed

### Day 5

* Dec - 23 / 4 Hours
* Setup header component & placeholder page links in header
* Added csv write on saving of edited description
* Fix more styling and alignments
* Added tooltips
* Connect to Heroku and setup deploy

### Day 6

* Dec - 24 / 2-3 Hours
* Added tests for base component
* Fixed component issues found with tests
* Fixes styles
* Redeploy

## Follow-up Questions:

1. How long did you spend on the test? Would you do anything differently if you had more time?
  * Timeline - given above as part of approach. Would have added search functionality including selection of rows.

2. In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
  * Loader component - would add more placeholder types like line and boxes
  * Datatable component - selection capability to the table
  * New request/promise component - Currently in payment component have added conditional sections based off of data status such as no data, error, resolved etc. Would extract that to a separate reusable component with slots

3. What is one CSS property that you recently learned about that helped you solve a problem?
  * Used an animation example for loader starting to learn more on that
  * Flex box align, justify properties - though i have been using it for a while still continuing to learn on that

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
