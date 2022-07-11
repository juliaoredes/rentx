import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';


import { useTheme } from 'styled-components';

import ArrowSvg from '../../assets/arrow.svg'
import Button from '../../components/Button';

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

export function Scheduling(){
    const [lastSelectDate, setlastSelectDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
    const theme = useTheme();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental(){
        navigation.navigate('SchedulingDetails');
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
    }

    return (
    <Container>
        <StatusBar 
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
        />
        <Header>
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
                <DateValue selected={false}>
                    18/06/2021
                </DateValue>
            </DateInfo>

            <ArrowSvg width={48} height={10} />

            <DateInfo>
                <DateTitle>ATÉ</DateTitle>
                <DateValue selected={false}>
                    18/06/2021
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
            <Button title='Confirmar' onPress={handleConfirmRental}/>
    </Footer>
    </Container>
    );
}