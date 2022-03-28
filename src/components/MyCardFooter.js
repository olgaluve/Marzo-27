//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de footer. Contiene las siguientes propiedades :
//                  >> label        >> Titulo
//                  >> logo         >> Logo
//                  >> descripcion  >> Descripcion
//                  >> language     >> Lenguajes disponibles

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
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
const MyCardFooter = ({ data }) => {
    const { label, logo, descripcion, id } = data;
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo de la seccoion de footer.
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
    const Description = ({ label, descripcion }) => {
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.footerTitle]}>{label}</Text>
                <Text style={[styles.footerText]}>{descripcion}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctn]}>
            <Logo source={logo} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description
                label={label}
                descripcion={descripcion} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
        </View>
    );
}
export default MyCardFooter;
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor
    ctn: {
        width: '100%',
        //height: height * 0.2,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginBottom: height * 0.025,
        //backgroundColor:'rgba(0,0,0,0.2)'
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        height: '100%',
        flex: 0.3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor:'rgba(0,0,0,0.7)'
    },
    //Estilo >> Logo
    logo: {
        height: height * 0.08,
        width: height * 0.08,

    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //Estilo >> Titulo footer
    footerTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Black,
        fontFamily: letter.Title,
        marginBottom: 10,
    },
    //Estilo >> Texto footer
    footerText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.Black,
        fontFamily: letter.Text_2,
    }
})
