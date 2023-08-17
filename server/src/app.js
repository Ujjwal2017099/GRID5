require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
require('./connection/connection')
const User = require('./models/user')
const Orders = require('./models/orders')
const Cart = require('./models/cart')
const Products = require('./models/products')
const Category = require('./models/category')
const Rating = require('./models/rating')


const corsOptions = {
    origin : "*"
}
app.use(express.json());
app.use(cors(corsOptions));

function VerifyToken(req, res, next) {
    try {
        const token = req.query.token;
        jwt.verify(token, process.env.ACCESS_KEY, async (err, user) => {
            if (err) {
                return res.status(404).send(err.message);
            }

            const r = await User.find({
                Email: user.Email,
                Password: user.Password,
            });
            // console.log(r[0]._id);
            if(r && r.length) {res.userId=r[0]._id ; next();}
            else return res.sendStatus(404);
        });
    } catch (error) {
        return res.status(501).send(error.message);
    }
}

async function GetCart(req,res,next) {
    try {
        const user = await User.find({_id:res.userId});
        const response = [];
        for(let i=0;i<user[0].Cart.length;i++){
            const cart = await Cart.find({ _id: user[0].Cart[i] });
            const obj = {
                ProductId : cart[0].ProductId,
                Quantity : cart[0].Quantity,
                Date : cart[0].Date
            }
            response.push(obj);
            // console.log(cart);
        }

        if(response.length===user[0].Cart.length){
            res.cartData = response;
            next();
        }
        
    } catch (error) {
        return res.sendStatus(501);
    }
}

app.get("/login", async (req, res) => {
    try {
        const r = await User.find({
            Email: req.query.email,
            Password: req.query.password,
        });
        if (r.length) {
            return res.status(201).send(
                jwt.sign(
                    {
                        Email: req.query.email,
                        Password: req.query.password,
                    },
                    process.env.ACCESS_KEY
                )
            );
        }
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

app.post("/signup", async (req, res) => {
    try {
        const user = new User({
            Name: req.body.name,
            Email: req.body.email,
            Password: req.body.password,
            Mobile: req.body.mobile,
        });
        await user.save();
        return res.sendStatus(201);
    } catch (error) {
        return res.status(501).send(error.message);
    }
});

app.get("/search" , async (req,res)=>{
    try {
        // AddJeans();
        Remove();
        res.sendStatus(201);
    } catch (error) {
        
    }
})

app.get("/similar_product" , async (req,res)=>{

})
app.use(VerifyToken);
app.use(GetCart);

app.post("/new_order", VerifyToken, async (req, res) => {
    try {
        // console.log(res.userId);
        const user = await User.find({_id:res.userId});
        if(user[0].Cart.length === 0 ) return res.sendStatus(401);
        const cart = await Cart.find({ UserId: user[0]._id });
        cart.forEach(async(e) => {
            const newOrder = new Orders({
                UserId: res.userId,
                ProductId: e.product,
                Quantity: e.quantity,
            });
            user[0].Orders.push(newOrder._id);
            await newOrder.save();
        });

        await Cart.deleteMany(cart);
        // await Orders.save();
        user[0].Cart=[];
        await user[0].save();

        return res.sendStatus(201);
    } catch (error) {
        return res.status(501).sendStatus(error.message);
    }
});

app.post("/add_to_cart" , VerifyToken , async (req,res)=>{
    try {
        const user = await User.find({_id:res.userId});
        // console.log(user[0]._id);
        req.body.products.forEach(async (e)=>{
            const newCart = new Cart({
                UserId: res.userId,
                ProductId: e.product,
                Quantity: e.quantity,
            });
            user[0].Cart.push(newCart._id);
            await newCart.save();
            
        })
        await user[0].save();

        return res.sendStatus(201);
    } catch (error) {
        return res.status(501).send(error.message);
    }
})

app.get("/profile", VerifyToken, async (req, res) => {
    try {
        const user =await  User.find({_id:res.userId});
        
        const response = {
            Name: user[0].Name,
            Email: user[0].Email,
            Mobile: user[0].Mobile,
            Address: user[0].Address,
            Orders: user[0].Orders,
        };
        return res.status(200).send(response);
    } catch (error) {
        return res.status(501).send(error.message);
    }
});

app.get("/orders",VerifyToken, async (req, res) => {
    try {

    } catch (error) {

    }
});

app.get("/cart",VerifyToken , GetCart , async(req,res)=>{
    try {
        const response = res.cartData ;
        // console.log(response);
        let cnt=0;
        for(let i=0;i<response.length;i++){
            const x = await Products.find({ _id: response[i].ProductId });
            response[i].Name = x[0].Name;
            response[i].Image = x[0].Image;
            response[i].Price = x[0].Price;
            response[i].Brand = x[0].Brand;
            cnt++;
        }
        
        // console.log(response);
        return res.status(200).send(response);
        
    } catch (error) {
        // console.log(error);
        return res.status(501).send(error.message);
    }
})


app.listen(PORT, () => {
    console.log("server started");
});
