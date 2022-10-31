import React, { useContext, useEffect} from "react";
import "./css/shownotes.css";
import edit from "./Images/edit.png";
import deleteimg from "./Images/delete.png";
import addtofavourite from "./Images/isfav.png";
import addedtofavourite from "./Images/addedtofav.png";
import noteContext from "./contexts/noteContext";
import { useLocation, useNavigate } from "react-router-dom";

const ShowNotes = () => {
  const nevigate = useNavigate()

  //getting context notecontext
  const context = useContext(noteContext);
  const { deleteNote, isFavourite,getNote,note} = context;
  
  //getting id of note
  const id = useLocation().state.note

  //when first rendered
  useEffect(()=>{
    getNote(id)
  },[id])


  //mark as favourite or unfavourite
  const addremovefavs = (id) => {
    isFavourite(id);
  };

  //deletenote
  const removenote = (id) => {
    deleteNote(id);
  };

  //style of images
  const style1 = {
    filter: "invert(0)",
  };


  return (
    <div>
      <>
        {note !== undefined && note !== null? (
          <div className="style1">

            {/* edit and delete images */}
            <div className="headshownote">
              <div className="showimages">
                {!note.isfavourite ? (
                  <img
                    onClick={() => {
                      addremovefavs(note._id);
                    }}
                    src={addtofavourite}
                    alt="logo"
                  ></img>
                ) : (
                  <img
                    style={style1}
                    src={addedtofavourite}
                    onClick={() => {
                      addremovefavs(note._id);
                    }}
                    alt="logo"
                  ></img>
                )}
                <img
                  src={edit}
                  onClick={() => {
                    nevigate("/EditNote",{state:{prevnote:note}})
                  }}
                  alt="logo"
                ></img>
                <img
                  src={deleteimg}
                  alt="logo"
                  onClick={() => {
                    removenote(note._id);
                  }}
                ></img>
              </div>
            </div>

            {/* title of note */}
            <div className="showtitle">❖{" " + note.title}</div>

            {/* subtitle of note */}
            <div className="showsubtitle">
              {"\u00a0\u00a0" +
                "\u00a0\u00a0" +
                "\u00a0\u00a0➢ " +
                note.subtitle}
            </div>

            {/* Descripttion of note */}
            <div className="showdesc">
              <br></br>
              <p>{note.desc}</p>
            </div>

            {/* Tags of notes */}
            <div className="showtags">
              {"\u00a0\u00a0" +
                "\u00a0\u00a0" +
                "\u00a0\u00a0 " +
                note.tags}
            </div>

            {/* Date of note */}
            <div className="showdate">{note.date.split("T")[0]}</div>
          </div>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default ShowNotes;
