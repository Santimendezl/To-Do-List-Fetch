import React, {useState} from "react";


//create your first component
const Home = () => {

	const [inputValue, setInputValue ] = useState('');

	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5" >
			<h1>To Do List</h1>
			<div className="vstack gap-1 col-md-5 mx-auto shadow-lg mb-5 bg-body text-center border ps-5 pt-3" style={{width:'75%'}}>
			<input type="text" className="border border-0" onChange={e => setInputValue(e.target.value)} value={inputValue} placeholder="Write a task..."/>
			<hr className="border border-opacity-25"></hr>
			<p>{inputValue}</p>
			</div>
		</div>
	);
};

export default Home;
