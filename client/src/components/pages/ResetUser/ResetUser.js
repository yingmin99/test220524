import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { findUser } from '../../../_actions/user_action';
import { Button } from 'antd';
import GenerateToken from '../SendEmail/GenerateToken';

// 이메일, 비밀번호 찾기 (sign-in page 모달)
function ResetUser() {
    const dispatch = useDispatch();
    const [Result, setResult] = useState([]);
    const [IsExist, setIsExist] = useState(null);
    const [TypeOf, setTypeOf] = useState(null);
    const [Email, setEmail] = useState('');

    const renderResult = Result.map((item, index) => {
        return <div key={index}>{item}</div>
    })

    const renderEmail = () => {
        if (IsExist) {
            if (TypeOf === 'kakao') {
                return <div>카카오로 로그인한 계정입니다.</div>
            } else if (TypeOf === 'naver') {
                return <div>네이버로 로그인한 계정입니다.</div>
            } else if (TypeOf === 'allterier') {
                return <><div>{Email}</div><GenerateToken email={Email} /></>
            } else if (TypeOf === '검색중...') {
                return <div>검색중...</div>
            } else {
                return <div>ERROR!</div>
            }
        }
        return <div>검색 결과가 없습니다.</div>
    }

    return (
        <>
            <div>
                <h3>이메일 찾기</h3>
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string()
                            .max(16, 'Name is too long.')
                            .required('Name is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            setResult(['검색중...']);
                            let dataToSubmit = {
                                dataType: 'name',
                                value: values.name
                            };

                            dispatch(findUser(dataToSubmit))
                                .then(response => {
                                    if (response.payload.findSuccess) {
                                        // 검색 결과 있음.
                                        let result = [];
                                        let data = response.payload.user;
                                        data.forEach((currentElement, index, array) => {
                                            let email = currentElement.email;
                                            //     console.log('요소 : ' + currentElement.email);
                                            //     console.log('인덱스 : ' + index);
                                            //     console.log(array);

                                            // 문자열의 중간 글자들을 *로 만들기
                                            const maskingName = function (email) {
                                                let originName = email.split('');

                                                for (let i = 0; i < originName.length; i++) {
                                                    if (
                                                        originName[i] === '.'
                                                    ) break;
                                                    if (
                                                        i === 0
                                                        || i === 1
                                                        || originName[i - 1] === '@'
                                                        || originName[i] === '@'
                                                        || originName[i + 1] === '@'
                                                    ) continue;
                                                    originName[i] = '*';
                                                }

                                                const joinName = originName.join();
                                                return joinName.replace(/,/g, '');
                                            };
                                            result.push(maskingName(email));
                                        })
                                        setResult(result);
                                    } else {
                                        // 검색 결과 없음.
                                        setResult(['검색 결과가 없습니다.']);
                                    }
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
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        id='name'
                                        type='text'
                                        placeholder="Enter your name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>검색</Button>
                                    &nbsp;
                                    <Button onClick={() => { handleReset(); setResult([]); }}>다시 쓰기</Button>
                                    {errors.name && touched.name && (
                                        <div>{errors.name}</div>
                                    )}
                                </Form>
                                {Result && renderResult}
                            </>
                        );
                    }}
                </Formik>
            </div>
            <br />
            <div>
                <h3>비밀번호 초기화 이메일 보내기</h3>
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email is required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setIsExist('검색중...');
                        setTypeOf('검색중...');
                        setEmail('');
                        setTimeout(() => {
                            let dataToSubmit = {
                                dataType: 'email',
                                value: values.email,
                            };

                            dispatch(findUser(dataToSubmit))
                                .then(response => {
                                    const data = response.payload;
                                    if (data.findSuccess) {
                                        // 검색 결과 있음.
                                        setIsExist(true);
                                        setEmail(values.email);
                                        if (data.user.oAuthId === null)
                                            setTypeOf('allterier');
                                        else if (data.user.oAuthId.length === 10)
                                            setTypeOf('kakao');
                                        else
                                            setTypeOf('naver');
                                    } else {
                                        // 검색 결과 없음.
                                        setIsExist(false);
                                    }
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
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset,
                        } = props;

                        return (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <Field
                                        id='email'
                                        type='text'
                                        placeholder="Enter your email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>검색</Button>
                                    &nbsp;
                                    <Button onClick={() => { handleReset(); setIsExist(null); setEmail(''); setTypeOf(null); }}>다시 쓰기</Button>
                                    {errors.email && touched.email && (
                                        <div>{errors.email}</div>
                                    )}
                                </Form>
                                {IsExist != null && renderEmail()}
                            </>
                        );
                    }}
                </Formik>
            </div>
        </>
    )
}

export default ResetUser