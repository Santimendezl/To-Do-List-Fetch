import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';

const Home = () => {

	//Declaración estados	
	const [task, setTask] = useState('');
	// const [data, setData] = useState([]);
	const [list, setList] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [counter, setCounter] = useState(0);

	//Función añadir tareas
	function handleAddTask(e){
		if(e.key === 'Enter' && e.target.value != "") {
			setList(list.concat({label:e.target.value, done: false}));
			setCounter(counter + 1);
			setTask("");
			// setData(data.concat)
		}
	}

	//Función eliminar tarea
	 function handleRemoveTask(id){
		if(selectedTask === id){
	 	setList(list.filter((item, index) => index !== id));	
		}	
		setCounter(counter - 1);
	 }
	
	//Función contador de tareas
	function countTasks(){
	if (counter === 0) return "No hay tareas, añadir tareas" ;
	else if (counter === 1) return "Tienes 1 tarea pendiente";
	else  return "Tienes " + counter + " tareas pendientes";	
	}

	//Función para obtener  datos de la API
	function getTodoList(){
		fetch('https://assets.breatheco.de/apis/fake/todos/user/santiml')
			.then(response => response.json())
			.then(data => setList(data))
			.catch(err => console.log(err));
	}

	useEffect(() => {
		//useEffect funciona como onload y ejecuta el codigo que tiene dentro ni bien se carga el componente
		getTodoList();
		
	}, []);

	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5" >
			<h1>To Do List</h1>
			<div className="shadow
			 border px-5 pt-3" style={{width:'60%'}}>
			<input type="text"  
			className="border border-0 w-100 pb-3" 
			onChange={e => setTask(e.target.value)} value={task} 
			onKeyDown={handleAddTask} 
			placeholder="Añade una tarea..."/>
			<ul className="list-group list-group-flush ">
				{list.map((item, index) => <li className="list-group-item" key={index} onMouseOver={() => setSelectedTask(index)}> 
				{item.label} 
				{selectedTask === index && (<button className="btn text-danger ms-auto float-end"  onClick={() => handleRemoveTask(index)}>
					<FontAwesomeIcon icon={faXmark} />
				</button>)}
				</li>)}
			</ul> 
			<p className="fs-6 ps-3 border-top pt-3">{countTasks()}</p>
			</div>	
		</div>
	);
};

// 
export default Home;
