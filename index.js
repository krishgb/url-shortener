import express, { json } from "express"
import mongo from 'mongoose'
import shortUrl from './models/short.js'
import { v4 } from 'uuid'

mongo.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: !0, useUnifiedTopology: true
})

const port = process.env.PORT || 8000
const app = express()

app.use(express.static("public"))
app.use(express.json())


app.get('/urls', async (req, res) => {
    const urls = await shortUrl.find()
    // await shortUrl.deleteMany({})
    res.send({ urls })
})

app.get('/:id', async (req, res) => {
    const url = await shortUrl.findOne({ short: req.params.id })
    if (!url) return res.sendStatus(404)
    res.redirect(url.full)
})

app.post("/addurl", async (req, res) => {
    const url = req.body.url
    const sliced = v4().slice(0, 5)
    let [flag, short] = [!1, null]
    const urls = await shortUrl.find()

    for (let i of urls) {
        if (i.full === url) {
            flag = !0
            short = i.short
        }
    }
    if (!flag) await shortUrl.create({ full: url, short: sliced })

    res.send({ shorten: short ? short : sliced })
})

app.listen(port, console.log("Server listening on port", port))