const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middlewares/fetchuser");


router.post(
  "/addnote",
  [
    body("title", "Enter valid title").exists(),
    body("subtitle", "Enter valid subtitle").exists(),
    body("desc", "Enter valid desc").exists(),
    body("tags","Enter valid tags").exists(),
  ],
  fetchuser,
  async (req, res) => {
    try {
      let success = false;
      const {
        title,subtitle,desc,tags
      } = req.body;
      //if errors then show
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors, success });
      }

      const note = new Note({
        title:title,
        subtitle:subtitle,
        desc:desc,
        tags:tags,
        user: req.user.id,
      });
      const saved_note = await note.save();

      success = true;
      res.json({ saved_note, success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);


router.get("/getnote/:id",fetchuser,async(req,res)=>{
  try{
    const note = await Note.findById(req.params.id)
    res.json(note)
  }catch(error){
    console.log(error)
    res.status(500).send("Internal server error");  
  }
})

router.get("/getnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});


router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    // const {ptitle,psubtitle,pdesc,ptags} =Note.findOne({})
    const { title,subtitle,desc,tags } = req.body;
    let success = false;
    const newNote = {};
    if (title && body("title", "Enter title").exists()) {
      newNote.title = title;
    }
    if (subtitle && body("subtitle", "Enter title").exists()) {
      newNote.subtitle = subtitle;
    }
    if (desc && body("desc", "Enter title").exists()) {
      newNote.desc = desc;
    }
    if (tags && body("tags", "Enter title").exists()) {
      newNote.tags = tags;
    }
    
    newNote.date = Date.now()

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send("Not found", success);
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized", success);
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    success = true;
    res.send({ note, success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});



router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

    note = await Note.findByIdAndDelete(req.params.id);
    success = true;
    res.send({ note:note, sucsses: "note deleted", success });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});



router.put("/isfavourite/:id", fetchuser, async (req, res) => {
  try {
    let success = false;
    let newf = false;
    let note = await Note.findById(req.params.id);
    const { title,subtitle,desc,tags,isfavourite ,date} = note;
    if (!note) {
      return res.status(400).send({ error: "Not Found", success });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send({ error: "Unauthorized", success });
    }

   

    if(isfavourite===false){
        newf = true
    }
    let newNote= {
      title:title,subtitle:subtitle,desc:desc,tags:tags,isfavourite:newf,date:date};

      note = await Note.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: false })

    success = true;
    res.send({ note, success });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
