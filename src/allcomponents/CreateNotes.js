import { React, useContext, useState } from "react";
import "./css/createnotes.css";
import noteContext from "./contexts/noteContext";


const CreateNotes = () => {

  //getting context note context
  const notecontext = useContext(noteContext);
  const { addNote} = notecontext;
  
  //initializing note
  const [Note, setNote] = useState({
    title: "",
    subtitle: "",
    desc: "",
    tags: "",
  });

  //collecting text and setting to note
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  //adding note and then getting notes
  const addnote = (e) => {
    e.preventDefault(); 
    addNote(Note);
  };

  return (
    <div className="createnotemain">
      {/* empty header */}
      <div className="note-header">
        <ul>
          <li></li>
        </ul>
      </div>
        
        {/* Main note form */}
        <form className="noteform" onSubmit={addnote}>
          <input
            id="title"
            type={"text"}
            name={"title"}
            maxLength={50}
            required={true}
            placeholder={"Title"}
            autoComplete="off"
            onChange={onChange}
          ></input>
          <input
            id="sub-title"
            type={"text"}
            name={"subtitle"}
            maxLength={60}
            required={true}
            placeholder={"Sub-Title"}
            autoComplete="off"
            onChange={onChange}
          ></input>
          <textarea
            id="desc"
            name={"desc"}
            required={true}
            cols={19}
            rows={13}
            placeholder={"Description"}
            autoComplete="off"
            onChange={onChange}
            maxLength={900}
          ></textarea>
          <div className="bottom">
            <input
              id="tags"
              autoComplete="off"
              name="tags"
              maxLength={30}
              placeholder={"#tags"}
              onChange={onChange}
              required={true}
            ></input>
            <input id="submit" type={"submit"} value={"Save"}></input>
          </div>
        </form>
      
    </div>
  );
};

export default CreateNotes;
