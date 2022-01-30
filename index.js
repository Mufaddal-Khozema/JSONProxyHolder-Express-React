const express = require('express');
const fetch =  require("node-fetch");
const cors = require('cors');

const app = express();

app.use(cors());

app.get('*', async (req,res)=>{
    const finalPath = req.path;
    const response = await fetch(`https://jsonplaceholder.typicode.com${finalPath}`);
    const json = await response.json();
    res.json(json);
})

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});