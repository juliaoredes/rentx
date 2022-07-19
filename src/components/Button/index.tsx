import React from 'react';
import { ActivityIndicator } from 'react-native';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import theme from '../../styles/theme';

import {
 Container,
 Title,
} from './styles';

interface Props extends BorderlessButtonProps{
    title: string;
    color?: string;
    enabled?: boolean;
    loading?: boolean;
    onPress: () => void;

}

const Button: React.FC<Props> = ({ 
    title, 
    enabled=true, 
    //... rest,
    loading = false,
    onPress,
}) =>(
<Container  
    enabled={enabled} 
    onPress={onPress}
    style={{ opacity: (enabled === false || loading === true) ? .5 : 1 }}
    //{... rest}
>
    {
        loading 
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
    }
 </Container>
 );
export default Button;
