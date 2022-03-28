//Contraseña Plazi: PostreDeLimon3489
//---------------------------------------------------------------------------------------------
//----------------------------Archivo de navegacion de pantallas-------------------------------
//---------------------------------------------------------------------------------------------
//Nota: Para efectos de documentacion sobre algun tipo de navegador implementado remitirse
//      al siguiente enlace: https://reactnavigation.org/docs/getting-started V. 5.x
//      En este proyecto se utilizaron dos tipos de navegadores : Navegadores de Pila y
//      Navegadores de cajon, con anidamiento de la siguiente manera:
//      NavegadorPila[NavegadorCajon[NavegadoresPila]]. Tenga encuenta lo anterior para
//      futuros enrutamientos.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//---------------------------------------Pantallas de App--------------------------------------
//--------------------------------Pantallas de navegador principal-----------------------------
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgetPasswordScreen from '../screens/ForgetPasswordScreen';
import LogOutScreen from '../screens/LogOutScreen';
//----------------------Pantallas de navegador de pestañas (Anidamiento 1)---------------------
import Home from './Home';//Home de usuario >> Componente de navegador de pestañas
//---------------------------------------Google Analitics--------------------------------------
import analytics from '@react-native-firebase/analytics';
//---------------------------------------Facebook Events---------------------------------------
import { AppEventsLogger } from "react-native-fbsdk-next";
//---------------------------------------------------------------------------------------------
//-----------------------------Declaracion de Navegadores de APP-------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------Navegador de PILA principal----------------------------------
//---------------------------------------------------------------------------------------------
//Descripcion:  Navegador de Pila principal. Navegador Padre de la App, contiene las pantallas
//              de Splash, Login y Home, esta ultima contendra un anidamiento y cambiara de
//              acuerdo al tipo de usuario Logueado o Registrado.
const MainStack = createStackNavigator();//Objeto de pila
const Routes = (props) => {
    const routeNameRef = useRef();
    const navigationRef = useRef();
    //-----------------------------------------------------------------------------------------
    //---------------------------------Instancia >> Navegador----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        //-------------------------------------------------------------------------------------
        //------------------------------Declaracion de pantallas de APP------------------------
        //-------------------------------------------------------------------------------------
        <NavigationContainer
            ref={navigationRef}
            onReady={() => (routeNameRef.current = navigationRef.current.getCurrentRoute().name)}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current.getCurrentRoute().name;
                //Condicional >> Pantalla actual
                if (previousRouteName !== currentRouteName) {
                    console.group('Ruta Actual');
                    console.log(currentRouteName);
                    console.groupEnd();
                    //Register >> Event >> Facebook
                    AppEventsLogger.logEvent(AppEventsLogger.AppEvents.ViewedContent, {
                        ['Screen']: currentRouteName,
                    });
                    //Register >> Event >> Google Analitics
                    await analytics().logScreenView({
                        screen_name: currentRouteName,
                        screen_class: currentRouteName
                    });
                }
                //Almacenamiento >> Ruta actual
                routeNameRef.current = currentRouteName;
            }}>
            {/*  <MainStack.Navigator initialRouteName="Splash"> */}{/*Pantalla de inicio de App */}
            <MainStack.Navigator initialRouteName="Splash">
                {/*----------------------Estructura de declaracion--------------------------*/}
                {/*<Stack.Screen
                    name=nomb_screen
                    component={Component_import_screen}
                    options{}}/>*/}
                {/*-------------------------------------------------------------------------*/}
                <MainStack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="ForgetPassword"
                    component={ForgetPasswordScreen}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }} />
                <MainStack.Screen
                    name="LogOut"
                    component={LogOutScreen}
                    options={{ headerShown: false }} />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
export default Routes;

