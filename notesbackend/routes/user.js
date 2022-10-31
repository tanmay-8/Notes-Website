const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser")

const JWT_SECRET = "HITHISISMYSIGNATUREE@$%#";

//ROUTE1:Create a user using :POST "/api/auth". Doesnt require auth
router.post("/createuser",[
    body("username", "Enter valid name").isLength({ min: 3, max: 10 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter password min length 5").isLength({min: 5,max: 12,}),
  ],

  async (req, res) => {
    let success = false;
    //if errors then show
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors,success });
    }

    //check if user with email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry user with this email already exist." ,success});
      }

      //hashing password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //saving user in database
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secPass,
      });

      //giving authorization token
      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({authtoken,success});
      
    } catch (error) {
        let success = false;
        console.error(error.message);
        res.status(500).send("Some internal server error ocurred");
    }
  }
);



// ROUTE2:Authinticate user using :POST "api/auth/login." no login rquired
router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password",'Password can not be blamk').exists()
],async (req,res)=>{
    let success = false;
    //if errors then show
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors,success});
    }

    const {email,password} =req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"no user with this email",success});
        }

        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            return res.status(400).json({error:"Try to login with correct credentials",success}); 
        }
        
        let username = user.username
        //giving authorization token
        const data= {
        user: {
          id: user.id,
        },
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({authtoken,success,username});

    }catch(error){
        let success = false;
        console.error(error.message);
        res.status(500).send("Some internal server error ocurred");
    }
})




// ROUTE3:getting logined user details :POST "api/auth/getuser."  login rquired

router.get("/getuser",fetchuser,
  async (req, res) => {
      try{
          const userid = req.user.id;
          const user = await User.findById(userid).select("-id")
          res.send(user);
      }
      catch(error){
        res.status(500).send({error:"internal server user"})
      }
  })

module.exports = router;
