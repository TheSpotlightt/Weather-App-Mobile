import React, { useState, useEffect } from 'react';
import { Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
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
    TableTitle,
    Table,
    Infos,
    Row1
} from './styles';

export default function WeatherInfos () {
    const [savedData, getSavedData] = useState('');
    const [weatherInfos, getWeatherInfos] = useState([]);
    const weatherInfosArray = [weatherInfos];

    const [temp, getTemp] = useState([]);
    const [local, getLocal] = useState([]);
    const [condition, getConditions] = useState([]);

    const [icon, getIcon] = useState([]);
    const [forecastDays, getForecastDays] = useState([]);
    const [feelsLike, getFeelsLike] = useState([]);

    const [wind, getWind] = useState([]);
    const [uv, getUV] = useState([]);
    const [pressure, getPressure] = useState([]);


    useEffect(() => {
        (
            async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('locationSaved');
                    
                    return getSavedData(jsonValue != null ? JSON.parse(jsonValue) : '')
                } catch(e) {
                    console.log(e)
                }
            }
        )()
    });

    useEffect(() => {
        (
            async () => {
                await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4315ea41a7154405934153414200109&q=${savedData}&days=5`)
                .then(response => response.data)
                .then(data => {
                    getWeatherInfos(data)
                })
            }
        )()
    }, [savedData]);

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
                                { getFeelsLike(index.current.feelslike_c) }
                                { getWind(index.current.wind_kph) }
                                { getUV(index.current.uv) }
                                { getPressure(index.current.pressure_mb) }
                            </>
                        )
                    }
                </View>
            })
        }
    });

    return (
        <Wrapper>
            <ContainerScroll>
                <View>
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
                </View>
            </ContainerScroll>

            <Table>
                <TableTitle style={{borderBottomWidth: 1, borderBottomColor: '#e2e2e2', paddingLeft: 15}}>Details</TableTitle>
                <Row1>
                    <View>
                        <Infos>Wind</Infos>
                        <TableTitle> {wind}km/h </TableTitle>
                    </View>
                    <View>
                        <Infos>Real feel</Infos>
                        <TableTitle>{feelsLike} °C</TableTitle>
                    </View>
                </Row1>

                <View style={{borderBottomWidth: 1, borderBottomColor: '#e2e2e2', paddingLeft: 15}} />
                
                <Row1>
                    <View>
                        <Infos>UV index</Infos>
                        <TableTitle> {uv} </TableTitle>
                    </View>
                    <View>
                        <Infos>Pressure</Infos>
                        <TableTitle>{pressure}hPa</TableTitle>
                    </View>
                    </Row1>
            </Table>
        </Wrapper>
    )
}