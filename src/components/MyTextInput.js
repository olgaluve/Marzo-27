//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyTextInput-------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      styleCtnInput >> Estilo de contenedor de Input.
//      inputCheck    >> Check de entrada de texto.
//------------------------------------Configuracion de icono-----------------------------------
//      iconName      >> Nombre de icono.
//      iconSize      >> Tamaño de icono.
//      iconColor     >> Color de icono.
//----------------------------Configuracion de parametros de TextInput-------------------------
//      inputBg                 >> Color de fondo.
//      inputPlaceHolder        >> Placeholder.
//      inputPlaceHolderColor   >> Color de Placeholder.
//      inputSecurity           >> Seguridad de entrada.
//      inputKeyboard           >> tipo de entrada.
//      inputOnChangeText       >> Llamada de cambio de texto.
//      inputValue              >> Valor de entrada de texto.
//      inputEditable           >> Configuracion de edicion de entrada.
//      onFocus                 >> Llamada de evento de 'Enfoque' de entrada.
//-------------------------------Configuracion de boton de TextInput---------------------------
//      button          >>  Bandera de render.
//      buttonStyle     >>  Estilo de boton.
//      buttonOnpress   >>  Funcion de boton.
//      buttonIcon      >>  Icono de boton.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '@styles/colors';
import { letter } from '@styles/letter';
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyTextInput(props) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[props.styleCtnInput]}>
            <View style={[styles.iconTextInput,
            props.inputCheck ? { backgroundColor: 'transparent' } :
                { backgroundColor: props.inputBg ? props.inputBg : colors.Red + 'AF' }]}>
                <Icon name={props.iconName} size={props.iconSize} color={props.iconColor} />
            </View>
            <TextInput
                placeholder={props.inputPlaceHolder}
                autoCompleteType={'off'}
                secureTextEntry={props.inputSecurity}
                keyboardType={props.inputKeyboard}
                placeholderTextColor={props.inputPlaceHolderColor}
                onChangeText={props.inputOnChangeText}
                value={props.inputValue}
                editable={props.inputEditable}
                onFocus={props.onFocus}
                style={[styles.textInput, { color: props.inputColor },
                props.inputCheck ? { backgroundColor: 'transparent' } :
                    { backgroundColor: props.inputBg ? props.inputBg : colors.Red + 'AF' }]} />
            {
                props.button &&
                <TouchableOpacity
                    style={[styles.buttonStyle]}
                    onPress={props.buttonOnpress}>
                    <Icon name={props.buttonIcon} size={props.iconSize} color={props.iconColor} />
                </TouchableOpacity>
            }
        </View>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de icono de textInput
    iconTextInput: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    //Estilo de textInput
    textInput: {
        height: '100%',
        flex: 0.8,
        fontSize: 15,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    //Estilo de boton Show/Hide Password
    buttonStyle: {
        height: '100%',
        width: '20%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 2
    },
})
