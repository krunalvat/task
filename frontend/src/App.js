import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/tasks" element={<Tasks />}></Route>
            <Route path="*" element={<h1>Oops...Nothing Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
