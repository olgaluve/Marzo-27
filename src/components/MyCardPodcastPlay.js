//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardPodcastPlay-------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> descripcion  >> Descripcion.
//                  >> image        >> Imagen.
//                  >> invited      >> Nombre de invitado.
//                  >> position     >> Porfesion o cargo.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { Animated, StyleSheet, View, Dimensions, Text } from 'react-native';
import { Image } from 'react-native';
//-----------------------------------Componentes Adicionales-----------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(16);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(14);
const ITEM_SIZE_WIDTH = width;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardPodcastPlay = (props) => {
    const { item, opacity } = props;//Recepcion Parametros.
    const { title, descripcion, image, invited, position } = item;//Recepcion >> Valores de tarjeta.
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Caratula----------------------------------
    //Descripcion : Renderiza la caratula del podcast.
    const LogoPodcast = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    source={{ uri: source, }}
                    resizeMode="cover"
                    style={[styles.logo]} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnCard,]}>
            <View style={[styles.viewCard]}>
                <LogoPodcast source={image} />
                <MySpace ctnSpace={{ flex: 0.025, width }} />
                <View style={[styles.ctnDetails]}>
                    <Text
                        style={[styles.textTitle]}
                        numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={[styles.textTitle, { textTransform: 'capitalize' }]}>
                        Invitado : {invited}
                    </Text>
                    <Text style={[styles.textBody]}>{position}</Text>
                    <Text
                        style={[styles.textBody, { fontSize: FONTSIZE_TEXT_LABEL, fontFamily: letter.Text_2, }]}
                        numberOfLines={4}>
                        {descripcion}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}
export default MyCardPodcastPlay;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de tarjeta
    ctnCard: {
        position: 'relative',
        height: '94%',
        width: ITEM_SIZE_WIDTH,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',
    },
    //Estilo >> Vista de tarjeta
    viewCard: {
        width: '80%',
        height: '100%',
        /*borderRadius: 10,
        backgroundColor: colors.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,*/
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        flex: 0.65,
        width: '100%',
        borderRadius: 10,
        //borderTopLeftRadius: 10,
        //borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        //borderTopLeftRadius: 10,
        //borderTopRightRadius: 10,
        justifyContent: 'center',
    },
    //Estilo >> Contenedor de detalles
    ctnDetails: {
        flex: 0.3,
        width: '100%',
        //paddingHorizontal: '5%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //Estilo >> Texto de titulo
    textTitle: {
        fontFamily: letter.Title,
        color: colors.Black,
        fontSize: FONTSIZE_TEXT_TITLE,
        marginTop: 5
    },
    //Estilo >> Texto de body
    textBody: {
        fontFamily: letter.Title,
        color: colors.Black + 'AF',
        fontSize: FONTSIZE_TEXT_TITLE,
        marginTop: 5
    },
})
