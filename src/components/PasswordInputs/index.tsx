import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
 Container,
 IconContainer,
 InputText,
} from './styles';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string;
}

export function PasswordInputs({
    iconName,
    value,
    ... rest
}: Props){
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const theme = useTheme();

    function handleInputFocused(){
        setIsFocused(true);
    }

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!value);
    }

 
    function handlePasswordVisibilityChange() {
        setIsPasswordVisible(prevState => !prevState);
    }

    return (
 <Container>
    <IconContainer isFocused={isFocused}>
        <Feather 
            name={iconName}
            size= {24}
            color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail }
        />
    </IconContainer>

    <InputText
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {... rest} 
        secureTextEntry={isPasswordVisible}
    />

    <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer isFocused={isFocused}>
            <Feather 
                name={isPasswordVisible ? 'eye': 'eye-off'}
                size={24}
                color={theme.colors.text_detail}
            />
        </IconContainer>
    </BorderlessButton>
 </Container>
 );
}