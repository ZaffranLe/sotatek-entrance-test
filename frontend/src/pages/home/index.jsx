import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { TodoItem, TodoBulkAction } from "../../components";
import TodoContext from "../../context/todo";
import APICall from "../../utils/api-call";

function Home() {
    const [todo, setTodo] = useState([]);
    const [search, setSearch] = useState("");
    const [checkedTasks, setCheckedTasks] = useState([]);

    useEffect(() => {
        fetchTodo();
    }, []);

    const fetchTodo = async () => {
        try {
            const resp = await APICall({
                url: "/api/tasks",
                method: "get",
            });
            const { data, message } = resp.data;
            setTodo(data);
            toast.success(message);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <TodoContext.Provider
                value={{
                    todo: todo,
                    setTodo: setTodo,
                    checkedTasks: checkedTasks,
                    setCheckedTasks: setCheckedTasks,
                }}
            >
                <div className="container">
                    <h1 className="text-center">To Do List</h1>
                    <Link to="/new-task">
                        <button className="btn success">Add</button>
                    </Link>
                    <div className="search-box">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="fluid"
                        />
                    </div>
                    {todo.length > 0 ? (
                        todo
                            .filter((_todo) =>
                                _todo.title
                                    .trim()
                                    .toLowerCase()
                                    .includes(search.trim().toLowerCase())
                            )
                            .map((_todo) => (
                                <TodoItem
                                    key={_todo.id}
                                    todo={_todo}
                                />
                            ))
                    ) : (
                        <p className="text-center">No Tasks</p>
                    )}
                </div>
                {checkedTasks.length > 0 && <TodoBulkAction />}
            </TodoContext.Provider>
        </>
    );
}

export default Home;
