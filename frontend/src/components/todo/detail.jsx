import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TodoContext from "../../context/todo";
import APICall from "../../utils/api-call";
import moment from "moment";
import _ from "lodash";

function TodoDetail({ todo = null }) {
    const TODAY = moment().format("MM/DD/YYYY");
    const [task, setTask] = React.useState({
        title: "",
        completed: false,
        id: null,
        priority: "normal",
        dueDate: TODAY,
        description: "",
    });

    useEffect(() => {
        if (todo) {
            setTask({
                ...todo,
                dueDate: moment(todo.dueDate).format("YYYY-MM-DD"),
            });
        }
    }, [todo]);

    const handleChangeTaskInfo = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (task.id) {
            await handleUpdateTask({ ...task });
        } else {
            await handleCreateTask({
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
            });
        }
    };

    const handleCreateTask = async (task) => {
        try {
            const resp = await APICall({
                url: `/api/tasks`,
                method: "post",
                data: {
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate,
                },
            });
            toast.success(resp.data.message);
            setTask({
                title: "",
                completed: false,
                id: null,
                priority: "normal",
                dueDate: TODAY,
                description: "",
            });
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const handleUpdateTask = async (task) => {
        try {
            const resp = await APICall({
                url: `/api/tasks/${task.id}`,
                method: "put",
                data: {
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate,
                },
            });
            toast.success(resp.data.message);
            todoContext.setTodo(
                _.sortBy(
                    [
                        ...todoContext.todo.filter(
                            (_item) => _item.id !== task.id
                        ),
                        { ...resp.data.data },
                    ],
                    "dueDate"
                )
            );
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    const priorityOptions = [
        { value: "low", label: "Low" },
        { value: "normal", label: "Normal" },
        { value: "high", label: "High" },
    ];

    const todoContext = React.useContext(TodoContext);

    return (
        <>
            <div className="form">
                <div className="form-field">
                    <input
                        value={task.title}
                        name="title"
                        onChange={handleChangeTaskInfo}
                    />
                </div>
                <div className="form-field">
                    <label>Description</label>
                    <textarea
                        value={task.description}
                        rows={5}
                        name="description"
                        onChange={handleChangeTaskInfo}
                    />
                </div>
                <div className="form-group">
                    <div className="form-field">
                        <label>Due Date</label>
                        <input
                            type="date"
                            value={task.dueDate}
                            min={TODAY}
                            name="dueDate"
                            onChange={handleChangeTaskInfo}
                        />
                    </div>
                    <div className="form-field">
                        <label>Priority</label>
                        <select
                            value={task.priority}
                            name="priority"
                            onChange={handleChangeTaskInfo}
                        >
                            {priorityOptions.map((_option) => (
                                <option
                                    value={_option.value}
                                    key={_option.value}
                                >
                                    {_option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-field">
                    <button className="btn success fluid" onClick={handleSave}>
                        Save
                    </button>
                </div>
                {!task.id && (
                    <div className="form-field">
                        <Link to="/">
                            <button className="btn fluid">Back</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}

export default TodoDetail;
