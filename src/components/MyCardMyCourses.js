//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> label        >> Titulo
//                  >> logo         >> Logo
//                  >> modules      >> Numero de modulos
//                  >> language     >> Lenguajes disponibles

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text, Alert } from 'react-native';
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
const MyCardMyCourses = (props) => {
    const { data, type, onPress, navigation } = props;
    const { idCourse, nameCourse, logoCourse, progress } = data;
    const { pointsCourse, poinstModule, modules, urlCourse } = data;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Configuracion---------------------------------
    //-----------------------------------------------------------------------------------------
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Estados-------------------------------------
    //-----------------------------------------------------------------------------------------
    const [toggle, setToggle] = useState(false);

    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------------Funcion >> Cambio de Tap-------------------------------
    //Descripcion : Permite la transsicion de cambio del tap del header.
    const changeToggle = () => {
        let tempToggle = !toggle;
        setToggle(tempToggle);//Deteccion de accion >> Presionar boton
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                500,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.opacity
            )
        );
    }
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
    const Description = ({ title, type, points, progress, modules }) => {
        let numModules = modules.length;
        let qualification = 0;
        modules.forEach(item => {
            qualification += parseInt(item.qualification);
        });
        let totalQualification = Math.ceil(qualification / numModules);
        return (
            <View style={[styles.ctnDescription]}>
                <View style={[styles.ctnIconToggle]}>
                    <Icon
                        name={toggle ? 'chevron-up' : 'chevron-down'}
                        size={SIZE_ICON}
                        color={colors.DarkBlue} />
                </View>
                <Text style={[styles.title]}>{title}</Text>
                <Text style={[styles.label]}>
                    {type === 'completed' ? t('myCourses:courseCompleted') : t('myCourses:courseInProgress')}
                </Text>
                {
                    type === 'completed' &&
                    <Text style={[styles.label]}>
                        {t('myCourses:qualification')} :
                        <Text style={{ fontWeight: 'bold' }}>     {totalQualification}%</Text>
                    </Text>
                }
                {
                    type === 'inProgress' &&
                    <Text style={[styles.label]}>
                        {t('myCourses:progress')} :{'     '}
                        <Text style={{ fontWeight: 'bold' }}>     {progress}%</Text>
                    </Text>
                }
                <Text style={[styles.label]}>
                    {t('myCourses:points')} :{'            '}
                    <Text style={{ fontWeight: 'bold' }}> {points}</Text>
                </Text>
            </View>
        );
    }
    //---------------------------------Componente >> Detalles Modulo---------------------------
    //Descripcion : Renderiza los detalles de modulo.
    const DetailsModule = ({ index, name, status, points, qualification }) => {
        return (
            <View style={[styles.ctnDetailsModule]}>
                <View style={[styles.ctnLogo]}>
                    {
                        status === '4' &&
                        <Icon
                            name="check-circle"
                            size={SIZE_ICON}
                            color={colors.Green} />
                    }
                    {
                        status === '5' &&
                        <Icon
                            name="close-circle"
                            size={SIZE_ICON}
                            color={colors.Red} />
                    }
                    {
                        status === '1' &&
                        <Icon
                            name="checkbox-blank-circle"
                            size={SIZE_ICON}
                            color={colors.Black + '3F'} />
                    }
                </View>
                <View style={[styles.ctnQualification]}>
                    <View style={[styles.ctnNameModule]}>
                        <Text style={[styles.label, { fontWeight: 'bold' }]}>
                            {t('courses:modulo')} {index + 1}{' :  '}
                            <Text style={{ fontWeight: 'normal' }}>{name}</Text>
                        </Text>
                    </View>
                    <Text style={[styles.label, { fontWeight: 'bold' }]}>
                        {t('myCourses:qualification')} :
                        <Text style={{ fontWeight: 'normal' }}>     {qualification}%</Text>
                    </Text>
                    <Text style={[styles.label, { fontWeight: 'bold' }]}>
                        {t('myCourses:points')} :{'            '}
                        <Text style={{ fontWeight: 'normal' }}> {points}</Text>
                    </Text>
                </View>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                style={[styles.ctnDetails]}
                onPress={() => changeToggle()}>
                <Logo source={logoCourse} />
                <Description
                    title={nameCourse}
                    type={type}
                    points={pointsCourse + poinstModule}
                    progress={progress}
                    modules={modules} />
            </TouchableOpacity>
            {
                toggle &&
                modules.map((data, index) =>
                    <DetailsModule
                        key={data.id + '_module'}
                        index={index}
                        name={data.name}
                        status={data.status}
                        points={data.points}
                        qualification={data.qualification} />
                )
            }
            {
                idCourse === '3' &&
                <MyButton
                    ctnButton={[styles.ctnButton, { backgroundColor: '#A7A9AC' }]}
                    text={'Curso disponible en Web'}
                    textStyle={[styles.label, { fontWeight: 'bold', color: colors.White }]}
                    buttonOnpress={() => Alert.alert('holaaa')} />
            }
            {
                idCourse !== '3' &&
                <MyButton
                    ctnButton={[styles.ctnButton]}
                    text={type === 'completed' ? t('myCourses:download') : t('myCourses:course')}
                    textStyle={[styles.label, { fontWeight: 'bold', color: colors.White }]}
                    buttonOnpress={onPress} />
            }
        </View>
    );
}
export default MyCardMyCourses;
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
        padding: width * 0.025,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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
    //container >> Icon Toggle
    ctnIconToggle: {
        position: 'absolute',
        top: height * 0.005,
        right: width * 0.025,
        width: width * 0.05,
        height: width * 0.05,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})
