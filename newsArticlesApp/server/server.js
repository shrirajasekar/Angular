import express from 'express';
import bodyParser from 'body-parser';
// Set up the express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var fs = require('fs');

app.get('/getRank', (req, res, next) => {
    console.log("GetRank Called");
        var options = {
            root: '../src/assets/',
            dotfiles: 'deny',
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true
            }
          };        
          var fileName = 'ranks.json';
          res.sendFile(fileName, options, function (err) {
            if (err) {
              next(err);
            } else {
              console.log('Sent:', fileName);
            }
          });
});

app.post('/setRank', (req, res) => {
    console.log("SetRank Called");
    if(!req.body) {
      return res.status(400).send({
        success: 'false',
        message: 'Invalid input'
      });
    } 
    var data = "{ \n \"article1\": \""+req.body.article1+"\" , \n \"article2\": \""+req.body.article2+"\" , \n \"article3\": \""+req.body.article3+"\" , \n \"article4\": \""+req.body.article4+"\" , \n \"article5\": \""+req.body.article5+"\"  \n }";
    fs.writeFile('../src/assets/ranks.json', data, function(err){
        if (err) console.log(err);
    });
  
   return res.status(201).send({
     success: 'true',
     message: req.body.article1
   })
  });


const PORT = 4500;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});