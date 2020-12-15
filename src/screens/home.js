import React from 'react';
import { ScrollView } from 'react-native';
import SavedData from '../components/saved-weather/saved-weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Button, HeaderWrapper, Text } from './styles';

export default function Home ({navigation}) {

    const removeSavedData = async () => {
        try {
            await AsyncStorage.removeItem('locationSaved')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <HeaderWrapper>
                <Button onPress={() => navigation.navigate('Search Cities', { navigation: navigation })}>
                    <Text>+</Text>
                </Button>
                <Button onPress={() => removeSavedData()}>
                    <Text>Remove</Text>
                </Button>
            </HeaderWrapper>

            <ScrollView>
                <SavedData />
            </ScrollView>
        </Container>
    )
}