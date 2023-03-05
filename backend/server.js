import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { load } from 'cheerio';

import pgPromise from 'pg-promise';
import fetch from 'node-fetch';

const pgp = pgPromise({ /* Initialization Options */
});

const db = pgp(process.env.DB_URL)

const w = {
  id: "bdfa0697-9772-4cbf-8a93-367179bb6025",
  user: "872fd941-af4e-4f8d-8a75-ee25347b1038",
  data: "6",
  selector: "#repo-stars-counter-star",
  cron: "0 * * * *",
  lastupdated: BigInt("1677927208200"),
  url: "https://github.com/Roshan-R/termv-rs",
  name: "Termv Stars"
}

function api(url) {
  console.log("Url : ", url)
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.text()
  })
}

async function getData(url, selector, type) {
  const data = await api(url);
  const $ = load(data);
  if (type === "html")
    return $(selector).html();
  else
    return $(selector).text();
}

import { schedule } from 'node-cron';

async function saveChangetoDb(w, new_data) { // update workflows set data = 7 where id = 'bdfa0697-9772-4cbf-8a93-367179bb6025'

  db.none('UPDATE Workflows set data = $1, lastupdated = $2 where id = $3', [new_data, Date.now(), w.id,]).then(() => {
    console.log("Successfully changed data")
  }).catch((error) => {
    console.log("Error happedn dude", error)
  });
}


async function checkChange(w) {
  const site_data = await getData(w.url, w.selector, "text");
  try {
    const d = await db.any('SELECT data FROM Workflows where id = $1', w.id)
    const db_data = d[0].data;

    if (db_data === site_data) {
      console.log("they are the same");
    } else {
      saveChangetoDb(w, site_data);
    }

  } catch (error) {
    console.log(error)
  }
}


function setCron(w) {

  schedule(w.cron, async () => {
    await checkChange(w)
    // console.log('running a task every minute');
  });
}

import cors from "cors";
import express, { json as _json } from "express";
const app = express();
// const port = parseInt(process.env.PORT || "8080");
const port = 8080;
app.use(_json());
app.use(cors({ origin: '*' }));


console.log("DB url: ", process.env.DB_URL)

app.post("/api", async (req, res) => {
  console.log("Got a reqeust with body: ", req.body)
  const json = req.body;
  const text = await getData(json['url'], json['selector'], json['type']);
  const data = {
    d: text
  }
  res.send(data);
});

app.get('/', (req, res) => {
  res.send("GET request works")
})

app.post("/getData", async (req, res) => {
  const id = req.body.id;
  console.log("Got a reqeust with body: ", req.body);
  db.any('SELECT * FROM Workflows where "user" = $1', id).then(function (data) {
    console.log(data)
    res.send(data);;
  }).catch(function (error) {
    console.log(error)
  });
});

app.post("/saveData", async (req, res) => {
  console.log("Got a reqeust with body: ", req.body);
  const json = req.body;
  console.log(json);
  db.none('INSERT INTO Workflows VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [
    json['id'],
    json['user'],
    json['data'],
    json['selector'],
    json['cron'],
    json['lastupdated'],
    json['url'],
    json['name'],
  ]).then(() => {
    const data = {
      worked: true
    }
    res.send(data);
  }).catch((error) => {
    const data = {
      worked: false
    }
    res.send(data);
    console.log("Error happedn dude", error)
  });
});

const host = '0.0.0.0';

app.listen(port, host, () => console.log("Listening on", port));

