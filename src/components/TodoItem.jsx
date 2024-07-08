import React, { useState } from "react";

function TodoItem({
  id,
  onEdit,
  title,
  description,
  onDelete,
  status,
  setCheckBox,
}) {
  const [checked, setChecked] = useState(status);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    setCheckBox(id, e.target.checked);
  };

  return (
    <div className={`todo-item ${checked ? 'completed' : ''}`}>
      <p>{title}</p>
      <p>{description}</p>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <input type="checkbox" onChange={handleChange} checked={checked} />
      </div>
    </div>
  );
}

export default TodoItem;
