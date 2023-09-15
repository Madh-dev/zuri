const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./models/person');

require('dotenv').config();
mongoose.connect(process.env.ATLAS_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error:'));
db.once('open',()=>{
    console.log('Connected to MongoDB');
})


// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
app.post('/api',async(req,res)=>{
    try{
        //check if a user with the same name already exists
        const existingUser = await Person.findOne({name: req.body.name});
        if(existingUser){
            return res.status(400).json({error: 'User with the same name already exists'})
        }
        const person = new Person(req.body);
        await person.save();
        res.status(201).json(person);
    }catch(error){
        res.status(400).json({error: error.message})
    }
});

app.get('/api/:user_id', async(req,res)=>{
    const id = req.params.user_id;
    try {
        const person = await Person.findById(id);
        if(person){
            res.status(200).json(person.name);

        }else{
            res.status(400).json({error: 'Person not found'})
        }
    } catch (error) {
        res.status(500).jsonj({error: error.message});
    }
});

app.put('/api/:user_id',async(req,res)=>{
    const id = req.params.user_id;
    try {
        const person = await Person.findByIdAndUpdate(id,req.body,{
            new:true,
        });
        if(person){
            res.status(200).json(person);
        }else{
            res.status(404).json({error: 'Person not found'})
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.delete('/api/:user_id',async(req,res)=>{ 
    const id = req.params.user_id;
    try {
        const result = await Person.findByIdAndDelete(id);
        if(!result){
                 res.status(400).json({error: 'Person not found'})
        }
        res.json({message: 'User deleted successfully'});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`)
})
