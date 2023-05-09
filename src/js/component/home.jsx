import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  // Declaración estados
  const [task, setTask] = useState('')
  const [list, setList] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  // const [counter, setCounter] = useState(0)

  // Función añadir tareas
  function handleAddTask (e) {
    if (e.key === 'Enter' && e.target.value != '') {
      setList(list.concat({ label: e.target.value, done: false }))
      //setCounter(counter + 1)
      let aux = list.concat({ label: e.target.value, done: false }) //creamos array auxiliar para prevenir el delay en el fetch y los pasamos como parámetro
      setTask('')
      setTodoList(aux)
    }
  }

  // Función eliminar tarea
  function handleRemoveTask (id) {
    if (selectedTask === id) {
      setList(list.filter((item, index) => index !== id))
    }
    //setCounter(counter - 1)
    let aux = list.filter((item, index) => index !== id) //creamos array auxiliar para prevenir el delay en el fetch y los pasamos como parámetro
    setTodoList(aux)
    // console.log(list)
  }

  // Función contador de tareas
  function countTasks () {
    list.length
    if (list.length === 0) return 'No hay tareas, añadir tareas'
    else if (list.length === 1) return 'Tienes 1 tarea pendiente'
    else return 'Tienes ' + list.length + ' tareas pendientes'
  }

  // Función para obtener datos de la API
  function getTodoList () {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/santiml')
      .then(response => response.json())
      .then(data => setList(data))
      .catch(err => console.log(err))
  }

  // Función para agregar/borrar datos en la API. Update la nueva lista

  function setTodoList (lista) {
    // console.log(lista);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/santiml', {
      method: 'PUT',
      body: JSON.stringify(lista),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(resp => {
        console.log(resp.ok) // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status) // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()) // Intentará devolver el resultado exacto como cadena (string)
        return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //resp.status === 200 ? setList(data) : setTodoList() // No hace falta validar status
        console.log(data);
      })
      .catch(error => {
        // manejo de errores
        console.log(error)
      })
  }

  // Cargar la lista cada vez que se recarga la página
  useEffect(() => {
    // useEffect funciona como onload y ejecuta el codigo que tiene dentro ni bien se carga el componente
    getTodoList()
  }, [])

  return (
    <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
      <h1>To Do List</h1>
      <div
        className='shadow border px-5 pt-3'
        style={{ width: '60%' }}
      >
        <input
          type='text'
          className='border border-0 w-100 pb-3'
          onChange={e => setTask(e.target.value)}
          value={task}
          onKeyDown={handleAddTask}
          placeholder='Añade una tarea...'
        />
        <ul className='list-group list-group-flush '>
          {list.map((item, index) => (
            <li
              className='list-group-item'
              key={index}
              onMouseOver={() => setSelectedTask(index)}
            >
              {item.label}
              {selectedTask === index && (
                <button
                  className='btn text-danger ms-auto float-end'
                  onClick={() => handleRemoveTask(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              )}{' '}
            </li>
          ))}{' '}
        </ul>
        <p className='fs-6 ps-3 border-top pt-3'>{countTasks()}</p>
      </div>
    </div>
  )
}

//
export default Home
