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
import ProfileScreen from '../screens/ProfileScreen';
import ProfileEditScreen from '../screens/ProfileEditScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import MyTestScreen from '../screens/MyTestScreen';
import WebViewScreen from '../screens/WebViewScreen';
//------------------------------------------Redux----------------------------------------------
const ProfileStack = createStackNavigator();//Objeto de pila de pestaña de perfil de usuario
function Profile() {
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <ProfileStack.Navigator initialRouteName="ProfileHome">{/*Pantalla de inicio de App*/}
            {/*----------------------Estructura de declaracion--------------------------*/}
            {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen
                    options{}}/>*/}
            {/*-------------------------------------------------------------------------*/}
            <ProfileStack.Screen
                name="ProfileHome"
                component={ProfileScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen
                name="ProfileEdit"
                component={ProfileEditScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen
                name="Achievements"
                component={AchievementsScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen
                name="MyCourses"
                component={MyCoursesScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen
                name="WebView"
                component={WebViewScreen}
                options={{ headerShown: false }} />
            <ProfileStack.Screen
                name="MyTest"
                component={MyTestScreen}
                options={{ headerShown: false }} />
        </ProfileStack.Navigator>
    );
}
//---------------------------------------------------------------------------------------------
export default Profile;
