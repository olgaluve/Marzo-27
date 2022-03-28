//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyButtonsResources------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo.
//                  >> recursos     >> Numero de recursos.
//                  >> logo         >> Logo.
//                  >> views        >> Visualizaciones.
//                  >> onPress      >> Funcion de evento >> Touche

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, Animated } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(10) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
const SIZE_ITEM_HEIGHT = height * 0.2;
const SIZE_ITEM_WIDTH = width * 0.4;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyButtonsResources = (props) => {
    const { item, backgroundColor, opacity, scale, color, onPress } = props;
    const { recursos, logo } = item;
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.ctnResources, backgroundColor, opacity, { transform: [scale] }]} >
            <MyButton
                ctnButton={[styles.btnResource]}
                buttonOnpress={onPress} />
            {/*--------------------------------Card >> Logo---------------------------------*/}
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={logo}
                    resizeMode={'cover'} />
            </View>
            {/*---------------------------------Card >> Details------------------------------*/}
            {/*<View style={[styles.ctnNumResources]}>
                <Text style={[styles.textLabel, color]}>
                    {'Recursos'}
                </Text>
                <Text style={[styles.textValue, color]}>
                    {recursos}
                </Text>
    </View>*/}
        </Animated.View>
    );
}
export default MyButtonsResources;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Boton de Curso
    ctnResources: {
        position: 'relative',
        width: SIZE_ITEM_WIDTH,
        height: SIZE_ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    //Estilo >> Boton de recursos
    btnResource: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        zIndex: 10,
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        marginTop: '5%',
        flex: 0.65,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
    },
    //Estilo >> Contenedor de numero recursos
    ctnNumResources: {
        flex: 0.3,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto Label
    textLabel: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title,
    },
    //Estilo >> Texto Value
    textValue: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        marginBottom: 5,
    },
})
