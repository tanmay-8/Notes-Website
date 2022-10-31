import "./App.css";
import Home from "./allcomponents/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./allcomponents/Login";
import NoteState from "./allcomponents/contexts/NoteState";
import TodoState from "./allcomponents/contexts/TodoState";
import ShowTodo from "./allcomponents/ShowTodo";
import Notesmenu from "./allcomponents/Notesmenu";
import Menu from "./allcomponents/Menu";
import ShowNotes from "./allcomponents/ShowNotes";
import CreateNotes from "./allcomponents/CreateNotes";
import Todo from "./allcomponents/CreateTodo";
import EditNote from "./allcomponents/EditNote";
import EditTodo from "./allcomponents/EditTodo";
import Multipage from "./allcomponents/AddMultipage";
import MultipageState from "./allcomponents/contexts/MultipageState";
import ShowMultipage from "./allcomponents/Showmultipage";
import EditMulti from "./allcomponents/EditMulti";
import Signup from "./allcomponents/Signup";

function App() {
  return (
    <div className="App main">
      <NoteState>
        <TodoState>
          <MultipageState>
            <Menu />
            <div className="vr"></div>

            <Notesmenu />
            <div className="vr"></div>
            <Routes>
              <Route
                path="/"
                element={
                  localStorage.getItem("notetoken") !== null ? (
                    <Home />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route path="/Signup" element={<Signup/>}/>
              <Route path="/ShowTodo" element={<ShowTodo />} />
              <Route path="/ShowNote" element={<ShowNotes />} />
              <Route path="/CreateNote" element={<CreateNotes />} />
              <Route path="/CreateTodo" element={<Todo />} />
              <Route path="/EditTodo" element={<EditTodo />} />
              <Route path="/EditNote" element={<EditNote />} />
              <Route path="/Multipage" element={<Multipage />} />
              <Route path="/ShowMultipage" element={<ShowMultipage />} />
              <Route path="/EditMultipage" element={<EditMulti />} />
            </Routes>
          </MultipageState>
        </TodoState>
      </NoteState>
    </div>
  );
}

export default App;
