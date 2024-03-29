const express=require('express');

const { createScore, getScore } = require('../controllers/Score');
const router=express.Router();

router.post('/score',createScore);
router.get('/score',getScore);


module.exports=router;  