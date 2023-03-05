import * as cheerio from 'cheerio';

const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL)

enum DataType {
  Text,
  Audio,
  Video
}

interface ReqData {
  url: string;
  selector: string;
}

interface Workflow {
  id: string,
  user: string,
  data: string,
  selector: string,
  cron: string,
  lastupdated: bigint,
  url: string,
  name: string
}

const w: Workflow = {
  id: "bdfa0697-9772-4cbf-8a93-367179bb6025",
  user: "872fd941-af4e-4f8d-8a75-ee25347b1038",
  data: "6",
  selector: "#repo-stars-counter-star",
  cron: "0 * * * *",
  lastupdated: BigInt("1677927208200"),
  url: "https://github.com/Roshan-R/termv-rs",
  name: "Termv Stars"
}

function api(url: string): Promise<string> {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.text() as Promise<string>
  })
}

async function getData(url: string, selector: string, _type: DataType): Promise<string> {
  const data = await api(url);
  const $ = cheerio.load(data);
  return $(selector).text();
}

const cron = require('node-cron');

async function saveChangetoDb(w: Workflow, new_data: string) {

  // update workflows set data = 7 where id = 'bdfa0697-9772-4cbf-8a93-367179bb6025'

  db.none('UPDATE Workflows set data = $1, lastupdated = $2 where id = $3', [
    new_data,
    Date.now(),
    w.id,
  ]).then(() => {
    console.log("Successfully changed data")
  }).catch((error: string) => {
    console.log("Error happedn dude", error)
  });
}


async function checkChange(w: Workflow) {
  const site_data = await getData(w.url, w.selector, DataType.Text);
  try {
    const d = await db.any('SELECT data FROM Workflows where id = $1', w.id)
    const db_data = d[0].data;

    if (db_data === site_data) {
      console.log("they are the same");
    }
    else {
      saveChangetoDb(w, site_data);
    }

  } catch (error) {
    console.log(error)
  }
}


function setCron(w: Workflow) {

  cron.schedule(w.cron, async () => {
    await checkChange(w)
    // console.log('running a task every minute');
  });
}

const cors = require("cors");
const express = require("express");
const app = express();
// const port = parseInt(process.env.PORT || "8080");
const port = 8080;
app.use(express.json());
app.use(cors({ origin: '*' }));



console.log("DB url: ", process.env.DB_URL)

app.post("/api", async (req: any, res: any) => {
  console.log("Got a reqeust with body: ", req.body)
  const json: ReqData = req.body;
  const text = await getData(json.url, json.selector, DataType.Text);
  const data = {
    d: text
  }
  res.send(data);
});

app.get('/', (req: any, res: any) => {
  res.send("GET request works")
})

app.post("/getData", async (req: any, res: any) => {
  const id = req.body.id; console.log("Got a reqeust with body: ", req.body);
  db.any('SELECT * FROM Workflows where "user" = $1', id).then(function(data: string) {
    console.log(data)
    res.send(data);
    ;
  }).catch(function(error: string) {
    console.log(error)
  });
});

app.post("/saveData", async (req: any, res: any) => {
  console.log("Got a reqeust with body: ", req.body);
  const json: Workflow = req.body;
  console.log(json);
  db.none('INSERT INTO Workflows VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [
    json.id,
    json.user,
    json.data,
    json.selector,
    json.cron,
    json.lastupdated,
    json.url,
    json.name,]).then(() => {
      const data = {
        worked: true
      }
      res.send(data);
    }).catch((error: string) => {
      const data = {
        worked: false
      }
      res.send(data);
      console.log("Error happedn dude", error)
    });
});

app.listen(port, () => console.log("Listening on", port));
