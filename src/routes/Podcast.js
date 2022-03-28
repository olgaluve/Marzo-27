//---------------------------------------------------------------------------------------------
//---------------------------------Navegador de PILA anidado-----------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------Pestaña de perfil de usuario---------------------------------
//Descripcion:  Navegador de Pila anidado. Navegador hijo, contiene las pantallas de
//              navegacion correspondientes a la pestaña de navegacion actual del usuario
//              para el caso la opcion correspondiente al perfil de usuario.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//--------------------------Pantallas de navegador de pila (Anidamiento 2)---------------------
//--------------------------------------Perfil de usuario--------------------------------------
import PodcastScreen from '../screens/PodcastScreen';
import PodcastPlayScreen from '../screens/PodcastPlayScreen';
//------------------------------------------Redux----------------------------------------------
const PodcastStack = createStackNavigator();//Objeto de pila de pestaña de perfil de usuario
function Podcast() {
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <PodcastStack.Navigator initialRouteName="PodcastHome">{/*Pantalla de inicio de App*/}
            {/*----------------------Estructura de declaracion--------------------------*/}
            {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
            {/*-------------------------------------------------------------------------*/}
            <PodcastStack.Screen
                name="PodcastHome"
                component={PodcastScreen}
                options={{ headerShown: false }} />
            <PodcastStack.Screen
                name="PodcastPlay"
                component={PodcastPlayScreen}
                options={{ headerShown: false }} />
        </PodcastStack.Navigator>
    );
}
//---------------------------------------------------------------------------------------------
export default Podcast;
