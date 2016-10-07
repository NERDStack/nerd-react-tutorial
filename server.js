
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config.js');
var Comment = require('./comment.js');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

var comment = new Comment(docDbClient, config.databaseId, config.collectionId);

comment.init();

function getComments(req, res) {

    var self = this;
    
    var querySpec = {
        query: 'SELECT * FROM root r'
    };

    self.find(querySpec, function (err, items) {
        if (err) {
            throw (err);
        }

        if (items === null) {
            items = [];
        }

        res.json(items);
    });
}

app.get('/api/comments', getComments.bind(comment));

app.post('/api/comments', function (req, res) {
    
    var self = this;
    
    var item = {
        author: req.body.author,
        text: req.body.text,
    };

    self.addItem(item, function (err) {
        
        if (err) {
            throw (err);
        }

        var gc = getComments.bind(self);

        gc(req, res);
    });
}.bind(comment));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
