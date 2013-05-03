var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.set("test123", {"matt":"what"});

app.listen(process.env.PORT || 3000);