import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {useFormik} from 'formik';
import {loginTC} from './auth-reducer';
import {Navigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';


export const Login = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 3) {
                errors.password = 'Password too short'
            }
            return errors
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Paper style={{padding: '20px', margin: '10px'}}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={'_blank'}> here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField label="Email"
                                           margin="normal"
                                           {...formik.getFieldProps('email')}
                                />
                                {
                                    formik.touched.email &&
                                    formik.errors.email &&
                                    <div style={{color: 'red'}}>{formik.errors.email}</div>
                                }
                                <TextField label="Password"
                                           type="password"
                                           margin="normal"
                                           {...formik.getFieldProps('password')}
                                />
                                {
                                    formik.touched.password &&
                                    formik.errors.password &&
                                    <div style={{color: 'red'}}>{formik.errors.password}</div>
                                }
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox checked={formik.values.rememberMe}
                                                                     {...formik.getFieldProps('rememberMe')}
                                                  />}
                                />
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </form>
                    </FormControl>
                </Grid>
            </Paper>
        </Grid>
    )
}


//Types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}