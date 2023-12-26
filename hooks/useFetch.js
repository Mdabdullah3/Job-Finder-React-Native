import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (endpoint, query) => {
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, seterror] = useState(true)

    // Data Fething 
    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': "912a3265b7msh4ced451a0e77ec4p14c8f5jsnf3689fe16d77",
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {
            ...query
        },
    };
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.request(options)
            setdata(response.data);
            setLoading(false);
        }
        catch {
            seterror()
            alert('There was an error fetching data')
        }
        finally {

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refetch = () => {
        setLoading(true)
        fetchData()
    }
    return { data, loading, error, refetch }
};

export default useFetch;