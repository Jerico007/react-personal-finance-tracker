
// react-router-dom library
import { Routes, Route} from "react-router-dom";
// Toastify library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
// Private Route
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/private" element={<PrivateRoute />} >
          <Route path="/private/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
