import React from 'react';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,

} from 'react-native';

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


export function SignUpFirstStep(){
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleBack(){
        navigation.goBack();
    }

    function handleNextStep(){
        navigation.navigate('SignUpSecondStep');
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
            />
            
            <Inputs 
                iconName='mail'
                placeholder='E-mail'
                keyboardType='email-address'
            />
            
            <Inputs 
                iconName='credit-card'
                placeholder='CNH'
                keyboardType='numeric'
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