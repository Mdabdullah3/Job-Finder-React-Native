import { useState } from "react";
import axios from "axios";
const useFetch = (endpoint) => {
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, seterror] = useState(true)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            query: 'Python developer in Texas, USA',
            page: '1',
            num_pages: '1'
        },
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
};

export default useFetch;