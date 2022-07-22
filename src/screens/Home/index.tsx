import React, { useEffect, useState } from 'react';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { useTheme} from 'styled-components';
import { StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';

import Animated, { 
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,

} from 'react-native-reanimated';

 const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';


import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderContent,
 TotalCar,
 CarList,
 MyCarsButton,
} from './styles';
import styled from 'styled-components';
import theme from '../../styles/theme';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarsButtonStyle = useAnimatedStyle (() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(){

        },
        onActive(event){
            positionX.value = event.translationX;
            positionY.value = event.translationY;
        },
        onEnd(){

        }
    });

    const navigation = useNavigation<NavigationProp<ParamListBase>>();


    // const carData = {
    //     brand: 'Audi',
    //     name: 'RS 5 Coupé',
    //     rent: { 
    //         period: 'AO DIA',
    //         price: 120,
    //     },
    //     thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png'
    // }

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
                    <TotalCar>
                        Total de {cars.length} carros
                    </TotalCar>                             
                
        </HeaderContent>
    </Header>     

    { 
        loading ?  <Load /> :

            <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
            />
    }

    <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
            style={[
                myCarsButtonStyle,
                {
                    position: 'absolute',
                    bottom: 13,
                    right: 22
                }
            ]}
        >
            <ButtonAnimated 
                onPress={handleOpenMyCars}
                style={[styles.button, {backgroundColor: theme.colors.main}]}
            >
                <Ionicons 
                    name="ios-car-sport" 
                    size={32}
                    color={theme.colors.shape}
                />
            </ButtonAnimated>
        </Animated.View>                                                                            
    </PanGestureHandler>
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