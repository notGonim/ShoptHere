import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'

export const ProtectedRoutes = ({ component: Component, ...rest }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    return (
        <>
             {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }


                        return <Component {...props} />
                    }}
                />
            )}
        </>
    )
}
