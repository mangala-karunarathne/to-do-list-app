import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import loadingImg from "../assets/loader.gif";
import { toast } from "react-toastify";
import { URL } from "../App";
import axios from "axios";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: 1,
    title: "",
    completed: false,
  });
  const { title } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getTodoItem = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/todos`);
      console.log(data);
      setTodoItems(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTodoItem = async (id) => {
    // try {
    //   await axios.delete(`${URL}/api/tasks/${id}`);
    //   toast.success(" Task deleted Succesfully");
    //   getTasks();
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  const getSingleTodoItem = async (task) => {
    setFormData({ name: task.name, completed: false });
    // setTaskID(task._id);
    setIsEditing(true);
  };

  const setToComplete = async (task) => {
      const newFormData = {
      name: task.name,
      completed: true,
    };
    // try {
    //   await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
    //   getTasks();
    //   toast.success("Task Marked as Completed Successfully");
    // } catch (error) {
    //   toast.error(error.message);
    // }
  };

  const createTodoItem = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (title === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${URL}/todos`, formData, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      toast.success("Task added Successfully");
      setFormData({ ...formData, title: "" });
      getTodoItem();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const updateTodoItem = async (e) => {
    e.preventDefault();
    if (title === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
    //   await axios.put(`${URL}/api/tasks/${taskID}`, formData);
    //   setFormData({ ...formData, title: "" });
      setIsEditing(false);
    //   getTasks();
    //   toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sampleTodos = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 5,
      title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
      completed: false,
    },
  ];

  useEffect(() => {
    getTodoItem();
  }, []);

  // useEffect(() => {
  //   const comTask = sampleTodos.filter((todoItem)=>{
  //     return todoItem.completed === true
  //   })
  //   setCompletedTasks(comTask)
  // },[sampleTodos])

  return (
    <div>
      <h2>To do List</h2>
      <AddTodoForm
        title={title}
        handleInputChange={handleInputChange}
        createTodoItem={createTodoItem}
        isEditing={isEditing}
        updateTodoItem={updateTodoItem}
      />
      {todoItems.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks:</b> {todoItems.length}
          </p>
          <p>
            <b>Completed Tasks:</b> {completedTasks.length}
          </p>
        </div>
      )}

      <hr />
      {isLoading && (
        <div className="--flex-center">
          <img src={loadingImg} alt="loading" />
        </div>
      )}
      {!isLoading && sampleTodos.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {todoItems.map((todoItem, index) => {
            return (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                index={index}
                deleteTodoItem={deleteTodoItem}
                getSingleTodoItem={getSingleTodoItem}
                isEditing={isEditing}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TodoList;
