import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const style = {
	li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
	liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize `,
	row: `flex`,
	text: `ml-2 cursor-pointer`,
	textComplete: `ml-2 cursor-pointer line-through`,
	button: `cursor-pointer flex items-center`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
	return (
		<li className={todo.completed ? style.liComplete : style.li}>
			<div className={style.row}>
				<input
					data-testid="todo-checkbox"
					onChange={() => toggleComplete(todo)}
					checked={todo.completed ? "checked" : ""}
					type="checkbox"
				/>
				<p
					onClick={() => toggleComplete(todo)}
					className={todo.completed ? style.textComplete : style.text}
				>
					{todo.text}
				</p>
			</div>
			<button data-testid="todo-delete" onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
		</li>
	);
};

export default Todo;
