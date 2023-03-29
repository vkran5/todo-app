import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import MainPages from "./pages/MainPage";
import TaskDetailPage from "./pages/TaskDetail";

function App() {


  return (
    <div >

      <Navbar />
      
      <Routes>
        <Route path="/" element={<MainPages/>}/>
        <Route path="/detail" element={<TaskDetailPage />}/>

      </Routes>
    </div>
  );
}

export default App;
