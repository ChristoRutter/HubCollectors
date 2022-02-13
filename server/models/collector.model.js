const mongoose = require("mongoose");


const CollectorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "A name is required"]
    },
    image:{
        type: String,
        required: [true, "Picture is needed"]
    },
    description:{
        type: String,
        required: [true, "Describe your item"]
    }


}, {timestamps: true})

const Collector = mongoose.model("Collector", CollectorSchema);



module.exports = Collector;