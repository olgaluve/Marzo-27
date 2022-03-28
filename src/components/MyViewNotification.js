//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyViewNotification------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title            >> Titulo
//                  >> image            >> Imagen
//                  >> translateY       >> Translaccion en el eje y.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Animated, StyleSheet, Image, View, Dimensions, Text } from 'react-native';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//Posiciones iniciales
const POSITION_X = width * 0.05;
const POSITION_Y = -height * 0.15;//-height * 0.2
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyViewNotification = (props) => {
    const { data, translateY, onPress } = props;
    const { title, url_image } = data;
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo de la notificacion.
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
    //Descripcion : Renderiza la descripcion de la notificacion.
    const Description = ({ title }) => {
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.notificationBody]}>{title}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnModal, { transform: [{ translateY: translateY }] }]}>
            <MyButton
                ctnButton={[styles.ctnButton]}
                buttonOnpress={onPress} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Logo source={{ uri: url_image, }} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description title={title} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
        </Animated.View>
    );
}
export default MyViewNotification;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de modal
    ctnModal: {
        position: 'absolute',
        width: width * 0.9,
        height: height * 0.15,
        top: POSITION_Y,
        left: POSITION_X,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.Blue,
        borderRadius: 10,
        zIndex: 100,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        flex: 0.22,
        height: width * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flex: 0.62,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'rgba(0,0,0,0.2)'
    },
    //Estilo >> Texto body
    notificationBody: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.White,
        fontFamily: letter.Title,
    },
    //Estilo >> Contenedor de boton de ruta
    ctnButton: {
        ...StyleSheet.absoluteFill,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10,
        zIndex: 10,
    },
})
