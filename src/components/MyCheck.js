//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCheck----------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      styleCtnCheck   >> Estilo de contenedor de picker
//------------------------------------Configuracion de icono-----------------------------------
//      iconName        >> Nombre de icono.
//      iconSize        >> Tamaño de icono.
//      color           >> Color de icono.
//      onPressCheck    >> Llamada de evento Touche sobre el icono
//----------------------------Configuracion de parametros de Check Msm-------------------------
//      onPressMsmCheck >> Llamada de evento Touche sobre el texto.
//      styleTextCheck  >> Estilo de texto de check.
//      textCheck       >> Msm de check.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyCheck(props) {
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de componentes---------------------------------
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[props.styleCtnCheck]}>
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.iconCheck]}
                onPress={props.onPressCheck}>
                <Icon name={props.iconName} size={props.iconSize} color={props.color} />
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.ctnMsmCheck]}
                onPress={props.onPressMsmCheck}>
                <Text style={props.styleTextCheck}>{props.textCheck}</Text>
            </TouchableHighlight>
        </View>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de icono de check
    iconCheck: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor texto de check
    ctnMsmCheck: {
        height: '100%',
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
