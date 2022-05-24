import React from 'react';
import { useDispatch } from "react-redux";
import { fetchData } from "../../../../_actions/data_action";

function Scraping(dataToSubmit) {
    console.log("dataToSubmit : " + dataToSubmit)
    const dispatch = useDispatch();

    const scraping = (dataToSubmit) => {
        dispatch(fetchData(dataToSubmit))
            .then(response => {
                if (response.payload.fetchSuccess) {
                    const data = response.payload.data
                    console.log('GOOD');
                    console.log(data[0]);
                } else if (response.payload.testSuccess) {
                    console.log('TEST GOOD');
                } else {
                    console.log('ㅠㅠ');
                }
            })
    }

    return scraping(dataToSubmit);
}
export default Scraping;