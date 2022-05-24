import axios from "axios";
import { FETCH_DATA } from "./types";

export function fetchData(dataToSubmit) {
    // console.log(dataToSubmit.site);
    if (dataToSubmit.site === 'saramin') {
        const request = axios.post('/api/data/saramin', dataToSubmit)
            .then(response => response.data)
        return {
            type: FETCH_DATA,
            payload: request
        }
    } else if (dataToSubmit.site === 'jobkorea') {
        const request = axios.post('/api/data/jobkorea', dataToSubmit)
            .then(response => response.data)
        return {
            type: FETCH_DATA,
            payload: request
        }
    }
}