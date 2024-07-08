import axios from "axios";
import { useState } from "react";
import TodoItem from "./TodoItem";
import Form from "./Form";

function TodoList() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showbtn, setShowbtn] = useState(false);
  const [id, setId] = useState(null);

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/toDos");
    setData(res.data);
    console.log(res.data);
  };

  const handleShowbtn = (id, title, description) => {
    setId(id);
    setTitle(title);
    setDescription(description);
    setShowbtn(!showbtn);
  };

  const handleCheckBox = async (id, checked) => {
    const todoItem = data.find((item) => item.id === id);
    const updatedTodo = { ...todoItem, status: checked };
    try {
      const res = await axios.put(
        `http://localhost:8000/toDos/${id}`,
        updatedTodo
      );
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? res.data : item))
      );
    } catch (error) {
      console.error("Error updating todo status:", error);
    }
  };

  const handleEditTodo = async (id, e) => {
    e.preventDefault();
    const todoItem = data.find((item) => item.id === id);

    const edit = {
      title: title,
      description: description,
      status: todoItem.status,
    };

    try {
      const res = await axios.put(`http://localhost:8000/toDos/${id}`, edit);
      setTitle("");
      setDescription("");
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                status: res.data.status,
                title: res.data.title,
                description: res.data.description,
              }
            : item
        )
      );
      console.log(`Edit todo with id: ${id}`);
      setShowbtn(false);
      setId(null);
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/toDos/${id}`);
      const filter = data.filter((todo) => todo.id !== id);
      setData(filter);
      console.log(`Deleted todo with id: ${id}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const addTodo = {
      id: Date.now().toString(),
      title: title,
      description: description,
      status: false,
    };
    try {
      const res = await axios.post(`http://localhost:8000/toDos`, addTodo);
      setData([...data, res.data]);
      setTitle("");
      setDescription("");
      getData();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <div className="todo-list-container">
        <h1> To Do List</h1>
        <Form
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          editTodo={handleEditTodo}
          addTodo={handleAddTodo}
          showbtn={showbtn}
          id={id}
        />
        <ul>
          <button onClick={getData}>Fetch Data</button>
          {data?.map((item) => (
            <TodoItem
              key={item?.id}
              id={item.id}
              title={item?.title}
              description={item?.description}
              status={item.status}
              setCheckBox={handleCheckBox}
              onEdit={() =>
                handleShowbtn(item.id, item.title, item.description)
              }
              onDelete={() => handleDeleteTodo(item?.id)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
export default TodoList;
