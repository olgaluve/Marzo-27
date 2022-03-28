//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Cierre de sesion------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useEffect } from 'react';
import { View, Image, StatusBar, ActivityIndicator, Text } from 'react-native';
//----------------------------------Librerias Adicionales--------------------------------------
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { CleanUser } from '../redux/actions/actions';
//-------------------------------------------Firebase------------------------------------------
import messaging from '@react-native-firebase/messaging';
//------------------------------------Recursos Graficos----------------------------------------
import LogoCompany from '../assets/logo-croplife.jpg';
//----------------------------------------Estilos----------------------------------------------
import { LogOutStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//-----------------------------------------Data------------------------------------------------
import { keyAsync } from '../data/data';
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const LogOutScreen = (props) => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componente---------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Componente >> Logo de Compania------------------------------
    //Descripcion : Renderiza el logo de la compania.
    const Logo = ({ source }) => {
        return (
            <View style={[LogOutStyles.ctnImagen]}>
                <Image
                    resizeMode="contain"
                    style={[LogOutStyles.imagen]}
                    source={source} />
            </View>
        );
    }
    //-----------------------------Componente >> Texto de carga--------------------------------
    //Descripcion : Renderiza el texto de carga de pantalla.
    const TextLoading = ({ msm }) => {
        return (
            <View style={[LogOutStyles.ctnText]}>
                <ActivityIndicator size="small" color={colors.White} />
                <Text style={[LogOutStyles.text]}>{msm}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Funcion >> Clean Data------------------------------------
    //Descripcion : Borra los datos de usuario almacenados en la cache.
    const CleanData = async () => {
        try {
            await AsyncStorage.removeItem(keyAsync.user);
            messaging().unsubscribeFromTopic('news');//Desuscripcion tema de noticias.
            //await AsyncStorage.removeItem(keyAsync.languaje);
            setTimeout(() => {
                //props.CleanUser();
                navigation.navigate('Login');
            }, 3000);
        } catch (e) {

        }
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Declaracion de Effects-----------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------------Effect >> Clean Data-----------------------------------
    useEffect(() => {
        CleanData();//Clean >> Data user
    }, []);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animatable.View
            style={[LogOutStyles.ctnScreen]}
            animation="pulse"
            iterationCount={'infinite'}
            duration={1000}>
            <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
            <Logo source={LogoCompany} />
            <TextLoading msm={'Cerrando sesión'} />
        </Animatable.View>
    );
}
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        CleanUser: () => dispatch(CleanUser()),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(null, mapDispatchToProps)(LogOutScreen);
