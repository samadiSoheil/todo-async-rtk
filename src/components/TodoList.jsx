import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, toggleTodo } from "../fitures/todoSlice";

export default function TodoList() {
  const store = useSelector((data) => data.todos);
  console.log(store);
  const dispatch = useDispatch();
  return (
    <div>
      {store.todos.map((t) => {
        return (
          <div
            className={`${t.completed ? "complete" : ""}`}
            key={t.id}
            style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            <input type="checkbox" onChange={(e) => dispatch(toggleTodo({ id: t.id }))} />
            <p>{t.title}</p>
            <button
              onClick={() => dispatch(deleteTodo({ id: t.id }))}
              style={{ display: "inline", marginLeft: "10px" }}
            >
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}
