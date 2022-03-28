/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
//-------------------------------------Librerias Adicionales-------------------------------
import AsyncStorage from '@react-native-community/async-storage';
//-------------------------------------------Firebase--------------------------------------
import messaging from '@react-native-firebase/messaging';
//------------------------------------------Track Player-----------------------------------
import TrackPlayer from 'react-native-track-player';
//-------------------------------------------Servicies-------------------------------------
import { addNotificacion } from './src/services/services';
//---------------------------------------------Data----------------------------------------
import { keyAsync } from './src/data/data';
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
    if (Platform.OS === 'android')
        dataObj.url_image = data.notification.android.imageUrl;
    else
        dataObj.url_image = data.notification.ios.imageUrl;
    console.group('Objeto de Notificacion');
    console.log(dataObj);
    console.groupEnd();
    try {
        await addNotificacion({ data: dataObj });
    } catch (error) {
        console.group('Error >> Background Notification');
        console.log(error);
        console.groupEnd();
    }
}
//---------------------------------------------------------------------------------------------
//---------------------Instancia de Observador de evento de notificacion-----------------------
//--------------------Estado de App >> Background (Segundo Plano/Cerrada)----------------------
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.group('Notificaciones FCM >> Segundo Plano/Cerrada');
    console.log(remoteMessage);
    console.groupEnd();
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

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));

