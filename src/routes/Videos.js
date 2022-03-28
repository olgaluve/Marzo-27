//---------------------------------------------------------------------------------------------
//---------------------------------Navegador de PILA anidado-----------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------Tap >> Vista de Cursos---------------------------------------
//Descripcion:  Navegador de Pila anidado. Navegador hijo, contiene las pantallas de
//              navegacion correspondientes a la pestaña de navegacion actual del usuario
//              para el caso la opcion correspondiente a la seccion de Cursos de usuario.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//--------------------------Pantallas de navegador de pila (Anidamiento 2)---------------------
//------------------------------------------Cursos----------------------------------------------
import VideosScreen from '../screens/VideosScreen';
import VideosPlayScreen from '../screens/VideosPlayScreen';
//------------------------------------------Redux----------------------------------------------
const VideosStack = createStackNavigator();//Objeto de pila
function Videos() {
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <VideosStack.Navigator initialRouteName="VideosHome">{/*Pantalla de inicio de App*/}
            {/*----------------------Estructura de declaracion--------------------------*/}
            {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
            {/*-------------------------------------------------------------------------*/}
            <VideosStack.Screen
                name="VideosHome"
                component={VideosScreen}
                options={{ headerShown: false }} />
            <VideosStack.Screen
                name="VideosPlay"
                component={VideosPlayScreen}
                options={{ headerShown: false }} />
        </VideosStack.Navigator>
    );
}
//---------------------------------------------------------------------------------------------
export default Videos;
