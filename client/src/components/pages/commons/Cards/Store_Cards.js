import React from 'react'
import CardItem from '../CardItem/CardItem'
import './Cards.css';
// import GridCards from './GridCards';
// import { Row } from 'antd';

function Cards(props) {
    console.log('shopdata 0 : '+ JSON.stringify(props.shopdata[0]))
    console.log('shopdata 1 : '+ JSON.stringify(props.shopdata[1]))
    console.log('shopdata 2 : '+ JSON.stringify(props.shopdata[2]))
    return (
        <div className='cards'>
            <h1>서울시가 지정한 저렴한 가격의 착한 가게들을 한번 둘러보세요!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    {/* 추가 */}
                    <ul className='cards__items'>
                        <CardItem
                            src={require('../images/img-20.jpg')}
                            text='주변보다 저렴한 가격으로 서비스하며 어르신 파마와 커트 시 할인해주는 업소.'
                            label='장미미용실'
                            path='/store/00000263'
                            data={props.shopdata[0]}
                        />
                        <CardItem
                            src={require('../images/img-21.jpg')}
                            text='시간연장 서비스 만빵!!! 학생분들 환영합니다. 학생은 왕이다..'
                            label='홍노래방'
                            path='/store/00000272'
                            data={props.shopdata[1]}
                        />
                        <CardItem
                            src={require('../images/img-22.jpg')}
                            text='청결한 위생관리와 매일 싱싱한 재료로 요리하며 종업원 모두가 성심성의껏 손님을 대함.'
                            label='무진장'
                            path='/store/00000443'
                            data={props.shopdata[2]}
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards