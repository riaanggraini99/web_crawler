var express = require('express');
let axios = require('axios');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var app = express(); 
var port = 8000;
const mongoskin = require('mongoskin');
const dbUrl = 'mongodb://@localhost:27017/express_app';
const db = mongoskin.db(dbUrl);

var url = "https://rezaaditya.com/cara-membuat-blog-pribadi/"

request(url,function(err, resp, body){
    var $ = cheerio.load(body);
    var namaPenulis = $('.theauthor');
    var namaPenulisText = namaPenulis.text();
    
    var judulArticle = $('.single-title');
    var judulArticleText = judulArticle.text();

    var tanggal = $('.thetime');
    var tanggalText = tanggal.text();

    var paragraf = $('.post-single-content');
    var paragrafText = paragraf.text();

    var article = {
        namaPenulis:namaPenulisText,
        judulArticle:judulArticleText,
        tanggal:tanggalText,
        paragraf:paragrafText
    };

    console.log(article);

    const collections = {
        article: db.collection('articles'),
    };
    collections.articles.insert(article);
    

});


app.listen(port);
console.log('server is listening on' + port );
