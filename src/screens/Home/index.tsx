import { ParamListBase, NavigationProp ,useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { CarDetails } from '../CarDetails';

import {
 Container,
 Header,
 HeaderContent,
 TotalCar,
 CarList,
 
} from './styles';

export function Home(){
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
    }

        function handleCarDetails() {
        navigation.navigate('CarDetails')
    }

 return (
 <Container>
    <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
    />
    <Header screenOptions={{ headerShown: false }}>
        <HeaderContent>
                
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCar>
                        Total de 12 carros
                    </TotalCar>                             
                
        </HeaderContent>
    </Header>     


    <CarList
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => 
            <Car data={carData} onPress={handleCarDetails} />
        }
    />

 </Container>
 );
}