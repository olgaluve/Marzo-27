//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardVideos------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> des          >> Descripcion.
//                  >> video        >> Ruta de archivo.
//                  >> thumb        >> Logo de video.
//                  >> views        >> Visualizaciones.
//                  >> date_time    >> Fecha de Publicacion.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, Linking, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(14);
const FONTSIZE_ICON_PLAY = width < 350 ? moderateScale(40) : moderateScale(45);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardVideos = (props) => {
    const { data } = props;
    const { title, des, video, thumb, views, date_time } = data;
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo del curso.
    const Logo = ({ source, onPress }) => {
        return (
            <TouchableOpacity
                style={[styles.ctnLogo]}
                onPress={onPress}>
                <Image
                    style={[styles.logo]}
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
    const Description = ({ label, fecha, des }) => {
        let newDate = fecha.split(' ');
        let date = newDate[0].split('-');
        return (
            <View style={[styles.ctnDescription]}>
                <Text
                    numberOfLines={2}
                    style={[styles.videoTitle]}>
                    {label}
                </Text>
                <Text
                    numberOfLines={3}
                    style={[styles.videoText, { fontSize: FONTSIZE_TEXT_LABEL }]}>
                    {des}
                </Text>
                <Text style={[styles.videoTitle, { fontSize: FONTSIZE_TEXT_LABEL }]}>
                    {date[0]}{' '}
                </Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnVideos]}>
            <Logo
                source={thumb}
                onPress={() => props.selectItem(true)} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description
                label={title}
                fecha={date_time}
                des={des} />
        </View>
    );
}
export default MyCardVideos;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> ctn de Vista de curso
    ctnVideos: {
        position: 'relative',
        width: '100%',
        height: height * 0.18,//0.18
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        top: -height * 0.04,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        position: 'relative',
        height: '70%',
        flex: 0.3,
        marginTop: '6%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
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
        height: '100%',
        flex: 0.65,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: 10,

    },
    //Estilo >> Titulo recursos
    videoTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title,
        marginBottom: 5,
    },
    //Estilo >> Texto recursos
    videoText: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        marginBottom: 5,
    },
    //Estilo >> Contenedor de vistas
    ctnView: {
        position: 'absolute',
        bottom: '10%',
        height: '20%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    //Estilo >> Icono de play
    iconPlay: {
        position: 'absolute',
        top: '30%',
        left: '25%',
    },
    //Estilo >> Fondo de tarjeta
    bgCard: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        backgroundColor: colors.Black + '2F'
    }
})
