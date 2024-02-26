import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, postAsyncTodo } from "../fitures/todoSlice";

export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const handlerSubmmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    dispatch(postAsyncTodo({ title: todo }));
    setTodo("");
  };
  return (
    <div>
      <h1>add new todo</h1>
      <form onSubmit={handlerSubmmit}>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="new todo.."
        />
        <button type="submit">add todo</button>
      </form>
    </div>
  );
}
