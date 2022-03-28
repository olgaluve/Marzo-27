//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyHeaderLogin-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//         title    >> Titulo del mensaje.
//         body     >> Cuerpo del mensaje.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import MySpace from '@components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { letter } from '../styles/letter';
import { colors } from '../styles/colors';
import { moderateScale } from '../styles/scale';
//---------------------------------------Recursos Graficos-------------------------------------
import LogoCompany from '@recursos/logo-croplife.jpg';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(12) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyHeaderLogin({ title, body }) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnHeader]}>
            <View style={[styles.ctnLogoCompany]}>
                <View style={[styles.viewLogoCompany]}>
                    <Image
                        style={[styles.logoCompany]}
                        source={LogoCompany}
                        resizeMode={'stretch'}
                    />
                </View>
            </View>
            <MySpace ctnSpace={{ flex: 0.2, width }} />
            <View style={[styles.ctnTextHeader]}>
                <Text style={[styles.txtTitle, { marginBottom: 20 }]}>{title}</Text>
                <Text style={[styles.txtMsm]}>{body}</Text>
            </View>
        </View>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de header
    ctnHeader: {
        width: width * 0.8,
        flex: 0.3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    //Estilo de contenedor de logo de Compañia
    ctnLogoCompany: {
        width: '100%',
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    //Estilo de View de logo de compañia
    viewLogoCompany: {
        width: height * 0.12,
        height: height * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.White,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
    },
    //Estilo de logo de compañia
    logoCompany: {
        width: height * 0.09,
        height: height * 0.09,
    },
    //Estilo de contenedor de texto de header
    ctnTextHeader: {
        width: '100%',
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    //Estilo de titulo
    txtTitle: {
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_TITLE,//25
        color: colors.Blue,
        textAlign: 'center'
    },
    txtMsm: {
        //fontFamily: letter.Title,
        fontWeight: 'normal',
        fontSize: FONTSIZE_TEXT_LABEL,//16
        color: colors.Blue,
        textAlign: 'center'
    },
})
