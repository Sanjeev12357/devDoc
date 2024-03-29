
const User=require('../models/User');
const jwt=require('jsonwebtoken');
exports.signup=async(req,res)=>{
    const {firstName,username,password}=req.body;
    const user=await User.findOne({username});
    if(user){
        return res.status(400).json({message:'User already exists'});
    }
    const newUser=await User.create({
        firstName,
        username,
        password
    });

    const token= jwt.sign({id:newUser._id},'secret')

    return res.json({token,
        newUser,
    message:"user created successfully"});

}

exports.signin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.find({ username });
        if (user) {
            const token = jwt.sign({
                id: user._id
            }, 'secret');

            res.json({
                user,
                token: token
            });
            return;
        }
        // If user is null (not found)
        res.status(401).json({
            message: "Invalid username or password"
        });
    } catch (error) {
        // Handle any potential errors in database operation
        console.log(error);
        res.status(500).json({
            message: "Error while logging in"
        });
    }
}
