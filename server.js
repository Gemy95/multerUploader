var express = require ("express");
var app = express();

var cors = require ("cors");
var bodyParser = require ("body-parser");
const multer = require('multer');


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(cors('*'));


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + '-' + Date.now()+'.'+file.originalname.split('.')[1])
    }
  })
   
var upload = multer({ storage: storage });


app.get("/uploader",(req,res)=>{
    res.sendFile (__dirname+'/views/uploader.html')
})


app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file)
    
  })


//Uploading multiple files
app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const error = new Error('Please choose files')
      error.httpStatusCode = 400
      return next(error)
    }
   
      res.send(files)
    
  })  

app.listen("4030",()=>{
    console.log("server is listening on port 4030")
})