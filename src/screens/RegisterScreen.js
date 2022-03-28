//-----------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Registro----------------------------------------
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes---------------------------------
//-----------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-------------------------------
import React, { useState, useEffect, useRef } from 'react';
import { Animated, Dimensions, ImageBackground, View, Text } from 'react-native';
//----------------------------------Librerias Adicionales----------------------------------------
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
//----------------------------------------Componentes--------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyHeaderLogin from '../components/MyHeaderLogin';
import MyTextInput from '../components/MyTextInput';
import MyPicker from '../components/MyPicker';
import MyCheck from '../components/MyCheck';
import MyButton from '../components/MyButton';
import MySpace from '../components/MySpace';
import MyAlert from '../components/MyAlert';
import MyModal from '../components/MyModal';
import MyTermsAndConditions from '../components/MyTermsAndConditions';
import MyLoading from '../components/MyLoading';
//------------------------------------------Funciones--------------------------------------------
import { VerificarEmail, strNewFormat } from '../functions/functions';
//------------------------------------------Servicios--------------------------------------------
import { registerUser } from '../services/services';
//-------------------------------------------Estilos---------------------------------------------
import { RegisterStyles } from '../styles/styles';
import { moderateScale } from '../styles/scale';
import { colors } from '../styles/colors';
//-------------------------------------Recursos Graficos---------------------------------------
import Perfil from '../assets/photo-profile.png';
//---------------------------------------------Data----------------------------------------------
import { dataCountry, dataWorkSector, languajeSelect, keyAsync } from '../data/data';
//--------------------------------------Constantes Globales--------------------------------------
const { width, height } = Dimensions.get('window');
const sizePhoto = 500;
//-------------------------------------------Contexto--------------------------------------------

//-----------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App-----------------------------------------
//-----------------------------------------------------------------------------------------------
export default function RegisterScreen(props) {
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes Globales-----------------------------
    //-------------------------------------------------------------------------------------------
    const MESSAGING_ERROR = {
        'ExistingUser': t('formRegister:errorExistingUser'),
        'UpdateImage': t('formRegister:errorUpdateImage'),
        'Unsupportedfile': t('formRegister:errorUnsupportedfile'),
        'SuscriptionMailChimp': t('formRegister:errorSuscriptionMailChimp'),
        'RegisterData': t('formRegister:errorRegisterData'),

    };
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion de Estados de App----------------------------------
    //-------------------------------------------------------------------------------------------
    const [state, setState] = useState(0);//Estado >> Flujo de formulario
    //-----------------------------Estados >> Datos de usuario-----------------------------------
    const [name, setName] = useState('');//Estado >> Nombre de usuario
    const [apellido, setApellido] = useState('');//Estado >> Apellido de usuario
    const [pais, setPais] = useState('');//Estado >> Pais
    const [ciudad, setCiudad] = useState('');//Estado >> Ciudad
    const [workSector, setWorkSector] = useState('');//Estado >> Sector de trabajo
    const [company, setCompany] = useState('');//Estado >> Nombre de compañia
    const [job, setJob] = useState('');//Estado >> Posicion/trabajo
    const [languaje, setLanguaje] = useState('');//Estado >> Lenguaje
    const [urlAvatar, setUrlAvatar] = useState('');//Estado >> Url Avatar
    const [selectAvatar, setSelectAvatar] = useState(false);//Estado >> Seleccion de avatar
    const [email, setEmail] = useState('');//Estado >> Email de usuario
    const [password, setPassword] = useState('');//Estado >> Password de usuario
    const [showPassword, setShowPassword] = useState(true);//Estado >> Mostrar ocultar contraseña
    const [confirmPassword, setConfirmPassword] = useState('');//Estado >> Confirmacion de contraseña
    //-----------------------------Estados >> Check----------------------------------------------
    const [checkName, setCheckName] = useState(true);//Estado de check >> Nombre de usuario
    const [checkApellido, setCheckApellido] = useState(true);//Estado de check >> Apellido de usuario
    const [checkPais, setCheckPais] = useState(true);//Estado de check >> Pais
    const [checkCiudad, setCheckCiudad] = useState(true);//Estado de check >> Ciudad
    const [checkWorkSector, setCheckWorkSector] = useState(true);//Estado de check >> Sector de trabajo
    const [checkCompany, setCheckCompany] = useState(true);//Estado de check >> Nombre de compañia
    const [checkJob, setCheckJob] = useState(true);//Estado de check >> Posicion/trabajo
    const [checkLanguaje, setCheckLanguaje] = useState(true);//Estado de check >> Languaje
    const [checkEmail, setCheckEmail] = useState(true);//Estado de check >> Email
    const [checkPassword, setCheckPassword] = useState(true);//Estado de check >> Password
    const [checkConfirmPassword, setCheckConfirmPassword] = useState(true);//Estado de check >> Confirm password
    const [checkPolitics, setCheckPolitics] = useState(false);//Estado de check >> Politicas
    const [checkBoletin, setCheckBoletin] = useState(false);//Estado >> Confirmacion registro Mailchimp
    //-----------------------------Estados >> Alert----------------------------------------------
    const [showAlert, setShowAlert] = useState(false);//Estado Alert >> Show/Hide
    const [typeAlert, setTypeAlert] = useState('Error');//Estado Alert >> Tipo
    const [textAlert, setTextAlert] = useState('');//Estado Alert >> msm
    //------------------------------------Estados >> Loading-------------------------------------
    const [showLoading, setShowLoading] = useState(false);//Estado >> Modal de carga
    //-----------------------------Estados >> Terms and Conditions-------------------------------
    const [showTerms, setShowTerms] = useState(false);
    //-------------------------------------------------------------------------------------------
    //-------------------------Declaracion de variables de animacion-----------------------------
    //-------------------------------------------------------------------------------------------
    const OpacityDataUser = useRef(new Animated.Value(1));//Opacidad de Form >> Datos de usuario
    const OpacityDataJob = useRef(new Animated.Value(0));//Opacidad de Form >> Datos de trabajo
    const OpacityDataAvatar = useRef(new Animated.Value(0));//Opacidad de Form >> Avatar Perfil
    const OpacityDataCount = useRef(new Animated.Value(0));//Opacidad de Form >> Datos de cuenta
    //---------------------------------Referencia >> Animacion-----------------------------------
    //-------------------------Animacion >> Opacidad de form de Email----------------------------
    //------------------------------------Action Form >> Show------------------------------------
    const Data_User_Show = useRef(
        Animated.timing(OpacityDataUser.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Job_Show = useRef(
        Animated.timing(OpacityDataJob.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Avatar_Show = useRef(
        Animated.timing(OpacityDataAvatar.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Count_Show = useRef(
        Animated.timing(OpacityDataCount.current, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    //------------------------------------Action Form >> Hide------------------------------------
    const Data_User_Hide = useRef(
        Animated.timing(OpacityDataUser.current, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Job_Hide = useRef(
        Animated.timing(OpacityDataJob.current, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Avatar_Hide = useRef(
        Animated.timing(OpacityDataAvatar.current, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    const Data_Count_Hide = useRef(
        Animated.timing(OpacityDataCount.current, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
        })).current;
    //-------------------------------Constantes de interpolacion---------------------------------
    const User_Flex = OpacityDataUser.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
        extrapolate: 'clamp'
    });
    const Job_Flex = OpacityDataJob.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
        extrapolate: 'clamp'
    });
    const Avatar_Flex = OpacityDataAvatar.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.35],
        extrapolate: 'clamp'
    });
    const Count_Flex = OpacityDataCount.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.4],
        extrapolate: 'clamp'
    });
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion de funciones-----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------Funcion >> Importar imagen de galeria-------------------------
    //Descripcion:  Permite mostrar una imagen de la galeria, y almacenarla en formato BASE64
    //              como un string, para posteriormente enviarla a la base de datos.
    const ImportImagen = () => {
        const options = {
            mediaType: 'photo',
            maxHeight: sizePhoto,
            maxWidth: sizePhoto,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.error) console.log(response.error);
            else {
                setUrlAvatar(response.uri === undefined
                    ? (urlAvatar === '' ? '' : urlAvatar)
                    : response.uri);//Path >> Imagen seleccionada
                setSelectAvatar(true);//Seleccion >> Avatar
                console.log(response.uri);//Path Image >> Cache
                console.log(response.type);//Path Image >> Type
            }
        });
    }
    //-----------------------------Funcion >> Verificacion de formulario-------------------------
    //Descripcion : Permite verificar los campos del formulario actual de registro.
    const VerifyForm = async (state) => {
        let verifyFields = false;
        let inicialLine = t('formRegister:errorCheck');
        let msm = inicialLine;
        switch (state) {
            case 0://Formulario >> Datos de user
                let verifyName = CheckFields('input', name);
                let verifyApellido = CheckFields('input', apellido);
                let verifyPais = CheckFields('picker', pais);
                let verifyCiudad = CheckFields('input', ciudad);
                setCheckName(verifyName);
                setCheckApellido(verifyApellido);
                setCheckPais(verifyPais);
                setCheckCiudad(verifyCiudad);
                verifyFields = verifyName && verifyApellido && verifyPais && verifyCiudad;
                if (verifyFields) {
                    setState(state + 1);//Incremento de estado de flujo de formulario
                    Animated.sequence([Data_User_Hide, Data_Job_Show]).start();
                }
                else {
                    !verifyName ? msm += t('formRegister:name') + ', ' : null;
                    !verifyApellido ? msm += t('formRegister:lastname') + ', ' : null;
                    !verifyPais ? msm += t('formRegister:country') + ', ' : null;
                    !verifyCiudad ? msm += t('formRegister:city') + ', ' : null;
                    msm = msm.substring(0, msm.length - 2) + '.';
                    SetupAlert('Error', msm);
                }
                break;
            case 1://Formulario >> Datos de trabajo
                let verifyWorkSector = CheckFields('picker', workSector);
                let verifyCompany = CheckFields('input', company);
                let verifyJob = CheckFields('input', job);
                setCheckWorkSector(verifyWorkSector);
                setCheckCompany(verifyCompany);
                setCheckJob(verifyJob);
                verifyFields = verifyWorkSector && verifyCompany && verifyJob;
                if (verifyFields) {
                    setState(state + 1);//Incremento de estado de flujo de formulario
                    Animated.sequence([Data_Job_Hide, Data_Avatar_Show]).start();
                }
                else {
                    !verifyWorkSector ? msm += t('formRegister:workSector') + ', ' : null;
                    !verifyCompany ? msm += t('formRegister:company') + ', ' : null;
                    !verifyJob ? msm += t('formRegister:job') + ', ' : null;
                    msm = msm.substring(0, msm.length - 2) + '.';
                    SetupAlert('Error', msm);
                }
                break;
            case 2://Formulario >> Avatar de usuario
                setState(state + 1);//Incremento de estado de flujo de formulario
                Animated.sequence([Data_Avatar_Hide, Data_Count_Show]).start();
                break;
            case 3://Formulario >> Datos de cuenta
                let verifyEmail = CheckFields('email', email);
                let verifyPassword = CheckFields('input', password);
                let verifyConfirmPassword = CheckFields('input', confirmPassword);
                let existPassword = verifyPassword && verifyConfirmPassword;
                let SamePassword = password === confirmPassword;
                setCheckEmail(verifyEmail);
                setCheckPassword(verifyPassword);
                setCheckConfirmPassword(verifyConfirmPassword);
                verifyFields = verifyEmail && SamePassword && existPassword && checkPolitics;
                if (verifyFields) {
                    let data = new Object();//Objeto de datos de regsitro de usuario
                    data.name = name;
                    data.lastname = apellido;
                    data.workSector = workSector;
                    data.company = company;
                    data.position = job;
                    data.country = pais;
                    data.city = ciudad;
                    data.language = languaje;
                    data.url_avatar = urlAvatar;
                    data.email = email;
                    data.boletin = checkBoletin;
                    data.password = password;
                    console.group('Register Data');
                    console.log(data);
                    console.groupEnd();
                    setShowLoading(true);
                    try {
                        let responseRegister = await registerUser({ data: data, selectAvatar: selectAvatar });
                        if (responseRegister.data.status) {
                            messaging()
                                .subscribeToTopic('news')
                                .then(() => console.log('Subscribed to topic >> news!'));
                            setShowLoading(false);
                            setState(state + 1);//Incremento de estado de flujo de formulario
                            SetupAlert('Exito', t('formRegister:succesRegister'));
                        } else {
                            setShowLoading(false);
                            let messaging = MESSAGING_ERROR[responseRegister.data.errorType]
                            SetupAlert('Error', messaging);
                        }
                    } catch (error) {
                        setShowLoading(false);
                        SetupAlert('Error', t('formRegister:errorRegisterData'));
                        console.log('error');
                    }
                }
                else {
                    !verifyEmail ? msm += t('formRegister:email') + ', ' : null;
                    !verifyPassword ? msm += t('formRegister:password') + ', ' : null;
                    !verifyConfirmPassword ? msm += t('formRegister:checkPassword') + ', ' : null;
                    let verifyError = msm !== inicialLine;
                    if (verifyError) {
                        msm = msm.substring(0, msm.length - 2) + '.';
                        !existPassword ? msm += t('formRegister:errorPasswordValid') : null;
                        !SamePassword ? msm += t('formRegister:errorPasswordNoEqual') : null;
                        !checkPolitics ? msm += t('formRegister:errorpolitics') : null;
                    } else {
                        msm = '';
                        !existPassword ? msm += t('formRegister:errorPasswordValid') : null;
                        !SamePassword ? msm += t('formRegister:errorPasswordNoEqual') : null;
                        !checkPolitics ? msm += t('formRegister:errorpolitics') : null;
                    }
                    SetupAlert('Error', msm);
                }
                break;
            default:
                break;
        }
        msm = '';
        verifyFields = false;

    }
    //--------------------------------Funcion >> Check de campos----------------------------------
    //Descripcion : Permite verificar los diferentes campos de entrada del formulario, aplicando
    //              el metodo de verificacion correspondiente.
    const CheckFields = (fielsName, fiels) => {
        let verify = false;
        switch (fielsName) {
            case 'email':
                verify = VerificarEmail(fiels);
                break;
            case 'picker':
                verify = (fiels !== '0' && fiels !== '');
                break;
            case 'input':
                verify = fiels !== '';
                break;
            default:
                verify = fiels !== '';
                break;
        }
        return verify;
    }
    //-----------------------------------Funcion >> Configurar Alert-----------------------------
    //Descripcion : Permite realizar la configuracion del Alert, en funcion de las accion de usuario.
    const SetupAlert = (type, msm) => {
        setShowAlert(true);
        setTypeAlert(type);
        setTextAlert(msm);
    }
    //--------------------------------Funcion >> Go Form-----------------------------------------
    //Descripcion : Permite retornar al formulario anterior. En caso de encontrarse en el primer
    //              formulario de registro se retorna a la pantalla de login.
    const GoForm = (state) => {
        switch (state) {
            case 0://Formulario >> Datos de user
                GoScreen();
                break;
            case 1://Formulario >> Datos de trabajo
                setState(state - 1);//Decremento de estado de flujo de formulario
                Animated.sequence([Data_Job_Hide, Data_User_Show]).start();
                break;
            case 2://Formulario >> Avatar de usuario
                setState(state - 1);//Decremento de estado de flujo de formulario
                Animated.sequence([Data_Avatar_Hide, Data_Job_Show]).start();
                break;
            case 3://Formulario >> Datos de cuenta
                setState(state - 1);//Decremento de estado de flujo de formulario
                Animated.sequence([Data_Count_Hide, Data_Avatar_Show]).start();
                break;
            default:
                break;
        }
    }
    //--------------------------------Funcion >> Go Screen---------------------------------------
    //Descripcion : Realiza el set de las variables de Check de los inputs del formulario de ingreso
    //              del usuario y permite la visualizacion de la pantalla seleccionada.
    const GoScreen = () => {
        setCheckName(true);
        setCheckApellido(true);
        setCheckPais(true);
        setCheckCiudad(true);
        setCheckWorkSector(true);
        setCheckCompany(true);
        setCheckJob(true);
        setCheckEmail(true);
        setCheckPassword(true);
        setCheckConfirmPassword(true);
        setCheckPolitics(false);
        setCheckBoletin(false);
        props.navigation.navigate('Login');
    }
    //-------------------------------Funcion >> Button Alert-------------------------------------
    //Descripcion : Permite generar las acciones correspondientes al evento de touche del boton
    //              del Alert, de acuerdo al estado de flujo del formuario.
    const ActionAlert = (state) => {
        if (state === 4) {
            setState(0);//Set del flujo de formulario
            OpacityDataUser.current.setValue(1);
            OpacityDataJob.current.setValue(0);
            OpacityDataCount.current.setValue(0);
            OpacityDataAvatar.current.setValue(0);
            GoScreen();
        }
        setShowAlert(false);
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> AvatarPerfil-------------------------------
    //Descripcion : Renderiza la imagen de perfil del usuario del menu de taps.
    const AvatarPerfil = ({ source }) => {
        return (
            <View style={[RegisterStyles.avatar]}>
                <ImageBackground
                    source={source}
                    style={[RegisterStyles.imageAvatar]}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode='cover' />
                <MyButton
                    ctnButton={[RegisterStyles.btnSelectPhote]}
                    buttonOnpress={() => ImportImagen()}
                    iconName={'camera-plus'}
                    iconSize={moderateScale(25)}
                    iconColor={colors.White} />
            </View>
        );
    }
    //--------------------------------Componente >> Texto de Propiedad-------------------------
    //Descripcion : Renderiza un text determinado.
    const LabelText = ({ label, style }) => {
        return (
            <View style={[RegisterStyles.ctnLabel]}>
                <Text style={[style]}>{label}</Text>
            </View>
        );
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion de Effects-------------------------------------
    //-------------------------------------------------------------------------------------------
    useEffect(() => {
        if (languaje !== '')
            //i18n.changeLanguage(languaje);
            AsyncStorage.setItem(keyAsync.languaje, languaje)
                .then(() => {
                    console.log('Set Config Languaje : ', languaje)
                    i18n.changeLanguage(languaje);
                })
                .catch(error => console.log('Error Config >> Set Languaje', error));
    }, [languaje])
    //-------------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App------------------------------------
    //-------------------------------------------------------------------------------------------
    return (
        <Wallpaper styleWallpaper={[{ justifyContent: 'flex-start' }]}>
            <MySpace ctnSpace={{ height: height * 0.05, width }} />
            <KeyboardAwareScrollView
                contentContainerStyle={[RegisterStyles.ctnKeyboard]}
                enableAutomaticScroll={false}
                enableOnAndroid={true}
                extraScrollHeight={0}
                extraHeight={0}>
                <MyHeaderLogin
                    title={t('formRegister:headerTitle')}
                    body={t('formRegister:headerBody')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                {/*--------------------------------Form >> Datos de user----------------------*/}
                <Animated.View
                    style={[RegisterStyles.ctnForm,
                    { flex: User_Flex, opacity: OpacityDataUser.current }]}>
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkName ? colors.Blue : colors.White }]}
                        iconName={'account'}
                        iconSize={moderateScale(20)}
                        iconColor={checkName ? colors.Blue : colors.White}
                        inputColor={checkName ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:name')}
                        inputPlaceHolderColor={checkName ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputSecurity={false}
                        inputOnChangeText={(name) => setName(name)}
                        onFocus={() => setCheckName(true)}
                        inputValue={name}
                        inputEditable={true}
                        inputCheck={checkName}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkApellido ? colors.Blue : colors.White }]}
                        iconName={'account'}
                        iconSize={moderateScale(20)}
                        iconColor={checkApellido ? colors.Blue : colors.White}
                        inputColor={checkApellido ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:lastname')}
                        inputPlaceHolderColor={checkApellido ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputSecurity={false}
                        inputOnChangeText={(apellido) => setApellido(apellido)}
                        onFocus={() => setCheckApellido(true)}
                        inputValue={apellido}
                        inputEditable={true}
                        inputCheck={checkApellido}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyPicker
                        styleCtnPicker={[RegisterStyles.ctnPicker,
                        { borderColor: checkPais ? colors.Blue : colors.White }]}
                        pickerCheck={checkPais}
                        iconName={'flag-variant-outline'}
                        iconSize={moderateScale(20)}
                        color={checkPais ? colors.Blue : colors.White}
                        titlePicker={'Lista de Países'}
                        placeHolderPicker={t('formRegister:selectCountry')}
                        data={dataCountry}
                        onChange={(itemValue) => setPais(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkCiudad ? colors.Blue : colors.White }]}
                        iconName={'map-marker-outline'}
                        iconSize={20}
                        iconColor={checkCiudad ? colors.Blue : colors.White}
                        inputColor={checkCiudad ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:city')}
                        inputPlaceHolderColor={checkCiudad ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputSecurity={false}
                        inputOnChangeText={(ciudad) => setCiudad(ciudad)}
                        onFocus={() => setCheckCiudad(true)}
                        inputValue={ciudad}
                        inputEditable={true}
                        inputCheck={checkCiudad}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                </Animated.View>
                {/*--------------------------------Form >> Datos de Job-----------------------*/}
                <Animated.View
                    style={[RegisterStyles.ctnForm,
                    { flex: Job_Flex, opacity: OpacityDataJob.current }]}>
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyPicker
                        styleCtnPicker={[RegisterStyles.ctnPicker,
                        { borderColor: checkWorkSector ? colors.Blue : colors.White }]}
                        pickerCheck={checkWorkSector}
                        iconName={'account-hard-hat'}
                        iconSize={moderateScale(20)}
                        color={checkWorkSector ? colors.Blue : colors.White}
                        titlePicker={'Sector de Trabajo '}
                        placeHolderPicker={t('formRegister:selectWorkSector')}
                        data={dataWorkSector}
                        onChange={(itemValue) => setWorkSector(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkCompany ? colors.Blue : colors.White }]}
                        iconName={'office-building'}
                        iconSize={moderateScale(20)}
                        iconColor={checkCompany ? colors.Blue : colors.White}
                        inputColor={checkCompany ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:company')}
                        inputPlaceHolderColor={checkCompany ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputSecurity={false}
                        inputOnChangeText={(company) => setCompany(company)}
                        onFocus={() => setCheckCompany(true)}
                        inputValue={company}
                        inputEditable={true}
                        inputCheck={checkCompany}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkJob ? colors.Blue : colors.White }]}
                        iconName={'account-tie-outline'}
                        iconSize={moderateScale(20)}
                        iconColor={checkJob ? colors.Blue : colors.White}
                        inputColor={checkJob ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:job')}
                        inputPlaceHolderColor={checkJob ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputSecurity={false}
                        inputOnChangeText={(job) => setJob(job)}
                        onFocus={() => setCheckJob(true)}
                        inputValue={job}
                        inputEditable={true}
                        inputCheck={checkJob}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <MyPicker
                        styleCtnPicker={[RegisterStyles.ctnPicker,
                        { borderColor: checkLanguaje ? colors.Blue : colors.White }]}
                        sizeList={0.3}
                        pickerCheck={checkLanguaje}
                        iconName={'earth'}
                        iconSize={moderateScale(20)}
                        color={checkLanguaje ? colors.Blue : colors.White}
                        titlePicker={'Lista de lenguajes'}
                        placeHolderPicker={t('formRegister:languaje')}
                        data={languajeSelect}
                        onChange={(itemValue) => setLanguaje(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                </Animated.View>
                {/*--------------------------------Form >> Datos de Avatar--------------------*/}
                <Animated.View
                    style={[RegisterStyles.ctnForm,
                    { flex: Avatar_Flex, opacity: OpacityDataAvatar.current }]}>
                    <LabelText label={t('formRegister:avatar')} style={RegisterStyles.textAvatar} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <AvatarPerfil source={urlAvatar !== '' ? { uri: urlAvatar } : Perfil} />
                    <MySpace ctnSpace={{ flex: 0.05, width }} />
                    <LabelText
                        label={state === 2 ? strNewFormat({ str: name + ' ' + apellido }) : ''}
                        style={RegisterStyles.textName} />
                </Animated.View>
                {/*--------------------------------Form >> Datos de Cuenta--------------------*/}
                <Animated.View
                    style={[RegisterStyles.ctnForm,
                    { flex: Count_Flex, opacity: OpacityDataCount.current }]}>
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkEmail ? colors.Blue : colors.White }]}
                        iconName={'email-outline'}
                        iconSize={moderateScale(20)}
                        iconColor={checkEmail ? colors.Blue : colors.White}
                        inputColor={checkEmail ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:email') + ' example@example.com'}
                        inputPlaceHolderColor={checkEmail ? colors.Blue : colors.White}
                        inputKeyboard={'email-address'}
                        inputSecurity={false}
                        inputOnChangeText={(email) => setEmail(email)}
                        onFocus={() => setCheckEmail(true)}
                        inputValue={email}
                        inputEditable={true}
                        inputCheck={checkEmail}
                        button={false} />
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkPassword ? colors.Blue : colors.White }]}
                        iconName={'lock'}
                        iconSize={moderateScale(20)}
                        iconColor={checkPassword ? colors.Blue : colors.White}
                        inputColor={checkPassword ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:password')}
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
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                    <MyTextInput
                        styleCtnInput={[RegisterStyles.ctnTextInput,
                        { borderColor: checkConfirmPassword ? colors.Blue : colors.White }]}
                        iconName={'lock-check'}
                        iconSize={moderateScale(20)}
                        iconColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputPlaceHolder={t('formRegister:checkPassword')}
                        inputPlaceHolderColor={checkConfirmPassword ? colors.Blue : colors.White}
                        inputKeyboard={'default'}
                        inputOnChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        onFocus={() => setCheckConfirmPassword(true)}
                        inputValue={confirmPassword}
                        inputEditable={true}
                        inputCheck={checkConfirmPassword}
                        inputSecurity={true} />
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                    <MyCheck
                        styleCtnCheck={[RegisterStyles.ctnCheck]}
                        iconName={checkPolitics ? 'check-box-outline' : 'checkbox-blank-outline'}
                        iconSize={moderateScale(20)}
                        color={colors.Blue}
                        styleTextCheck={[RegisterStyles.textCheck]}
                        textCheck={t('formRegister:politics')}
                        onPressCheck={() => setCheckPolitics(!checkPolitics)}
                        onPressMsmCheck={() => setShowTerms(true)} />
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                    <MyCheck
                        styleCtnCheck={[RegisterStyles.ctnCheck]}
                        iconName={checkBoletin ? 'check-box-outline' : 'checkbox-blank-outline'}
                        iconSize={moderateScale(20)}
                        color={colors.Blue}
                        styleTextCheck={[RegisterStyles.textCheck]}
                        textCheck={t('formRegister:newsletter')}
                        onPressCheck={() => setCheckBoletin(!checkBoletin)}
                        onPressMsmCheck={() => console.log('Event Touch : Boletin')} />
                    <MySpace ctnSpace={{ flex: 0.02, width }} />
                </Animated.View>
                {/*--------------------------------Button >> Action Form----------------------*/}
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[RegisterStyles.ctnButtonLight]}
                    buttonOnpress={() => VerifyForm(state)}
                    textStyle={RegisterStyles.textButton}
                    text={state < 3 ? t('buttons:siguiente') : t('buttons:registrarse')} />
                <MySpace ctnSpace={{ flex: 0.02, width }} />
                <MyButton
                    ctnButton={[RegisterStyles.ctnButtonDark]}
                    buttonOnpress={() => GoForm(state)}
                    textStyle={[RegisterStyles.textButton, { color: colors.Blue }]}
                    text={t('buttons:regresar')} />
                {/*--------------------------------Modal >> Alert-----------------------------*/}
                <MyAlert
                    show={showAlert}
                    alert={typeAlert}
                    text={textAlert}
                    showOK={true}
                    onPressOK={() => ActionAlert(state)} />
                {/*--------------------------------Modal >> Carga de datos--------------------*/}
                <MyLoading
                    show={showLoading}
                    label={'Registrando Usuario'} />
                {/*--------------------------------Modal >> TermsAndConditions----------------*/}
                <MyModal
                    show={showTerms}
                    title={t('TermsConditions:title')}
                    color={colors.Blue}
                    iconName={'file-certificate-outline'}
                    iconSize={moderateScale(20)}
                    children={<MyTermsAndConditions />}
                    onPress={() => setShowTerms(false)}>
                </MyModal>
            </KeyboardAwareScrollView>
        </Wallpaper>
    );
}