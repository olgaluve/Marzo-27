//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> id           >> Identificador
//                  >> label        >> Titulo
//                  >> logo         >> Logo
//                  >> url          >> Objeto de enlace de acceso

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import analytics from '@react-native-firebase/analytics';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { AddUrl } from '../redux/actions/actions';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardTest = (props) => {
    const { data, idUser, navigation } = props;
    const { id, title, label, logo, url } = data;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------Funcion >> Registro de Analiticas-----------------------------
    //Descripcion : Permite generar un registro del curso al cual accede el usuario.
    const RegisterAnalitic = async ({ label = '', id = '' }) => {
        try {
            await analytics().logSelectContent({ content_type: label, item_id: id, });
        } catch (error) {
            console.log(error);
        }
    }
    //----------------------------Funcion >> Obtencion url Test--------------------------------
    //Descripcion : Envia al componente padre la url del test seleccionado por el usuario.
    const getUrlTest = ({ url = '', idGame = '', idUser = '', title = '' }) => {
        RegisterAnalitic({ label: title, id: idGame });//Registro Evento >> Analiticas
        let newUrl = url[i18n.language];//Obtencion url Test
        newUrl = `${newUrl}?idUser=${idUser}&idGame=${idGame}`;
        let urlObj = new Object;
        urlObj.url = newUrl;
        urlObj.route = 'TestHome';
        urlObj.title = title;
        props.AddUrl(urlObj);
        navigation.navigate('WebView');
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
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
    const Description = ({ label }) => {
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.moduleTitle]}>{label}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <TouchableOpacity
            style={[styles.btnTest]}
            onPress={() => getUrlTest({ url: url, idGame: id, idUser: idUser, title: title })}>
            <Logo source={logo} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description label={label} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
        </TouchableOpacity>
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
        AddUrl: (data) => dispatch(AddUrl(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps, mapDispatchToProps)(MyCardTest);
//---------------------------------------------------------------------------------------------
//-------------------------------------Estilos de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Boton de Test
    btnTest: {
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
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.Blue,
        fontFamily: letter.Title,
    },
})
