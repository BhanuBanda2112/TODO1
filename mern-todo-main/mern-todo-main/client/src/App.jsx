import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonAppBar from "./components/AppBar";
import TodoUi from "./components/TodoUi";
import AddTodo from "./components/AddTodo";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetch("https://mern-todo-api-livid.vercel.app/todos", {
      method: "GET",
    }).then((resp) => {
      resp.json().then((data) => {
        setTodos(data);
      });
    });
  }, []);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      <div className="container">
        <ButtonAppBar
          check={darkMode}
          darkMode={darkMode}
          change={() => setDarkMode(!darkMode)}
        />
        <TodoUi darkMode={darkMode} setTodos={setTodos} />
        <AddTodo todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
