# Cherava

An open source zero code webscraping automation tool. <br />
This system intends to create alert systems for various tasks like university notice boards, ecommerce site price alerts, product alerts, etc.

## Features that work

- Gui based scraper task creation with zero code for any website.
- Users can add workflows and it'll be saved into database based on user session.
- Automation of scraping task with cron job like scheduling.
- Notification system to alert user when the contents of a specific html selector changes over time using email.

## Future proposed features

- Use a preview of website within the ui itself to pick the css selector.
- More notification provider options
- UI based or script engine features to further process the data that was received on scraping.

## Working

- Workflows for scraping automation tasks are created using a browser session as id, future plans are to use proper authentication.
- Cheerio nodejs package is used to run the webscraping tasks, and a preview is generated for the url and css selector specified in the add workflow ui. The css selector needs to be taken from the website using Inspect Element.
- A workflow upon creation is added into the Postgresql database hosted on railway.app along with the notification recipient emails, and the interval for checking the updates on the website.
- Node-cron package is used for scheduling the scraping workflow.
- Nodemailer package then sends the email to the recipients when the workflow detects a change in the css selector's contents in the website vs the contents stored in the database during the first run when the worflow was added.

## Timeline
- Initially the webscraper and the basic ui for adding a workflow was implemented.
- Next the workflow ui was connected to Postgresql db
- Next the Nodemailer notifier module was added
- Next cron job module was added
- Finally all of this was integrate together

## Demo Video

[![](https://img.youtube.com/vi/Eqarz4dFGnU/0.jpg)](https://youtu.be/Eqarz4dFGnU)

## To run locally

Clone the Repo

#### Frontend

```
cd frontend
npm i
npm run dev
```

#### Backend

```
cd backend
npm i
npm run dev
```

#### Env file format for frontend

<img width="402" alt="image" src="https://user-images.githubusercontent.com/55079486/222959773-772e428c-2e0f-4acd-bc5f-07ffe23b689c.png">

#### Env file format for backend


<img width="720" alt="Screenshot 2023-03-05 at 5 44 38 PM" src="https://user-images.githubusercontent.com/55079486/222959847-dfdefb8f-d426-451c-8a0e-071689fb3161.png">
