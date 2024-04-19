import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';

import {
    loadingToggleAction,
    signupAction,
} from '../../store/actions/AuthActions';
function Register(props) {
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onSignUp(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }

        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }

        setErrors(errorObj);

        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(signupAction(firstname, lastname, username, email, password, navigate));
    }
    return (
        <div className='authincation h-100 p-meddle'>
            <div className='container h-100'>
                <div className='row justify-content-center h-100 align-items-center'>
                    <div className='col-md-6'>
                        <div className='authincation-content'>
                            <div className='row no-gutters'>
                                <div className='col-xl-12'>
                                    <div className='auth-form'>
                                        <div className='text-center mb-3'>

                                        </div>

                                        <h4 className='text-center mb-4 text-white'>Sign up your account</h4>
                                        {props.errorMessage && (
                                            <div className='bg-red-300 text-danger border border-red-900 p-1 my-2'>
                                                {props.errorMessage}
                                            </div>
                                        )}
                                        {props.successMessage && (
                                            <div className='bg-green-300 text-danger text-green-900  p-1 my-2'>
                                                {props.successMessage}
                                            </div>
                                        )}
                                        <form onSubmit={onSignUp}>

                                            <div className='row'>
                                                <div className='form-group col-6'>
                                                    <label className='mb-1 text-white'>
                                                        <strong>First Name</strong>
                                                    </label>
                                                    <input type='text' className='form-control' placeholder='first name' name='firstname' 
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                                <div className='form-group col-6'>
                                                    <label className='mb-1 text-white'>
                                                        <strong>Last Name</strong>
                                                    </label>
                                                    <input type='text' className='form-control' placeholder='lastname' name='lastname' 
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Username</strong>
                                                </label>
                                                <input type='text' className='form-control' placeholder='username' name='name'
                                                    onChange={(e) => setUserName(e.target.value)}
                                                 />
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Email</strong>
                                                </label>
                                                <input type="email" className="form-control"
                                                    value={email}
                                                    placeholder='email'
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                                            </div>
                                            <div className='form-group'>
                                                <label className='mb-1 text-white'>
                                                    <strong>Password</strong>
                                                </label>
                                                <input type="password" className="form-control"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(e.target.value)
                                                    }
                                                    placeholder='password'
                                                />
                                            </div>
                                            {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                                            <div className='text-center mt-4'>
                                                <button type='submit' className='btn bg-white text-primary btn-block'>
                                                    Sign up
                                                </button>
                                            </div>
                                        </form>
                                        <div className='new-account mt-3 text-white'>
                                            <p>
                                                Already have an account?{' '}
                                                <Link className='text-white' to='/login'>
                                                    Sign in
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};

export default connect(mapStateToProps)(Register);
