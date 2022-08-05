import React, { useState } from 'react';
import { 
    NavigationProp, 
    ParamListBase, 
    useNavigation 
} from '@react-navigation/native';

import { 
    StatusBar,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from 'react-native';

import * as Yup from 'yup';

import theme from '../../styles/theme';
import { useAuth } from '../../hooks/auth';


import { Inputs } from '../../components/Inputs';
import { PasswordInputs } from '../../components/PasswordInputs';
import Button from '../../components/Button';

import {
    Container,
    Header,
    Title,
    SubTitle,
    Form,
    Footer,
} from './styles';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { signIn } = useAuth();

    async function handleSignIn(){
        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                .required('A senha é obrigatória')
            
            });
                await schema.validate({ email, password });
                Alert.alert('Tudo certo');

                signIn({ email, password });
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message);
            }else{
                Alert.alert(
                    'Erro na autenticação', 
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
            }
        }

    }

    function handleNewAccount(){
        navigation.navigate('SignUpFirstStep');
    }

 return (
<KeyboardAvoidingView behavior='position' enabled>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
            <StatusBar />
            <Header>
                <Title>
                    Estamos{'\n'}quase lá.
                </Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível.
                </SubTitle>
            </Header>

            <Form>
                <Inputs 
                    iconName='mail'
                    placeholder='E-mail'
                    keyboardType='email-address'
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                    value={email}
                />

                <PasswordInputs 
                    iconName='lock'
                    placeholder='Senha'
                    onChangeText={setPassword}
                    value={password}
                />
            </Form>
            
            <Footer>
                <Button 
                    title="Login"
                    onPress={handleSignIn}
                    enabled={true}
                    loading={false}
                />
                <Button 
                    title="Criar conta gratuita"
                    color={theme.colors.background_secondary}
                    light
                    onPress={handleNewAccount}
                    enabled={true}
                    loading={false}
                />
            </Footer>
        </Container>
    </TouchableWithoutFeedback>
 </KeyboardAvoidingView>
 );
}