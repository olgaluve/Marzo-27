//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyQuestion-------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      id      >>  Identificador de pregunta.
//      title   >>  Titulo de pregunta.
//      body    >>  Cuerpo de pregunta.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//----------------------------------------Componentes------------------------------------------
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//---------------------------------------Constantes Globles------------------------------------
const { width, height } = Dimensions.get('window');
const HEIGHT_HEADER = height * 0.1;
const HEIGHT_BODY = height * 0.2;
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyQuestion(props) {
    //-----------------------------------------------------------------------------------------
    //---------------------------------Estados de Componente-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [toggle, setToggle] = useState(false);//Estado de accion de presionar boton
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Componente >> HeaderQuestion-------------------------------
    //Descripcion : Permite renderizar la seccion de encabezado de item de pregunta.
    const HeaderQuestion = (props) => {
        return (
            <View style={[styles.ctnHeader, {}]}>
                <View style={[styles.ctnTitle]}>
                    <Text style={[styles.title, { color: props.color }]}>
                        {props.title}
                    </Text>
                </View>
                <MyButton
                    ctnButton={[styles.ctnButtonAction]}
                    buttonOnpress={props.onPressToggle}
                    iconName={toggle ? 'menu-up' : 'menu-down'}
                    iconSize={30}
                    iconColor={props.color} />
            </View>
        );
    }
    //------------------------------Componente >> BodyQuestion---------------------------------
    //Descripcion : Permite renderizar la seccion de body de item de pregunta.
    const BodyQuestion = (props) => {
        return (
            <View style={[styles.ctnBody]}>
                <Text style={[styles.txtBody, { color: props.color }]}>
                    {props.body}
                </Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------------Declaracion de funciones-------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------------Funcion >> Cambio de Tap-------------------------------
    //Descripcion : Permite la transsicion de cambio del tap del header.
    function ChangeToggle() {
        let tempToggle = !toggle;
        setToggle(tempToggle);//Deteccion de accion >> Presionar boton
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnQuestion]}>
            <HeaderQuestion
                title={props.title}
                color={colors.Blue}
                onPressToggle={() => ChangeToggle()} />
            {
                toggle &&
                <BodyQuestion
                    body={props.body}
                    color={colors.White} />
            }
        </View>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de pregunta
    ctnQuestion: {
        width: width * 0.84,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: height * 0.02,
        backgroundColor: colors.White,
        borderRadius: 10,
        marginHorizontal: width * 0.08,
        elevation: 5
    },
    //Estilo de contenedor de header
    ctnHeader: {
        width: '100%',
        height: HEIGHT_HEADER,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'rgba(0,0,0,0.2)'
    },
    //Estilo de contenedor de titulo
    ctnTitle: {
        height: '100%',
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: '5%'
    },
    //Estilo de titulo de pregunta
    title: {
        textAlign: 'left',
        fontSize: FONTSIZE_TEXT_TITLE,
        fontFamily: letter.Text_1
    },
    //Estilo de contenedor de boton de accion
    ctnButtonAction: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de body
    ctnBody: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: '6%',
        backgroundColor: colors.Blue,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    //Estilo de texto de body
    txtBody: {
        textAlign: 'left',
        fontSize: FONTSIZE_TEXT_TITLE,
        fontFamily: letter.Text_2,
        marginTop: 20,
        marginBottom: 20
    }
})
