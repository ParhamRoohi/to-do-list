import React from "react";

function TodoItem({ onEdit, title, description, onDelete }) {
  return (
    <>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <input type="checkbox" />
        <button onClick={onEdit}> Edit</button>
        <button onClick={onDelete}> Delete</button>
      </div>
    </>
  );
}

export default TodoItem;
