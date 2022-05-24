import emailjs from '@emailjs/browser';
import { Button } from 'antd';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY } from '../../Config';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { generateToken, isEmailSent, deleteToken, } from '../../../_actions/user_action';
import moment from 'moment';
import axios from 'axios';

// 비밀번호 초기화 이메일 전송 버튼
const GenerateToken = (props) => {
    const dispatch = useDispatch();
    const [Activate, setActivate] = useState(true);
    const [Reason, setReason] = useState('');
    const timestamps = moment().unix();

    const dataToSubmit = {
        dataType: 'email',
        value: props.email,
        timestamps,
    }

    const genToken = () => dispatch(generateToken(dataToSubmit))
        .then(res => { return res.payload.token })

    const sendEmail = (templateParams) => emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (err) => {
            console.log('FAILED...', err);
        });

    const fetchData = () => dispatch(isEmailSent(dataToSubmit))
        .then(res => res.payload)

    const logoutHandler = () => {
        axios.get("/api/users/logout").then((response) => {
            if (response.status === 200) {
                window.localStorage.removeItem("userId");
                alert("Log Out succeeded");
            } else {
                alert("Log Out Failed");
            }
        });
    };

    if (Activate)
        return <Button onClick={async () => {
            const data = await fetchData();
            console.log("가져온 데이터 : " + JSON.stringify(data));
            if (data.isEmailSent) {
                setReason('이미 비밀번호 초기화 이메일을 보냈습니다!');
                setActivate(!Activate);
            } else {
                if (data.shouldDelete) {
                    dispatch(deleteToken(dataToSubmit));
                }
                const token = await genToken();
                let templateParams = {
                    from_name: 'help.allterier',
                    to_email: props.email,
                    message: 'Please click the URL below to reset your password. '
                        + `http://localhost:3001/reset-password/${token}`
                        + ' Ignore this email if you did not request. ',
                    reply_to: 'noReply',
                }

                sendEmail(templateParams);
                setReason('비밀번호 초기화 이메일을 보냈습니다!');
                setActivate(!Activate);
                logoutHandler();
            }
        }} disabled={!Activate}> 비밀번호 초기화 이메일 보내기</Button >
    else
        return <div>{Reason}</div>
}

export default GenerateToken;