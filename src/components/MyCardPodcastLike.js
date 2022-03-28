//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardPodcastLike-------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> descripcion  >> Descripcion.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Animated, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import Icon from 'react-native-vector-icons/FontAwesome5';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(14);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(12);
const FONTSIZE_ICON_MICROPHONE = width < 350 ? moderateScale(30) : moderateScale(35);
const FONTSIZE_ICON_PLAY = width < 350 ? moderateScale(40) : moderateScale(50);
const ITEM_SIZE_WIDTH = width * 0.75;
const ITEM_SIZE_HEIGHT = height * 0.28;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardPodcastLike = (props) => {
    const { item, opacity, scale, onPress } = props;//Recepcion Parametros.
    const { title, descripcion, image } = item;//Recepcion >> Valores de tarjeta.
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Caratula----------------------------------
    //Descripcion : Renderiza la caratula del podcast.
    const LogoPodcast = ({ source }) => {
        return (
            <View style={[styles.ctnPlayer]}>
                <Image
                    source={{ uri: source, }}
                    resizeMode="cover"
                    style={[styles.logo]} />
            </View>
        );
    }
    //---------------------------------Componente >> Microfono---------------------------------
    //Descripcion : Renderiza el icono de microfono.
    const Microphone = () => {
        return (
            <View style={[styles.ctnIcon]}>
                <Icon
                    name={'microphone-alt'}
                    size={FONTSIZE_ICON_MICROPHONE}
                    color={colors.White} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnCard, { transform: [scale] }]}>
            <LogoPodcast source={image} />
            <TouchableOpacity
                style={[styles.buttonPlay]}
                onPress={onPress}>
                <Icon
                    name={'play-circle'}
                    size={FONTSIZE_ICON_PLAY}
                    color={colors.White} />
            </TouchableOpacity>
            <View style={[styles.viewDetails]}>
                <Microphone />
                <View style={[styles.ctnDetails]}>
                    <Text
                        style={[styles.textTitle]}
                        numberOfLines={2}>
                        {title}
                    </Text>
                    <Text
                        style={[styles.textBody]}
                        numberOfLines={2}>
                        {descripcion}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}
export default MyCardPodcastLike;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de tarjeta
    ctnCard: {
        position: 'relative',
        height: ITEM_SIZE_HEIGHT,
        width: ITEM_SIZE_WIDTH,
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
    },
    //Estilo >> Contenedor de player
    ctnPlayer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    //Estilo >> Vista de detalles
    viewDetails: {
        position: 'absolute',
        height: '40%',
        width: '100%',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.DarkBlue,
        zIndex: 10,
    },
    //Estilo >> Contenedor de icono
    ctnIcon: {
        flex: 0.2,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    //Estilo >> Contenedor de detalles
    ctnDetails: {
        flex: 0.8,
        height: '100%',
        paddingVertical: '5%',
        paddingRight: '5%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    //Estilo >> Texto de titulo
    textTitle: {
        fontFamily: letter.Title,
        color: colors.White,
        fontSize: FONTSIZE_TEXT_TITLE
    },
    //Estilo >> Texto de body
    textBody: {
        fontFamily: letter.Text_2,
        color: colors.White,
        fontSize: FONTSIZE_TEXT_LABEL
    },
    //Estilo >> Boton de play
    buttonPlay: {
        position: 'absolute',
        width: '100%',
        height: '70%',
        top: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    }

})
