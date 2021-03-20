import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/user/user-actions'

export const Register = ({ history }) => {


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = user
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/logo192.png')

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/')
        }

        if (error) {
            dispatch(clearErrors())
        }

    }, [dispatch, history, isAuthenticated])

    const submitHandler = e => {
        e.preventDefault();


        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('avatar', avatar)

        dispatch(register(formData))

    }

    return (
        <div>

        </div>
    )
}
