import React, {useState} from "react";


//create your first component
const Home = () => {

	const [task, setTask] = useState('');
	const [list, setList] = useState([]);

	//Función añadir tareas
	function addTask(e){
		if(e.key === 'Enter' && e.target.value != "") {
			setList(list.concat(e.target.value));	
			setTask("");
		}
	}
	//Función eliminar tarea
	 function removeTask(indexItem){
	 	const newList = list.filter((item, index) => index != indexItem);
		console.log(newList);
	 	// setList(newList);	
	 }
	//Función eliminar tarea
	// function removeTask(e){
	// 	todoList.filter((item,index)=>index !=e);
	// 	console.log(todoList)
	// }


	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5" >
			<h1>To Do List</h1>
			<div className="vstack gap-1 col-md-5 mx-auto shadow-lg mb-5 bg-body text-center border ps-5 pt-3" style={{width:'75%'}}>
			<input type="text"  className="border border-0" onChange={e => setTask(e.target.value)} value={task} onKeyDown={addTask} placeholder="Write a task..."/>
			<hr className="border border-opacity-25"></hr>
			<ul>{list.map((item, index) => <li key={index} > {item} <button className="btn" onClick={removeTask(index)}></button></li>)}</ul> 
			</div>
		</div>
	);
};


export default Home;
