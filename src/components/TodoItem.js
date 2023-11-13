import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { editTodo, deleteTodo, toggleComplete } from "../redux/todoSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../App";
import { useState } from "react";

const TodoItem = ({ index, getSingleTodoItem, setIsLoading }) => {
  const todoItem = useSelector((state) => state.todos[index]);
  const dispatch = useDispatch();

  const setToComplete = async () => {
    dispatch(
      toggleComplete({ id: todoItem.id, completed: !todoItem.completed })
    );
    const newFormData = {
      title: todoItem.title,
      completed: !todoItem.completed,
    };
    try {
      setIsLoading(true);
      const res = await axios.put(`${URL}/todos/${todoItem.id}`, newFormData);
      if (res?.data?.completed === true) {
        toast.success("Marked as Completed Successfully");
      } else if (res?.data?.completed === false) {
        toast.warning(
          "Marked as Not Completed Successfully"
        );
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTodoItem = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${URL}/todos/${todoItem.id}`);
      dispatch(deleteTodo({ id: todoItem.id }));
      toast.success("Task deleted Succesfully");
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={todoItem && todoItem.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {todoItem && todoItem.title ? todoItem.title : ""}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={setToComplete} />
        <FaEdit color="purple" onClick={() => getSingleTodoItem(todoItem || "")} />
        <FaRegTrashAlt color="red" onClick={deleteTodoItem} />
      </div>
    </div>
  );
};

export default TodoItem;
