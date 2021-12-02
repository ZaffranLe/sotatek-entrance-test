import React from "react";
import { toast } from "react-toastify";
import TodoContext from "../../context/todo";
import APICall from "../../utils/api-call";

function TodoBulkAction() {
    const todoContext = React.useContext(TodoContext);

    const BULK_ACTIONS = {
        COMPLETE: {
            url: "/api/tasks/bulk-complete",
        },
        REMOVE: {
            url: "/api/tasks/bulk-remove",
        },
    };

    const handleBulkAction = async (action) => {
        const ids = todoContext.checkedTasks.map((_item) => _item.id);
        try {
            const resp = await APICall({
                url: action.url,
                method: "post",
                data: {
                    ids,
                },
            });
            const { message } = resp.data;
            toast.success(message);
            todoContext.setCheckedTasks([]);
            todoContext.setTodo(
                todoContext.todo.filter(
                    (_item) => !ids.includes(_item.id)
                )
            );
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="todo__bulk-action">
            <div className="todo__bulk-action__header">Bulk action:</div>
            <button
                className="btn info"
                onClick={() => handleBulkAction(BULK_ACTIONS.COMPLETE)}
            >
                Done
            </button>
            <button
                className="btn danger"
                onClick={() => handleBulkAction(BULK_ACTIONS.REMOVE)}
            >
                Remove
            </button>
        </div>
    );
}

export default TodoBulkAction;
