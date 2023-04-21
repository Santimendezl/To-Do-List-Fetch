import React, {useState} from "react";


//create your first component
const Home = () => {

	const [task, setTask] = useState('');
	const [todoList, setTodoList] = useState([]);

	//Función añadir tareas
	function addTask(e){
		if(e.key === 'Enter') {
			setTodoList(todoList.concat(e.target.value));	
			setTask("");
		}
	}
	//Función eliminar tarea
	function removeTask(e){
		todoList.filter((item)=>)

	}



	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5" >
			<h1>To Do List</h1>
			<div className="vstack gap-1 col-md-5 mx-auto shadow-lg mb-5 bg-body text-center border ps-5 pt-3" style={{width:'75%'}}>
			<input type="text"  className="border border-0" onChange={e => setTask(e.target.value)} value={task} onKeyDown={addTask} placeholder="Write a task..."/>
			<hr className="border border-opacity-25"></hr>
			<ul>{todoList.map((item, index) => <li key={index} onclick={removeTask(index)}> {item} <button ></button></li>)}</ul>
			</div>
		</div>
	);
};

export default Home;index
