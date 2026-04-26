import { use, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./notes.css";
import { useEffect } from "react";

export default function Notes() {
  const [notes, setNotes] = useState(()=> {
    let saved = localStorage.getItem("notes");
    return saved? JSON.parse(saved):[];
  });
  const [newNote, setNewNote] = useState("");
  const [editId, setEditId] = useState(null);
  

  let handlevalue = (event) => {
    setNewNote(event.target.value);
  };
 useEffect(()=>{
   localStorage.setItem("notes",JSON.stringify(notes));
 },[notes]);
  let handlesubmit = () => {
    if (newNote === "") return;

    if (editId !== null) {
      // EDIT MODE
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.key === editId
            ? { ...note, task: newNote }
            : note
        )
      );
      setEditId(null);
    } else {
      // ADD MODE
      setNotes([
        ...notes,
        { task: newNote, key: uuidv4(), isDone: false ,pin:false },
      ]);
    }

    setNewNote("");
  };
   
  let startEdit = (note) => {
    setNewNote(note.task);
    setEditId(note.key);
  };

  let deleteNote = (key) => {
    setNotes(notes.filter((note) => note.key !== key));
  };
  
  let pin = (node) => {
  setNotes((prevNotes) => {
    // 1. toggle pin
    let updated = prevNotes.map((note) =>
      note.key === node.key
        ? { ...note, pin: !note.pin }
        : note
    );

    // 2. separate pinned & unpinned
    let pinned = updated.filter((note) => note.pin);
    let unpinned = updated.filter((note) => !note.pin);

    // 3. combine (pinned on top)
    return [...pinned, ...unpinned];
  });
};

  let markDone = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.key === id
          ? { ...note, isDone: !note.isDone }
          : note
      )
    );
  };

  return (
    <div className="container">
  <h1 style={{color:"black"}}>Notes App</h1>

  <div className="input-section">
    <input
      type="text"
      value={newNote}
      onChange={handlevalue}
      placeholder="Write a note..."
    />
    <button onClick={handlesubmit}>
      {editId ? "Save" : "Add"}
    </button>
  </div>

  <h3>My Notes</h3>

  <ul className="notes-list">
    {notes.map((note) => (
      <li key={note.key} className="note-item">
        <span className={note.isDone ? "done" : ""} >
         <span style={{ color: note.pin ? "red" : "black" }}>
  {note.task}
</span>
        </span>

        <div className="actions">
          <button onClick={() => deleteNote(note.key)}>Delete</button>
          <button onClick={() => markDone(note.key)}>Toggle</button>
          <button onClick={() => startEdit(note)}>Edit</button>
          <button onClick={() => pin(note)}> pin</button>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
}