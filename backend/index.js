require("dotenv").config();
const cheerio = require('cheerio');
const { sendMail } = require('./services/mail_service');

var DataType

  ; (function (DataType) {
    DataType[(DataType["Text"] = 0)] = "Text"
    DataType[(DataType["Audio"] = 1)] = "Audio"
    DataType[(DataType["Video"] = 2)] = "Video"
  })(DataType || (DataType = {}))

function api(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.text()
  })
}

async function getData(url, selector, _type) {
  const data = await api(url)
  const $ = cheerio.load(data)
  return $(selector).text()
}

const cors = require("cors")
const express = require("express")
const app = express()
// const port = parseInt(process.env.PORT || "8080");
const port = 3000
app.use(express.json())
app.use(cors({ origin: "*" }))

const pgp = require("pg-promise")()
const db = pgp(process.env.DB_URL)

console.log("DB url: ", process.env.DB_URL)

app.post("/api", async (req, res) => {
  console.log("Got a request with body: ", req.body)
  const json = req.body
  const text = await getData(json.url, json.selector, DataType.Text)
  const data = {
    d: text
  }
  res.send(data)
})

app.get("/", (req, res) => {
  res.send("GET request works")
})

app.post("/getData", async (req, res) => {
  const id = req.body.id
  console.log("Got a request with body: ", req.body)
  db.any('SELECT * FROM Workflows where "user" = $1', id)
    .then(function (data) {
      console.log(data)
      res.send(data)
    })
    .catch(function (error) {
      console.log(error)
    })
})

app.post("/saveData", async (req, res) => {
  console.log("Got a reqeust with body: ", req.body)
  const json = req.body
  console.log(json)
  db.none("INSERT INTO Workflows VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [
    json.id,
    json.user,
    json.data,
    json.selector,
    json.cron,
    json.lastupdated,
    json.url,
    json.name
  ])
    .then(() => {
      const data = {
        worked: true
      }
      res.send(data)
    })
    .catch(error => {
      const data = {
        worked: false
      }
      res.send(data)
      console.log("Error happedn dude", error)
    })
})

app.post("/sendNotification", (req, res) => {
  const json = req.body
  const email = json.email
  const subject = json.subject
  const body = json.body

  sendMail(email, subject, body)
    .then(result => {
      console.log("Sent Mail")
      res.send(result.body)
    })
    .catch(error => {
      console.log("Error: " + error)
    })
})

app.listen(port, () => console.log("Listening on", port))
