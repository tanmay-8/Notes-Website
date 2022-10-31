import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesinit = [];

  const [notes, setNotes] = useState(notesinit);
  const [note, setNote] = useState(undefined);

  const getNotes = async () => {
    // api call
    const response = await fetch("http://localhost:5000/api/note/getnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("notetoken"),
      },
    });
    let json = await response.json();
    json = json.reverse();
    setNotes(json);
  };

  const getNote = async (id) => {
    // api call
    const response = await fetch(
      `http://localhost:5000/api/note/getnote/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
      }
    );
    let json = await response.json();
    setNote(json);
  };

  const addNote = async (note) => {
    const response = await fetch("http://localhost:5000/api/note/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("notetoken"),
      },
      body: JSON.stringify(note),
    });
    const json = await response.json();
    getNotes()
    return json
  };

  //deleting note
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/note/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
      }
    );
    const json = await response.json();
    setNote(undefined);
    getNotes();
    return json;
  };
  
  const updateNote = async (id, note) => {
    const response = await fetch(
      `http://localhost:5000/api/note/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
        body: JSON.stringify(note),
      }
    );
    const json = await response.json();
    getNotes()
    getNote(id)
    return json;
  };
  const isFavourite = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/note/isfavourite/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("notetoken"),
        },
      }
    );
    const json = await response.json();
    getNotes();
    getNote(id)
    return json;
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        updateNote,
        isFavourite,
        note,
        setNote,
        getNote,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
