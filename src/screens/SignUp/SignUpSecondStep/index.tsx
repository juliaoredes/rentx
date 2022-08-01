import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInputs } from '../../../components/PasswordInputs';
import Button from '../../../components/Button';

import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,

} from 'react-native';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';


export function SignUpSecondStep(){
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();

    function handleBack(){
        navigation.goBack();
    }

return ( 
<KeyboardAvoidingView behavior='position' enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
        <Header>
            <BackButton onPress={handleBack} />
            <Steps>
                <Bullet active />
                <Bullet />
            </Steps>
        </Header>
        <Title>
            Crie sua {'\n'} conta 
        </Title>
        <SubTitle>
            Faça seu cadastro de {'\n'}
            forma rápida e fácil.
        </SubTitle>

        <Form>
            <FormTitle>2. Senha</FormTitle>
        <PasswordInputs 
                iconName='lock'
                placeholder='Senha'
        />
        <PasswordInputs 
                iconName='lock'
                placeholder='Repetir Senha'
        />
        </Form>

        <Button 
            color={theme.colors.success}
            title="Cadastrar"
            
        />
        </Container>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
 );
}