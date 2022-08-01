import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';

import {
 Container,
 Title,
} from './styles';

interface Props extends RectButtonProps{
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean; 

}

const Button: React.FC<Props> = ({ 
    title, 
    onPress,
    color,
    enabled=true, 
    loading = false,
    light = false
}) =>(
<Container  
    color={color ? color : theme.colors.main}
    enabled={enabled} 
    onPress={onPress}
    style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
>
    {
        loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title light={light}>{title}</Title>
    }
 </Container>
 );
export default Button;
