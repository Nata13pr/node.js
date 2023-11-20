const express = require('express');
const users=require('./dataBase/users');
const axios=require('axios')
const app = express();
const fs=require('fs/promises')

//
// app.get('/',async (req,res)=>{
//     console.log(req);
//
//     // res.json('HELLO EXPRESS');
//
// //     res.write('HELLO EXPRESS');
// //     res.write('HELLO EXPRESS');
// //     res.write('HELLO EXPRESS');
// // res.end()
//
//     res.json('NOT FOUND')
//
//     console.log('TEST')
//     // res.end();
// })

//ends points завжди в множині
app.get('/users',(req,res)=>{
    res.json(users)
})

app.get('/users/1',(req,res)=>{
    console.log('Customer want to get user with ID 1');

    res.json(users[1]);
})

//коли ми пишемо в url : ,то node розуміє,що то буде якась змінна-під псевдонімом може бути все,що завгодно.
    //'/users/:userId'- userId=це endpoint



//Create
app.get ('/users/create',(req,res)=>{
users.push({
    name:'TEST',
    age:Math.random()*100,
});

res.status(201).json('Users was created');
})
app.get('/moms',(req,res)=>{
    res.json([{age:35},{age:65},{age:75}])
})

app.get('/users',async(req,res)=>{
    let buffer=await fs.readFile('sdsds');
    res.json(buffer.toString())
})

app.get('/users/:userId/delete',(req,res)=>{
    const userIndex=+req.params.userId;

    if(isNaN(userIndex) || userIndex < 0){
        res.status(400).json('Please enter valid ID');
        return;
    }

    console.log(userIndex);

    console.log(req.params);
    //console.log(req.params-зберігаються всі динамічні значення з url )
    console.log('Customer want to get user with id 1');

    const user=users[userIndex];

    if(!user){
        res.status(404).json(`User with ID ${userIndex} is not found`);
        return;
    }

    res.json(user)
})

app.get('/users/:userId/update',(req,res)=>{
    const userIndex=+req.params.userId;

    if(isNaN(userIndex) || userIndex < 0){
        res.status(400).json('Please enter valid ID');
        return;
    }

    console.log(userIndex);

    console.log(req.params);
    //console.log(req.params-зберігаються всі динамічні значення з url )
    console.log('Customer want to get user with id 1');

    const user=users[userIndex];

    if(!user){
        res.status(404).json(`User with ID ${userIndex} is not found`);
        return;
    }

    res.json(user)
})

app.get('/users/:userId',(req,res)=>{
    const userIndex=+req.params.userId;

    if(isNaN(userIndex) || userIndex < 0){
        res.status(400).json('Please enter valid ID');
        return;
    }

    console.log(userIndex);

    console.log(req.params);
    //console.log(req.params-зберігаються всі динамічні значення з url )
    console.log('Customer want to get user with id 1');

    const user=users[userIndex];

    if(!user){
        res.status(404).json(`User with ID ${userIndex} is not found`);
        return;
    }

    res.json(user)
})

app.get('/',async (req,res)=>{
    console.log(req);

    const resp=await axios.get('https://jsonplaceholder.typicode.com/users');

    res.status(resp.status).json(resp.data);
})

app.listen(5000,()=>{
    console.log('Server listen 5000')
})