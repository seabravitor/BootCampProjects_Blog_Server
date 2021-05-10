const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    title: { 
        type: String,
    },
    metaDescription: {
        type: String,
    },
    keywords: {
        type: String,
    },
    body: {
        type: String,
    },
    writer: {
        type: String,
    },
    createdAt: { 
        type: Date,
        default : Date.now() //DOES THAT EVEN EXIST?
    },
    //img: {
    //    type: File, DOES THAT EVEN EXIST?
    //}
});

module.exports =  mongoose.model('postdbs', postSchema); // DEFINE THE NAME OF THE COLLECTION INSIDE DB