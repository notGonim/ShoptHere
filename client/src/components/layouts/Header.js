import React, { Fragment } from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import '../../App.css'
import logoImg from '../../images/shopit.png'
import { logout } from '../../redux/user/user-actions'
import { Search } from './Search'
export const Header = () => {

    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout())

    }
    return (
        <>
            <nav class="navbar row">
                <div class="col-12 col-md-3">
                    <div class="navbar-brand">
                        <Link to='/' >
                            <img src={logoImg} />
                        </Link>
                    </div>
                </div>

                <div class="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({ history }) => <Search history={history} />} />
                </div>
                <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to='/cart' style={{ textDecoration: 'none' }}>
                        <span id="cart" class="ml-3 mr-2">Cart</span>
                        <span class="ml-1 mr-3" id="cart_count">{cartItems.length}</span>
                    </Link>

                    {user ? (
                        <>

                            <Dropdown as={ButtonGroup}>
                                <Button variant="success">{user && user.name}</Button>

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                    {user && user.role === 'admin' && (
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    )}
                                    <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item" to="/" onClick={logoutHandler}>Log Out</Link>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}



                </div>
            </nav>
        </>
    )
}
