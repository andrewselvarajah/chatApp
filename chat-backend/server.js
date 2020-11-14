//imports
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';



//appconfig

dotenv.config();
const app = express();
const port = process.env.PORT || 49152;

const pusher = new Pusher({
  appId: "1099971",
  key: process.env.PUSHER_KEY,
  secret: "49a5fa09e5c3db6bafaa",
  cluster: "us2",
  useTLS: true
});



//middleware
app.use(express.json());
app.use(cors());




//socket.io



//DB config
const db_url = "mongodb+srv://andrew:7LtPLOkbLXMnzdYy@cluster0.nnbgi.mongodb.net/chatapp?retryWrites=true&w=majority";
mongoose.connect(db_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () =>{
  console.log('DB connected');


  //check if the database has changed
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on('change', (change) =>{
    console.log(change); 
    //PUSHER checks if a message has been inserted to the database and 
    if (change.operationType === 'insert'){
      const messageDetails = change.fullDocument;
      //console.log("check insert");
      pusher.trigger('messages', 'inserted',
        {
          name:messageDetails.name,
          message:messageDetails.message,
          timestamp: messageDetails.timestamp, 
          received: messageDetails.received,
        }
      );
    }
    else{
      console.log("error triggering Pusher");
    }
  });
});






// api routes

//gets message from db
app.get('/messages/sync', (req,res) =>{
  Messages.find((err, data) => {
    if(err){
      res.status(500).send(err)
    }
    else{
      res.status(200).send(data)
    }
  });
});


//posts a message to db
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