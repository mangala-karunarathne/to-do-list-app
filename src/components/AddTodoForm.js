import React from "react";

const AddTodoForm = ({ createTodoItem, title, handleInputChange, isEditing, updateTodoItem}) => {

  return (
    <form className="add-to-do-form" 
    onSubmit={isEditing ? updateTodoItem : createTodoItem}
    >
      <input
        type="text"
        placeholder="Add a Task"
        name="title"
        value={title}
        onChange={handleInputChange}
      />
      <button type="submit">
        {isEditing ? 'Edit':'Add'}
        </button>
    </form>
  );
};

export default AddTodoForm;
