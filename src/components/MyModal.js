//---------------------------------------------------------------------------------------------
//-----------------------Archivo de componente: Modal------------------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//----------------------------------Configuracion >> Modal-------------------------------------
//          show                >>  Parametro de visibilidad de Modal.
//          heightModal         >>  Parametro de altura de Modal.
//          title               >>  Parametro de titulo de modal.
//          onPress             >>  Llamada de evento touch sobre los botones cierre / 'OK'.
//          color               >>  Parametro de color de componente.
//----------------------------------Configuracion >> Icono-------------------------------------
//          iconName            >>  Parametro de nombre de icono.
//          iconSize            >>  Parametro de tamaño de icono.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Modal, Dimensions, Text, ScrollView, View } from 'react-native'
//------------------------------------Librerias adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//Nota: Para efectos de documentacion sobre el funcionamiento de algun componente referenciarse
//      a los siguientes enlaces:
//      Vector Icons    >> https://github.com/oblador/react-native-vector-icons
//                      >> https://oblador.github.io/react-native-vector-icons/
//-----------------------------------------Componentes-----------------------------------------
import MyButton from '../components/MyButton';
//--------------------------------------------Estilos------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
//---------------------------------------------------------------------------------------------
//------------------------------------Constantes de Componente---------------------------------
//---------------------------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyModal(props) {
    //-----------------------------------------------------------------------------------------
    //-----------------------------Declaracion de componentes----------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------------Header----------------------------------------------
    //Descripcion : Componente de cabecera
    const Header = (props) => {
        return (
            <View style={[styles.ctnHeader]}>
                <View style={[styles.ctnIcon]}>
                    <Icon name={props.iconName} size={props.iconSize} color={props.color} />
                </View>
                <View style={[styles.ctnTitle]}>
                    <Text
                        style={[styles.txtAlert, { color: props.color }]}
                        adjustsFontSizeToFit={true}>
                        {props.title}
                    </Text>
                </View>
            </View>
        )
    }
    //---------------------------------------Body-----------------------------------------------
    //Descripcion : Componente de cuerpo
    const Body = (props) => {
        return (
            <View style={[styles.ctnBody]}>
                {props.children}
            </View>
        )
    }
    //-------------------------------------Footer----------------------------------------------
    //Descripcion : Componente de pie
    const Footer = (props) => {
        return (
            <View style={[styles.ctnFooter]}>
                <MyButton
                    ctnButton={[styles.btnAction, { backgroundColor: props.bgButton }]}
                    buttonOnpress={props.onPress}
                    textStyle={styles.btntxt}
                    text={'Ok'} />
            </View>
        )
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.show}>
            <View style={[styles.ctnModal]}>
                {/*---------------------Linea de reconocimiento de modal----------------------*/}
                <View style={[styles.ctnComponent]}>
                    {/*-------------------------Boton de cierre de modal----------------------*/}
                    <MyButton
                        ctnButton={styles.ctnBtnClose}
                        buttonOnpress={props.onPress}
                        iconName={'close'}
                        iconSize={25}
                        iconColor={colors.Black} />
                    {/*------------------------------Cuerpo de Modal--------------------------*/}
                    <View style={[styles.line, { backgroundColor: props.color }]} />
                    <View style={[styles.section]}>
                        <Header
                            iconName={props.iconName}
                            iconSize={props.iconSize}
                            color={props.color}
                            title={props.title} />
                        <Body children={props.children} />
                        <Footer
                            bgButton={props.color}
                            onPress={props.onPress} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de modal
    ctnModal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Black + 'AF',
    },
    //Estilo de contenerdor de componente
    ctnComponent: {
        flex: 0.5,
        width: width * 0.8,
        justifyContent: 'flex-start',
        backgroundColor: colors.White,
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10
    },
    //Estilo de contenedor de boton de cierre
    ctnBtnClose: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        right: 0,
        height: 35,
        width: 35,
        zIndex: 10
    },
    //Estilo de linea de alerta
    line: {
        height: '100%',
        flex: 0.03,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //Estilo de seccion de alerta
    section: {
        height: '100%',
        flex: 0.98,
        flexDirection: 'column'
    },
    //Estilo de contenedor de header de alerta
    ctnHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flex: 0.25,
    },
    //Estilo de contenedor de icono
    ctnIcon: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    //Estilo de contenedor de titulo
    ctnTitle: {
        height: '100%',
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
    },
    //Estilo de texto
    txtAlert: {
        textAlign: 'right',
        fontFamily: letter.Text_1,
        fontSize: 20,
    },
    //Estilo de contenedor de cuerpo de alerta
    ctnBody: {
        width: '100%',
        flex: 0.60,
        top: '-2%',
        paddingHorizontal: 20,
    },
    //Estilo de footer
    ctnFooter: {
        width: '100%',
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    //Estilo de boton de accion
    btnAction: {
        height: '70%',
        flex: 0.4,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 10,
    },
    //Estilo de texto de botones de accion
    btntxt: {
        textAlign: 'center',
        fontFamily: letter.Text_1,
        color: colors.White,
        textAlign: 'center',
        fontSize: 15
    },
})

