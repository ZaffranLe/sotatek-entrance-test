import React from "react";
import { TodoDetail } from "../../components";

function NewTask() {
    return (
        <>
            <div className="container">
                <h1 className="text-center">New Task</h1>
                <TodoDetail />
            </div>
        </>
    );
}

export default NewTask;
