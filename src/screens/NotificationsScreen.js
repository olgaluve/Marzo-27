//-----------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Notificaciones----------------------------------
//-----------------------------------------------------------------------------------------------
//Nota : Para el servicio de notificaciones se implementa el modulo de firebase messaging cloud,
//       utilizando suscripcion a temas, en este caso un tema general 'news', que permite enviar
//       notificaciones de informacion general a todos los dispoditivos.
//Nota : Token de prueba de notificaciones
//          >> c2fUXM_QQh2oKUPSsoTFbZ:APA91bGleNDJJFDyC91xwIsfXQGx0zCtDmrOsVYCuIdaRtGO5NedKTQq1ryx0VRh0dPfKKWWsR2I4nhwpe_k8IvdzzKnqPz0t4T8HsV8DJSPv5CxxPw-20TCag4ooS8g6Q7mFRYqdknV
//          >> dohvzpr8STGau3pAYA2M7s:APA91bEcLxe4yQMdcuFMGa5KSoyemTD4QlzxHQIxb7Dka30sCTnNh4HUCuuICXBhVmgrKk7GbUz-bnBjBjHiLMiP8toD4z4IpwnqPvmULzFAwl_N8VoCoZ43wqMsGCyDrsk8tb_YBUHi
//-----------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes---------------------------------
//-----------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-------------------------------
import React from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
//-----------------------------------Librerias Adicionales---------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes--------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardNotification from '../components/MyCardNotification';
//------------------------------------------Redux------------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { DeleteNotification } from '../redux/actions/actions';
//-----------------------------------------Servicios---------------------------------------------
import { deleteNotificacion } from '../services/services';
//-------------------------------------------Estilos---------------------------------------------
import { NotificationsStyles } from '../styles/styles';
//-----------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App-----------------------------------------
//-----------------------------------------------------------------------------------------------
const NotificationsScreen = props => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux-----------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------------------State-----------------------------------------------
    const notifications = useSelector(state => state.notification);
    //--------------------------------------Actions----------------------------------------------
    const dispatch = useDispatch();
    const delete_Notification = data => dispatch(DeleteNotification(data));
    //-------------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-------------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------Funcion >> Eliminar Notificacion--------------------------------
    //Descripcion : Elimina la notificacon seleccionada.
    const deleteData = async ({ id = '0' }) => {
        try {
            let responseNotification = await deleteNotificacion({ id: id });
            let verify = responseNotification.status;
            if (verify)
                delete_Notification(id);
        } catch (error) {
            console.log(error);
        }
    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------Componente >> NotificationCompany------------------------------
    //Descripcion : Renderiza las notificaciones de la compañia.
    const NotificationCompany = (props) => {
        const { data, navigation } = props;
        const render = data.length > 0;
        return (
            <View style={[NotificationsStyles.ctnNotification]}>
                {render && <MyListNotifications navigation={navigation} data={data} />}
                {!render && <MyTextNotification msm={'Sin notificariones disponibles'} />}
            </View>
        )
    }
    //----------------------------Componente >> MyListNotifications------------------------------
    //Descripcion : Renderiza las notificaciones de la compañia en un contenedor desplazable (FlatList).
    const MyListNotifications = (props) => {
        const { data, navigation } = props;
        return (
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return (
                        <MyCardNotification
                            navigation={navigation}
                            id={item.id}
                            title={item.title}
                            body={item.body}
                            image={item.url_image}
                            action={item.actionUser}
                            route={item.route}
                            deleteItem={(id) => deleteData({ id: id })} />
                    );
                }}
                keyExtractor={(item) => item.id} />
        );
    }
    //----------------------------Componente >> MyTextNotification-------------------------------
    //Descripcion : Renderiza el msm de notificaciones.
    const MyTextNotification = ({ msm }) => {
        return (
            <View style={[NotificationsStyles.ctnMsm]}>
                <Text style={[NotificationsStyles.textMsm]}>{msm}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:notificacion')}
                navigation={navigation} />
            <NotificationCompany
                data={notifications.data}
                navigation={navigation} />
        </Wallpaper>
    );
};
export default NotificationsScreen;