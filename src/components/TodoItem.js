import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { editTodo, deleteTodo, toggleComplete } from "../redux/todoSlice";

const TodoItem = ({index}) => {
  const todoItem = useSelector((state) => state.todos[index]);
  const dispatch = useDispatch();

  const setToComplete = () => {
    dispatch(toggleComplete({ id: todoItem.id, completed: !todoItem.completed }));
  };

  const getSingleTodoItem = () => {
    // 
  };

  const deleteTodoItem = () => {
    dispatch(deleteTodo({ id: todoItem.id }));
  };

  return (
    <div className={todoItem && todoItem.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {todoItem && todoItem.title ? todoItem.title : ""}
      </p>
      <div className="task-icons">
      <FaCheckDouble color="green" onClick={setToComplete} />
        <FaEdit color="purple" onClick={getSingleTodoItem} />
        <FaRegTrashAlt color="red" onClick={deleteTodoItem} />
      </div>
    </div>
  );
};

export default TodoItem;
