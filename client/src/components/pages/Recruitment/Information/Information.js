import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";
import './Information.css'

function Information() {
    const dispatch = useDispatch();
    const location = useLocation();
    console.log('갖고온 파라미터 : ' + decodeURI(location.search));

    // pathname: "/recruitment/information"
    // 사람인 search: "?searchword=소프트웨어+개발자"
    // 잡코리아 search: "?searchword=소프트웨어%20개발자"

    // 소프트웨어 개발자 + 서울전체 + 연봉 3000 이상
    // 사람인 : https://www.saramin.co.kr/zf_user/ 
    //search?searchType=search&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&loc_mcd=101000&sal_min=11&keydownAccess= 
    //&searchword=소프트웨어+개발자&panel_type=&search_optional_item=y&search_done=y&panel_count=y&abType=b

    // 잡코리아 : https://www.jobkorea.co.kr/Search/ 
    //?stext=소프트웨어%20개발자&local=I000&payType=1&payMin=3000

    const [Career] = useState(location.search);
    const [Location] = useState('');
    const [Salary] = useState('');

    const [SaraminData, setSaraminData] = useState([]);
    const [JobkoreaData, setJobkoreaData] = useState([]);

    useEffect(() => {
        const dataToSubmit = {
            site: 'saramin',
            searchword: Career,
            loc_mcd: Location,
            sal_min: Salary,
        }
        function fetchSaraminData(dataToSubmit) {
            dispatch(fetchData(dataToSubmit))
                .then(res => { console.log(JSON.stringify(res)); return res.payload.data })
                .then(data => {
                    console.log(data);
                    setSaraminData(data);
                })
        }
        fetchSaraminData(dataToSubmit);
    }, [dispatch,Career, Location, Salary]);

    useEffect(() => {
        let arr = Career.split('=');
        const dataToSubmit = {
            site: 'jobkorea',
            stext: arr[1],
            local: Location,
            payMin: Salary,
        }
        function fetchJobkoreaData(dataToSubmit) {
            dispatch(fetchData(dataToSubmit))
                .then(res => { console.log(res); return res.payload.data })
                .then(data => {
                    console.log(data);
                    setJobkoreaData(data);
                })
        }
        fetchJobkoreaData(dataToSubmit);
    }, [dispatch,Career, Location, Salary]);

    const renderSarmainData = SaraminData.map((item, index) => {
        return <tr key={index}>
            <td>{item.title}</td>
            <td> <a href={`https://www.saramin.co.kr${item.url}`}>사람인으로 자세히 보러가기</a></td>
            <td>{item.date}</td>
            <td>{item.condition}</td>
            <td>{item.sector}</td>
            <td>{item.corp}</td>
            <td>{item.affiliate}</td>
        </tr>
    })

    const renderJobkoreaData = JobkoreaData.map((item, index) => {
        return <tr key={index}>
            <td>{item.title}</td>
            <td><a href={`https://www.jobkorea.co.kr${item.url}`}>잡코리아로 자세히 보러가기</a></td>
            <td>{item.date}</td>
            <td>{item.condition}</td>
            <td>{item.sector}</td>
            <td>{item.corp}</td>
            <td></td>
        </tr>
    })

    return (
        <div className='wrapper'>
            <h2>Information</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                        <th>Date</th>
                        <th>Condition</th>
                        <th>Sector</th>
                        <th>Corp</th>
                        <th>Affiliate</th>
                    </tr>
                </thead>
                <tbody>
                    {SaraminData && renderSarmainData}
                    {JobkoreaData && renderJobkoreaData}
                </tbody>
            </table>
        </div>
    )
}

export default Information