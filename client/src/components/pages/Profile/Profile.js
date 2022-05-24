import React, { useEffect, useState } from 'react';
import Auth from '../../../hoc/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';
import './Profile.css'
import GenerateToken from '../SendEmail/GenerateToken';

function Profile() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth())
            .then(res => res.payload)
            .then(raw => {
                for (raw.key in raw) {
                    // if (raw.key === '_id')
                    //     set_id(raw[raw.key])
                    if (raw.key === 'oAuthId')
                        setoAuthId(raw[raw.key])
                    // else if (raw.key === 'isAdmin')
                    //     setisAdmin(raw[raw.key].toString())
                    else if (raw.key === 'isAuth')
                        setisAuth(raw[raw.key].toString())
                    else if (raw.key === 'email')
                        setemail(raw[raw.key])
                    else if (raw.key === 'name')
                        setname(raw[raw.key])
                    else if (raw.key === 'Nickname')
                        setNickname(raw[raw.key])
                    else if (raw.key === 'role')
                        setrole(raw[raw.key])
                    else if (raw.key === 'image')
                        setimage(raw[raw.key])
                }
            })
    }, [dispatch])

    // const [_id, set_id] = useState('');
    const [oAuthId, setoAuthId] = useState(null);
    // const [isAdmin, setisAdmin] = useState('');
    const [isAuth, setisAuth] = useState('');
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [Nickname, setNickname] = useState('');
    const [role, setrole] = useState('');
    const [image, setimage] = useState('');

    return (<>
        <h1>Profile</h1>
        <div id='wrapper' className='wrapper'>
            <img className='profile_img' src={image} alt='프로필 이미지 없음' height='200' width='200' />
            {/* <span>{_id}<br /></span> */}
            {oAuthId ? oAuthId.length === 10 ? <div className='account_data'>카카오로 로그인</div> : <div className='account_data'>네이버로 로그인</div> : <div className='account_data'>알뜰리에로 로그인</div>}
            {/* <span>{isAdmin}<br /></span> */}
            {oAuthId == null && <GenerateToken email={email} />}
            {isAuth && <span className='account_data'>isAuth : {isAuth}<br /></span>}
            {email && <span className='account_data'>이메일 : {email}<br /></span>}
            {name && <span className='account_data'>이름 : {name}<br /></span>}
            {Nickname && <span className='account_data'>닉네임 : {Nickname}<br /></span>}
            {role === 0 ? (<span className='account_data'>계정 유형 : 사용자<br /></span>) : (<span className='account_data'>계정 유형 : 관리자<br /></span>)}
        </div>
    </>
    )
}

export default Auth(Profile, true); 




