const express = require('express');
const app = express();

const mongoose = require('mongoose');

const ClassroomModel = require('./models/Classrooms.js');


const cors = require('cors');
app.use(cors());

app.use(cors({
    origin: 'http://192.168.0.4:3000' // 允許的來源
}));

const corsOptions = {
    origin: 'http://192.168.0.4:3000',
    optionsSuccessStatus: 200 // 一些舊版瀏覽器 (IE11, 各種SmartTVs) 對 204 有問題
  };
  
app.use(cors(corsOptions));
  

app.use(express.json());

mongoose.connect(
    "mongodb+srv://41171123h:41171123hpassword@classroommanagement.6k7p0ah.mongodb.net/classroommanagement?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    }
);





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
app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
});


// app.listen(3001, () => {
//     console.log("You are connected!");
// });

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
