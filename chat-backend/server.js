//imports
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";

//appconfig

const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(express.json());



//DB config
const db_url = "mongodb+srv://andrew:7LtPLOkbLXMnzdYy@cluster0.nnbgi.mongodb.net/chatapp?retryWrites=true&w=majority";
mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})


//socket.io


// api routes

app.get("/", (req,res)=>res.status(200).send("hello world"));

app.post('/messages/new', (req,res) =>{
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if(err) {
      res.status(500).send(err)
    }
    else{
      res.status(201).send(data)
    }
  });
}); 


//listener

app.listen(port, () => console.log(`listening on localhost:${port}`));