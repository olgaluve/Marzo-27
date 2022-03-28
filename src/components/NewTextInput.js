//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: NewTextInput------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      styleCtnInput >> Estilo de contenedor de Input
//      inputCheck    >> Check de entrada de texto
//------------------------------------Configuracion >> Icono-----------------------------------
//      iconName      >> Nombre de icono
//      iconSize      >> Tamaño de icono
//      iconColor     >> Color de icono
//----------------------------Configuracion >> Parametros de TextInput-------------------------
//      inputBg                 >> Color de fondo
//      inputPlaceHolder        >> Placeholder
//      inputPlaceHolderColor   >> Color de Placeholder
//      inputSecurity           >> Seguridad de entrada
//      inputKeyboard           >> tipo de entrada
//      inputOnChange           >> Llamada de cambio de texto nativa
//      inputOnEndEditing       >> Llamada de finalizacion de edicion de entrada
//      inputEditable           >> Configuracion de edicion de entrada
//-------------------------------Configuracion >> Boton de TextInput---------------------------
//      button          >>  Bandera de render
//      animatedButton  >>  Bandera de render de Boton animado
//      buttonStyle     >>  Estilo de boton
//      buttonOnpress   >>  Funcion de boton
//      buttonIcon      >>  Icono de boton
//-------------------------------Configuracion >> Seccion de error-----------------------------
//      errorInput      >>  Bandera de render
//      styleCtnError   >>  Estilo de contenedor de seccion
//      styleTextError  >>  Estilo de texto de error
//      textError       >>  Texto de mensaje de error
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { Fragment } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '@styles/colors';
import { letter } from '@styles/letter';
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function NewTextInput(props) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Fragment>
            <View style={[props.styleCtnInput]}>
                <View style={[styles.iconTextInput, { backgroundColor: 'transparent' }]}>
                    <Icon name={props.iconName} size={props.iconSize} color={props.iconColor} />
                </View>
                <TextInput
                    placeholder={props.inputPlaceHolder}
                    autoCompleteType={'off'}
                    autoCapitalize='none'
                    secureTextEntry={props.inputSecurity}
                    keyboardType={props.inputKeyboard}
                    placeholderTextColor={props.inputPlaceHolderColor}
                    onChange={props.inputOnChange}
                    onEndEditing={props.inputOnEndEditing}
                    editable={props.inputEditable}
                    style={[styles.textInput,
                    { color: props.inputColor, backgroundColor: 'transparent' }]} />
                {
                    props.button &&
                    <TouchableOpacity
                        style={[styles.buttonStyle]}
                        onPress={props.buttonOnpress}>
                        <Icon name={props.buttonIcon} size={props.iconSize} color={props.iconColor} />
                    </TouchableOpacity>
                }
                {
                    props.animatedButton &&
                    <Animatable.View
                        style={[styles.buttonStyle]}
                        animation="bounceIn">
                        <Icon name={props.buttonIcon} size={props.iconSize} color={props.iconColor} />
                    </Animatable.View>
                }
            </View>
            {props.errorInput &&
                <Animatable.View
                    style={[props.styleCtnError]}
                    animation='fadeInLeft'
                    duration={500}>
                    <Text style={[props.styleTextError]}>{props.textError}</Text>
                </Animatable.View>
            }
        </Fragment>
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
    },
    //Estilo de textInput
    textInput: {
        height: '100%',
        flex: 0.8,
        fontSize: 15,
    },
    //Estilo de boton Show/Hide Password
    buttonStyle: {
        height: '100%',
        width: '20%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
})
