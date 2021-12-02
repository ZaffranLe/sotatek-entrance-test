import React, { useEffect } from "react";
import { toast } from "react-toastify";
import TodoContext from "../../context/todo";
import APICall from "../../utils/api-call";
import TodoDetail from "./detail";
import "./style.css";

function TodoItem({ todo }) {
    const [checked, setChecked] = React.useState(false);
    const [viewDetail, setViewDetail] = React.useState(false);
    const todoContext = React.useContext(TodoContext);
    
    useEffect(() => {
        setChecked(todoContext.checkedTasks.includes(todo.id));
    }, [todoContext.checkedTasks, todo]);

    const handleRemoveTask = async () => {
        try {
            const resp = await APICall({
                url: `/api/tasks/${todo.id}`,
                method: "delete",
            });
            toast.success(resp.data.message);
            todoContext.setTodo(
                todoContext.todo.filter((_item) => _item.id !== todo.id)
            );
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const handleCheck = () => {
        if (todoContext.checkedTasks.find((_item) => _item.id === todo.id)) {
            todoContext.setCheckedTasks(
                todoContext.checkedTasks.filter((_item) => _item.id !== todo.id)
            );
        } else {
            todoContext.setCheckedTasks([...todoContext.checkedTasks, todo]);
        }
    };

    return (
        <>
            <div className="todo__container d-flex">
                <div className="todo__content">
                    <input
                        value={checked}
                        type="checkbox"
                        className="todo__checkbox"
                        onChange={() => handleCheck(todo)}
                    />
                    <label htmlFor="todo__checkbox" className="todo__label">
                        {todo.title}
                    </label>
                </div>
                <div className="todo__action">
                    <button
                        className="btn primary todo__btn"
                        onClick={() => setViewDetail(!viewDetail)}
                    >
                        Detail
                    </button>
                    <button
                        className="btn danger todo__btn"
                        onClick={handleRemoveTask}
                    >
                        Remove
                    </button>
                </div>
            </div>
            {viewDetail && (
                <div className="todo__detail">
                    <TodoDetail todo={todo} />
                </div>
            )}
        </>
    );
}

export default TodoItem;
