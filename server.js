require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;
const path = require('path');

const app = express();


// const ClassroomModel = require('./models/Classrooms.js');

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

//db schema
const ClassroommanagementSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    campus:{
        type: String,
        required: true
    },
    building:{
        type: String,
        required: true
    },
    floor:{
        type: Number,
        required: true
    }
});

const ClassroomModel = mongoose.model('classrooms', ClassroommanagementSchema);

app.post('/addclassroom', async (req,res) => { 
    const name = req.body.name;
    const school = req.body.school;
    const campus = req.body.campus;
    const building = req.body.building;
    const floor = req.body.floor;
    
    const classroom = new ClassroomModel({name:name , school:school , campus:campus , building:building , floor:floor});
    await classroom.save();
    res.send(classroom);
});

app.get('/read', async (req, res) => {
    try {
        const result = await ClassroomModel.find({});
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.put('/update', async (req, res) => {

    const newFloor = req.body.newFloor;
    const id = req.body.id;

    try{
        await ClassroomModel.findById(id, (error, classroomToUpdate) => { 
            classroomToUpdate.floor = Number(newFloor);
            classroomToUpdate.save();
        });
    }
    catch(err){
        console.log(err)
    }
    res.send("updated");
});


app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await ClassroomModel.findByIdAndRemove(id).exec()
    res.send("itemdeleted");
})

// production script
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
