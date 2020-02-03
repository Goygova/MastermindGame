To Run this project you need to have `npm` installed on your computer.
Go to https://nodejs.org/en/download/ to install `Node` which includes `npm`.

Once you have `npm` installed on your computer you need to run `npm install` in the root directory
to install all the dependencies of the application.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

# About the project

This is an implementation of the game `Masterminds`.

## Features

- Users are given 10 attempts to guess the combination that is hidden on top of the page.
- Combination contains only numbers from 0 to 7.
- Validation will check if user entered something other than numbers from 0 to 7.
- Winning combination can have duplicated numbers.
- After each attemp computer will give a hint of whether user guessed any numbers and/or they were in correct spot (Hover over dots and it will display tooltips with an explanation)
- If user did not guess the combination in 10 atttempts, then user looses.
- At any point of time user can reset the game and start over.
- User can get as many as 100 points of score, based on amount of attemps made.
- Remaining attempts are displayed.
