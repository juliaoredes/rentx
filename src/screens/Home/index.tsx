import React, { useEffect, useState } from 'react';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme} from 'styled-components';
import { BackHandler, StatusBar, StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';


import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
 Container,
 Header,
 HeaderContent,
 TotalCar,
 CarList,
 
} from './styles';
import styled from 'styled-components';
import theme from '../../styles/theme';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car })
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/cars');
                setCars(response.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }

        fetchCars();
    }, []);



 return (
 <Container>
    <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
    />
    <Header>
        <HeaderContent>
                
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    {
                        !loading &&
                        <TotalCar>
                            Total de {cars.length} carros
                        </TotalCar>                             
                    }
        </HeaderContent>
    </Header>     

    { 
        loading ?  <LoadAnimation /> :

            <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
            />
    }


 </Container>
 );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})