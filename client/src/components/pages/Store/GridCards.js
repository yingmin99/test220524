import React from 'react'
import { Col } from 'antd';
import './GridCards.css';
import {Link} from 'react-router-dom';

function GridCards(props) {
 //  console.log('Line 8 props : '+JSON.stringify(props.shopData))
   const shopData = props.shopData;
    return (

        <Col lg={6} md={8} xs={24}>


            <div style={{ position: 'relative' }}>
                <div className='shop-container'>
                    <div className='shop-row'>
                        <div className='shop'>

                            {/* <a href={`/store/${props.shopId}`} >
                                
                                <h1>{props.shopName}</h1>
                            </a> */}
                            <Link to={
                                `/store/${props.shopId}`}
                         state= {shopData}
                       // state= {{text: 'hello'}}
                            ><h1>{props.shopName}</h1></Link>
                            
                            <div className='shop-data'>
                                <p className='shop-info'>{props.shopInfo}</p>
                                <p className='shop-addr'>{props.shopAddr}</p>

                            </div>
</div>
                        </div>
                    </div>
                </div>
            
        </Col>
    )
}

export default GridCards
