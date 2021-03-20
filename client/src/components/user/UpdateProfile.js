import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, update } from '../../redux/user/user-actions'

export const UpdateProfile = ({ history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.profile)


    useEffect(() => {


        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (error) {
            dispatch(clearErrors());
        }
        if (isUpdated) {
            dispatch(loadUser());
            history.push('/me')
            dispatch({
                type: "UPDATE_PROFILE_RESET"
            })
        }


    }, [dispatch, alert, error, history, isUpdated])


    const submitHandler = (e) => {
        e.preventDefault();
        const userData = { name, email }
        dispatch(update(userData))
    }


    return (
        <>

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        
                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update</button>
                    </form>
                </div>
            </div>

        </>
    )
}
