import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";

const TodoItem = ({todoItem, index, getSingleTodoItem, deleteTodoItem, setToComplete, isEditing}) => {
  return (
    <div className={todoItem.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {todoItem.title}
      </p>
      <div className="task-icons">
        <FaCheckDouble color="green" onClick={() => setToComplete(todoItem)} />
        <FaEdit color="purple" onClick={() => getSingleTodoItem(todoItem)} />
        <FaRegTrashAlt color="red" onClick={() => deleteTodoItem(todoItem.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
