//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardTest--------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de test. Contiene las siguientes propiedades :
//                  >> Name         >> Titulo
//                  >> icon         >> Logo
//                  >> description  >> Descripcion
//                  >> score        >> Puntaje

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MyButton from './MyButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(14);
const SIZE_ICON = moderateScale(25);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardMyTest = (props) => {
    const { data } = props;
    const { id, name, description, icon, score } = data;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const Logo = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={{ uri: source }}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion del curso.
    const Description = ({ title, points, description }) => {
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.title]}>{title}</Text>
                <Text
                    style={[styles.label]}
                    numberOfLines={2}>
                    {description}
                </Text>
                <Text style={[styles.label]}>
                    {t('myTest:points')} :{'  '}
                    <Text style={{ fontWeight: 'bold' }}> {points}</Text>
                </Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnDetails]}>
            <Logo source={icon} />
            <Description
                title={name}
                description={description}
                points={score} />
        </View>
    );
}
export default MyCardMyTest;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //container
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        //flexDirection: 'row',
        backgroundColor: colors.White,
        marginBottom: height * 0.025,
        //padding: width * 0.025,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //container >> Details
    ctnDetails: {
        width: '100%',
        height: height * 0.15,
        backgroundColor: colors.White,
        padding: width * 0.025,
        marginBottom: height * 0.025,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //Estilo >> Logo
    logo: {
        height: height * 0.06,
        width: height * 0.06,
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //Estilo >> Titulo modulos
    title: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontWeight: 'bold'
        //fontFamily: letter.Text_1,
    },
    //Estilo >> Texto modulos
    label: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        //fontFamily: letter.Text_2,
    },
    //container >> Points
    ctnPoints: {
        width: width * 0.5,
        height: height * 0.05,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    //container >> Button
    ctnButton: {
        width: '100%',
        height: height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Blue,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    //container >> Details Module
    ctnDetailsModule: {
        width: '100%',
        padding: width * 0.025,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    //container >> Qualifications
    ctnQualification: {
        flex: 0.8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //container >> Name Module
    ctnNameModule: {
        width: '100%',
        flexDirection: 'row'
    },

})
