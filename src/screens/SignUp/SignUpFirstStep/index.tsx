import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    
} from 'react-native';

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'; 

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Inputs } from '../../../components/Inputs';
import Button from '../../../components/Button';

import {
    Container,
    Header,
    Steps,
    Title,
    SubTitle,
    Form,
    FormTitle,
} from './styles';
import { useAuth } from '../../../hooks/auth';


export function SignUpFirstStep(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [driverLicense, setDriverLicense] = useState('');

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { user } = useAuth();
    console.log('USUÁRIO AUTENTICADO', user);


    function handleBack(){
        navigation.goBack();
    }

    async function handleNextStep(){
        try {
          const schema = Yup.object().shape({
              driverLicense: Yup.string()
              .required('CNH é obrigatória'),
              email: Yup.string()
              .email('E-mail inválido')
              .required('E-mail é obrigatório'),
              name: Yup.string()
              .required('Nome é obrigatório')
          })  

          const data = {name, email, driverLicense}
          await schema.validate(data);

            navigation.navigate('SignUpSecondStep', { user: data});
        } catch (error) {
            if(error instanceof Yup.ValidationError){
                return Alert.alert('Opa', error.message);
            }
        }
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
            <FormTitle>1. Dados</FormTitle>
            <Inputs 
                iconName='user'
                placeholder='Nome'
                onChangeText={setName}
                value={name}
            />
            
            <Inputs 
                iconName='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                onChangeText={setEmail}
                value={email}
            />
            
            <Inputs 
                iconName='credit-card'
                placeholder='CNH'
                keyboardType='numeric'
               // onChangeText={(value) => setDriverLicense(Number(value))}
               onChangeText={setDriverLicense}
               value={driverLicense}
            />
        </Form>

        <Button 
            title="Próximo"
            onPress={handleNextStep}
        />
        </Container>
    </TouchableWithoutFeedback>
</KeyboardAvoidingView>
 );
}