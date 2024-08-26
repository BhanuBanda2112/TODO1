import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddTodo({ todos, setTodos }) {
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    if (!Array.isArray(todos)) {
        return null;
    }

    const handleDel = (id) => {
        fetch(`https://mern-todo-api-livid.vercel.app/todos/${id}`, {
            method: 'DELETE'
        }).then((resp) => {
            resp.json().then((data) => {
                setTodos(data);
            });
        });
    }

    const handleEdit = (id) => {
        fetch(`https://mern-todo-api-livid.vercel.app/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: updatedTitle,
                description: updatedDescription
            })
        }).then((resp) => {
            resp.json().then((data) => {
                setTodos(data);
                setEditMode(false);
                setEditId(null);
            });
        });
    }

    return (
        <>
            {todos.map((todo) => (
                <div key={todo.id} className="d-flex justify-content-center align-items-center pt-3">
                    <div className="card" style={{ width: '30%', textAlign: 'center', marginLeft: '6%', marginRight: 10 }}>
                        <div className="card-body">
                            {editMode && editId === todo.id ? (
                                <>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updatedTitle}
                                            onChange={e => setUpdatedTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updatedDescription}
                                            onChange={e => setUpdatedDescription(e.target.value)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="card-title">{todo.title}</h2>
                                    <p className="card-text">{todo.description}</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <button onClick={() => handleDel(todo.id)} className="btn btn-danger mb-2">Delete</button>
                        {editMode && editId === todo.id ? (
                            <button onClick={() => handleEdit(todo.id)} className="btn btn-success">Save</button>
                        ) : (
                            <button onClick={() => { setEditMode(true); setEditId(todo.id); setUpdatedTitle(todo.title); setUpdatedDescription(todo.description); }} className="btn btn-success">Edit</button>
                        )}
                    </div >
                </div>
            ))}
        </>
    )
}

export default AddTodo;
