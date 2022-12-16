var Router = require('express');
var express = require('express');
var cors = require('cors');
var forum = require('./forum')
const member = require('./member')

var app = express();
var multer = require('multer');

var mysql = require('mysql');

app.use(express.static(__dirname + '/public'));
app.listen('8000');
app.use(cors({}));
app.use(express.json());
app.use("/member", member);
app.use('/',forum )



