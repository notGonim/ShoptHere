import React, { Fragment } from 'react'
import { Route } from 'react-router'
import '../../App.css'
import logoImg from '../../images/shopit.png'
import { Search } from './Search'
export const Header = () => {
    return (
        <>
            <nav class="navbar row">
                <div class="col-12 col-md-3">
                    <div class="navbar-brand">
                        <img src={logoImg} />
                    </div>
                </div>

                <div class="col-12 col-md-6 mt-2 mt-md-0">
                    <Route render={({history}) => <Search history={history} />} />
                </div>
                <div class="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <button class="btn" id="login_btn">Login</button>

                    <span id="cart" class="ml-3">Cart</span>
                    <span class="ml-1" id="cart_count">2</span>
                </div>
            </nav>
        </>
    )
}
