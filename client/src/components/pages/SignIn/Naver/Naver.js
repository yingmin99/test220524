import React, { useEffect, useRef } from 'react';
import { NAVER_JAVASCRIPT_KEY } from "../../../Config";
import { NAVER_CALLBACK_URL } from "../../../Config";
import './Naver.css';
//import styles from './Naver.css';

const Naver = () => {
    const naverRef = useRef();

    useEffect(() => {
        const naverScript = document.createElement("script");
        naverScript.src = "https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2-nopolyfill.js";
        naverScript.type = "text/javascript";
        document.head.appendChild(naverScript);

        naverScript.onload = () => {
            const naverLogin = new window.naver.LoginWithNaverId({
                clientId: NAVER_JAVASCRIPT_KEY,
                callbackUrl: NAVER_CALLBACK_URL,
                isPopup: false, // popup 형식으로 띄울것인지 설정
                loginButton: { color: 'green', type: 3, height: '55' }, //버튼의 스타일, 타입, 크기를 지정
            });
            naverLogin.init();
            naverLogin.logout(); //네이버 로그인이 계속 유지되는 경우가 있음, 초기화시 로그아웃
        }
    }, []);

    const handleClick = () => {
        naverRef.current.children[0].click();
    }

    return (
        <>
            <div ref={naverRef} id="naverIdLogin"></div>
            <button onClick={handleClick} className="naver" >
                <img src={require('../../commons/images/naver/btnG_icon_square.png')} alt="naver" />
                Login with Naver
            </button>
        </>
    );
};

export default Naver;
