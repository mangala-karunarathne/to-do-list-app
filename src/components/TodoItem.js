import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { editTodo, deleteTodo, toggleComplete } from "../redux/todoSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { URL } from "../App";
import { useState } from "react";

const TodoItem = ({ index, getSingleTodoItem }) => {
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
      const res = await axios.put(`${URL}/todos/${todoItem.id}`, newFormData);
      if (res?.data?.completed === true) {
        toast.success(`Task ${todoItem.id} Marked as Completed Successfully`);
      } else if (res?.data?.completed === false) {
        toast.warning(
          `Task ${todoItem.id} Marked as Not Completed Successfully`
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteTodoItem = async () => {
    try {
      await axios.delete(`${URL}/todos/${todoItem.id}`);
      dispatch(deleteTodo({ id: todoItem.id }));
      toast.success(" Task deleted Succesfully");
    } catch (error) {
      toast.error(error.message);
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
