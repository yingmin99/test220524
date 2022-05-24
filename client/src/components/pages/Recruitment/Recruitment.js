import React from 'react';
import Auth from "../../../hoc/auth";
import CardItem from '../commons/CardItem/CardItem';
import '../commons/Cards/Cards.css';

function Recruitment() {
    return (
        <>
            <div className='cards'>
                <h1>직무별 채용 정보</h1>
                <div className='cards__container'>
                    <div className='cards__wrapper'>
                        <ul className='cards__items'>
                            <CardItem
                                src={require('../commons/images/recruitment/creator.jpg')}
                                text='SNS, 유튜브, 영상 컨텐츠'
                                label='크리에이터'
                                path='/recruitment/information?searchword=크리에이터'
                            />
                            <CardItem
                                src={require('../commons/images/recruitment/customer_agent.jpg')}
                                text='통신사, 증권사, 쇼핑몰, 고객 센터'
                                label='고객 상담사'
                                path='/recruitment/information?searchword=고객+상담사'
                            />
                        </ul>
                        <ul className='cards__items'>
                            <CardItem
                                src={require('../commons/images/recruitment/graphic_designer.jpg')}
                                text='포토샵, 일러스트, 3D, 모션 그래픽'
                                label='그래픽 디자이너'
                                path='/recruitment/information?searchword=그래픽+디자이너'
                            />
                            <CardItem
                                src={require('../commons/images/recruitment/patent_attorney.jpg')}
                                text='지식재산권, 상표디자인, 이공계 분야 변리사'
                                label='변리사'
                                path='/recruitment/information?searchword=변리사'
                            />
                            <CardItem
                                src={require('../commons/images/recruitment/software_developer.jpg')}
                                text='임베디드, 리눅스, 반도체, AI'
                                label='소프트웨어 개발자'
                                path='/recruitment/information?searchword=소프트웨어+개발자'
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Auth(Recruitment, true);