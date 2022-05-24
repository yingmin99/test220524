import React, { useState } from "react";
import { loginUser } from "../../../../_actions/user_action";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Auth from "../../../../hoc/auth";
import Kakao from "../Kakao/Kakao";
import Naver from "../Naver/Naver";
import Modal from "../../commons/Modal/Modal";
import ResetUser from "../../ResetUser/ResetUser";
import moment from "moment";

const { Title } = Typography;

function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(moment().unix())

    // RememberMe
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [formErrorMessage, setFormErrorMessage] = useState('')
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    // Forgot email, password modal
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: initialEmail,
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    password: Yup.string()
                        .min(6, 'Password must be at least 6 characters')
                        .required('Password is required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        let dataToSubmit = {
                            email: values.email,
                            password: values.password
                        };

                        dispatch(loginUser(dataToSubmit))
                            .then(response => {
                                if (response.payload.loginSuccess) {
                                    window.localStorage.setItem('userId', response.payload.userId);
                                    if (rememberMe === true) {
                                        window.localStorage.setItem('rememberMe', values.email);
                                    } else {
                                        localStorage.removeItem('rememberMe');
                                    }
                                    // props.history.push("/");
                                    navigate('/');
                                } else {
                                    setFormErrorMessage('Check out your Account or Password again')
                                }
                            })
                            .catch(err => {
                                setFormErrorMessage('Check out your Account or Password again')
                                setTimeout(() => {
                                    setFormErrorMessage("")
                                }, 3000);
                            });
                        setSubmitting(false);
                    }, 500);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        // dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        // handleReset,
                    } = props;
                    return (
                        <div className="app" style={{ paddingTop: '5rem', width: '350px', margin: '0 auto' }} >

                            <Title level={2} style={{ textAlign: 'center' }}>Log In</Title>
                            {/* <form onSubmit={handleSubmit} style={{ width: '350px' }}> */}
                            <form className="login-form" onSubmit={handleSubmit} >

                                <Form.Item required>
                                    <Input
                                        id="email"
                                        prefix={
                                            <UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                        }
                                        placeholder="Enter your email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.email && touched.email && (
                                        <div className="input-feedback">{errors.email}</div>
                                    )}
                                </Form.Item>

                                <Form.Item required>
                                    <Input
                                        id="password"
                                        prefix={
                                            <LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />
                                        }
                                        placeholder="Enter your password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                    />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.password}</div>
                                    )}
                                </Form.Item>

                                {formErrorMessage && (
                                    <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
                                )}

                                <Form.Item>
                                    <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>

                                    <Button onClick={openModal} style={{ float: 'right' }}>forgot email / password</Button>

                                    <div>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                                            Log in
                                        </Button>
                                    </div>
                                </Form.Item>
                            </form>
                            Or <a href="/sign-up">register now!</a>
                            <Modal open={modalOpen} close={closeModal} header="Find your email / password">
                                <ResetUser />
                            </Modal>
                        </div>
                    );
                }}
            </Formik>
            <Kakao />
            <Naver />
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
            <div>.</div>
        </>
    );
};

export default Auth(SignIn, false);