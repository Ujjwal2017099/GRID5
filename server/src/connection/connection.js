const mongoose = require('mongoose');
// const puppeteer = require('puppeteer');
// const Products = require('../models/products')
// const fs=require('fs')

// const getImage = async (name)=>{
// 	const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();
//   await page.setDefaultNavigationTimeout(0); 
//   const url = "https://www.amazon.in/"
//   await page.goto(url, {
//     waitUntil: "domcontentloaded",
//   });
//    await page.waitForSelector('input[id="twotabsearchtextbox"]', {visible: true});
//    await page.type('input[id="twotabsearchtextbox"]', name);
//    await Promise.all([
//     page.waitForNavigation({waitUntil: "domcontentloaded"}),
//     page.keyboard.press("Enter"),
//   ]);
//   const Images = await page.evaluate(() => {
//      const Shoes = document.querySelectorAll(
//          ".sg-row"
//      );
//      const List = document.querySelectorAll('.a-price');
//      const products = Array.from(Shoes).map((e)=>{
//          try{
//             const Name = e.querySelector(".a-size-medium.a-color-base.a-text-normal").innerText
//             const Image = e.querySelector("img").src;
//             const Price = e.querySelector('.a-price-whole').innerText
//             const Rating = e.querySelector('.a-icon-alt').innerText
//             return {Name,Image,Price,Brand : "Vivo",Rating}
//          }catch(err){

//          }
//      })
//      //let i = 0;
//      //Array.from(List).map((e) => {
//      //   try {
//      //       
//      //       products[i].Price = e.querySelector('.a-offscreen').innerText;
//      //   } catch (error) {
//      //       
//      //   }
//      //    i++;
//      //});
//      return products;
//   });
  
  
//   await browser.close();
//   //console.log(Images);
//   return Images;
// }
// const fun = async()=>{
    
//         const list = await getImage(`Vivo mobiles`);
//         //console.log(list);
//         fs.appendFile('FinalMobile.json',JSON.stringify(list),(err)=>{
//             if(err) console.log('error');
//             else console.log('complete');
//         })
   
// }

const DB = `mongodb+srv://Ujjwal:4XgZs1WGLyGvjSGn@cluster0.7ucvtkq.mongodb.net/GRID?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(async () => {
        console.log("database connected");
        
    })
    .catch((err) => {
        console.log(err.message);
    });