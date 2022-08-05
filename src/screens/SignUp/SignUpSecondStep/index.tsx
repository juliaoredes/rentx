import React, { useState } from 'react';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Confirmation } from '../../Confirmation';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInputs } from '../../../components/PasswordInputs';
import Button from '../../../components/Button';

import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,

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
import { api } from '../../../services/api';

interface Params {
    user: {
        name: string, 
        email: string, 
        driverLicense: string
    }
}


export function SignUpSecondStep(){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack(){
        navigation.goBack();
    }

    async function handleRegister(){
        if(!password || !passwordConfirm){
            return Alert.alert('Informe a senha e a confirmação desta');
        }

        if(password != passwordConfirm){
            return Alert.alert('As senhas não são iguais');
        }

        await api.post('/users', {
            name: user.name,
            email: user.email,
            driver_license: user.driverLicense,
            password,
        })
        .then(() => {

            //Enviar para API e cadastrar
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'SignIn',
                title: 'Conta criada!',
                message: `Agora é só fazer login \n e aproveitar.`
            });
        })
        .catch(() => {
            Alert.alert('Opa', 'Não foi possível cadastrar.');
        })
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
                onChangeText={setPassword}
                value={password}
        />
        <PasswordInputs 
                iconName='lock'
                placeholder='Repetir Senha'
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
        />
        </Form>

        <Button 
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
        />
        </Container>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
 );
}