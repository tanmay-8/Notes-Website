import {React,useContext,useState} from 'react'
import { useLocation } from 'react-router-dom';
import noteContext from './contexts/noteContext';


const EditNote = () => {
  //getting prev note
  const location = useLocation()
  let  prevNote = location.state.prevnote
   
  //getting note context
  const notecontext = useContext(noteContext);
  const {updateNote} = notecontext;
  
  //initializing note
  const [Note, setNote] = useState({
    title: "",
    subtitle: "",
    desc: "",
    tags: "",
  });

  //updating note
  const Edit = (e)=> {
    e.preventDefault()
    updateNote(prevNote._id, Note);
  } 

  //collecting text setting to note
  const onChange = (e) => {
    setNote({ ...Note, [e.target.name]: e.target.value });
  };

  return (
    
    <div className="createnotemain">
      {/* Main note form */}
      <>
          <form className="noteform" onSubmit={Edit}>
            <input
              id="title"
              type={"text"}
              autoComplete="off"
              name={"title"}
              maxLength={50}
              required={true}
              placeholder={"Title"}
              onChange={onChange}
              defaultValue={prevNote.title}
            ></input>
            <input
              id="sub-title"
              type={"text"}
              name={"subtitle"}
              maxLength={60}
              autoComplete="off"
              required={true}
              placeholder={"Sub-Title"}
              onChange={onChange}
              defaultValue={prevNote.subtitle}
            ></input>

            <textarea
              id="desc"
              maxLength={900}
              name={"desc"}
              required={true}
              cols={19}
              rows={13}
              placeholder={"Description"}
              autoComplete="off"
              onChange={onChange}
              defaultValue={prevNote.desc}
            ></textarea>
            <div className="bottom">
              <input
                id="tags"
                name="tags"
                maxLength={30}
                placeholder={"#tags"}
                autoComplete="off"
                onChange={onChange}
                required={true}
                defaultValue={prevNote.tags}
              ></input>
              <input id="submit" type={"submit"} value={"Save"}></input>
            </div>
          </form>
        </>
    </div>
  )
}

export default EditNote
