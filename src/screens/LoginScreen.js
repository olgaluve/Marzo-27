//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla de Logueo----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useEffect } from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
//----------------------------------Librerias Adicionales--------------------------------------
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyHeaderLogin from '../components/MyHeaderLogin';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import MySpace from '../components/MySpace';
import MyAlert from '../components/MyAlert';
import MyLoading from '../components/MyLoading';
import MySelectLanguajes from '@components/MySelectLanguajes';
//------------------------------------------Funciones------------------------------------------
import { VerificarEmail, totalScore, categoryParameters } from '@functions/functions';
//-------------------------------------------Servicies-----------------------------------------
import { LoginUser, scoreUser, getNotificaciones } from '../services/services';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { AddUser, ErrorUser, UpdateLogros, GetNotification } from '../redux/actions/actions';
//-------------------------------------------Firebase------------------------------------------
import messaging from '@react-native-firebase/messaging';
//-------------------------------------------Estilos-------------------------------------------
import { LoginStyles } from '@styles/styles';
import { colors } from '@styles/colors';
//-----------------------------------------Data------------------------------------------------
import { keyAsync, languajeSelect } from '../data/data';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
//-------------------------------------------Contexto------------------------------------------
//import { AuthContext } from '../../../contexts/AuthContext';
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const LoginScreen = (props) => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados de App----------------------------------
    //-------------------------------------------------------------------------------------------
    const [email, setEmail] = useState('');//Estado de email de usuario
    const [password, setPassword] = useState('');//Estado de password de usuario
    const [showPassword, setShowPassword] = useState(true);//Estado de mostrar ocultar contraseña
    //-----------------------------------Estados de check----------------------------------------
    const [checkEmail, setCheckEmail] = useState(true);//Estado de check de email
    const [checkPassword, setCheckPassword] = useState(true);//Estado de check de password
    //------------------------------------Estados de Alert---------------------------------------
    const [showAlert, setShowAlert] = useState(false);//Estado de Show/Hide Alert
    const [textAlert, setTextAlert] = useState('');//Estado de msm de Alert
    //------------------------------------Estados >> Loading-------------------------------------
    const [showLoading, setShowLoading] = useState(false);//Estado >> Modal de carga
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> funciones-----------------------------------
    //-------------------------------------------------------------------------------------------
    //-----------------------------Funcion >> Verificacion de campos-----------------------------
    //Descripcion : Verifica la informacion ingresada por el usuario, y la valida con la
    //              informacion de la base de datos.
    const VerificarCampos = (email, password) => {
        let verifyEmail = CheckFields('email', email);
        let verifyPassword = CheckFields('password', password);;
        setCheckEmail(verifyEmail);
        setCheckPassword(verifyPassword);
        let verifyFields = verifyEmail && verifyPassword;
        if (verifyFields) Login(email, password);
        else MsmError(verifyEmail, verifyPassword);
    }
    //--------------------------------Funcion >> Check de campos----------------------------------
    //Descripcion : Permite verificar los diferentes campos de entrada del formulario, aplicando
    //              el metodo de verificacion correspondiente.
    const CheckFields = (fielsName, fiels) => {
        let verify = false;
        switch (fielsName) {
            case 'email': verify = VerificarEmail(fiels); break;
            case 'password': verify = fiels !== ''; break;
            default:
                break;
        }
        return verify;
    }
    //-------------------------------Funcion >> Logueo de usuario--------------------------------
    //Descripcion : Permite generar la accion de login con los datos proporcionados por el usuario,
    //              asi como manejar el error generado por un ingreso de datos no correspondiente.
    const Login = async (email, password) => {
        setShowLoading(true);
        try {
            let responseUser = await LoginUser({ email: email, password: password });//Obtencion >> Datos Usuario
            let verify = responseUser.data.status;
            let data = verify ? responseUser.data.data : '';//Obtencion >> Datos Usuario.
            let responseScore = verify ? await scoreUser({ idUser: data.id }) : '';//Obtencion >> Puntaje Usuario.
            let responseNotification = verify ? await getNotificaciones({ idUser: data.id }) : '';
            let verifyNotification = responseNotification.data.status;
            if (verify && verifyNotification) {
                let dataNotification = responseNotification.data.data;
                let userLanguage = FindLanguage({ language: data.language });//Obtencion >> Lenguage de usuario.
                let logros = getLogros({ score: responseScore.data.data });//Obtencion Objeto Logros
                data['language'] = userLanguage;
                data['logros'] = logros;
                props.GetNotification(dataNotification);
                saveDataUser({ data: data });//Almacenamiento Datos usuario.
            } else {
                setShowLoading(false);
                MsmError(false, false);
            }
        } catch (error) {
            setShowLoading(false);
            MsmError(false, false);
        }
    }
    //------------------------Funcion >> Obtencion Logros Usuario--------------------
    //Descripcion : Permite almacenar la informacion relacionada con los logros del usuario.
    const getLogros = ({ score }) => {
        let total = totalScore({ arrayScore: score });
        let levelParameters = categoryParameters({ score: total });
        let scoreObj = new Object();
        scoreObj.total = total
        scoreObj.labelLevel = levelParameters.labelLevel;
        scoreObj.labelNextLabel = levelParameters.labelNextLabel;
        scoreObj.missingPoints = levelParameters.missingPoints;
        return scoreObj;
    }
    //------------------------Funcion >> Almacenamiento de datos de usuario---------------------
    //Descripcion : Permite almacenar los datos del usuario logeado satisfactoriamente en la
    //              cache del dispositivo y en el manejador de estados.
    const saveDataUser = async ({ data }) => {
        try {
            await AsyncStorage.setItem(keyAsync.user, JSON.stringify(data));
            await AsyncStorage.setItem(keyAsync.languaje, data.language);
            messaging().subscribeToTopic('news');//Suscripcion a tema de noticias.
            i18n.changeLanguage(data.language);//Cambio de lenguaje de App.
            props.AddUser(data);//Redux >> Almacenamiento Datos de usuario.
            GoScreen({ route: 'Home' });
        } catch (e) {
            console.log('Error >> Save Data User >> ', e);
        }
    }
    //---------------------------------Funcion >> Mensaje de Error------------------------------
    //Descripcion : Permite generar un msm de error al usuario.
    const MsmError = (verifyEmail, verifyPassword) => {
        let msm = t('formLogin:errorCheck');
        !verifyEmail ? msm += t('formLogin:email') + ', ' : null;
        !verifyPassword ? msm += t('formLogin:password') + ', ' : null;
        msm = msm.substring(0, msm.length - 2) + '.';
        SetupAlert(msm);
    }
    //-----------------------------------Funcion >> Configurar Alert-----------------------------
    //Descripcion : Permite realizar la configuracion del Alert, en funcion de las accion de usuario.
    const SetupAlert = (msm) => {
        setShowAlert(true);
        setTextAlert(msm);
    }
    //--------------------------------Funcion >> Go Screen---------------------------------------
    //Descripcion : Realiza el set de las variables de Check de los inputs del formulario de ingreso
    //              del usuario y permite la visualizacion de la pantalla seleccionada.
    const GoScreen = ({ route = 'Register' }) => {
        setCheckEmail(true);
        setCheckPassword(true);
        setEmail('');
        setPassword('');
        switch (route) {
            case 'Register': navigation.navigate('Register'); break;
            case 'ForgotPassword': navigation.navigate('ForgetPassword'); break;
            case 'Home': navigation.navigate('Home'); break;
            default:
                break;
        }
        setShowLoading(false);
    }
    //--------------------------------Funcion >> Busquedad de lenguaje---------------------------
    //Descripcion : Devuelve el codigo de lenguage de acuerdo al codigo dado como parametro.
    const FindLanguage = ({ language = '3' }) => {
        let userLanguage = 'en';
        languajeSelect.map(data => {
            if (data.code === language) userLanguage = data.id;
        })
        return userLanguage;
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Effects-------------------------------------
    //-------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------
    //--------------------------------Diseño >> Cuerpo de App------------------------------------
    //-------------------------------------------------------------------------------------------
    return (
        <Wallpaper styleWallpaper={[{ justifyContent: 'flex-start' }]}>
            <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
            <MySpace ctnSpace={{ height: height * 0.05, width }} />
            <KeyboardAwareScrollView
                contentContainerStyle={[LoginStyles.ctnKeyboard]}
                enableAutomaticScroll={false}
                enableOnAndroid={true}
                extraScrollHeight={0}
                extraHeight={0}>
                <MyHeaderLogin
                    title={t('formLogin:headerTitle')}
                    body={t('formLogin:headerBody')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <View style={[LoginStyles.ctnForm]}>
                    <MyTextInput
                        styleCtnInput={[LoginStyles.ctnTextInput,
                        { borderColor: checkEmail ? colors.Blue : colors.White }]}
                        iconName={'email-outline'}
                        iconSize={20}
                        iconColor={checkEmail ? colors.Blue : colors.White}
                        inputColor={checkEmail ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formLogin:email') + ' example@example.com'}
                        inputPlaceHolderColor={checkEmail ? colors.Blue : colors.White}
                        inputKeyboard={'email-address'}
                        inputSecurity={false}
                        inputOnChangeText={(email) => setEmail(email)}
                        onFocus={() => setCheckEmail(true)}
                        inputValue={email}
                        inputEditable={true}
                        inputCheck={checkEmail}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[LoginStyles.ctnTextInput,
                        { borderColor: checkPassword ? colors.Blue : colors.White }]}
                        iconName={'lock'}
                        iconSize={20}
                        iconColor={checkPassword ? colors.Blue : colors.White}
                        inputColor={checkPassword ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formLogin:password')}
                        inputPlaceHolderColor={checkPassword ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputOnChangeText={(password) => setPassword(password)}
                        onFocus={() => setCheckPassword(true)}
                        inputValue={password}
                        inputEditable={true}
                        inputCheck={checkPassword}
                        button={true}
                        buttonOnpress={() => setShowPassword(!showPassword)}
                        buttonIcon={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        inputSecurity={showPassword} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                </View>
                <MyButton
                    ctnButton={[LoginStyles.buttonForgotPassword]}
                    buttonOnpress={() => GoScreen({ route: 'ForgotPassword' })}
                    textStyle={LoginStyles.textForgotPassword}
                    text={t('buttons:olvidarContrasena')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[LoginStyles.ctnButtonLight]}
                    buttonOnpress={() => VerificarCampos(email, password)}
                    textStyle={LoginStyles.textButton}
                    text={t('buttons:ingresar')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[LoginStyles.ctnButtonDark]}
                    buttonOnpress={() => GoScreen({ route: 'Register' })}
                    textStyle={[LoginStyles.textButton, { color: colors.Blue }]}
                    text={t('buttons:registrarse')} />
                <MyAlert
                    show={showAlert}
                    alert={'Error'}
                    text={textAlert}
                    showOK={true}
                    onPressOK={() => setShowAlert(false)} />
                <MyLoading
                    show={showLoading}
                    label={'Iniciando Sesion'} />
            </KeyboardAwareScrollView>
        </Wallpaper>
    );
}
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
        GetNotification: (data) => dispatch(GetNotification(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);