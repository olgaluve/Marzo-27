//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> label        >> Titulo
//                  >> logo         >> Logo
//                  >> modules      >> Numero de modulos
//                  >> language     >> Lenguajes disponibles

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, Image, Dimensions, Animated, View, Text } from 'react-native';
//---------------------------------------------Estilos-----------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = height * 0.6;
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(18) : moderateScale(25);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardNewCourse = (props) => {
    const { opacity, scale, translateX, data } = props;
    const { urlLogo, label } = data;
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.container, opacity, { transform: [translateX, scale] }]}>
            <Image
                style={[styles.logo]}
                source={{ uri: urlLogo, }}
                resizeMode={'cover'} />
            <View style={[styles.ctnTitle]}>
                <Text style={[styles.textTitle]}>{label}</Text>
            </View>
        </Animated.View>
    );
}
export default MyCardNewCourse;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de Card
    container: {
        position: 'absolute',
        left: -ITEM_WIDTH / 2,
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    //Estilo >> Logo
    logo: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    //container >> Title
    ctnTitle: {
        position: 'absolute',
        bottom: height * 0.045,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //text >> title
    textTitle: {
        fontFamily: letter.Title,
        color: colors.White,
        fontSize: FONTSIZE_TEXT_TITLE
    }
})
