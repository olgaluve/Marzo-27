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
import CoursesScreen from '../screens/CoursesScreen';
import WebViewScreen from '../screens/WebViewScreen';
//------------------------------------------Redux----------------------------------------------
const CoursesStack = createStackNavigator();//Objeto de pila
function Courses() {
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <CoursesStack.Navigator initialRouteName="CoursesHome">{/*Pantalla de inicio de App*/}
            {/*----------------------Estructura de declaracion--------------------------*/}
            {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
            {/*-------------------------------------------------------------------------*/}
            <CoursesStack.Screen
                name="CoursesHome"
                component={CoursesScreen}
                options={{ headerShown: false }} />
            <CoursesStack.Screen
                name="WebView"
                component={WebViewScreen}
                options={{ headerShown: false }} />
        </CoursesStack.Navigator>
    );
}
//---------------------------------------------------------------------------------------------
export default Courses;
