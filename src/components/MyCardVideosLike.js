//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardVideosLike--------------------------
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
import { Animated, StyleSheet, View, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
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
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
const FONTSIZE_ICON = width < 350 ? moderateScale(14) : moderateScale(16);
const FONTSIZE_ICON_PLAY = width < 350 ? moderateScale(40) : moderateScale(50);
const ITEM_SIZE = width * 0.7;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardVideosLike = (props) => {
    const { title, thumb, views, date_time } = props;//Recepcion Parametros >> Tarjeta Videos.
    const { opacity, scale, scaleImage } = props;//Recepcion Parametros >> Animated.
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const Logo = ({ source, onPress, scale }) => {
        return (
            <TouchableOpacity
                style={[styles.ctnLogo]}
                onPress={onPress}>
                <Animated.Image
                    style={[styles.logo, { transform: [{ scale }] }]}
                    source={{ uri: source }}
                    resizeMode={'stretch'} />
                <View style={[styles.bgCard]} />
                <Icon
                    name={'play-circle-outline'}
                    size={FONTSIZE_ICON_PLAY}
                    color={colors.White}
                    style={[styles.iconPlay]} />
            </TouchableOpacity>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion del curso.
    const Description = ({ views, label, fecha }) => {
        let newDate = fecha.split(' ');
        let date = newDate[0].split('-');
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.videoTitle]}>
                    <Icon name={'eye-outline'} size={FONTSIZE_ICON} color={colors.White} />
                    {' '}{views}{' '}{t('videos:views')}
                </Text>
                <Text style={[styles.videoTitle]} numberOfLines={1}>{label}</Text>
                <Text style={[styles.videoTitle]}> {date[0]}{' '} </Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnVideos, { opacity }, { transform: [{ scale }] }]}>
            <Logo
                source={thumb}
                scale={scaleImage}
                onPress={() => props.selectItem(true)} />
            <Description
                views={views}
                label={title}
                fecha={date_time} />
        </Animated.View>
    );
}
export default MyCardVideosLike;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> ctn de Vista de curso
    ctnVideos: {
        position: 'relative',
        height: '100%',
        width: ITEM_SIZE,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        flexDirection: 'column',
        borderRadius: 10,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        ...StyleSheet.absoluteFill,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        //zIndex: 10,
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        width: '90%',
        flex: 0.35,
        marginLeft: '5%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //Estilo >> Titulo recursos
    videoTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.White,
        fontFamily: letter.Title,
        marginBottom: 5,
    },
    //Estilo >> Texto recursos
    videoText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.White,
        fontFamily: letter.Text_2,
        marginBottom: 5,
    },
    //Estilo >> Icono de play
    iconPlay: {
        position: 'absolute',
        top: '40%',
        left: '40%',
    },
    //Estilo >> Fondo de tarjeta
    bgCard: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        backgroundColor: colors.Black + '2F'
    }
})
