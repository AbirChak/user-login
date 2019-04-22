const express = require('express')
var bodyParser = require('body-parser')
const router = express.Router();




//first page
router.get('/',(req,res)=>{

    res.render('login')
})

//
router.get('/user-registration',(req,res)=>{
    
res.render('user-registration')

    })

    

//login page
router.get('/login',(req,res)=>{

    res.render('login')
})

router.get('/home',(req,res)=>{

    res.render('home')
})

// posting data in login page

router.post('/login',(req,res)=>{

    console.log(req.body)
    res.render('home')
} )

router.post('/user-registration',(req,res)=>{

    console.log(req.body)
    res.render('login')
} )


module.exports= router;