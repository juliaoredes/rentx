import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import {
 Container,
 Title,
} from './styles';

interface Props extends BorderlessButtonProps{
    title: string;
    color?: string;
    
}

const Button: React.FC<Props> = ({ title, ... rest}) =>(
 <Container  {... rest} >
    <Title>{title}</Title>
 </Container>
 );
export default Button;
