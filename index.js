const express = require("express");
const app = express();
const hbs = require("hbs");

const path = require("path");
const axios = require("axios");
const { log } = require("console");

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "/views/partials"));

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", async (req, res) => {
  try{
  const response = await axios.get("https://fakestoreapi.com/products?limit=6");
  const details = response.data;
  
  res.render("index", { details })
  }
  catch(err)
  {
    res.send("errror")
  }
});

app.get('/:id',async(req,res)=>{
  
    const params=parseInt(req.params['id']);
    const arr=[];
    for(let i=0;i<5;i++)
    {
      const {data}=await axios.get(`https://fakestoreapi.com/products/${params+i}`);
      
       if(data==='')return res.json(arr);
      arr.push(data);

    }

    return res.json(arr)

})
app.listen(5000, () => {
  console.log("server is running");
});
