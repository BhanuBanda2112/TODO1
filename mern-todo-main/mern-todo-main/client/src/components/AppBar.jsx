import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ButtonAppBar({ change, check, darkMode }) {
    return (
        <div className="container-fluid p-3">
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'transparent' }}>
                <div className="container-fluid">
                    <div className="mx-auto">
                        <h4 className={darkMode ? 'text-white' : 'text-dark'}>My Todo List</h4>
                    </div>
                    <div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                onChange={change}
                                checked={check}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" aria-label="Color switch demo"></label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
