import React, { useState, useEffect } from 'react'
import axios from "axios";

//this func was called once to store cities data to db
export default function Cities() {
    const [Data, fetchData] = useState([])
    let all_cities = []
    const getData = () => {
        fetch('https://raw.githubusercontent.com/homaily/Saudi-Arabia-Regions-Cities-and-Districts/master/json/cities.json',
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res[0])
                fetchData(res)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    Data.map(city => {
        all_cities.push({
            "id": city.city_id,
            "region_id": city.region_id,
            "name_ar": city.name_ar,
            "name_en": city.name_en,
            "center_lat": city.center[0],
            "center_lon": city.center[1]
        })
    }
    );
    // axios
    // .post("http://localhost:8000/api/cities/", all_cities)
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err));

}