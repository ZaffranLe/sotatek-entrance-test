import React from "react";

const TodoContext = React.createContext({
    todo: [],
    setTodo: () => {},
    checkedTasks: [],
    setCheckedTasks: () => {},
});

export default TodoContext;
