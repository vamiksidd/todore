import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   const parsed = localStorage.getItem("todos");
  //   // console.log(typeof(parsed));
  //   const todoStringify = JSON.stringify(parsed);
  //   if (todoStringify && todoStringify > 0) {
  //     setTodos(todoStringify);
  //   }
  //   // console.log(typeof(todoStringify));
  // }, []);

  // useEffect(() => {
  //   const todoStringify = JSON.stringify(todos);
  //   const test = localStorage.setItem("todos", todoStringify);
  //   console.log(test);
  // }, []);

  // useEffect(() => {
  //   const todosFromLocalStorage = localStorage.getItem("todos");
  //   // if(todosFromLocalStorage)
  //   const todoList = JSON.parse(todosFromLocalStorage);
  //   console.log(todoList);
  //   console.log(Date.now());
  //   if (todoList && todoList.length > 0) {
  //     setTodos(todoList);
  //   }
  // }, []);

  // useEffect(() => {
  //   const todosFromLocalStorage = localStorage.getItem("todos");
  //   if (todosFromLocalStorage) {
  //     const parsedTodos = JSON.parse(todosFromLocalStorage);
  //     if(parsedTodos && parsedTodos.length > 0)
  //     setTodos(parsedTodos);
  //   }
  // }, []);
  // useEffect(()=>{
  //   const todoList = JSON.stringify(todos);
  //   if(todoList)
  //   localStorage.setItem("todos",todoList)
  // },[todos])

  return (
    <TodoProvider
      value={{ todos, updateTodo, addTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
