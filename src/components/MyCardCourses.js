//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> label        >> Titulo
//                  >> logo         >> Logo
//                  >> modules      >> Numero de modulos
//                  >> language     >> Lenguajes disponibles

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { ShowViewCourse, AddViewCourse } from '../redux/actions/actions';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardCourses = (props) => {
    const { data, navigation } = props;
    const { modules, language, ...rest } = data;
    const { label, logo, modulo } = rest;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Funcion >> reduxData------------------------------------
    //Descripcion : Envia los datos perteneciente a la tarjeta de presentacion del modulo al
    //              redux con id >> viewCourse.
    const reduxData = ({ data }) => {
        props.AddViewCourse(data);
        props.ShowViewCourse(true);
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const Logo = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={source}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion del curso.
    const Description = ({ label, modulo, modules, language }) => {
        let strModules = modulo ? t('courses:modulos') : t('courses:capitulos');
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.moduleTitle]}>{label}</Text>
                <Text style={[styles.moduleText, { fontFamily: letter.Title }]}>{modules}{'  '}{strModules}</Text>
                <Text style={[styles.moduleText]}>{t('courses:languangeAvailable')}</Text>
                <Text style={[styles.moduleText]}>{language}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <TouchableOpacity
            style={[styles.BtnCourses]}
            onPress={() => reduxData({ data: rest })}>
            <Logo source={logo} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description
                label={label}
                modulo={modulo}
                modules={modules}
                language={language} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
        </TouchableOpacity>
    );
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        ShowViewCourse: (data) => dispatch(ShowViewCourse(data)),
        AddViewCourse: (data) => dispatch(AddViewCourse(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(null, mapDispatchToProps)(MyCardCourses);
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Boton de Curso
    BtnCourses: {
        width: '100%',
        height: height * 0.15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: colors.White,
        marginBottom: height * 0.025,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        height: '100%',
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //Estilo >> Logo
    logo: {
        height: height * 0.1,
        width: height * 0.1,
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    //Estilo >> Titulo modulos
    moduleTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        fontFamily: letter.Title,
    },
    //Estilo >> Texto modulos
    moduleText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
    }
})
