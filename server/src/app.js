require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 8000;
require("./connection/connection");
const User = require("./models/user");
const Orders = require("./models/orders");
const Cart = require("./models/cart");
const Products = require("./models/products");
const Category = require("./models/category");
const Rating = require("./models/rating");
const Temporary = require("./models/temporary");
const puppeteer = require("puppeteer");

const corsOptions = {
    origin: "*",
};
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
            if (r && r.length) {
                res.userId = r[0]._id;
                next();
            } else return res.sendStatus(404);
        });
    } catch (error) {
        return res.status(501).send(error.message);
    }
}

async function GetCart(req, res, next) {
    try {
        const user = await User.find({ _id: res.userId });
        const response = [];
        for (let i = 0; i < user[0].Cart.length; i++) {
            const cart = await Cart.find({ _id: user[0].Cart[i] });
            const obj = {
                CartId: cart[0]._id,
                ProductId: cart[0].ProductId,
                Quantity: cart[0].Quantity,
                Date: cart[0].Date,
            };
            response.push(obj);
            // console.log(cart);
        }

        if (response.length === user[0].Cart.length) {
            res.cartData = response;
            next();
        }
    } catch (error) {
        return res.sendStatus(501);
    }
}

async function GetProducts(req, res, next) {
    try {
        const x = req.body.Orders;
        const response = [];
        for (let i = 0; i < x.length; i++) {
            const y = await Orders.find({ _id: x[i] });
            response.push(y[0]);
        }
        if (response.length === x.length) {
            res.Data = response;
            next();
        }
    } catch (error) {
        return res.status(501).send(error.message);
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
});

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
        console.log(error.message);
        return res.status(501).send(error.message);
    }
});

app.get("/similar_product", async (req, res) => {
    try {
        const x = await Products.find({ Category: "64ddfc3ab0ef9123521f8190" });
        const y = await Category.find({ _id: "64ddfc3ab0ef9123521f8190" });
        for (let i = 0; i < x.length; i++) {
            y[0].Products.push(x[i]._id);
            console.log(i);
        }
        await y[0].save();
        res.sendStatus(200);
    } catch (error) {
        res.send(error.message);
    }
});

app.get("/product_details", async (req, res) => {
    try {
        // AddJeans();
        Remove();
        res.sendStatus(201);
    } catch (error) {}
});

app.get("/similar_product", async (req, res) => {});
// app.use(VerifyToken);
// app.use(GetCart);

app.post("/new_order", VerifyToken, async (req, res) => {
    try {
        // console.log(res.userId);
        const user = await User.find({ _id: res.userId });
        if (user[0].Cart.length === 0) return res.sendStatus(401);
        const cart = await Cart.find({ UserId: user[0]._id });
        cart.forEach(async (e) => {
            const newOrder = new Orders({
                UserId: res.userId,
                ProductId: e.ProductId,
                Quantity: e.Quantity,
            });
            user[0].Orders.push(newOrder._id);
            await newOrder.save();
        });

        await Cart.deleteMany({ UserId: user[0]._id });
        // await Orders.save();
        user[0].Cart = [];
        await user[0].save();

        return res.sendStatus(201);
    } catch (error) {
        return res.status(501).sendStatus(error.message);
    }
});

app.post("/add_to_cart", VerifyToken, async (req, res) => {
    try {
        const user = await User.find({ _id: res.userId });
        // console.log(user[0]._id);
        const newCart = new Cart({
            UserId: res.userId,
            ProductId: req.body.product,
        });
        user[0].Cart.push(newCart._id);
        await newCart.save();

        await user[0].save();

        return res.sendStatus(201);
    } catch (error) {
        console.log(error.message);
        return res.status(501).send(error.message);
    }
});

app.post("/search_history", VerifyToken, async (req, res) => {
    try {
        const _id = res.userId;
        const x = await User.find({ _id });
        x[0].Search.push(req.query.search);
        await x[0].save();
        res.sendStatus(201);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

app.get("/profile", VerifyToken, async (req, res) => {
    try {
        const user = await User.find({ _id: res.userId });

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

app.post("/orders", VerifyToken, GetProducts, async (req, res) => {
    try {
        const x = res.Data;
        const response = [];
        for (let i = 0; i < x.length; i++) {
            const y = await Products.find({ _id: x[i].ProductId });
            const r = {
                OrderId: x[i]._id,
                Date: x[i].Date,
                Quantity: x[i].Quantity,
                Total: y[0].Price * x[i].Quantity,
                Image: y[0].Image,
            };
            response.push(r);
        }

        if (response.length === x.length) {
            return res.status(200).send(response);
        }
    } catch (error) {
        // console.log(error.message);
        return res.status(501).send(error.message);
    }
});

app.get("/cart", VerifyToken, GetCart, async (req, res) => {
    try {
        const response = res.cartData;
        // console.log(response);
        let cnt = 0;
        for (let i = 0; i < response.length; i++) {
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
});

app.get("/search_history", VerifyToken, async (req, res) => {
    try {
        const _id = res.userId;
        const x = await User.find({ _id });
        const y = new Set(x[0].Search);
        x[0].Search = Array.from(y);
        if (x[0].Search.length > 5)
            x[0].Search = x[0].Search.slice(x[0].Search.length - 5);
        await x[0].save();
        return res.status(200).send(x[0].Search);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});
app.get("/search", async (req, res) => {
    try {
        const filter = {
            $text: {
                $search: req.query.search,
            },
        };
        const x = await Products.find(filter).limit(20);
        // console.log(x);
        for (let i = 0; i < x.length; i++) {
            x[i].Appearence++;
            await x[i].save();
        }
        res.send(x);
    } catch (error) {
        console.log(error.message);
        res.status(404).send(error.message);
    }
});
app.listen(PORT, () => {
    console.log("server started");
});
