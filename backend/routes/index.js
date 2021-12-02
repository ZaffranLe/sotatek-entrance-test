const taskController = require("../api/controllers/task-controller");

function routes(app) {
    app.get("/api/test", (req, res) => {
        res.status(200).send();
    });
    app.get("/api/tasks", taskController.getAll);
    app.post("/api/tasks", taskController.create);
    app.put("/api/tasks/:id", taskController.update);
    app.delete("/api/tasks/:id", taskController.remove);
    app.post("/api/tasks/bulk-complete", taskController.bulkComplete);
    app.post("/api/tasks/bulk-remove", taskController.bulkRemove);
}

module.exports = routes;
