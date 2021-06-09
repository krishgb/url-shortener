import mongo from 'mongoose'
import { v4 } from 'uuid'

const schema = new mongo.Schema({
    full: {
        type: String,
        required: !0
    },

    short: {
        type: String,
        required: !0,
        // default: v4().slice(0, 5)
    }
})

export default mongo.model('ShortUrl', schema)