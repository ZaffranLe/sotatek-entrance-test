const knex = require("../knex");

async function getAll() {
    return await knex("tasks").where({ completed: 0 }).orderBy("dueDate", "asc");
}

async function create(task) {
    const result = await knex("tasks").insert(task);
    return result[0]; // id created task
}

async function update(id, task) {
    return await knex("tasks").where({ id }).update(task);
}

async function remove(id) {
    return await knex("tasks").where({ id }).del();
}

async function bulkComplete(ids) {
    return await knex("tasks").whereIn("id", ids).update({ completed: 1 });
}

async function bulkRemove(ids) {
    return await knex("tasks").whereIn("id", ids).del();
}

module.exports = {
    getAll,
    create,
    update,
    remove,
    bulkComplete,
    bulkRemove,
};
