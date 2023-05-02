# Cherava

An open source, zero-code web scraping automation tool. <br />
Its purpose is to create alert systems for various tasks such as monitoring university notice boards, e-commerce site price alerts, product alerts, and more.

## Features that work

- GUI-based scraper task creation with zero code required for any website.
- Users can add workflows, which are saved into a database based on the user's session.
- Automation of scraping tasks with cron job-like scheduling.
- Notification system that alerts the user when the contents of a specific HTML selector changes over time using email.

## Future proposed features

- Use a preview of the website within the UI itself to pick the CSS selector.
- More notification provider options.
- UI-based or script engine features to further process the data received from scraping.

## How it works

- Workflows for scraping automation tasks are created using a browser session as an ID. Future plans are to use proper authentication.
- The Cheerio Node.js package is used to run the web scraping tasks, and a preview is generated for the URL and CSS selector specified in the add workflow UI. The CSS selector needs to be taken from the website using Inspect Element.
- When a workflow is created, it is added into the PostgreSQL database hosted on Railway.app, along with the notification recipient emails and the interval for checking updates on the website.
- The Node-cron package is used for scheduling the scraping workflow.
- The Nodemailer package then sends an email to the recipients when the workflow detects a change in the CSS selector's contents on the website versus the contents stored in the database during the first run when the workflow was added.

## Timeline
- Initially, the web scraper and the basic UI for adding a workflow were implemented.
- Next, the workflow UI was connected to the PostgreSQL database.
- Next, the Nodemailer notifier module was added.
- Next, the cron job module was added.
- Finally, all of these components were integrated together.

## Demo Video

[![](https://img.youtube.com/vi/Eqarz4dFGnU/0.jpg)](https://youtu.be/Eqarz4dFGnU)

## Built by

<table>
  <tr>

<td align="center"><a href="https://github.com/Roshan-R"><img src="https://avatars.githubusercontent.com/u/43182697?v=4" width="180px;" alt=""/><br /><sub><b>Roshan R Chandar</b></sub></a><br />

  <td align="center"><a href="https://github.com/AJAYK-01"><img src="https://avatars.githubusercontent.com/u/55079486?v=4" width="180px;" alt=""/><br /><sub><b>Ajay Krishna K V</b></sub></a><br />

  <td align="center"><a href="https://github.com/GameGodS3"><img src="https://avatars.githubusercontent.com/u/54617167?v=4" width="180px;" alt=""/><br /><sub><b>Sudev Suresh Sreedevi</b></sub></a><br />

</tr>
</table>

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
