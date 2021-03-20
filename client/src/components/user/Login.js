import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../redux/user/user-actions'




export const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const alter = userAlter()
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)


    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            alter.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alter, history, isAuthenticated])

    return (
        <div>

        </div>
    )
}
