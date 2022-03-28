//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Edicion Perfil--------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { Fragment, useLayoutEffect, useState, useEffect } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-community/async-storage';
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyButton from '../components/MyButton';
import MySpace from '../components/MySpace';
import MyLoading from '../components/MyLoading';
import MyTextInput from '../components/MyTextInput';
import MyPicker from '../components/MyPicker';
//------------------------------------------Funciones------------------------------------------
import { labelProperty } from '../functions/functions';
//------------------------------------------Servicios------------------------------------------
import { updateDataUser } from '../services/services';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { UpdateUser } from '../redux/actions/actions';
//-------------------------------------------Data----------------------------------------------
import { dataCountry, languajeSelect, dataWorkSector, keyAsync } from '../data/data';
//-------------------------------------------Estilos-------------------------------------------
import { ProfileEditStyles } from '../styles/styles';
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import Perfil from '../assets/photo-profile.png';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const sizePhoto = 500;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const ProfileEditScreen = (props) => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados---------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------Estados >> Caracteristicas Usuario--------------------------------
    const [selectAvatar, setSelectAvatar] = useState(false);//Estado >> Seleccion Avatar.
    const [urlAvatar, setUrlAvatar] = useState('');//Estado >> UrlAvatar.
    const [idUser, setIdUser] = useState('');
    const [name, setName] = useState('');//Estado >> Nombre.
    const [lastname, setLastname] = useState('');//Estado >> Apellido.
    const [country, setCountry] = useState('');//Estado >> Pais.
    const [city, setCity] = useState('');//Estado >> Ciudad.
    const [area, setArea] = useState('');//Estado >> Area
    const [company, setCompany] = useState('');//Estado >> Area
    const [job, setJob] = useState('');//Estado >> Area
    const [language, setLanguage] = useState('');//Estado >> Lenguage.
    const [userObject, setUserObject] = useState('');//Estado >> Objeto de datos >> Usuario.
    //-----------------------------Estados >> Label Picker-------------------------------------
    const [labelCountry, setLabelCountry] = useState('');//Estados >> Label Pais.
    const [labelLanguage, setLabelLanguage] = useState('');//Estado >> Label Lenguage.
    const [labelArea, setLabelArea] = useState('');//Estado >> Label Area.
    //--------------------------------Control >> Render----------------------------------------
    const [render, setRender] = useState(false);//Estado >> Render Datos.
    //------------------------------------Estados >> Loading-----------------------------------
    const [showLoading, setShowLoading] = useState(false);//Estado >> Modal de carga
    const [msmLoading, setMsmLoading] = useState(t('profile:updateData'));//Estado >> Mensaje de carga
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Funciones-------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------Funcion >> Obtencion datos Usuario--------------------------------
    //Descripcion : Realiza el set de los estados de caracteristicas de usuario.
    const getDataUser = ({ data }) => {
        setUserObject(data);//Obtencio >> Objeto de datos de usuario.
        setIdUser(data.id);
        setName(data.name);
        setLastname(data.lastname);
        setLabelArea(labelProperty({ data: dataWorkSector, id: data.area }));
        setArea(data.area);
        setCompany(data.company);
        setJob(data.position);
        setLabelCountry(labelProperty({ data: dataCountry, id: data.country }));
        setCountry(data.country);
        setCity(data.city);
        setLabelLanguage(labelProperty({ data: languajeSelect, id: data.language }));
        setLanguage(data.language);
        setUrlAvatar(data.url_avatar);
        setRender(true);
    }
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
                setSelectAvatar(true);//Accion >> Seleccion Avatar
                console.log(response.uri);//Path Image >> Cache
                console.log(response.type);//Path Image >> Type
            }
        });
    }
    //-----------------------------Funcion >> Actualizacion Datos------------------------------
    //Descripcion : Permite actualizar los datos del usuario.
    const updateData = async () => {
        setShowLoading(true);
        let data = userObject;
        data.id = idUser;
        data.name = name;
        data.lastname = lastname;
        data.country = country;
        data.city = city;
        data.area = area;
        data.company = company;
        data.position = job;
        data.language = language;
        data.url_avatar = urlAvatar;
        try {
            let responseData = await updateDataUser({ data: data, selectAvatar: selectAvatar });
            responseData = responseData.data;
            if (responseData.status) {
                let avatar = responseData.data;
                data.url_avatar = selectAvatar ? avatar : data.url_avatar;
                await AsyncStorage.setItem(keyAsync.user, JSON.stringify(data));
                setTimeout(() => {
                    props.UpdateUser(data);//Redux >> Actualizacion Datos de usuario.
                    setShowLoading(false);
                    navigation.navigate('ProfileHome');
                }, 3000);
            }
            console.group('Respuesta >> Servidor');
            console.log('Status >> ', responseData.status);
            console.log('Error >> ', responseData.error);
            console.log('Response >> ', responseData.data);
            console.groupEnd();
        } catch (e) {
            setShowLoading(false);
            console.log('Error >> Save Data User >> ', e);
        }
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> AvatarPerfil-------------------------------
    //Descripcion : Renderiza la imagen de perfil del usuario del menu de taps.
    const AvatarPerfil = ({ source }) => {
        return (
            <View style={[ProfileEditStyles.ctnAvatar]}>
                <View style={[ProfileEditStyles.avatar]}>
                    <ImageBackground
                        source={source}
                        style={[ProfileEditStyles.imageAvatar]}
                        imageStyle={{ borderRadius: 20 }}
                        resizeMode='cover' />
                    <MyButton
                        ctnButton={[ProfileEditStyles.btnSelectPhote]}
                        buttonOnpress={() => ImportImagen()}
                        iconName={'camera-plus'}
                        iconSize={moderateScale(25)}
                        iconColor={colors.White} />
                </View>
            </View>
        );
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Effects-------------------------------------
    //-------------------------------------------------------------------------------------------
    //------------------------------Effect >> Set Datos Usuario----------------------------------
    //Descripcion : Toma los datos de usuario almacenados en el redux y los almacena en un estado.
    useLayoutEffect(() => {
        let data = props.user.data;
        if (data)
            getDataUser({ data: data });
    }, [props.user.data]);
    //--------------------------------Effect >> Set Language-----------------------------------
    //Descripcion : Realiza el set del lenguage.
    useEffect(() => {
        if (language !== '')
            AsyncStorage.setItem(keyAsync.languaje, language)
                .then(() => i18n.changeLanguage(language))
                .catch(error => console.log('Error Config >> Set Languaje', error));
    }, [language])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('profile:editData')}
                navigation={navigation}
                route={'ProfileHome'}
                type={true}
                icon={'check'}
                Onpress={() => updateData()} />
            <KeyboardAwareScrollView
                contentContainerStyle={[ProfileEditStyles.ctnKeyboard]}
                enableAutomaticScroll={true}
                enableOnAndroid={true}
                extraScrollHeight={height * 0.2}
                extraHeight={0}>
                <AvatarPerfil source={urlAvatar !== '' ? { uri: urlAvatar } : Perfil} />
                <MySpace ctnSpace={{ height: height * 0.02, width }} />
                {/*----------------------Seccion >> Caracteristicas Usuario-----------------*/}
                {/*----------------------Caracteristica >> Name-----------------------------*/}
                <MyTextInput
                    styleCtnInput={[ProfileEditStyles.ctnTextInput]}
                    iconName={'account'}
                    iconSize={moderateScale(20)}
                    iconColor={colors.Blue}
                    inputColor={colors.Blue}
                    inputPlaceHolder={t('formRegister:name')}
                    inputPlaceHolderColor={colors.Blue}
                    inputKeyboard={'email-address'}
                    inputSecurity={false}
                    inputOnChangeText={(name) => setName(name)}
                    onFocus={() => console.log('name')}
                    inputValue={name}
                    inputEditable={true}
                    inputCheck={true}
                    button={false} />
                {/*----------------------Caracteristica >> Lastname-------------------------*/}
                <MyTextInput
                    styleCtnInput={[ProfileEditStyles.ctnTextInput]}
                    iconName={'account'}
                    iconSize={moderateScale(20)}
                    iconColor={colors.Blue}
                    inputColor={colors.Blue}
                    inputPlaceHolder={t('formRegister:lastname')}
                    inputPlaceHolderColor={colors.Blue}
                    inputKeyboard={'default'}
                    inputSecurity={false}
                    inputOnChangeText={(lastname) => setLastname(lastname)}
                    onFocus={() => console.log('lastname')}
                    inputValue={lastname}
                    inputEditable={true}
                    inputCheck={true}
                    button={false} />
                {/*----------------------Caracteristica >> Country--------------------------*/}
                {
                    render &&
                    <MyPicker
                        styleCtnPicker={[ProfileEditStyles.ctnPicker]}
                        pickerCheck={true}
                        iconName={'flag-variant-outline'}
                        iconSize={moderateScale(20)}
                        color={colors.Blue}
                        titlePicker={'Seleccione pais'}
                        placeHolderPicker={labelCountry !== '' ? labelCountry : t('formRegister:selectCountry')}
                        data={dataCountry}
                        onChange={(itemValue) => setCountry(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                }
                {/*----------------------Caracteristica >> City-----------------------------*/}
                <MyTextInput
                    styleCtnInput={[ProfileEditStyles.ctnTextInput]}
                    iconName={'map-marker-outline'}
                    iconSize={moderateScale(20)}
                    iconColor={colors.Blue}
                    inputColor={colors.Blue}
                    inputPlaceHolder={t('formRegister:city')}
                    inputPlaceHolderColor={colors.Blue}
                    inputKeyboard={'default'}
                    inputSecurity={false}
                    inputOnChangeText={(data) => setCity(data)}
                    onFocus={() => console.log('lastname')}
                    inputValue={city}
                    inputEditable={true}
                    inputCheck={true}
                    button={false} />
                {/*----------------------Caracteristica >> Company--------------------------*/}
                <MyTextInput
                    styleCtnInput={[ProfileEditStyles.ctnTextInput]}
                    iconName={'office-building'}
                    iconSize={moderateScale(20)}
                    iconColor={colors.Blue}
                    inputColor={colors.Blue}
                    inputPlaceHolder={t('formRegister:company')}
                    inputPlaceHolderColor={colors.Blue}
                    inputKeyboard={'default'}
                    inputSecurity={false}
                    inputOnChangeText={(data) => setCompany(data)}
                    onFocus={() => console.log('lastname')}
                    inputValue={company}
                    inputEditable={true}
                    inputCheck={true}
                    button={false} />
                {/*----------------------Caracteristica >> Job------------------------------*/}
                <MyTextInput
                    styleCtnInput={[ProfileEditStyles.ctnTextInput]}
                    iconName={'account-tie-outline'}
                    iconSize={moderateScale(20)}
                    iconColor={colors.Blue}
                    inputColor={colors.Blue}
                    inputPlaceHolder={t('formRegister:job')}
                    inputPlaceHolderColor={colors.Blue}
                    inputKeyboard={'default'}
                    inputSecurity={false}
                    inputOnChangeText={(data) => setJob(data)}
                    onFocus={() => console.log('lastname')}
                    inputValue={job}
                    inputEditable={true}
                    inputCheck={true}
                    button={false} />
                {/*----------------------Caracteristica >> Area-----------------------------*/}
                {
                    render &&
                    <MyPicker
                        styleCtnPicker={[ProfileEditStyles.ctnPicker]}
                        pickerCheck={true}
                        iconName={'account-hard-hat'}
                        iconSize={moderateScale(20)}
                        color={colors.Blue}
                        titlePicker={'Sector de Trabajo '}
                        placeHolderPicker={area !== '' ? labelArea : t('formRegister:selectWorkSector')}
                        data={dataWorkSector}
                        onChange={(itemValue) => setArea(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                }
                {/*----------------------Caracteristica >> Language-------------------------*/}
                {
                    render &&
                    <MyPicker
                        styleCtnPicker={[ProfileEditStyles.ctnPicker]}
                        pickerCheck={true}
                        iconName={'earth'}
                        iconSize={moderateScale(20)}
                        color={colors.Blue}
                        titlePicker={'Lista de lenguajes'}
                        placeHolderPicker={labelLanguage !== '' ? labelLanguage : t('formRegister:languaje')}
                        data={languajeSelect}
                        onChange={(itemValue) => setLanguage(itemValue)}
                        bgSection={colors.Blue}
                        colorSection={colors.White} />
                }
            </KeyboardAwareScrollView>
            <MyLoading
                show={showLoading}
                label={msmLoading} />
        </Wallpaper>
    );
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
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        UpdateUser: (data) => dispatch(UpdateUser(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);
//BLOB
//https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
//https://www.digitalocean.com/community/tutorials/how-to-use-the-mysql-blob-data-type-to-store-images-with-php-on-ubuntu-18-04-es
//https://www.npmjs.com/package/react-native-blob-util
//headers: {'Content-Type': 'multipart/form-data; boundary=${form._boundary}'}
