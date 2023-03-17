import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import Axios from "axios";

function TodoApp() {
  const [setItem, setNewitem] = useState([]);
  const [setInput, setNewInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all")
  const fetchData = async () => {
    let response = await Axios.get("http://localhost:2000/items");
    setNewitem(response.data);
  };
  const addBtnHandler = (e) => {
    e.preventDefault()
    const items = {
      id: 0,
      activity: setInput,
      done: false 
    };
    addTodo(items);
    setNewInput("")
  };
  const renderList = () => {
    let filteredItems = setItem;
    if (selectedFilter === "finished") {
      filteredItems = setItem.filter(item => item.done);
    } else if (selectedFilter === "unfinished") {
      filteredItems = setItem.filter(item => !item.done);
    }
    return filteredItems.map((item) => {
      return <TodoItem item={item} deleteBtnHandler={deleteTodo} completeHandler={completeHandler} />;
    });
  };
  const addTodo = async (items) => {
    await Axios.post("http://localhost:2000/items", items);
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  const deleteTodo = async (id) => {
    await Axios.delete("http://localhost:2000/items/" + id);
    fetchData();
  };
    const completeHandler = async (id) => {
      const updatedItem = setItem.find(item => item.id === id);
      updatedItem.done = !updatedItem.done;
      await Axios.put(`http://localhost:2000/items/${id}`, updatedItem);
      setNewitem(setItem.map(item => {
        if (item.id === id) {
          return updatedItem;
        }
        return item;
      }));
    };

  return (
    <div className=" font-Neue grid place-content-center h-screen place-items-center gap-3 ">
      <h1 className=" text-3xl">My To Do List :</h1>
      <div className="flex border-2 border-black px-2 py-1 rounded w-80 justify-between ">
        
          
          <input
            value={setInput}
          onChange={(e) => setNewInput(e.target.value)}
          className="border-0 outline-none"
            
          
          ></input>
          <button onClick={addBtnHandler}
            className="px-2 py-1 bg-orange-300 border-transparent  rounded text-white hover:bg-white hover:text-orange-300 hover:text-3xl">
          +
          </button>
          <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border-0 bg-transparent outline-none"
        >
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
        
      </div>
      {renderList()}
    </div>
  );
}

export default TodoApp;
