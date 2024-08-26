import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoUi({ darkMode, setTodos }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTodo = (title, description) => {
        fetch("https://mern-todo-api-livid.vercel.app/todos", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        }).then((resp) => {
            fetch("https://mern-todo-api-livid.vercel.app/todos", {
                method: "GET",
            }).then((resp) => {
                resp.json().then((data) => {
                    setTodos(data)
                });
            });
        })
    }

    return (
        <div className="d-flex justify-content-center align-items-center pt-3">
            <div className="card" style={{ width: '30%' }}>
                <div className="card-body">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button
                        className="btn"
                        style={{
                            backgroundColor: '#942fad',
                            color: darkMode ? 'white' : 'white',
                        }}
                        onClick={() => handleTodo(title, description)}
                    >
                        Add Todo
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TodoUi;
