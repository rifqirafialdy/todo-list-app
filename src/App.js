import { Routes, Route } from "react-router-dom";
import TodoApp from "./pages/TodoApp";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoApp />} />
      </Routes>
    </div>
  );
}

export default App;
