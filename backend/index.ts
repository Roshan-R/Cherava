import * as cheerio from 'cheerio';

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

const cors = require("cors");
const express = require("express");
const app = express(); const port = 3000;
app.use(express.json());
app.use(cors({ origin: '*' }));

const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL)

app.post("/api", async (req: any, res: any) => {
  console.log("Got a reqeust with body: ", req.body)
  const json: ReqData = req.body;
  const text = await getData(json.url, json.selector, DataType.Text);
  const data = {
    d: text
  }
  res.send(data);
});

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
