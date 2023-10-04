
const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const dataSchema = new Schema({
    end_year:{
        type: Number
    },
    intensity:{
        type:Number
    },
    likelihood:{
        type:Number
    },
    country:{
        type:String
    },
    relevance:{
        type:Number
    },
    region:{
        type:String
    },
    topic:{
        type:String
    },
    sector:{
        type:String
    },
    pestle:{
        type:String
    }
})



module.exports= mongoose.model('countries',dataSchema);