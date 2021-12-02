const mysqlTask = require("../../databases/mysql/facade/task");

async function getAll(req, res) {
    try {
        const tasks = await mysqlTask.getAll();
        res.status(200).json({ data: tasks, message: "Tasks retrieved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
}

async function create(req, res) {
    try {
        const { title, description, dueDate, priority } = req.body;
        const task = {
            title,
            description,
            dueDate,
            priority,
        };
        const taskId = await mysqlTask.create(task);
        task.id = taskId;
        res.status(201).json({ data: task, message: "Task created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { title, description, dueDate, priority } = req.body;
        const task = {
            title,
            description,
            dueDate,
            priority,
            id,
        };
        await mysqlTask.update(id, task);
        res.status(200).json({ data: task, message: "Task updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        await mysqlTask.remove(id);
        res.status(200).json({ message: "Task removed", data: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
}

async function bulkComplete(req, res) {
    try {
        const { ids } = req.body;
        await mysqlTask.bulkComplete(ids);
        res.status(200).json({ message: "Tasks completed", data: ids });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
}

async function bulkRemove(req, res) {
    try {
        const { ids } = req.body;
        await mysqlTask.bulkRemove(ids);
        res.status(200).json({ message: "Tasks removed", data: ids });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message, data: null });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    bulkComplete,
    bulkRemove,
};
