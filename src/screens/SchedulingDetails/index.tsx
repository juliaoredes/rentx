import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import Button from '../../components/Button';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { useTheme } from 'styled-components'; 

import { format } from 'date-fns';

import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,  
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal

  
} from './styles';



interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  start: string;
  end: string;
}

interface AxiosResponse {
  unavailable_dates: string;
}

export function SchedulingDetails(){
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental(){
    const schedulesByCar = await api.get<AxiosResponse>(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates,
    ];

    await api.post('/schedules_byuser', {
      user_id: 1,
      car,
      starDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
    
    api.put<AxiosResponse>(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'Home',
          title: 'Carro alugado',
          message: `Agora você precisa ir \n 
          até a concessionária da RENTX \n
          pegar o seu automóvel.`
      })
    })
    .catch(() => {
      setLoading(false);
      Alert.alert('Não foi possível confirmar o agendamento.')
    })
    
  }
    

    function handleBack(){
      navigation.goBack();
    }

    useEffect(() => {
      setRentalPeriod({
        start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      })
    },[])

 return (
 <Container>
   <Header>
      <BackButton onPress={handleBack} />
   </Header>
  <CarImages>
    <ImageSlider  
      imageUrl={car.photos}
    />
  </CarImages>

  <Content>
    <Details>
      <Description>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>
      </Description>

      <Rent>
        <Period>{car.period}</Period>
        <Price>R$ {car.price}</Price>
      </Rent>
    </Details
    >
    <Accessories>
    
    {
      car.accessories.map(accessory => (
        <Accessory 
          key={accessory.type}
          name={accessory.name}
          icon={getAccessoryIcon(accessory.type)}
        />
      ))
    }

    </Accessories>

    <RentalPeriod>

      <CalendarIcon>
        <Feather
          name='calendar'
          size={RFValue(24)}
          color={theme.colors.text}
        />
      </CalendarIcon>

      <DateInfo>
        <DateTitle>DE</DateTitle>
        <DateValue>{rentalPeriod.start}</DateValue>
      </DateInfo>

      <Feather
          name='chevron-right'
          size={RFValue(10)}
          color={theme.colors.background_primary}
        />

      <DateInfo>
        <DateTitle>ATÉ</DateTitle>
        <DateValue>{rentalPeriod.end}</DateValue>
      </DateInfo>

    </RentalPeriod>

    <RentalPrice>
      <RentalPriceLabel>TOTAL</RentalPriceLabel>
      <RentalPriceDetails>
        <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
      </RentalPriceDetails>
    </RentalPrice>
    
  </Content>

  <Footer>
    <Button 
      title="Alugar agora" 
      color={theme.colors.success} 
      onPress={handleConfirmRental}
      enabled={!loading}
      loading={loading}
    />
  </Footer>

 </Container>
 );
}