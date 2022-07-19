import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Load } from '../../components/Load';

import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';  

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterPeriod,
    CarFooterDate,
} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    starDate: string;
    endDate: string;
}


export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();
    
    function handleBack(){
        navigation.goBack();
    }
    
    useEffect (() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                console.log(response.data);
                setCars(response.data);
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    },[])
 return (
 <Container>
    <Header>
        <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
        />
            <BackButton 
            onPress={handleBack}
            color= {theme.colors.background_secondary}
            />
        <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim de aluguel {'\n'}
        </Title>
        
        <SubTitle>
            Conforto, segurança e praticidade.
        </SubTitle>

    </Header>

    { 
        loading ? <Load /> : 
            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                    <AppointmentQuantity>{cars.length}</AppointmentQuantity>
                </Appointments>

                <FlatList 
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <CarWrapper>
                            <Car data={item.car} />
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.starDate}</CarFooterDate>
                                    <AntDesign 
                                        name='arrowright'
                                        color={theme.colors.title}
                                        size={20}
                                        style={{ marginHorizontal: 10}}
                                    />
                                    <CarFooterDate>{item.endDate}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                    )}
                />

            </Content>
    }
 </Container>
 );
}