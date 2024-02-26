import { useDispatch, useSelector } from "react-redux";
import {
  deletAsyncTodo,
  deleteTodo,
  editeAsyncTodo,
  getAsyncTodo,
  toggleTodo,
} from "../fitures/todoSlice";
import { useEffect } from "react";

export default function TodoList() {
  const store = useSelector((data) => data.todos);
  console.log(store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAsyncTodo());
  }, []);

  const handlerDelete = (id) => dispatch(deletAsyncTodo({ id }));

  return (
    <div>
      {store.loading ? (
        <p>loading ...</p>
      ) : store.error ? (
        <p style={{ color: "red" }}>{store.error}</p>
      ) : (
        store.todos.map((t) => {
          return (
            <div
              className={`${t.completed ? "complete" : ""}`}
              key={t.id}
              style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
            >
              <input
                checked={t.completed ? "checked" : ""}
                type="checkbox"
                onChange={(e) =>
                  dispatch(
                    editeAsyncTodo({ id: t.id, completed: !t.completed, title: t.title })
                  )
                }
              />
              <p>{t.title}</p>
              <button
                onClick={() => handlerDelete(t.id)}
                style={{ display: "inline", marginLeft: "10px" }}
              >
                delete
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}
