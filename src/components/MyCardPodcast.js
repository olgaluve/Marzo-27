//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardPodcastLike-------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> des          >> Descripcion.
//                  >> video        >> Ruta de archivo.
//                  >> image        >> Logo de video.
//                  >> views        >> Visualizaciones.
//                  >> date_time    >> Fecha de Publicacion.
//                  >> opacity      >> Objeto de animacion >> Opacidad.
//                  >> scale        >> Objeto de animacion >> Escala.
//                  >> scaleImage   >> Objeto de animacion >> Escala de imagen.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Animated, StyleSheet, View, Dimensions, Text, TouchableOpacity, Image } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_ICON_PLAY = width < 350 ? moderateScale(50) : moderateScale(60);
const LOGO_SIZE = width * 0.15;
const ITEM_SIZE_HEIGHT = height * 0.15;
const ITEM_SIZE_WIDTH = width;
const SPACING = ITEM_SIZE_WIDTH * 0.02;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardPodcast = (props) => {
    const { item, opacity, scale, onPress } = props;//Recepcion Parametros.
    const { title, descripcion, date, image } = item;//Recepcion >> Valores de tarjeta.
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnCard, opacity, { transform: [scale] }]}>
            <TouchableOpacity
                style={[styles.buttonPlay]}
                onPress={onPress}>
                <Icon
                    name={'play-circle'}
                    size={FONTSIZE_ICON_PLAY}
                    color={colors.Blue} />
                {/*<Image
                    source={{ uri: image }}
                    style={[styles.logo]}
                resizeMode={'cover'}/>*/}
            </TouchableOpacity>
            <View style={[styles.viewDetails]}>
                <Text
                    style={[styles.textTitle]}
                    numberOfLines={1}>
                    {title}
                </Text>
                <Text
                    style={[styles.textLabel]}
                    numberOfLines={2}>
                    {descripcion}
                </Text>
                <Text style={[styles.textTitle]}>{date}</Text>
            </View>
        </Animated.View>
    );
}
export default MyCardPodcast;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de tarjeta
    ctnCard: {
        position: 'relative',
        height: ITEM_SIZE_HEIGHT,
        width: ITEM_SIZE_WIDTH,
        padding: SPACING,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    //Estilo >> Boton de Play
    buttonPlay: {
        flex: 0.2,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    //Estilo >> Vista de detalles
    viewDetails: {
        flex: 0.8,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingRight: '5%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    //Estilo >> Texto Titulo
    textTitle: {
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
    },
    //Estilo >> Texto Label
    textLabel: {
        fontFamily: letter.Text_2,
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
    },
    //Estilo >> Logo
    logo: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        borderRadius: LOGO_SIZE,
    }

})
