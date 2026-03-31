import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from './navSlice';
import './Nav.css'

const Nav = () => {

    const dispatch = useDispatch();
    const users = useSelector((state) => state.nav.users)
    const loading = useSelector((state) => state.nav.load)
    
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <div className="nav-wrapper">
            <h2 className="nav-title">
                <div className="nav-icon">👤</div>
                Featured Users
            </h2>

            {loading ? (
                <div className="nav-loading">
                    <div className="nav-spinner"></div>
                    <span>Loading users...</span>
                </div>
            ) : users && users.length > 0 ? (
                <ul className="nav-list">
                    {users.map((item) => (
                        <li key={item.id} className="nav-item">
                            <span className="nav-item-name">{item.name}</span>
                            <span className="nav-item-company">{item.company}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="nav-empty">
                    <div className="nav-empty-icon">📭</div>
                    <div className="nav-empty-text">No users available</div>
                </div>
            )}
        </div>
    )
}

export default Nav
