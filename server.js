const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use("/assets",express.static("assets"));

mongoose.connect('mongodb://localhost/blog')

app.get('/',async( req,res) =>{

    const articles = await Article.find().sort({
        timestamp:'desc'
    })
    res.render('articles/index', {articles: articles})
}
)
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

console.log("Started on http://localhost:5000")
app.listen(5000)
