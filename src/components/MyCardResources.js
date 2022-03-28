//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      opacity >> Objeto de valor de opacidad.
//      scale   >> Objeto de valor de escala.
//      onPress >> Funcion de Evento >> Touche Card.
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> file         >> Ruta de archivo.
//                  >> date_time    >> Fecha de Publicacion.
//                  >> des          >> Descripcion.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, Animated } from 'react-native';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//---------------------------------------Recursos Graficos-------------------------------------
import LogoResources from '../assets/LogoRecursosAfiche.png';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(10) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardResources = (props) => {
    const { data, opacity, scale, onPress } = props;
    const { file, date_time, title, des, image } = data;
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
                    source={{ uri: source }}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion del curso.
    const Description = ({ label, fecha, detalles }) => {
        let newDate = fecha.split(' ');
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.resourceTitle]} numberOfLines={2}>{label}</Text>
                <Text style={[styles.resourceText]}>{detalles}</Text>
                <Text style={[styles.resourceTitle, { fontSize: FONTSIZE_TEXT_LABEL }]}>{newDate[0]}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnResources, opacity, { transform: [scale] }]} >
            <Logo source={image} />
            <MySpace ctnSpace={{ flex: 0.02, height: '100%' }} />
            <Description
                label={title}
                fecha={date_time}
                detalles={des} />
            <MySpace ctnSpace={{ flex: 0.02, height: '100%' }} />
            <MyButton
                ctnButton={[styles.btnDownload]}
                buttonOnpress={onPress} />
        </Animated.View>
    );
}
export default MyCardResources;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Boton de Curso
    ctnResources: {
        position: 'relative',
        width: '100%',
        height: height * 0.18,
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
        flex: 0.25,
        paddingHorizontal: '2.5%',
        paddingVertical: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flex: 0.69,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    //Estilo >> Titulo recursos
    resourceTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title,
        marginBottom: 5,
    },
    //Estilo >> Texto recursos
    resourceText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        marginBottom: 5,
    },
    //Estilo >> Boton de descarga
    btnDownload: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        zIndex: 10,
    }
})
