//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Perfil Usuario--------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { Fragment, useLayoutEffect, useState } from 'react';
import { Text, View, ImageBackground, Dimensions, TouchableOpacity, Alert } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyButton from '../components/MyButton';
import MySpace from '../components/MySpace';
import MyLoading from '../components/MyLoading';
//------------------------------------------Funciones------------------------------------------
import { totalScore, categoryParameters, strNewFormat, labelProperty } from '../functions/functions';
//-------------------------------------------Servicies-----------------------------------------
import { scoreUser, getProgreso, getProgresoTest } from '../services/services';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { AddUser, ErrorUser, UpdateLogros } from '../redux/actions/actions';
//-------------------------------------------Data----------------------------------------------
import { dataCountry, languajeSelect, dataWorkSector } from '../data/data';
//-------------------------------------------Estilos-------------------------------------------
import { ProfileStyles } from '../styles/styles';
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import Perfil from '../assets/photo-profile.png';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const ProfileScreen = (props) => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes------------------------------------
    //-----------------------------------------------------------------------------------------
    const BUTTONS_PERFIL = [
        {
            id: '1',
            icon: 'medal',
            label: t('profile:logros'),
            route: 'Achievements'
        },
        {
            id: '2',
            icon: 'pen',
            label: t('profile:cursos'),
            route: 'MyCourses'
        },
        {
            id: '3',
            icon: 'brain',
            label: t('profile:test'),
            route: 'MyTest'
        }
    ];//Tabla de botones perfi
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados---------------------------------------
    //-----------------------------------------------------------------------------------------
    const [dataUser, setDataUser] = useState();//Estado >> Datos Usuario.
    const [render, setRender] = useState(false);//Estado >> Render Datos.
    //------------------------------------Estados >> Loading-----------------------------------
    const [showLoading, setShowLoading] = useState(false);//Estado >> Modal de carga
    const [msmLoading, setMsmLoading] = useState('');//Estado >> Mensaje de carga
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Funciones-------------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------Funcion >> Almacenamiento de logros de usuario-------------------
    //Descripcion : Permite almacenar la informacion relacionada con los logros del usuario.
    const getScore = async ({ idUser }) => {
        try {
            //Obtencion >> Puntaje Usuario
            let responseScore = await scoreUser({ idUser: idUser });
            responseScore = responseScore.data.data;
            if (responseScore) {
                let total = totalScore({ arrayScore: responseScore });
                let levelParameters = categoryParameters({ score: total });
                let scoreObj = new Object();
                scoreObj.total = total
                scoreObj.labelLevel = levelParameters.labelLevel;
                scoreObj.labelNextLabel = levelParameters.labelNextLabel;
                scoreObj.missingPoints = levelParameters.missingPoints;
                setShowLoading(false);
                props.UpdateLogros(scoreObj);
                navigation.navigate('Achievements');
            }
        } catch (e) {
            console.log('Error >> Save Score User >> ', e);
        }
    }
    //------------------------Funcion >> Obtencion Progreso de usuario-------------------------
    //Descripcion : Permite almacenar la informacion relacionada con el progresp del usuario.
    const getProgress = async ({ idUser }) => {
        try {
            //Obtencion >> Progreso de usuario
            let responseProgress = await getProgreso({ idUser: idUser });
            responseProgress = responseProgress.data.data;
            if (responseProgress) {
                let data = responseProgress;
                let inProgress = data.inProgress;
                let completed = data.completed;
                setShowLoading(false);
                navigation.navigate('MyCourses', { inProgress: inProgress, completed: completed });
            }
        } catch (e) {
            console.log('Error >> Save Progress User >> ', e);
        }
    }
    //------------------------Funcion >> Obtencion Progreso de usuario en Test-----------------
    //Descripcion : Permite almacenar la informacion relacionada con el progreso del usuario en
    //              los test.
    const getProgressTest = async ({ idUser }) => {
        try {
            //Obtencion >> Progreso de usuario
            let responseProgressTest = await getProgresoTest({ idUser: idUser });
            responseProgress = responseProgressTest.data.data;
            if (responseProgress) {
                setShowLoading(false);
                navigation.navigate('MyTest', { data: responseProgress });
            }
        } catch (e) {
            console.log('Error >> Save Progress User >> ', e);
        }
    }
    //------------------------Funcion >> Navegacion a pantalla---------------------------------
    //Descripcion : Permite navegar a una pantalla dentro del navegador de pila de Profuile, de
    //              acuerdo al parametro de ruta dado.
    const GoToScreen = ({ route, idUser }) => {
        switch (route) {
            case 'Achievements':
                setShowLoading(true);
                setMsmLoading(t('profile:loadingLogros'));
                getScore({ idUser: idUser });
                break;
            case 'MyCourses':
                setShowLoading(true);
                setMsmLoading(t('profile:loadingMyCourses'));
                getProgress({ idUser: idUser });
                break;
            case 'MyTest':
                setShowLoading(true);
                setMsmLoading(t('profile:loadingMyTest'));
                getProgressTest({ idUser: idUser });
                break;
            default: Alert.alert('Estamos trabajando en esta seccion', route);
                break;
        }
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> AvatarPerfil-------------------------------
    //Descripcion : Renderiza la imagen de perfil del usuario del menu de taps.
    const AvatarPerfil = ({ source }) => {
        return (
            <View style={[ProfileStyles.ctnAvatar]}>
                <View style={[ProfileStyles.avatar]}>
                    <ImageBackground
                        source={source}
                        style={[ProfileStyles.imageAvatar]}
                        imageStyle={{ borderRadius: 20 }}
                        resizeMode='cover' />
                    <MyButton
                        ctnButton={[ProfileStyles.ctnBtnEdit]}
                        buttonOnpress={() => navigation.navigate('ProfileEdit')}
                        iconName={'pencil'}
                        iconSize={moderateScale(15)}
                        iconColor={colors.Black} />
                </View>
            </View>
        );
    }
    //------------------------------Componente >> MyNamePerfil---------------------------------
    //Descripcion : Renderiza las caracteristicas de Nombre/Email del usuario en un formato mas
    //              agradable.
    const MyNamePerfil = ({ name, lastname, email }) => {
        let NewName = `${name} ${lastname}`;
        return (
            <View style={[ProfileStyles.ctnNameUser]}>
                <Text style={[ProfileStyles.textName]}>{NewName}</Text>
                <Text style={[ProfileStyles.textDetail]}>{email}</Text>
            </View>
        );
    }
    //--------------------------------Componente >> MyButtonsPerfil----------------------------
    //Descripcion : Renderiza los botones de accion de perfil de usuario.
    const MyButtonsPerfil = ({ data }) => {
        return (
            <View style={[ProfileStyles.ctnBtnPerfil]}>
                {data.map(data =>
                    <MyButtonPerfil
                        key={data.id}
                        label={data.label}
                        icon={data.icon}
                        route={data.route} />
                )}
            </View>
        );
    }
    //--------------------------------Componente >> MyButtonPerfil-----------------------------
    //Descripcion : Renderiza el boton de accion de perfil de usuario.
    const MyButtonPerfil = ({ icon, label, route }) => {
        return (
            <Fragment>
                <MySpace ctnSpace={{ flex: 0.1, height: '100%' }} />
                <TouchableOpacity
                    style={[ProfileStyles.btnPerfil]}
                    onPress={() => GoToScreen({ route: route, idUser: dataUser.id })}>
                    <View style={[ProfileStyles.btnIconPerfil]}>
                        <Icon name={icon} size={moderateScale(30)} color={colors.White} />
                    </View>
                    <Text
                        style={[ProfileStyles.textName,
                        { fontSize: moderateScale(16), marginTop: 5 }]}>
                        {label}
                    </Text>
                </TouchableOpacity>
                <MySpace ctnSpace={{ flex: 0.1, height: '100%' }} />
            </Fragment>
        );
    }
    //--------------------------------Componente >> MyDetailsPerfil----------------------------
    //Descripcion : Renderiza los detalles de perfil de usuario.
    const MyDetailsPerfil = ({ data }) => {
        let { area, company, position, country, city } = data;
        area = labelProperty({ data: dataWorkSector, id: area });
        country = labelProperty({ data: dataCountry, id: country });
        return (
            <Fragment>
                <View style={[ProfileStyles.ctntitleDetails]}>
                    <Text style={[ProfileStyles.textName, { color: colors.White }]}>
                        {t('profile:detalles')}
                    </Text>
                </View>
                <MyDetailPerfil
                    label={t('profile:workSector')}
                    data={area !== "" ? area : 'Sin registrar'} />
                <MyDetailPerfil
                    label={t('profile:company')}
                    data={company !== "" ? company : 'Sin registrar'} />
                <MyDetailPerfil
                    label={t('profile:job')}
                    data={position !== "" ? position : 'Sin registrar'} />
                <MyDetailPerfil
                    label={t('profile:country')}
                    data={country !== "" ? country : 'Sin registrar'} />
                <MyDetailPerfil
                    label={t('profile:city')}
                    data={city !== "" ? city : 'Sin registrar'} />
                {/*<MyDetailPerfil
                    label={t('profile:languaje')}
                data={language} />*/}
            </Fragment>
        );
    }
    //--------------------------------Componente >> MyDetailsPerfil----------------------------
    //Descripcion : Renderiza un detalle de perfil de usuario.
    const MyDetailPerfil = ({ label, data }) => {
        return (
            <Fragment>
                <MySpace ctnSpace={{ height: height * 0.01, width: '100%' }} />
                <View style={[ProfileStyles.ctnDetailLabel]}>
                    <Text style={[ProfileStyles.textName, { color: colors.Blue }]}>{label}</Text>
                </View>
                <View style={[ProfileStyles.ctnDetailData]}>
                    <Text style={[ProfileStyles.textDetail]}>{data}</Text>
                </View>
            </Fragment>
        );
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Declaracion >> Effects-------------------------------------
    //-------------------------------------------------------------------------------------------
    //------------------------------Effect >> Set Datos Usuario----------------------------------
    //Descripcion : Toma los datos de usuario almacenados en el redux y los almacena en un estado.
    useLayoutEffect(() => {
        let data = props.user.data;
        if (data) {
            setRender(true);
            setDataUser(data);
        }
    }, [props.user.data]);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:perfil')}
                navigation={navigation} />
            {render && <AvatarPerfil source={dataUser.url_avatar !== '' ? { uri: dataUser.url_avatar, } : Perfil} />}
            <MySpace ctnSpace={{ flex: 0.01, width }} />
            {render &&
                <MyNamePerfil
                    name={dataUser.name !== "" ? dataUser.name : 'Sin registrar'}
                    lastname={dataUser.lastname !== "" ? dataUser.lastname : 'Sin registrar'}
                    email={dataUser.email !== "" ? dataUser.email : 'Sin registrar'} />
            }
            {render && <MyButtonsPerfil data={BUTTONS_PERFIL} />}
            <MySpace ctnSpace={{ flex: 0.025, width }} />
            {render && <MyDetailsPerfil data={dataUser} />}
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
        AddUser: (data) => dispatch(AddUser(data)),
        ErrorUser: () => dispatch(ErrorUser()),
        UpdateLogros: (data) => dispatch(UpdateLogros(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

