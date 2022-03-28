//---------------------------------------------------------------------------------------------
//-----------------------Archivo de componente: MyLoading--------------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//----------------------------------Configuracion >> Modal-------------------------------------
//          show                >>  Parametro de visibilidad de Modal.
//          text                >>  Parametro de texto de Modal.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, Image, StatusBar, ActivityIndicator } from 'react-native';
import { Text, Modal, Dimensions, StyleSheet } from 'react-native';
//----------------------------------Librerias Adicionales--------------------------------------
import * as Animatable from 'react-native-animatable';
//------------------------------------Recursos Graficos----------------------------------------
import LogoCompany from '../assets/logo-croplife.jpg';
//----------------------------------------Estilos----------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale, scale } from '../styles/scale';
//---------------------------------------------------------------------------------------------
//------------------------------------Constantes de Componente---------------------------------
//---------------------------------------------------------------------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyLoading = ({ show, label }) => {
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componente---------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Componente >> Logo de Compania------------------------------
    //Descripcion : Renderiza el logo de la compania.
    const Logo = ({ source }) => {
        return (
            <View style={[styles.ctnImagen]}>
                <Image
                    resizeMode="contain"
                    style={[styles.imagen]}
                    source={source} />
            </View>
        );
    }
    //-----------------------------Componente >> Texto de carga--------------------------------
    //Descripcion : Renderiza el texto de carga de pantalla.
    const TextLoading = ({ msm }) => {
        return (
            <View style={[styles.ctnText]}>
                <ActivityIndicator size="small" color={colors.White} />
                <Text style={[styles.text]}>{msm}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Modal
            animationType="fade"
            statusBarTranslucent={true}
            visible={show}>
            <Animatable.View
                style={[styles.ctnScreen]}
                animation="pulse"
                iterationCount={'infinite'}
                duration={1000}>
                <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
                <Logo source={LogoCompany} />
                <TextLoading msm={label} />
            </Animatable.View>
        </Modal>
    )
}
export default MyLoading;
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de pantalla
    ctnScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: colors.Blue,
    },
    //Estilo >> Contenedor de texto
    ctnText: {
        flex: 0.1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto
    text: {
        fontSize: moderateScale(18),
        fontFamily: letter.Title,
        textAlign: 'center',
        color: colors.White,
        marginLeft: '2%'
    },
    //Estilo >> Contenedor de Imagen
    ctnImagen: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White
    },
    //Estilo >> Imaegen
    imagen: {
        width: '70%',
        height: '70%',
    }
})

