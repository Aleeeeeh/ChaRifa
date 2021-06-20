import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import TelaSorteio from './views/TelaSorteio';
import Cadastro from './views/cadastro';
import Lista from './views/lista';

const stack = createStackNavigator();

function Routes(){
    return(
        <NavigationContainer>
            <stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>
                <stack.Screen 
                    name="Sorteio" 
                    component={TelaSorteio}
                    options={{
                        title:'Tela do sorteio',
                    }} 
                />
                <stack.Screen 
                    name="Cadastro"
                    component={Cadastro}
                />
                <stack.Screen
                    name="Lista"
                    component={Lista}
                />
            </stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;