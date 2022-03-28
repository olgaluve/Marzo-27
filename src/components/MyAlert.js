//---------------------------------------------------------------------------------------------
//-----------------------Archivo de componente: Alerta/Notificacion----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//          show                >>  Parametro de visibilidad de alerta.
//          alert               >>  Parametro de configuracion de tipo de Alert.
//          text                >>  Texto de alerta.
//          showCANCEL          >>  Parametro de visibilidad de boton de cancel.
//          showOK              >>  Parametro de visibilidad de boton de ok.
//          onPressCANCEL       >>  Funcion de cierre de Alert.
//          onPressOK           >>  Funcion de aceptacion de Alert.
//Nota  :   El componente Alerta/Notificacion tiene cuatro posibles configuraciones (alert):
//          1. Exito            >> Icono : checkmark-circle-outline / Color : Green  (#2CFF76)
//          2. Error            >> Icono : close-circle-outline     / Color : Red    (#FF4848)
//          3. Advertencia      >> Icono : warning-outline          / Color : Yellow (#FFFF48)
//          4. Informacion      >> Icono : alert-circle-outline     / Color : Blue   (#4872FF)
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Modal, Dimensions, Text, View } from 'react-native'
//------------------------------------Librerias adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//Nota: Para efectos de documentacion sobre el funcionamiento de algun componente referenciarse
//      a los siguientes enlaces:
//      Vector Icons    >> https://github.com/oblador/react-native-vector-icons
//                      >> https://oblador.github.io/react-native-vector-icons/
//-----------------------------------------Componentes-----------------------------------------
import MyButton from '@components/MyButton';
//--------------------------------------------Estilos------------------------------------------
import { colors } from '@styles/colors';
import { letter } from '@styles/letter';
//---------------------------------------------------------------------------------------------
//------------------------------------Constantes de Componente---------------------------------
//---------------------------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyAlert(props) {
    //-----------------------------------------------------------------------------------------
    //-----------------------Declaracion de constantes de componente---------------------------
    //-----------------------------------------------------------------------------------------
    const alertParameters = [
        { name: 'Exito', icon: 'check-circle-outline', color: colors.Green },
        { name: 'Error', icon: 'close-circle-outline', color: colors.Red },
        { name: 'Advertencia', icon: 'alert-outline', color: colors.Yellow },
        { name: 'Informacion', icon: 'alert-circle-outline', color: colors.Blue }];
    //-----------------------------------------------------------------------------------------
    //------------------------Declaracion de Estados de Componente-----------------------------
    //-----------------------------------------------------------------------------------------
    const [name, setName] = useState(alertParameters[2].name);//Estado de nombre de Alert
    const [icon, setIcon] = useState(alertParameters[2].icon);//Estado de icono de Alert
    const [color, setColor] = useState(alertParameters[2].color);//Estado de color de Alert
    //-----------------------------------------------------------------------------------------
    //------------------------Declaracion de funciones de Componente---------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------Funcion >> Busquedad de parametros de Alert------------------------
    //Descripcion : Recibe como parametro el tipo de Alert requerido por el usuario y retorna
    //              los parametros de configuracion de este (Color/Icono).
    const searchAlert = (type) => {
        let alert = alertParameters;
        return alert.filter(word => word.name === type);
    }
    //-----------------------------------------------------------------------------------------
    //-----------------------------Declaracion de componentes----------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------------Header----------------------------------------------
    //Descripcion : Componente de cabecera de Alert
    const Header = () => {
        return (
            <View style={[styles.ctnHeader]}>
                <View style={[styles.ctnIconAlert, { backgroundColor: color }]}>
                    <Icon name={icon ? icon : ''} size={25} color={'#FFFFFF'} />
                </View>
                <Text style={[styles.txtAlert]} adjustsFontSizeToFit={true}>
                    {name ? name : ''}
                </Text>
            </View>
        )
    }
    //---------------------------------------Body-----------------------------------------------
    //Descripcion : Componente de cuerpo de Alert
    const Body = (props) => {
        return (
            <View style={[styles.ctnBody]}>
                <Text
                    style={[styles.txtAlert, { fontSize: width*0.04 }]}
                    adjustsFontSizeToFit={true}>
                    {props.text}
                </Text>
            </View>
        )
    }
    //-------------------------------------Footer----------------------------------------------
    //Descripcion : Componente de pie de Alert
    const Footer = (props) => {
        return (
            <View style={[styles.ctnFooter]}>
                {props.showCANCEL && (
                    <MyButton
                        ctnButton={[styles.btnAction, { backgroundColor: props.bgButton }]}
                        buttonOnpress={props.onPressCANCEL}
                        textStyle={styles.btntxt}
                        text={'Cancel'} />)}
                { props.showOK && (
                    <MyButton
                        ctnButton={[styles.btnAction, { backgroundColor: props.bgButton }]}
                        buttonOnpress={props.onPressOK}
                        textStyle={styles.btntxt}
                        text={'Ok'} />)}
            </View>
        )
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion de Hooks-------------------------------------
    //-----------------------------------------------------------------------------------------
    //Nota: Para efectos de documentacion sobre algun tipo de Hook y su funcionamiento remitirse
    //      al siguiente enlace: https://reactjs.org/docs/hooks-reference.html#useeffect
    useLayoutEffect(() => {
        //Cambio de parametros de Alerta/Notificaion de acuerdo al tipo especificado
        let parameters = searchAlert(props.alert);
        //Set de estados de configuracion
        setName(parameters[0].name);
        setIcon(parameters[0].icon);
        setColor(parameters[0].color);
        console.log('Este Modal se rendereiza');
    }, [props.alert]);
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
                <View style={[styles.ctnAlert]}>
                    {/*-------------------------Boton de cierre de modal----------------------*/}
                    <MyButton
                        ctnButton={styles.ctnBtnClose}
                        buttonOnpress={props.showCancel ? props.onPressCANCEL : props.onPressOK}
                        iconName={'close'}
                        iconSize={25}
                        iconColor={colors.Black} />
                    {/*------------------------------Cuerpo de Modal--------------------------*/}
                    <View style={[styles.line, { backgroundColor: color }]} />
                    <View style={[styles.section]}>
                        <Header />
                        <Body text={props.text} />
                        <Footer
                            bgButton={color}
                            showCANCEL={props.showCANCEL}
                            showOK={props.showOK}
                            onPressCANCEL={props.onPressCANCEL}
                            onPressOK={props.onPressOK}
                        />
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
    //Estilo de contenerdor de alerta
    ctnAlert: {
        flex: 0.4,
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
        alignContent: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        flex: 0.3,
    },
    //Estilo de contenedor de icono de alerta
    ctnIconAlert: {
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    //Estilo de texto de alerta
    txtAlert: {
        textAlign: 'center',
        fontFamily: letter.Text_1,
        color: colors.Black + 'BF',
        textAlign: 'left',
        fontSize: width*0.045,
    },
    //Estilo de contenedor de cuerpo de alerta
    ctnBody: {
        width: '100%',
        flex: 0.5,
        paddingLeft: 60,
        paddingRight: 20,
    },
    //Estilo de footer
    ctnFooter: {
        width: '100%',
        flex: 0.2,
        paddingLeft: 60,
        paddingRight: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    //Estilo de boton de accion
    btnAction: {
        height: '70%',
        flex: 0.4,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 10,
        borderRadius: 10
    },
    //Estilo de texto de botones de accion
    btntxt: {
        textAlign: 'center',
        fontFamily: letter.Text_1,
        color: colors.White,
        textAlign: 'center',
        fontSize: width*0.04
    },
})

