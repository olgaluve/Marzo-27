//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyViewCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title            >> Titulo.
//                  >> titleDefault     >> Titulo Default (idioma configurado sin curso).
//                  >> body             >> Descripcion.
//                  >> points           >> Puntos o observaciones de curso.
//                  >> modulo           >> Bandera contenido basado en modulos.
//                  >> modulos          >> Descripcion de contenido basado en modulos/capitulos.
//                  >> url              >> url de modulo.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState, useLayoutEffect, Fragment } from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
import { Animated, ScrollView } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MyButton from '../components/MyButton';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { ShowViewCourse, AddUrl } from '../redux/actions/actions';
//------------------------------------------Analitics------------------------------------------
import analytics from '@react-native-firebase/analytics';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import Perfil from '../assets/Perfil_2.jpg';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_ICON = width < 350 ? moderateScale(16) : moderateScale(20);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyViewCourses = (props) => {
    const { show, opacity, scale, navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados---------------------------------------
    //-----------------------------------------------------------------------------------------
    const [render, setRender] = useState(false);//Estado >> Render.
    //-------------------------Estados >> Parametros de Curso----------------------------------
    const [details, setDetails] = useState();//Estado >> Detalles.
    const [url, setUrl] = useState('');//Estado >> Url.
    const [labelCourse, setLabelCourse] = useState('');//Estado >> Label Curso.
    const [idCourse, setIdCourse] = useState('');//Estado >> Id Curso.
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Funcion >> Registro de Analiticas--------------------------
    //Descripcion : Permite generar un registro del curso al cual accede el usuario.
    const RegisterAnalitic = async ({ label = '', id = '0' }) => {
        await analytics().logSelectContent({ content_type: label, item_id: id, });
    }
    //----------------------------------Funcion >> getDataCourse-------------------------------
    //Descripcion : Obtiene los parametros correspondientes al curso seleccionado.
    const getDataCourse = ({ data, idUser = '0' }) => {
        const { url, label, idCourse, ...rest } = data;
        setUrl(getUrlCourse({ idUser: idUser, url: url }));
        setIdCourse(getIdCourse({ idCursos: idCourse }));
        setLabelCourse(label);
        setDetails(rest);
        setRender(true);
    }
    //----------------------------------Funcion >> getUrlCourse--------------------------------
    //Descripcion : Obtiene la url del curso.
    const getUrlCourse = ({ idUser = '0', url }) => {
        let existProperty = url[i18n.language] !== '';
        let urlCourse = existProperty ? url[i18n.language] + idUser : url['es'] + idUser;
        return urlCourse;
    }
    //----------------------------------Funcion >> getUrlCourse--------------------------------
    //Descripcion : Obtiene la url del curso.
    const getIdCourse = ({ idCursos }) => {
        let existProperty = idCursos[i18n.language] !== '';
        let myIdCourse = existProperty ? idCursos[i18n.language] : idCursos['es'];
        return myIdCourse;
    }
    //----------------------------------Funcion >> getDataCourse-------------------------------
    //Descripcion : Obtiene los parametros correspondientes al curso seleccionado.
    const closeViewCourse = ({ props }) => {
        setRender(false);
        show(false);
        //props.ShowViewCourse(false);
    }
    //-----------------------------------Funcion >> goCourse-----------------------------------
    //Descripcion: Redireccion a vista de navegador.
    const goCourse = () => {
        let urlObj = new Object;
        urlObj.url = url;
        urlObj.route = 'CoursesHome';
        urlObj.title = labelCourse;
        RegisterAnalitic({ label: labelCourse, id: idCourse });
        setRender(false);
        props.AddUrl(urlObj);
        //props.ShowViewCourse(false);
        show(false);
        setTimeout(() => navigation.navigate('WebView'), 800);
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const LogoCourse = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={source ? source : Perfil}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Details-----------------------------------
    //Descripcion : Renderiza los detalles de curso.
    const Details = ({ data }) => {
        const { logo, title, body, points, modulo, modulos } = data;
        return (
            <Fragment>
                <LogoCourse source={logo} />
                <Text style={[styles.titleText]}>{title}</Text>
                <Text style={[styles.bodyText]}>{body}</Text>
                <Text style={[styles.bodyText]}>{points}</Text>
                <Text style={[styles.subTitleText]}>
                    {modulo ? t('courses:modulos') : t('courses:capitulos')}
                </Text>
                <ModulosCourse
                    modulo={modulo}
                    modulos={modulos} />
                <MyButtonGo />
            </Fragment>
        );
    }
    //---------------------------------Componente >> ModulosCourse-----------------------------
    //Descripcion : Renderiza los modulos del curso.
    const ModulosCourse = ({ modulo, modulos }) => {
        return (
            <Fragment>
                {
                    modulos.map(data =>
                        <View
                            key={data.id}
                            style={[styles.ctnModules]}>
                            <Text style={[styles.subTitleText]}>
                                {modulo ? t('courses:modulo') : t('courses:capitulo')}
                                {' '}{data.id}
                            </Text>
                            <Text style={[styles.subTitleText,
                            { fontFamily: letter.Text_2, marginLeft: height * 0.02 }]}>
                                {data.label}
                            </Text>
                        </View>
                    )
                }
            </Fragment>
        );
    }
    //---------------------------------Componente >> ButtonGo----------------------------------
    //Descripcion : Renderiza el boton de ida a la pantalla de navegador.
    const MyButtonGo = () => {
        return (
            <View style={[styles.ctnBtnGo]}>
                <Text style={[styles.subTitleText, { fontFamily: letter.Title, color: colors.Blue }]}>
                    {t('courses:iniciar')}
                </Text>
                <MyButton
                    ctnButton={[styles.btnGo]}
                    buttonOnpress={() => goCourse()}
                    iconName={'arrow-right'}
                    iconSize={FONTSIZE_ICON}
                    iconColor={colors.White} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Effects-------------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------Effect >> Obtencion data Redux--------------------------------
    useLayoutEffect(() => {
        const { modulos } = props.viewCourse.data;
        let idUser = props.user.data.id;
        if (modulos.length > 0)
            getDataCourse({ data: props.viewCourse.data, idUser: idUser })
    }, [props.viewCourse.data.modulos]);
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.viewCourse, { opacity }, { transform: [{ scale },] }]}>
            <MyButton
                ctnButton={[styles.btnClose]}
                buttonOnpress={() => closeViewCourse({ props: props })}
                iconName={'close'}
                iconSize={FONTSIZE_ICON}
                iconColor={colors.Blue} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollCourse]}>
                {render === true && <Details data={details} />}
            </ScrollView>
        </Animated.View>
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
        viewCourse: state.viewCourse,
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        ShowViewCourse: (data) => dispatch(ShowViewCourse(data)),
        AddUrl: (data) => dispatch(AddUrl(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(MyViewCourses);
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Vista Curso
    viewCourse: {
        position: 'absolute',
        bottom: height * 0.02,
        right: width * 0.05,
        width: width * 0.9,
        height: height*0.9,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        backgroundColor: colors.White,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 10,
    },
    //Estilo >> Scroll
    scrollCourse: {
        paddingHorizontal: 20,
        paddingVertical: 20,

    },
    //Estilo >> Boton de cierre
    btnClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 100,
        zIndex: 20,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        height: height * 0.15,
        marginBottom: height * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        height: height * 0.12,
        width: height * 0.12,
    },
    //Estilo >> Titulo
    titleText: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        fontFamily: letter.Title,
        textAlign: 'center',
        marginBottom: height * 0.02,
    },
    //Estilo >> Body
    bodyText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        marginBottom: height * 0.02,
    },
    //Esttilo >> Subtitulos
    subTitleText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Title,
    },
    //Estilo >> Contenedor de modulos
    ctnModules: {
        marginVertical: 10,
        marginLeft: 10,
    },
    //Estilo >> Contenedor boton de ida a curso
    ctnBtnGo: {
        height: height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    //Estilo >> Boton de ida a curso
    btnGo: {
        width: height * 0.05,
        height: height * 0.05,
        marginLeft: '2%',
        backgroundColor: colors.Blue,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
