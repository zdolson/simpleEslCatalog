
## Notes

  

Currently deployed on Vercel at [https://simple-esl-catalog.vercel.app/](https://simple-esl-catalog.vercel.app/)

  

Notable quirk: the totalCount state value is rendered very briefly with a stale value during new filter search.

  

## Requirements

  

* Node v14

* Npm v7

  

## Instructions

  

First, be sure to install dependencies with `npm i`.

  

Application should be visible at [http://localhost:3000](http://localhost:3000) in your browser.

  

To run the development server: `npm run dev`

  

To build the application: `npm run build`

  

To start the application in production mode: `npm run start`

  

## Current scope of the project

  

* Fetches and displays basic trading card information in a grid format

* Filtering only on card name

* Infinite scrolling

* Skeleton loading state during api calls

* Static generation (though only home page and default 404 page exist)

* No way to view greater information about each card

* No testing set up

* No CI/CD set up

  

## Potential future features

  

* Enable greater filter options over more fields supported by the api

	* Refactor Catalog page UI to support increased options

	* Option to toggle how many cards are fetched in a request

* Create catch-all route with dynamic static generation (via NextJs) for individual cards.

	* Create links to these from the Catalog component.

* Establish testing and CI/CD pipeline