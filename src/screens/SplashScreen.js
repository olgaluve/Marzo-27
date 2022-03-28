//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Registro--------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StatusBar, Animated, Text, ActivityIndicator } from 'react-native';
//----------------------------------Librerias Adicionales--------------------------------------
import AsyncStorage from '@react-native-community/async-storage';
import { useTranslation } from 'react-i18next';
//---------------------------------------Redux-------------------------------------------------
import { connect } from 'react-redux';
import { AddUser, ErrorUser, GetNotification } from '../redux/actions/actions';
//-------------------------------------------Servicies-----------------------------------------
import { getNotificaciones } from '../services/services';
//---------------------------------------Estilos-----------------------------------------------
import { SplashStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//------------------------------------Recursos Graficos----------------------------------------
import LogoCompany from '../assets/logo-croplife.jpg';
//-----------------------------------------Data------------------------------------------------
import { keyAsync } from '../data/data';
//---------------------------------------------------------------------------------------------
//---------------------------Declaracion >> Constantes Globales--------------------------------
//---------------------------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const SplashScreen = (props) => {
  //-------------------------------------------------------------------------------------------
  //----------------------------Declaracion >> Objeto de traduccion----------------------------
  //-------------------------------------------------------------------------------------------
  const { i18n } = useTranslation();//Objeto de traduccion
  const { navigation } = props;
  //-------------------------------------------------------------------------------------------
  //-----------------------Declaracion de variables de animacion-------------------------------
  //-------------------------------------------------------------------------------------------
  const Square_Y = useRef(new Animated.Value(-height * 0.4));//Estado inicial : Posicion de cuadrado
  //--------------------------------Referencia >> Animacion------------------------------------
  //---------------------Animacion >> Desplazamiento en Y de cuadrado--------------------------
  const Square_Move_Y_Down = useRef(
    Animated.timing(Square_Y.current, {
      toValue: -height * 0.3,
      duration: 800,
      useNativeDriver: true,
    })).current;
  const Square_Move_Y_Up = useRef(
    Animated.timing(Square_Y.current, {
      toValue: -height * 1.15,
      duration: 800,
      useNativeDriver: true,
    })).current;
  //-------------------------------Constantes de interpolacion---------------------------------
  const View_Move_Y = Square_Y.current.interpolate({
    inputRange: [-height * 1.2, -height * 0.3],
    outputRange: [-height * 0.8, height * 0.15],
    extrapolate: 'clamp'
  });
  //-----------------------------------------------------------------------------------------
  //-----------------------------Declaracion de componentes----------------------------------
  //-----------------------------------------------------------------------------------------
  const Square = () => {
    const rotate = '35deg';//Constante de rotacion  de elemento
    const translateY = Square_Y.current;
    const translateX = -width * 0.15;
    return <Animated.View
      style={[SplashStyles.ctnSquare, {
        transform: [{ translateX }, { translateY }, { rotate },]
      }]}
    />
  }
  //-------------------------------------------------------------------------------------------
  //-------------------------------Declaracion >> Funciones------------------------------------
  //-------------------------------------------------------------------------------------------
  //------------------------------Funcion >> Animacion Square----------------------------------
  //Descripcion : Se encarga de generar la animacion de salida del SplashScreen.
  const AnimatedSquare = ({ route = 'Login' }) => {
    Animated.sequence(
      [Square_Move_Y_Down, Square_Move_Y_Up,]
    ).start(({ finished }) => {
      navigation.navigate(route);
    });
  }
  //--------------------------------Funcion >> Get data User-----------------------------------
  //Descripcion : Se encarga de verificar la existencia y obtener los datos de usuario
  //              almacenados en cache.
  const getDataUser = async ({ key }) => {
    try {
      let responseData = await AsyncStorage.getItem(key);
      let dataJSON = JSON.parse(responseData);
      let responseNotification = responseData !== null ? await getNotificaciones({ idUser: dataJSON.id }) : '';
      let verifyNotification = responseData !== null ? responseNotification.data.status : false;
      if (verifyNotification && responseData !== null) {
        let dataNotification = responseNotification.data;
        props.GetNotification(dataNotification.data);
        props.AddUser(dataJSON);
        AnimatedSquare({ route: 'Home' });
      }
      else AnimatedSquare({ route: 'Login' });
    } catch (error) {
      console.log(error);
    }
  }
  //-------------------------------------------------------------------------------------------
  //--------------------------------Declaracion de Effects-------------------------------------
  //-------------------------------------------------------------------------------------------
  //----------------------------------Effect >> Get Data---------------------------------------
  useEffect(() => {
    //SaveData();
    getDataUser({ key: keyAsync.user });
  }, [])
  //-------------------------------------------------------------------------------------------
  //--------------------------------Diseño de cuerpo de App------------------------------------
  //-------------------------------------------------------------------------------------------
  return (
    <View style={[SplashStyles.ctnScreen]}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <Square />
      <Animated.Image
        source={LogoCompany}
        style={[SplashStyles.LogoEmpresa,
        { transform: [{ translateY: View_Move_Y }] }]}
        resizeMode={'contain'} />
      <Animated.View
        style={[SplashStyles.ctnLoading,
        { transform: [{ translateY: View_Move_Y }] }]}>
        <ActivityIndicator size="small" color={colors.Blue} />
        <Text style={[SplashStyles.txtEmpresa]}> Loading...</Text>
      </Animated.View>
    </View>
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
    AddUser: (data) => dispatch(AddUser(data)),
    ErrorUser: () => dispatch(ErrorUser()),
    GetNotification: (data) => dispatch(GetNotification(data)),
  }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(null, mapDispatchToProps)(SplashScreen);