//---------------------------------------------------------------------------------------------
//--------------------------Pantalla de Recuperacion de Contraseña-----------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useRef } from 'react';
import { Dimensions, Animated } from 'react-native';
//----------------------------------Librerias Adicionales--------------------------------------
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyHeaderLogin from '../components/MyHeaderLogin';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import MySpace from '../components/MySpace';
import MyAlert from '../components/MyAlert';
//------------------------------------------Servicios------------------------------------------
import { sendMail, sendCode, sendPassword } from '@services/services';
//------------------------------------------Funciones-----------------------------------------
import { VerificarEmail } from '@functions/functions';
//-------------------------------------------Estilos-------------------------------------------
import { ForgetPasswordStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
export default function ForgotPasswordScreen(props) {
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion de Estados de App----------------------------------
    //-------------------------------------------------------------------------------------------
    const [email, setEmail] = useState('');//Estado de email de usuario
    const [code, setCode] = useState('');//Estado de codigo de usuario
    const [showCode, setShowCode] = useState(true);//Estado de show/hide codigo de verificacion
    const [newPassword, setNewPassword] = useState('');//Estado de nueva contraseña de usuario
    const [showNewPassword, setShowNewPassword] = useState(true);//Estado de show/hide nueva contraseña
    const [confirmPassword, setConfirmPassword] = useState('');//Estado de confirmacion de nueva contraseña de usuario
    //------------------------------------Estados de check---------------------------------------
    const [checkEmail, setCheckEmail] = useState(true);//Estado de Check de Email
    const [checkCode, setCheckCode] = useState(true);//Estado de Check de Codigo
    const [checkNewPassword, setCheckNewPassword] = useState(true);//Estado de Check de Nueva Contraseña
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);//Estado de check de confirmacion de nueva contraseña
    //------------------------------------Estados de Alert---------------------------------------
    const [typeAlert, setTypeAlert] = useState('Error');//Estado de tipo de alerta
    const [showAlert, setShowAlert] = useState(false);//Estado de Show/Hide Alert
    const [textAlert, setTextAlert] = useState('');//Estado de msm de Alert
    //--------------------------Estados de flujo de cambio de contraseña-------------------------
    const [state, setState] = useState(1);//Estado de flujo
    //-------------------------------------------------------------------------------------------
    //-------------------------Declaracion de variables de animacion-----------------------------
    //-------------------------------------------------------------------------------------------
    const OpacityEmail = useRef(new Animated.Value(1));//Opacidad de Form de email
    const OpacityPassword = useRef(new Animated.Value(0));//Opacidad de Form de password
    //---------------------------------Referencia >> Animacion-----------------------------------
    //-------------------------Animacion >> Opacidad de form de Email----------------------------
    const Email_Opacity_Hide = useRef(
        Animated.timing(OpacityEmail.current, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Password_Opacity_Show = useRef(
        Animated.timing(OpacityPassword.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    //-------------------------------Constantes de interpolacion---------------------------------
    const Email_Move_X = OpacityEmail.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
        extrapolate: 'clamp'
    });
    const Password_Move_X = OpacityPassword.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.3],
        extrapolate: 'clamp'
    });
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion de funciones-----------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------Funcion >> Verificacion de Campos-------------------------------
    //Descripcion : Permite la verificacion de los campos del formulario en las distintas
    //              instancias del proceso de cambio de contraseña.
    const VerificarCampos = async (state) => {
        //Declaracion de maquina de estados para flujo de cambio de contraseña
        switch (state) {
            case 1://Case >> Envio de email
                let VerifyEmail = VerificarEmail(email);//Verificacion gramatical de email
                setCheckEmail(VerifyEmail);
                if (VerifyEmail) {
                    try {
                        let responseSendEmail = await sendMail(email);
                        if (responseSendEmail.data.status) {
                            AlertParameters('Exito', t('formForgotPassword:succesSendCode'));
                            setState(2);//Cambio de estado
                            setCheckEmail(false);
                        } else {
                            AlertParameters('Error', t('formForgotPassword:errorSendCode'));
                            setCheckEmail(false);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else AlertParameters('Error', t('formForgotPassword:errorEmail'));
                break;
            case 2://Case >> Verificacion de codigo
                let VerifyCode = code !== '';
                setCheckCode(VerifyCode);
                if (VerifyCode) {
                    try {
                        let responseSendCode = await sendCode(code);
                        if (responseSendCode.data.status) {
                            setState(3);//Cambio de estado
                            setCheckCode(false);
                            Animated.sequence(
                                [Email_Opacity_Hide, Password_Opacity_Show,]
                            ).start(({ finished }) => {
                                AlertParameters('Exito', t('formForgotPassword:succesCheckCode'));
                            });
                        } else {
                            AlertParameters('Error', t('formForgotPassword:errorCheckCode'));
                            setCheckCode(false);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else AlertParameters('Error', t('formForgotPassword:errorCode'));
                break;
            case 3://Verificacion y confirmacion de contraseña
                let existPassword = newPassword !== '';//Verificacion de ingreso de nueva contraseña
                let existConfirmPassword = confirmPassword !== '';//Verificacion de ingreso de confirmacion de contraseña
                let samePassword = newPassword === confirmPassword;//Verificacion de igual de contraseñas
                let verifyPassword = samePassword && existPassword && existConfirmPassword;
                setCheckNewPassword(samePassword || existPassword);
                setCheckConfirmPassword(samePassword || existConfirmPassword);
                if (verifyPassword) {
                    try {
                        let responseSendPassword = await sendPassword(newPassword);
                        if (responseSendPassword.data.status) {
                            setState(4);
                            AlertParameters('Exito', t('formForgotPassword:succesUpdatePassword'));
                        } else {
                            AlertParameters('Error', t('formForgotPassword:errorUpdatePassword'));
                            setCheckConfirmPassword(false);
                            setCheckNewPassword(false);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    let inicialLine = t('formForgotPassword:errorCheck');
                    let msm = inicialLine;
                    !existPassword ? msm += t('formForgotPassword:password') + ', ' : null;
                    !existConfirmPassword ? msm += t('formForgotPassword:checkPassword') + ', ' : null;
                    if (msm !== inicialLine) {
                        msm = msm.substring(0, msm.length - 2) + '.';
                        !samePassword ? msm += t('formForgotPassword:errorPasswordNoEqual') : null;
                    } else {
                        msm = '';
                        !samePassword ? msm += t('formForgotPassword:errorPasswordNoEqual') : null;
                    }
                    AlertParameters('Error', msm);
                }
                break;
            default:
                break;
        }
    }
    //---------------------------Funcion >> Parametros de Alert----------------------------------
    //Descripcion : Permite configurar las distintas propiedades de configuracion del componente
    //              'MyAlert', en funcion del tipo de mensaje que se desea visualizar.
    //Nota >> Para efectos de documentacion remitase a la siguiente ruta relativa en el proyecto:
    //        src\screens\componets\MyAlert.js
    const AlertParameters = (type, msm) => {
        setTypeAlert(type);
        setShowAlert(true);
        setTextAlert(msm);
    }
    //---------------------------Funcion >> Accion de componente MyAlert-------------------------
    //Descripcion : Permite generar acciones especificas de acuerdo a la instacia actal del flujo
    //              de actualizacion de contraseña.
    const AlertAction = (state) => {
        let validacion = state === 4;
        setShowAlert(false);
        if (validacion) props.navigation.navigate('Login');
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion de Effects-------------------------------------
    //-------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App------------------------------------
    //-------------------------------------------------------------------------------------------
    return (
        <Wallpaper styleWallpaper={[{ justifyContent: 'flex-start' }]}>
            <KeyboardAwareScrollView
                contentContainerStyle={[ForgetPasswordStyles.ctnKeyboard]}
                enableAutomaticScroll={false}
                enableOnAndroid={true}
                extraScrollHeight={0}
                extraHeight={0}>
                {/*--------------------------------Seccion >> Header--------------------------------*/}
                <MyHeaderLogin
                    title={t('formForgotPassword:headerTitle')}
                    body={t('formForgotPassword:headerBody')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                {/*------------------------------Seccion >> Form Email------------------------------*/}
                <Animated.View
                    style={[ForgetPasswordStyles.ctnForm,
                    { flex: Email_Move_X, opacity: OpacityEmail.current }]}>
                    <MyTextInput
                        styleCtnInput={[ForgetPasswordStyles.ctnTextInput,
                        { borderColor: checkEmail ? colors.Blue : colors.White }]}
                        inputBg={state > 1 ? colors.Green + 'AF' : colors.Red + 'AF'}
                        iconName={'email-outline'}
                        iconSize={20}
                        iconColor={checkEmail ? colors.Blue : colors.White}
                        inputColor={checkEmail ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formForgotPassword:email') + 'example@example.com'}
                        inputPlaceHolderColor={checkEmail ? colors.Blue : colors.White}
                        inputKeyboard={'email-address'}
                        inputSecurity={false}
                        inputOnChangeText={(email) => setEmail(email)}
                        onFocus={() => setCheckEmail(true)}
                        inputValue={email}
                        inputEditable={state === 1 ? true : false}
                        inputCheck={checkEmail}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[ForgetPasswordStyles.ctnTextInput,
                        { borderColor: state === 2 ? (checkCode ? colors.Blue : colors.White) : colors.Blue + '5F' }]}
                        inputBg={state > 2 ? colors.Green + 'AF' : colors.Red + 'AF'}
                        iconName={'shield-key-outline'}
                        iconSize={20}
                        iconColor={state === 2 ? (checkCode ? colors.Blue : colors.White) : colors.Blue + '5F'}
                        inputColor={state === 2 ? (checkCode ? colors.Blue : colors.White) : colors.Blue + '5F'}
                        inputPlaceHolder={t('formForgotPassword:code')}
                        inputPlaceHolderColor={state === 2 ? (checkCode ? colors.Blue : colors.White) : colors.Blue + '5F'}
                        inputKeyboard={'number-pad'}
                        inputOnChangeText={(code) => setCode(code)}
                        onFocus={() => setCheckCode(true)}
                        inputValue={code}
                        inputEditable={state === 2 ? true : false}
                        inputCheck={checkCode}
                        button={true}
                        buttonOnpress={() => setShowCode(!showCode)}
                        buttonIcon={showCode ? 'eye-outline' : 'eye-off-outline'}
                        inputSecurity={showCode} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                </Animated.View>
                {/*----------------------------Seccion >> Form Password-----------------------------*/}
                <Animated.View
                    style={[ForgetPasswordStyles.ctnForm,
                    { flex: Password_Move_X, opacity: OpacityPassword.current }]}>
                    <MyTextInput
                        styleCtnInput={[ForgetPasswordStyles.ctnTextInput,
                        { borderColor: checkNewPassword ? colors.Blue : colors.White }]}
                        iconName={'lock'}
                        iconSize={20}
                        iconColor={checkNewPassword ? colors.Blue : colors.White}
                        inputColor={checkNewPassword ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formForgotPassword:password')}
                        inputPlaceHolderColor={checkNewPassword ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputOnChangeText={(newPassword) => setNewPassword(newPassword)}
                        onFocus={() => setCheckNewPassword(true)}
                        inputValue={newPassword}
                        inputEditable={state === 3 ? true : false}
                        inputCheck={checkNewPassword}
                        button={true}
                        buttonOnpress={() => setShowNewPassword(!showNewPassword)}
                        buttonIcon={showNewPassword ? 'eye-outline' : 'eye-off-outline'}
                        inputSecurity={showNewPassword} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[ForgetPasswordStyles.ctnTextInput,
                        { borderColor: checkConfirmPassword ? colors.Blue : colors.White }]}
                        iconName={'lock-check'}
                        iconSize={20}
                        iconColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formForgotPassword:checkPassword')}
                        inputPlaceHolderColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputOnChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        onFocus={() => setCheckConfirmPassword(true)}
                        inputValue={confirmPassword}
                        inputEditable={state === 3 ? true : false}
                        inputCheck={checkConfirmPassword}
                        inputSecurity={true} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                </Animated.View>
                {/*---------------------------Seccion >> Botones de Accion--------------------------*/}
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[ForgetPasswordStyles.ctnButtonLight]}
                    buttonOnpress={() => VerificarCampos(state)}
                    textStyle={ForgetPasswordStyles.textButton}
                    text={
                        state === 1 ? t('buttons:enviar')
                            : (state === 2 ? t('buttons:verificar')
                                : t('buttons:confirmar'))} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[ForgetPasswordStyles.ctnButtonDark]}
                    buttonOnpress={() => props.navigation.navigate('Login')}
                    textStyle={[ForgetPasswordStyles.textButton, { color: colors.Blue }]}
                    text={t('buttons:regresar')} />
                <MyAlert
                    show={showAlert}
                    alert={typeAlert}
                    text={textAlert}
                    showOK={true}
                    onPressOK={() => AlertAction(state)} />
            </KeyboardAwareScrollView>
        </Wallpaper>
    );
}
