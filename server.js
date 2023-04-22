const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}));

let task=["sample task"];
let tasklist= new Map(task.map(t=>[t, `<li>${t}</li>`]));

app.get('/',(req,res)=>{
    const taskHtml = Array.from(tasklist.values()).join('');
    res.send(`<html>
    <body>
    <form action="/" method="POST">
    <input name="newtask">
    <button type="submit">ADD</button>
    </form>
    <ul>${taskHtml}</ul>
    </body>
    </html>`)
})
app.post("/",(req,res)=>{
    task.push(req.body.newtask);
    tasklist.set(req.body.newtask, `<li>${req.body.newtask}</li>`);
    res.redirect('/')
})
app.listen(3000,()=>{
    console.log("started");
})
