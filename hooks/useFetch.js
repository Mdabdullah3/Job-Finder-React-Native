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
            'X-RapidAPI-Key': '912a3265b7msh4ced451a0e77ec4p14c8f5jsnf3689fe16d77',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };
};

export default useFetch;