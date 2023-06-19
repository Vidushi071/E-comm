const Product = require('./models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/E-comm')
.then(() => { console.log("Db Connected")})
.catch((err)=>{ console.log(err)});

const products = [
    {
        name:'Purse',
        img:'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFnc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Purse',
        img:'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJhZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Purse',
        img:'https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Purse',
        img:'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZnVtZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Chanel',
        img:'https://images.unsplash.com/photo-1601295452898-78a8dd904ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHBlcmZ1bWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Airpods',
        img:'https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGFpcnBvZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
    {
        name:'Laptop',
        img:'https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        price:1000,
        desc:'Fashion style'
    },
]

Product.insertMany(products)
.then(() =>{
    console.log('Product seeded');
})
