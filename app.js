const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://anu:anu1234@ac-uvmkpi4-shard-00-00.ral2pqz.mongodb.net:27017,ac-uvmkpi4-shard-00-01.ral2pqz.mongodb.net:27017,ac-uvmkpi4-shard-00-02.ral2pqz.mongodb.net:27017/volunteerdb?ssl=true&replicaSet=atlas-svce6p-shard-0&authSource=admin&appName=Cluster0")
.then(()=> {
        console.log("mongoose connected");
    })
    .catch((err) => {
        console.log(err)
    }
) 

const volunteer = mongoose.model("Volunteers", new mongoose.Schema(
    {
        volunteerID: String,
        fullName: String,
        email: String,
        phone: String,
        dateOfBirth: String,
        gender: String,
        bloodGroup: String,
        department: String,
        yearOfStudy: String,
        campName: String,
        hoursCompleted: String,
        adress: String,
        unitNumber: String


    }
))

app.post("/add-volunteer", async(req, res) => {
    await volunteer.create(req.body)
    res.json({"status": "success"})
})

app.get("/view-volunteer", async(req, res) => {
    const volunteers = await volunteer.find()
    res.json(volunteers)
})


app.listen(5000, () => {
    console.log("server Started")
})