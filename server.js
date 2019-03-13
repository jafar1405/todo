const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json())

mongoose.connect(`mongodb://localhost:27017/todo`)
.then(()=>{
    console.log(`MongoDB connected...`)
})

const todoSchema = new mongoose.Schema({
    item:String
})

const Todo = mongoose.model('Todo',todoSchema);

//GET all documents
app.get('/api/todos',(req,res)=>{
    Todo.find((err,doc)=>{
        if(err) throw err
        res.status(200).send(doc)
    })
})

//GET one document
app.get('/api/todo/:id',(req,res)=>{
    const id = req.params.id
    Todo.findById(id,(err,doc)=>{
        if(err) throw err
        res.status(200).send(doc)
    })
})

// CREATE new document
app.post('/api/todo/:item',(req,res)=>{
    const item = req.params.item
    const todo = new Todo({
        item
    });

    todo.save((err,doc)=>{
        if(err) throw err;
        res.status(200).send(doc)
    })
})


//UPDATE item
app.post('/api/todo/update/:id/:item',(req,res)=>{
    const id = req.params.id
    const item = req.params.item
    Todo.findById(id, (err,doc)=>{
        if(err) throw err
        doc.item =item
        doc.save(()=>{
            res.status(200).send(doc)
        })
        
    })
})


//Delete Item
app.post('/api/todo/delete/:id',(req,res)=>{
    const id = req.params.id
    Todo.findByIdAndDelete(id,(err,doc)=>{
        if(err) throw err
        res.status(200).send(doc)
    })
})

app.get('/',(req,res)=>{
    res.send("Hello world!")
})

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server running in ${port}`);
})