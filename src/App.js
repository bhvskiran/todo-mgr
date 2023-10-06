import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MyTodos from "./components/MyTodos";
import Home from "./components/Home";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/todos"
          element={
            <ProtectedRoute>
              <MyTodos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
