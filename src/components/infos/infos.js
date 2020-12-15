import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { 
    Wrapper, 
    ContainerScroll,
    CurrentInfos,
    Location,
    LocalTemperature,
    LocalCondition,
    ConditionIcon,
    ImgContainer,
    ForecastContainer,
    DailyConditions,
    ForecastImgContainer,
    ForecastTemperature,
    SaveButton
} from './styles';

export default function WeatherInfos ( { route } ) {
    const [weatherInfos, getWeatherInfos] = useState([]);
    const weatherInfosArray = [weatherInfos];
    const getLocation = route.params.location;

    const [temp, getTemp] = useState([]);
    const [local, getLocal] = useState([]);
    const [condition, getConditions] = useState([]);
    const [icon, getIcon] = useState([]);
    const [ forecastDays, getForecastDays ] = useState([]);

    useEffect(() => {
        (
            async () => {
                await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4315ea41a7154405934153414200109&q=${getLocation}&days=5`)
                .then(response => response.data)
                .then(data => {
                    getWeatherInfos(data)
                })
            }
        )()
    }, [getLocation]);

    useEffect(() => {
        {
            weatherInfosArray.map((index, key) => {
                <View key={key}>
                    {
                        index.location && (
                            <>
                                { getLocal(index.location.name) }
                                { getTemp(index.current.temp_c) }
                                { getConditions(index.current.condition.text) }
                                { getIcon(index.current.condition.icon) }
                                { getForecastDays(index.forecast.forecastday) }
                            </>
                        )
                    }
                </View>
            })
        }
    });


    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('locationSaved', jsonValue)
            console.log(jsonValue)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Wrapper>
            <ContainerScroll>
                <CurrentInfos>
                    <Location> {local} </Location>
                    <LocalTemperature> {temp} °C </LocalTemperature>
                    <ImgContainer>
                        <LocalCondition> {condition} </LocalCondition>
                        <ConditionIcon
                            source={{
                                uri: `https:${icon}`,
                            }}
                        />
                    </ImgContainer>
                </CurrentInfos>
                
                {
                    forecastDays.map((index, key)=> (
                        <ForecastContainer key={key}>
                            <DailyConditions> {new Date(index.date).toString().split(' ')[0]} • {index.day.condition.text} </DailyConditions>
                            <ForecastImgContainer>
                                <ForecastTemperature> {index.day.maxtemp_c} °C / {index.day.mintemp_c} °C </ForecastTemperature>
                                <ConditionIcon
                                    source={{
                                        uri: `https:${index.day.condition.icon}`,
                                    }}
                                />
                            </ForecastImgContainer>
                        </ForecastContainer>
                    ))
                }
                <TouchableOpacity onPress={() => storeData(getLocation)}>
                    <SaveButton> Save </SaveButton>
                </TouchableOpacity>
            </ContainerScroll>
        </Wrapper>
    )
}