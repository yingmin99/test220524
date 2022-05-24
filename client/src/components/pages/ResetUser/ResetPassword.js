import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from "react-redux"
import Auth from "../../../hoc/auth"
import '../../App.css'
import { deleteToken, isEmailSent, resetPassword } from '../../../_actions/user_action'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
    Form,
    Input,
    Button,
    Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom'

const { Title } = Typography;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

// 비밀번호 초기화 페이지

function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useParams().token;
    const dataToSubmit = {
        dataType: 'token',
        value: token,
    }

    const [IsValid, setIsValid] = useState(false)

    const isSent = () => dispatch(isEmailSent(dataToSubmit))
        .then(res => res.payload.isEmailSent)

    useEffect(() => {
        async function fetchData() {
            // You can await here
            await isSent()
                .then((response) => { console.log(response); setIsValid(response); });
            // ...
        }
        fetchData();
    }, [isSent]);

    if (IsValid) {
        return (
            <>
                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string()
                            .min(6, 'Password must be at least 6 characters')
                            .required('Password is required'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm Password is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {

                            let dataToSubmit = {
                                dataType: 'token',
                                value: token,
                                password: values.password,
                            };

                            dispatch(resetPassword(dataToSubmit)).then(response => {
                                dispatch(deleteToken(dataToSubmit)); // 비밀번호 초기화 후 토큰 만료시키기.

                                if (response.payload.resetPasswordSuccess) {
                                    navigate('/sign-in');
                                } else {
                                    alert(response.payload.err.errmsg)
                                }
                            })

                            setSubmitting(false);
                        }, 500);
                    }}

                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            //dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;
                        return (
                            <div className="app" style={{ paddingTop: '5rem', width: '350px', margin: '0 auto' }}>
                                <div>{token}</div>
                                <div>IsValid : {IsValid.toString()}</div>
                                <Title level={2} style={{ textAlign: 'center' }}>Reset Password</Title>
                                <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

                                    <Form.Item required label="Password" hasFeedback validateStatus={errors.password && touched.password ? 'error' : touched.password ? 'success' : ''}>
                                        <Input
                                            id="password"
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

                                    <Form.Item required label="Confirm" hasFeedback>
                                        <Input
                                            id="confirmPassword"
                                            placeholder="Enter your confirmPassword"
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                            }
                                        />
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className="input-feedback">{errors.confirmPassword}</div>
                                        )}
                                    </Form.Item>

                                    <Form.Item {...tailFormItemLayout} >
                                        <Button onClick={handleSubmit} type="primary" style={{ minWidth: '5rem', marginLeft: '5%', marginRight: '10%' }} disabled={isSubmitting} >
                                            Submit
                                        </Button>
                                        <Button onClick={handleReset} type="primary" style={{ minWidth: '5rem', marginRight: '10%' }}>
                                            Reset
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </div>
                        );
                    }}
                </Formik>
            </>
        )
    } else if (!IsValid) {
        return (
            <>
                <h2>YOUR TOKEN HAS BEEN EXPIRED!</h2>
                <div>IsValid : {IsValid.toString()}</div>
                <div>Please issue a new token.</div>
            </>)
    }
}

export default Auth(ResetPassword, false);