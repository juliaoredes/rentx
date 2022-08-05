import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Confirmation } from '../screens/Confirmation';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';


const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes(){
    return (
        <Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
            <Screen
                name='Splash'
                component={Splash}
            />
            <Screen
                name='SignIn'
                component={SignIn}
            />
            <Screen
                name='SignUpFirstStep'
                component={SignUpFirstStep}
            />
            <Screen
                name='SignUpSecondStep'
                component={SignUpSecondStep}
            />
            <Screen
                name='Home'
                component={Home}
            />
            
            <Screen
                name='Confirmation'
                component={Confirmation}
            />
            
        </Navigator>
    )
}

