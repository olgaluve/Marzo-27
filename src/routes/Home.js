//---------------------------------------------------------------------------------------------
//--------------------------------Navegador de CAJON anidado-----------------------------------
//---------------------------------------------------------------------------------------------
//Descripcion:  Navegador de Cajon anidado. Navegador hijo, contiene las pantallas de
//              navegacion del usuario. Estas conforman el HOME, y es lo que ve el usuario
//              posterior a su logueo. Tenga encuenta que esta declaracion corresponde a un menu
//              de cajon animado, por lo cual cada pantalla declarada se realiza dentro de un
//              navegador de pila interno, por lo cual poseen un nivel de anidamiento (2).
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useEffect, useRef, useState } from 'react';
import { Platform, StatusBar, View, Dimensions, Animated as AnimatedRN } from 'react-native';
import { Vibration } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import AsyncStorage from '@react-native-community/async-storage';
//-----------------------------------------Animated--------------------------------------------
import Animated from 'react-native-reanimated';
const { interpolate, Extrapolate } = Animated;
//-----------------------------------------Componentes-----------------------------------------
import MyViewNotification from '../components/MyViewNotification';
//------------------------------------------Redux----------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { AddNotification, UpdateNotification } from '../redux/actions/actions';
//-------------------------------------------Firebase------------------------------------------
import messaging from '@react-native-firebase/messaging';
//-------------------------------------------Funciones-----------------------------------------
import { permisoNotificacion } from '../functions/functions';
//-------------------------------------------Servicies-----------------------------------------
import { addNotificacion, updateNotificacion } from '../services/services';
//------------------------------------------Estilos--------------------------------------------
import { HomeNavigator } from '../styles/styles';
//-----------------------------------------Data------------------------------------------------
import { keyAsync } from '../data/data';
//---------------------------------------Menu >> Cajon-----------------------------------------
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyCustomDrawer from '../components/MyCustomDrawer';
import MyCustomScreen from '../components/MyCustomScreen';
//---------------------------------------Pantallas de App--------------------------------------
//----------------------Pantallas de navegador de cajon (Anidamiento 2)------------------------
import HomeScreen from '../screens/HomeScreen';
import ResourcesScreen from '../screens/ResourcesScreen';
import EventsScreen from '../screens/EventsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpScreen from '../screens/HelpScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
//---------------------------------Navegador de pila (Anidamiento 2)---------------------------
import Profile from './Profile';
import Test from './Test';
import Courses from './Courses';
import Videos from './Videos';
import Podcast from './Podcast';
//--------------------------------Declaracion >> Constantes Globales---------------------------
const HOME_SCREENS = [
    { id: 1, name: 'Main', component: HomeScreen },
    { id: 2, name: 'Courses', component: Courses },
    { id: 3, name: 'Videos', component: Videos },
    { id: 4, name: 'Resources', component: ResourcesScreen },
    { id: 5, name: 'Test', component: Test },
    { id: 6, name: 'Events', component: EventsScreen },
    { id: 7, name: 'Profile', component: Profile },
    //{ id: 8, name: 'Achievements', component: AchievementsScreen },
    { id: 9, name: 'Help', component: HelpScreen },
    { id: 10, name: 'Notifications', component: NotificationsScreen },
    { id: 11, name: 'Podcast', component: Podcast },
    //{ id: 11, name: 'CropLife'},
    //{ id: 12, name: 'LogOut'},
];
//----------------------------Declaracion >> Variables Globales--------------------------------
let screenStyle = null;//Objeto de estilo de screen de navegador
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const KEY_NOTIFICATION = 'route';
const TIME_ANIMATED = 800;
//---------------------------------------------------------------------------------------------
//-----------------------------Declaracion de Navegador de Cajon-------------------------------
//---------------------------------------------------------------------------------------------
const Drawer = createDrawerNavigator();//Objeto de cajon
const Home = (props) => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux-----------------------------------
    //-------------------------------------------------------------------------------------------
    //--------------------------------------Actions----------------------------------------------
    const dispatch = useDispatch();
    const add_Notification = data => dispatch(AddNotification(data));
    const update_Notification = data => dispatch(UpdateNotification(data));
    //-------------------------------------------------------------------------------------------
    //-----------------------Declaracion de variables de animacion-------------------------------
    //-------------------------------------------------------------------------------------------
    const translateY = useRef(new AnimatedRN.Value(0));//Estado inicial : Posicion de cuadrado
    //--------------------------------Referencia >> Animacion------------------------------------
    //---------------------Animacion >> Desplazamiento en Y de cuadrado--------------------------
    const Move_Y_Down = useRef(
        AnimatedRN.timing(translateY.current, {
            toValue: height * 0.2,//0.05
            duration: TIME_ANIMATED,
            useNativeDriver: true,
        })).current;
    const Move_Y_Up = useRef(
        AnimatedRN.timing(translateY.current, {
            toValue: -height * 0.15,//0.15
            duration: TIME_ANIMATED,
            useNativeDriver: true,
        })).current;
    //-----------------------------------------------------------------------------------------
    //---------------------------------Declaracion >> Estados----------------------------------
    //-----------------------------------------------------------------------------------------
    const [viewNotification, setViewNotification] = useState(false);//Estado >> Show Notificacion.
    const [dataNotification, setDataNotification] = useState({})//Estado >> Datos Notificacion.
    //-----------------------------------------------------------------------------------------
    //---------------------------------Declaracion >> Funciones--------------------------------
    //-----------------------------------------------------------------------------------------
    //-------------------------------Funcion >> Agregar de Notificaion-------------------------
    //Descripcion : Permite almacenar las notificaciones recibidas desde FCM (Firebase Cloud Messaging)
    //              en la tabla 'user_notification' con el id de usuario, cuando este previamente a
    //              iniciadoo sesion.
    const newNotification = async ({ idUser, data }) => {
        //Declaracion de objeto de datos de notificacion
        let dataObj = new Object();
        dataObj.idUser = idUser;
        dataObj.title = data.notification.title;
        dataObj.body = data.notification.body;
        dataObj[KEY_NOTIFICATION] = data.data[KEY_NOTIFICATION];
        if (Platform.OS === 'android')
            dataObj.url_image = data.notification.android.imageUrl;
        else
            dataObj.url_image = data.notification.ios.imageUrl;
        try {
            let responseNotification = await addNotificacion({ data: dataObj });
            responseNotification = responseNotification.data;
            if (responseNotification.status) {
                dataObj.id = responseNotification.data.idNotification;
                dataObj.fecha = responseNotification.data.fecha;
                dataObj.actionUser = '0';
                add_Notification(dataObj);//Actualizacion >> Listado notificaciones local.
                setDataNotification(dataObj);
                setViewNotification(true);//Show >> Vista Notificacion
            }
        } catch (error) {
            console.group('Error >> Foreground Notification');
            console.log(error);
            console.groupEnd();
        }
    }
    //--------------------------Funcion >> Actualizacion Notificaione--------------------------
    //Descripcion : permite actualizar el parametro de vista de la notificacion.
    const updateData = async ({ id = '', route = '' }) => {
        try {
            let response = await updateNotificacion({ id: id });
            let verify = response.data.status;
            if (verify) {
                let data = new Object();
                data.id = id;
                data.name = 'actionUser';
                data.value = '1';
                update_Notification(data);
                navigation.navigate(route);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //-----------------------------------------------------------------------------------------
    //---------------------------------Declaracion >> Effects----------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------Instancia de Observador de evento de notificacion-------------------
    //--------------------Estado de App >> Foreground (Primer Plano)---------------------------
    useEffect(() => {
        //Instancia de solicitud de permiso de envio de notificaciones
        //Nota >> En Android esta funcion siempre se resolvera de manera correcta por lo cual
        //        no es necesaria su implementacion. Para plataformas IOS se hace necesaria
        //        debido a los permisos obligatorios que debe seder el usuario a la app.
        permisoNotificacion();
        //Instancia de Observador de evento de notificacion
        //Estado de App >> Foreground (Primer Plano/Enfocada)
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            try {
                let responseData = await AsyncStorage.getItem(keyAsync.user);
                if (responseData !== null) {
                    let dataJSON = JSON.parse(responseData);
                    newNotification({ idUser: dataJSON.id, data: remoteMessage });
                }
            } catch (error) {
                console.log(error);
            }
        });
        return unsubscribe;
    }, []);
    //-----------------------Instancia de Animacion >> Vista Notificacion----------------------
    useEffect(() => {
        if (viewNotification) {
            Vibration.vibrate();
            Move_Y_Down.start(({ finished }) => {
                setTimeout(() => {
                    Move_Y_Up.start(({ finished }) => {
                        setViewNotification(false);
                    });
                }, TIME_ANIMATED * 3);
            });
        }
    }, [viewNotification]);
    //-----------------------------------------------------------------------------------------
    //----------------------------------Instancia >> Navegador---------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={HomeNavigator.bgView} >
            <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
            <View style={HomeNavigator.transparentView}>
                <Drawer.Navigator
                    initialRouteName="Main"
                    drawerType='back'
                    overlayColor='transparent'
                    sceneContainerStyle={HomeNavigator.sceneContainerStyle}
                    drawerStyle={HomeNavigator.drawerStyle}
                    drawerContent={props => {
                        const scale = interpolate(props.progress, {
                            inputRange: [0, 1],
                            outputRange: [1, 0.85],
                            extrapolate: Extrapolate.CLAMP
                        });
                        const borderRadius = interpolate(props.progress, {
                            inputRange: [0, 1],
                            outputRange: [0, 20],
                            extrapolate: Extrapolate.CLAMP
                        });
                        //Objeto de estilo >> Animaciones de Screen
                        screenStyle = { transform: [{ scaleY: scale }], borderRadius };
                        return <MyCustomDrawer {...props} />;
                    }} >
                    {HOME_SCREENS.map(screen => {
                        return (
                            <Drawer.Screen key={screen.id} name={screen.name}>
                                {props => <MyCustomScreen item={screen} {...props} style={{ ...screenStyle }} />}
                            </Drawer.Screen>
                        )
                    })}
                </Drawer.Navigator>
                {/*-------------------------Vista >> Notificacion Entrante (Foreground)--------------*/}
                <MyViewNotification
                    data={dataNotification}
                    translateY={translateY.current}
                    onPress={() => updateData({ id: dataNotification.id, route: dataNotification.route })} />
            </View>
        </View>
    )
};
export default Home;