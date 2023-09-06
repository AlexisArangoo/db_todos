import { DataTypes } from "sequelize";
import db_todos from "../util/db_todos.js";

const Todo = db_todos.define('todos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING(30),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING
    },

    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default Todo