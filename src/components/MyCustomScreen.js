//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCustomScreen----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente permite renderizar los taps del menu de cajon animado implementando.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import Animated from 'react-native-reanimated';
//--------------------------------Objeto >> Navegador de Pila----------------------------------
const Stack = createStackNavigator();
import { createStackNavigator } from '@react-navigation/stack';
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyCustomScreen(props) {
    //----------------------------Declaracion >> Constantes Locales----------------------------
    const { item, style, navigation } = props;//Recepcion >> Propiedades de navegador
    const Component = item.component;//Deckaracion de componente
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.animatedView, style]}>
            <Stack.Navigator>
                <Stack.Screen
                    name={item.name}
                    component={Component}
                    options={{ headerShown: false }} />
            </Stack.Navigator>
        </Animated.View>
    )
};
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Screen de tap
    animatedView: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        overflow: 'hidden'
    },
});