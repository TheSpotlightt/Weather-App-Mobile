import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';

import axios from 'axios';

import { Wrapper, CitiesText, ContainerScroll } from './styles';

export default function SearchCity( { route } ) {
    const [cities, getCities] = useState([]);
    const citiesArray = [cities]

    const [value, getValue] = useState('');
    const navigation = route.params.navigation;
    
    useEffect(() => {
        (
            async () => {
                await axios.get(`https://api.weatherapi.com/v1/search.json?key=4315ea41a7154405934153414200109&q=${value}`)
                .then(response => response.data)
                .then(data => {
                    getCities(data)
                })
            }
        )()
    }, [value]);

    return (
        <Wrapper>
            <SearchBar 
                onChangeText={search => getValue(search)}
                value={value.toString()}
                placeholder="Enter location"
                autoFocus
                round
                containerStyle={{backgroundColor: '#18191A', borderBottomColor: '#18191A', borderTopColor: '#18191A'}}
            />
            <ContainerScroll>
                {
                    citiesArray.map((index, key) => (
                        <View key={key}>
                            {
                                index.map((result, key) =>(
                                    <View key={key}>    
                                        <TouchableOpacity onPress={() => navigation.navigate('Infos', { location: value } )}>
                                            <CitiesText> {result.name} </CitiesText>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View> 
                    ))
                }
            </ContainerScroll>
        </Wrapper>
    )
    
}