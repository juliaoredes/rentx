import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';


import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg'
import Button from '../../components/Button';

import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

import { 
    Calendar, 
    DayProps, 
    generateInterval,
    MarkedDateProps

} from '../../components/Calendar';


import {
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,

} from './styles';

interface RentalPeriod {
    startFormated: string;
    endFormated: string;

}

interface Params {
    car: CarDTO;
}

export function Scheduling(){
    const [lastSelectDate, setlastSelectDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirmRental(){
        if(!rentalPeriod.startFormated || !rentalPeriod.endFormated){
            Alert.alert('Selecione o intervalo para alugar.')
        }else{
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            });
        }
    }

    function handleBack(){
        navigation.goBack();
    }
    
    function handleChangeDate(date: DayProps) {
        let start = !lastSelectDate.timestamp ? date : lastSelectDate;
        let end = date;

        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }

        setlastSelectDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endtDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({
            startFormated: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormated: format(getPlatformDate(new Date(endtDate)), 'dd/MM/yyyy'),
        })
    }

    return (
    <Container>
        <Header>
            {/* <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            /> */}
            <BackButton 
            onPress={handleBack}
            color= {theme.colors.background_secondary}
            />
        <Title>
            Escolha uma {'\n'}
            data de início e {'\n'}
            fim de aluguel {'\n'}
        </Title>

        <RentalPeriod>
            <DateInfo>
                <DateTitle>DE</DateTitle>
                <DateValue selected={!!rentalPeriod.startFormated}>
                    {rentalPeriod.startFormated}
                </DateValue>
            </DateInfo>

            <ArrowSvg width={48} height={10} />

            <DateInfo>
                <DateTitle>ATÉ</DateTitle>
                <DateValue selected={!!rentalPeriod.endFormated}>
                    {rentalPeriod.endFormated}
                </DateValue>  
            </DateInfo>
        </RentalPeriod>


    </Header>

    <Content>
            <Calendar 
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            />
    </Content>

    <Footer>
            <Button 
                title='Confirmar' 
                onPress={handleConfirmRental}
                enabled={!!rentalPeriod.startFormated}
            />
    </Footer>
    </Container>
    );
}