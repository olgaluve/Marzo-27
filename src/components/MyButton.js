//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyButton----------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//          ctnButton       >>  Estilo de contenedor de boton.
//          buttonOnpress   >>  Funcion de Boton.
//          iconName        >>  Nombre de icono (Fuente : MaterialCommunityIcons).
//          iconSize        >>  Tamaño de icono.
//          iconColor       >>  Color de icono.
//          textStyle       >>  Estilo de texto.
//          text            >>  Texto.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyButton(props) {
    //-----------------------------------------------------------------------------------------
    //-------------------------------Constantes de Componente----------------------------------
    //-----------------------------------------------------------------------------------------
    const buttonIcon = props.iconName ? true : false;
    const buttonText = props.text ? true : false;
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <TouchableOpacity
            style={[styles.ctnButton, props.ctnButton]}
            onPress={props.buttonOnpress}>
            {
                buttonIcon &&
                <Icon name={props.iconName} size={props.iconSize} color={props.iconColor} />
            }
            {
                buttonText &&
                <Text style={[props.textStyle]}>{props.text}</Text>
            }
        </TouchableOpacity>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de boton
    ctnButton: {
        justifyContent: 'center',
        //alignItems: 'center'
    },
})
