import React from "react";

function Form({
  id,
  title,
  setTitle,
  description,
  setDescription,
  editTodo,
  addTodo,
  showbtn,
}) {
  return (
    <>
 <form>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      {showbtn ? (
        <button type="button" onClick={(e) => editTodo(id, e)}>
          Submit
        </button>
      ) : (
        <button type="button" onClick={addTodo}>
          Add
        </button>
      )}
    </form>
    </>
  );
}

export default Form;
