//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCustomDrawer----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente permite renderizar los taps del menu de cajon animado implementando.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { Fragment, useState, useEffect } from 'react';
import { Text, ImageBackground, StyleSheet, SafeAreaView, Dimensions, View } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
//---------------------------------------Menu de Cajon-----------------------------------------
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
//-----------------------------------------Animated--------------------------------------------
import Animated from 'react-native-reanimated';
const { interpolate, Extrapolate } = Animated;
//------------------------------------------Funciones------------------------------------------
import { totalScore, categoryParameters } from '../functions/functions';
//-------------------------------------------Servicies-----------------------------------------
import { scoreUser } from '../services/services';
import { UpdateLogros } from '../redux/actions/actions';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
//------------------------------------------Estilos--------------------------------------------
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import Perfil from '../assets/photo-profile.png';
import { letter } from '../styles/letter';
//-----------------------------Declaracion >> Contanstes Globales------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_ICON = width < 350 ? moderateScale(14) : moderateScale(18);
const FONTSIZE_NOTIFICATION = width < 350 ? moderateScale(10) : moderateScale(10);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
function MyCustomDrawer(props) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes Locales----------------------------
    //-----------------------------------------------------------------------------------------
    const { state, progress, navigation } = props;//Recepcion >> Propiedades de navegador
    const { index, routes } = state;//Recepcion >> Parametros de navegador
    const TABLE_ICON = {
        'Main': 'home',
        'Courses': 'pen',
        'Videos': 'play',
        'Resources': 'file-download',
        'Test': 'brain',
        'Events': 'calendar-alt',
        'Profile': 'user',
        'Notifications': 'envelope',
        'Achievements': 'medal',
        'Help': 'question-circle',
        'Podcast': 'podcast',
        'LogOut': 'sign-out-alt',
    };//Tabla de iconos
    const TABLE_NAME = {
        'Main': t('buttonsMenu:home'),
        'Courses': t('buttonsMenu:cursos'),
        'Videos': t('buttonsMenu:videos'),
        'Resources': t('buttonsMenu:recursos'),
        'Test': t('buttonsMenu:test'),
        'Events': t('buttonsMenu:eventos'),
        'Profile': t('buttonsMenu:perfil'),
        'Achievements': t('buttonsMenu:logros'),
        'Notifications': t('buttonsMenu:notificacion'),
        'Help': t('buttonsMenu:ayuda'),
        'Podcast': t('buttonsMenu:podcast'),
        'LogOut': t('buttonsMenu:salida'),
    }
    //------------------------------Instancia >> Constantes de Animacion-----------------------
    const opacity = interpolate(progress, {
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.1, 1],
        extrapolate: Extrapolate.CLAMP
    });
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Estados------------------------------------
    //-----------------------------------------------------------------------------------------
    const [numberNotification, setNumberNotification] = useState(0);
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------Funcion >> Accion de Tap de Menu-----------------------------
    //Descripcion : Genera las acciones relacionadas a la seleccion de una pantalla del menu
    //              desplegable.
    const ScreenTap = ({ screen }) => {
        let idUser = props.user.data.id;
        //if (screen === 'Achievements') getScore({ idUser: idUser });
        navigation.navigate(`${screen}`);
    }
    //-------------------------------Funcion >> Obtener Logros---------------------------------
    //Descripcion : Obtiene los logros del usuario, realizando una llamada a la Api.
    //------------------------Funcion >> Almacenamiento de logros de usuario-------------------
    //Descripcion : Permite almacenar la informacion relacionada con los logros del usuario.
    const getScore = async ({ idUser }) => {
        try {
            //Obtencion >> Puntaje Usuario
            let responseScore = await scoreUser({ idUser: idUser });
            responseScore = responseScore.data.data;
            let total = totalScore({ arrayScore: responseScore });
            let levelParameters = categoryParameters({ score: total });
            let scoreObj = new Object();
            scoreObj.total = total
            scoreObj.labelLevel = levelParameters.labelLevel;
            scoreObj.labelNextLabel = levelParameters.labelNextLabel;
            scoreObj.missingPoints = levelParameters.missingPoints;
            props.UpdateLogros(scoreObj);
        } catch (e) {
            console.log('Error >> Save Score User >> ', e);
        }
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> AvatarPerfil-------------------------------
    //Descripcion : Renderiza la imagen de perfil del usuario del menu de taps.
    const AvatarPerfil = ({ source }) => {
        return (
            <SafeAreaView style={styles.imageContainer} edges={['top']}>
                <ImageBackground
                    source={source}
                    style={styles.drawerImage}
                    imageStyle={styles.imageStyle}
                    resizeMode='cover' />
            </SafeAreaView>
        );
    }
    //--------------------------------Componente >> TapDrawerItem------------------------------
    //Descripcion : Renderiza los items del menu de navegacion de cajon.
    const LabelDrawerItem = ({ route, name, focused }) => {
        const styleFocus = focused ? styles.activeText : styles.inactiveText;
        return (
            <Text style={[styleFocus, { fontSize: FONTSIZE_TEXT_LABEL }]}>
                <Icon
                    name={TABLE_ICON[route]}
                    size={FONTSIZE_ICON}
                    color={focused ? colors.DarkBlue : colors.White} />
                {'  '}{name}
            </Text>
        );
    }
    //-------------------------Componente >> Burbuja de notificacion---------------------------
    //Descripcion : Renderiza el indicador de notificaciones en el tap de menu.
    const NotificationBubble = ({ numNotification = 0 }) => {
        if (numNotification > 0)
            return (
                <View style={[styles.iconNotification]}>
                    <Text style={[styles.numberNotification]}>{numNotification}</Text>
                </View>
            )
        else
            return null
    }
    //-----------------------------------------------------------------------------------------
    //---------------------------------Declaracion >> Effects----------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------Effect >> Numero de notificaciones---------------------------
    useEffect(() => {
        let notifications = props.notification.data;
        if (notifications) {
            let data = notifications.filter(data => data.actionUser === '0');
            setNumberNotification(data.length);
        }
    }, [props.notification.data])
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.container, { opacity: opacity }]}>
            {/*-----------------------Seccion >> Foto de Perfil-----------------------------*/}
            <AvatarPerfil source={props.user.data.url_avatar !== '' ?
                { uri: props.user.data.url_avatar }
                : Perfil} />
            {/*-----------------------Seccion >> Drawer Items-------------------------------*/}
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={styles.drawerContentContainerStyle}>
                {routes.map((route, position) => {
                    const isFocused = (index === position);
                    return (
                        <DrawerItem
                            key={route.key}
                            label={({ focused }) => {
                                return (
                                    <Fragment>
                                        {route.name === 'Notifications' &&
                                            <NotificationBubble numNotification={numberNotification} />}
                                        <LabelDrawerItem
                                            route={route.name}
                                            name={TABLE_NAME[route.name]}
                                            focused={focused} />
                                    </Fragment>
                                )
                            }}
                            style={isFocused ? styles.activeContainer : styles.inActiveContainer}
                            onPress={() => ScreenTap({ screen: route.name })}
                            focused={isFocused}
                            activeBackgroundColor='transparent' />
                    )
                })}
                <DrawerItem
                    key={'12'}
                    label={({ focused }) => {
                        return (
                            <LabelDrawerItem
                                route={'LogOut'}
                                name={TABLE_NAME['LogOut']}
                                focused={focused} />
                        )
                    }}
                    style={styles.inActiveContainer}
                    onPress={() => ScreenTap({ screen: 'LogOut' })}
                    activeBackgroundColor='transparent' />
            </DrawerContentScrollView>
        </Animated.View>
    )
};
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Instancia de Estados almacenados en Store--------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapStateToProps = state => {
    //Instancia de state
    //IdState : State
    //  >> State : Es el Id dado al reducer en el archivo reducers.js.
    //      Ruta Relativa >> app\reducers\reducers.js
    return {
        user: state.user,
        notification: state.notification,
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        AddUser: (data) => dispatch(AddUser(data)),
        ErrorUser: () => dispatch(ErrorUser()),
        UpdateLogros: (data) => dispatch(UpdateLogros(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(MyCustomDrawer);
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de tap
    container: {
        flex: 1
    },

    drawerContentContainerStyle: {
        paddingTop: 0,
    },
    //Estilo >> Contenedor >> Imagen Avatar
    imageContainer: {
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 100,
        marginBottom: 20
    },
    //Estilo >> Imagen Avatar
    drawerImage: {
        width: width * 0.25,
        height: width * 0.25
    },
    //Estilo >> Adicionales de Imagen Avatar
    imageStyle: {
        borderRadius: 20
    },

    imageGradient: {
        flex: 1,
        borderRadius: 10
    },
    //Estilo >> Contenedor de vista activa
    activeContainer: {
        borderLeftWidth: 5,
        borderLeftColor: colors.DarkBlue,
        backgroundColor: 'rgba(0,0,0,0.2)',
        backgroundColor: colors.White,
        borderRadius: 5,
        marginTop: 0,
        //marginRight: 0,
    },
    //Estilo >> Texto de vista activa
    activeText: {
        fontWeight: 'bold',
        color: colors.DarkBlue,
        backgroundColor: 'transparent'
    },
    //Estilo >> Contenedor de vista inactiva
    inActiveContainer: {
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        backgroundColor: 'transparent',
        borderRadius: 5,
        marginTop: 0,
    },
    //Estilo >> Texto de vista inactiva
    inactiveText: {
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent'
    },
    //Estilo >> Icono Notificacion
    iconNotification: {
        position: 'absolute',
        top: -width * 0.03,
        left: -width * 0.02,
        zIndex: 10,
        width: width * 0.05,
        height: width * 0.05,
        borderRadius: 100,
        backgroundColor: colors.Red,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Numero Notificaciones
    numberNotification: {
        color: colors.White,
        fontFamily: letter.Title,
        fontSize: FONTSIZE_NOTIFICATION,
    }
});