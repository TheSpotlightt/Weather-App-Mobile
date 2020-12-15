import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export default function Forecast (props) {
    const [forecast, getForecast] = useState([]);
    const forecastArray = [forecast];
    const location = props.location;

    const [date, getDate] = useState([])

    useEffect(() => {
        (
            async () => {
                await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4315ea41a7154405934153414200109&q=London&days=5`)
                .then(response => response.data)
                .then(data => {
                    getForecast(data)
                })
            }
        )()
    }, [])


    useEffect(() => {
            forecastArray.map((index) => (
                    console.log(index)
                
            ))
    })

    return (
        <View>
            <Text>Forecast</Text>

        </View>
    )
}