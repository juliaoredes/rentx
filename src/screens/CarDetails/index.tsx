import React from 'react';
import { ParamListBase, NavigationProp ,useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import Button from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';



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
  About,
  Footer,
} from './styles';

export function CarDetails(){
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  function handleConfirmRental(){
    navigation.navigate('Scheduling');
  }

 return (
 <Container>
   <Header>
      <BackButton onPress={() => {}} />
   </Header>
  <CarImages>
    <ImageSlider  
      imageUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
    />
  </CarImages>

  <Content>
    <Details>
      <Description>
        <Brand>Lamborghini</Brand>
        <Name>Huracan</Name>
      </Description>

      <Rent>
        <Period>Ao dia</Period>
        <Price>R$ 580</Price>
      </Rent>
    </Details
    >
    <Accessories>
    
      <Accessory name='300km/h' icon={speedSvg}/>
      <Accessory name='3.2s' icon={accelerationSvg}/>
      <Accessory name='800 HP' icon={forceSvg}/>
      <Accessory name='Gasolina' icon={gasolineSvg}/>
      <Accessory name='Auto' icon={exchangeSvg}/>
      <Accessory name='2 pssoas' icon={peopleSvg}/>


    </Accessories>
    
    <About>
      Este é um automóvel desportivo. Surgiu do 
      lendário touro de lide indultado
      na praça Real Maestrado de Sevilha. 
      É um belissimo carro para quem gosta de acelerar.
    </About>
  </Content>

  <Footer>
    <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
  </Footer>

 </Container>
 );
}