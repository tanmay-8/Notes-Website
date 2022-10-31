const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser")
const Multipage = require("../models/Multipage");
const { body, validationResult } = require("express-validator");
  

router.post(
  "/addmultipage",[
    body("title", "Enter valid title").exists(),
    body("pages", "Enter valid pages").isArray(),
  ],fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const {title,pages} = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors, success });
      }

      const newMultipage = new Multipage({
        title:title,pages:pages,user:req.user.id
      })
      const saved_Multipage = await newMultipage.save()
      success = true;
      res.json({ saved_Multipage, success });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


router.get("/getmultipage/:id",fetchuser,async(req,res)=>{
    try{
      const multipage = await Multipage.findById(req.params.id)
      res.json(multipage)
    }catch(error){
      console.log(error)
      res.status(500).send("Internal server error");  
    }
  })
  
router.get("/getmultipages", fetchuser, async (req, res) => {
    try {
      const multipages = await Multipage.find({ user: req.user.id });
      res.json(multipages);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });
  
  
  router.put("/updatemultipage/:id", fetchuser, async (req, res) => {
    try {
      // const {ptitle,psubtitle,pdesc,ptags} =Note.findOne({})
      const { title,pages } = req.body;
      let success = false;
      const newMulitpage = {};
      if (title && body("title", "Enter title").exists()) {
        newMulitpage.title = title;
      }
      if (pages && body("pages", "Enter pages").isArray()) {
        newMulitpage.pages = pages;
      }
      
      
      newMulitpage.date = Date.now()
  
      let multipage = await Multipage.findById(req.params.id);
      if (!multipage) {
        return res.status(400).send("Not found", success);
      }
  
      if (multipage.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized", success);
      }
  
      multipage = await Multipage.findByIdAndUpdate(
        req.params.id,
        { $set: newMulitpage },
        { new: true }
      );
      success = true;
      res.send({ multipage, success });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  });
  
  
  
  router.delete("/deletemultipage/:id", fetchuser, async (req, res) => {
    try {
      let success = false;
      let multipage = await Multipage.findById(req.params.id);
      if (!multipage) {
        return res.status(400).send({ error: "Not Found", success });
      }
  
      if (multipage.user.toString() !== req.user.id) {
        return res.status(401).send({ error: "Unauthorized", success });
      }
  
      multipage = await Multipage.findByIdAndDelete(req.params.id);
      success = true;
      res.send({ multipage:multipage, sucsses: "multipage deleted", success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server error" });
    }
  });
  
  
  

module.exports = router;