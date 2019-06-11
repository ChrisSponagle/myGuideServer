const express = require('express');
const bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path')
const app = express();

const config = {
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'ba3c7f2d7f69c3',
    password: '6266e80f',
    database: 'heroku_d4c3cc5ae4125e1',
};

const pool = mysql.createPool(config);

// Added & configured middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

app.post('/siteinfo', (req, res) => {

    var id = req.body.id
    var lang = req.body.lang

    //Set Language
    if (lang === 'english') {
        var langTable = 'english_table'
    }
    else if (lang === 'french') {
        var langTable = 'french_table'
    }
    else if (lang === 'korean') {
        var langTable = 'korean_table'
    }
    else if (lang === 'chinese') {
        var langTable = 'chinese_table'
    }

    var getSiteInfo = "SELECT * FROM " + langTable + " WHERE id = " + id

    pool.query(getSiteInfo, (error, result) => {
        if (error) throw error;
        var staticPhoto = './static/photos/' + result[0].photo
        // var staticAudio = './static/audio/' + result.audio
        // result.photo = staticPhoto
        // result.audio = staticAudio
        console.log("Site Info:", staticPhoto)
        res.send(staticPhoto);
            
    });
});

  // Route for incoming sitemap post
app.post('/sitemap', (req, res) => {

    var siteid = req.body.siteid
    var lang = req.body.lang

    //Set Language
    if (lang === 'english') {
        var langTable = 'english_table'
    }
    else if (lang === 'french') {
        var langTable = 'french_table'
    }
    else if (lang === 'korean') {
        var langTable = 'korean_table'
    }
    else if (lang === 'chinese') {
        var langTable = 'chinese_table'
    }

    var getSiteMap = "SELECT `name`, `latitude`, `longitude`, `photo` FROM " + langTable + " WHERE siteid = " + siteid

    pool.query(getSiteMap, (error, result) => {
        if (error) throw error;

        console.log("Site Map:", result)
        res.send(result);
            
    });
});

  // Route for incoming nearby post
app.post('/nearby', (req, res) => {

    var latitude = req.body.latitude
    var longitude = req.body.longitude
    var lang = req.body.lang
    //Set latitude and longitude range
    var myLatTop = parseFloat(latitude)+0.1
    var myLatBottom =  parseFloat(latitude)-0.1
    var myLongTop = parseFloat(longitude)+0.1
    var myLongBottom = parseFloat(longitude)-0.1
    console.log("MATH", myLatTop, "MORE MATH", myLongBottom )
    //Set Language
    if (lang === 'english') {
        var langTable = 'english_table'
    }
    else if (lang === 'french') {
        var langTable = 'french_table'
    }
    else if (lang === 'korean') {
        var langTable = 'korean_table'
    }
    else if (lang === 'chinese') {
        var langTable = 'chinese_table'
    }

    var getNearby = "SELECT `site`, `latitude`, `longitude`, `photo`, `siteid` FROM " + langTable + " WHERE latitude BETWEEN " + myLatBottom + " AND " + myLatTop + " AND longitude BETWEEN " + myLongBottom + " AND " + myLongTop

    pool.query(getNearby, (error, result) => {
        if (error) throw error;

        console.log("Nearby:", result)
        res.send(result);
            
    });
});

  // Route for incoming search post
  app.post('/search', (req, res) => {

    var site = req.body.site
    var lang = req.body.lang

    //Set Language
    if (lang === 'english') {
        var langTable = 'english_table'
    }
    else if (lang === 'french') {
        var langTable = 'french_table'
    }
    else if (lang === 'korean') {
        var langTable = 'korean_table'
    }
    else if (lang === 'chinese') {
        var langTable = 'chinese_table'
    }
    var getSearch = "SELECT `site`, `photo`, `siteid` FROM " + langTable + " WHERE site='" + site + "' AND siteintro = true"

    pool.query(getSearch, (error, result) => {
        if (error) throw error;

        console.log("Site Info:", result)
        res.send(result);
            
    });
});

  // Route for incoming download post
  app.post('/download', (req, res) => {

    var siteid = req.body.siteid
    var lang = req.body.lang

    //Set Language
    if (lang === 'english') {
        var langTable = 'english_table'
    }
    else if (lang === 'french') {
        var langTable = 'french_table'
    }
    else if (lang === 'korean') {
        var langTable = 'korean_table'
    }
    else if (lang === 'chinese') {
        var langTable = 'chinese_table'
    }

    var getSiteInfo = "SELECT * FROM " + langTable + " WHERE siteid = " + siteid

    pool.query(getSiteInfo, (error, result) => {
        if (error) throw error;

        console.log("Site Info:", result)
        res.send(result);
            
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on localhost:3000')
})