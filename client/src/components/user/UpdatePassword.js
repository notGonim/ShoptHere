import React from 'react'

export const UpdatePassword = ({ history }) => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { error, isUpdated, loading } = useSelector(state => state.profile)

    useEffect(() => {

        if (error) {
            dispatch(clearErrors());
        }

        if (isUpdated) {

            history.push('/me')

            dispatch({
                type: "UPDATE_PROFILE_RESET"
            })
        }

    }, [dispatch, error, isUpdated, history])
    //change the implementation 
    const submitHandler = e => {
        e.preventDefault();
        const userData = { oldPassword, password }
        dispatch(update(userData))
    }


    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>
        </>
    )
}
