import React, { useEffect, useState } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./TodoItem";
import loadingImg from "../assets/loader.gif";
import { toast } from "react-toastify";
import { URL } from "../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  addTodoItems,
  deleteTodo,
  editTodo,
} from "../redux/todoSlice";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    userId: 1,
    title: "",
    completed: false,
  });
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
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
      setTodoItems(data);
      dispatch(addTodoItems(data));
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const getSingleTodoItem = (todoItem) => {
    if (todoItem && todoItem.title) {
      setFormData({ title: todoItem.title, completed: false });
      setTaskID(todoItem.id);
      setIsEditing(true);
    }
  };

  const createTodoItem = async (e) => {
    e.preventDefault();
    if (title === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      setIsLoading(true);
      const newTodo = { ...formData, id: uuidv4() };
      const { data } = await axios.post(`${URL}/todos`, newTodo, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      toast.success("Task added Successfully");
      setFormData({ ...formData, title: "" });
      dispatch(addTodoItems([...todos, newTodo]));
      getTodoItemsFromStore();
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const updateTodoItem = async (e) => {
    e.preventDefault();
    if (formData.title === "") {
      return toast.error("Input field cannot be empty.");
    }
    try {
      setIsLoading(true);
      const { data } = await axios.put(`${URL}/todos/${taskID}`, formData, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      setFormData({ ...formData, title: "" });
      setIsEditing(false);
      dispatch(editTodo({ id: taskID, updatedTodo: data }));
      setIsLoading(false);
      toast.success(`Task Updated Successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getTodoItemsFromStore = () => {
    setTodoItems(todos);
  };

  useEffect(() => {
    getTodoItem();
  }, []);

  useEffect(() => {
    getTodoItemsFromStore();
  }, [todos]);

  return (
    <div>
      <h2>To do List</h2>
      <AddTodoForm
        title={title}
        taskID={taskID}
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
      {!isLoading && todoItems.length === 0 ? (
        <p className="--py">No task added. Please add a task</p>
      ) : (
        <>
          {todoItems.map((todoItem, index) => {
            return (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                index={index}
                getSingleTodoItem={getSingleTodoItem}
                isEditing={isEditing}
                formData={formData}
                setIsLoading={setIsLoading}
                setFormData={setFormData}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TodoList;
