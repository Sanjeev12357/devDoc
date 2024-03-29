const express=require('express');

const { createHealth, getHealth } = require('../controllers/Health');
const router=express.Router();

router.post('/health',createHealth);
router.get('/health',getHealth);


module.exports=router;