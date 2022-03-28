//---------------------------------------------------------------------------------------------
//---------------------------------Navegador de PILA anidado-----------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------Tap >> Vista de Test----------------------------------------
//Descripcion:  Navegador de Pila anidado. Navegador hijo, contiene las pantallas de
//              navegacion correspondientes a la pestaña de navegacion actual del usuario
//              para el caso la opcion correspondiente a la seccion de Test de usuario.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//--------------------------Pantallas de navegador de pila (Anidamiento 2)---------------------
//------------------------------------------Test-----------------------------------------------
import TestScreen from '../screens/TestScreen';
import WebViewScreen from '../screens/WebViewScreen';
//------------------------------------------Redux----------------------------------------------
const TestStack = createStackNavigator();//Objeto de pila
function Test() {
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <TestStack.Navigator initialRouteName="TestHome">{/*Pantalla de inicio de App*/}
            {/*----------------------Estructura de declaracion--------------------------*/}
            {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
            {/*-------------------------------------------------------------------------*/}
            <TestStack.Screen
                name="TestHome"
                component={TestScreen}
                options={{ headerShown: false }} />
            <TestStack.Screen
                name="WebView"
                component={WebViewScreen}
                options={{ headerShown: false }} />
        </TestStack.Navigator>
    );
}
//---------------------------------------------------------------------------------------------
export default Test;
