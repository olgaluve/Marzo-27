//---------------------------------------------------------------------------------------------
//----------------------------Pantalla >> Actualizacion de app---------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useCallback, useState } from 'react';
import { View, Image, Text, Dimensions, Platform, StatusBar, Linking } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { UpdateAppStyles } from '../styles/styles';
//---------------------------------------Recursos Graficos-------------------------------------
import LogoCompany from '../assets/LogoCompanySinFondo.png';
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const UpdateAppScreen = () => {
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //----------------------------Declaracion  >> Constantes locales---------------------------
    const LINK_PLATFORM = {
        'ios': 'https://apps.apple.com/co/app/educativa-croplife/id1547652296',
        'android': 'https://play.google.com/store/apps/details?id=com.cursos_croplifela&hl=es_CO&gl=US'
    }
    const MSM = {
        'title': 'Nueva Versión Disponible',
        'label': '\nActualiza tu APP para acceder a \n nuevos cursos, guías, recursos y \n herramientas.'
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Funciones---------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Funcion >> LinkAppStore----------------------------------
    //Descripcion : Redirecciona al usuario a la tienda especifica de plataforma para actualizar
    //              la app.
    const LinkAppStore = async ({ url = '' }) => {
        const supported = await Linking.canOpenURL(url);
        if (supported)
            await Linking.openURL(url);
        else
            Alert.alert(`Error : En ${url}`);
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Componentes-------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Walpaper----------------------------------
    //Descripcion : Renderiza el fondo con degrade.
    const MyWallpape = ({ children }) => {
        return (
            <LinearGradient
                colors={['#FFFFFF', '#DAE1EB', '#FFFFFF']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={[UpdateAppStyles.container]}>
                {children}
            </LinearGradient>
        );
    }
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo de la compañia.
    const Logo = ({ source }) => {
        return (
            <View style={[UpdateAppStyles.ctnLogo]}>
                <Image
                    source={source}
                    style={[UpdateAppStyles.logo]}
                    resizeMode={'stretch'} />
            </View>
        );
    }
    //---------------------------------Componente >> Message-----------------------------------
    //Descripcion : Renderiza el mensaje de usuario.
    const Message = ({ title = '', label = '' }) => {
        return (
            <View style={[UpdateAppStyles.ctnMessage]}>
                <Text style={[UpdateAppStyles.title]}>{title}</Text>
                <Text style={[UpdateAppStyles.label]}>{label}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <MyWallpape>
            <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
            <Logo source={LogoCompany} />
            <MySpace ctnSpace={{ flex: 0.025, width }} />
            <Message
                title={MSM['title']}
                label={MSM['label']} />
            <MySpace ctnSpace={{ flex: 0.025, width }} />
            <MyButton
                ctnButton={[UpdateAppStyles.btnUpdate]}
                text={'Actualizar APP'}
                textStyle={[UpdateAppStyles.btnText]}
                buttonOnpress={() => LinkAppStore({ url: LINK_PLATFORM[Platform.OS] })} />
        </MyWallpape>
    );
};
export default UpdateAppScreen;

