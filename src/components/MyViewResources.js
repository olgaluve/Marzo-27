//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyViewCourses-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      title       >> Titulo de pdf.
//      opacity     >> Objeto de valor de opacidad.
//      scale       >> Objeto de valor de escala.
//      onPress     >> Funcion >> Evento >> Touche Close View.
//      onPressFile >> Funcion >> Evento >> Touche Download pdf.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Animated, } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import PDFView from 'react-native-view-pdf';
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('screen');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
const FONTSIZE_ICON = width < 350 ? moderateScale(18) : moderateScale(20);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyViewResources = props => {
    const { opacity, scale, onPress, onPressFile, title, file } = props;
    const resourceType = 'url';
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Titulo------------------------------------
    //Descripcion : Renderiza el titulo del recurso.
    const Title = ({ label = '' }) => {
        return (
            <View style={[styles.ctnTitle]}>
                <Text style={[styles.titleText]}>{label}</Text>
            </View>
        );
    }
    //----------------------------------Componente >> PdfView----------------------------------
    //Descripcion : Renderiza el visor de pdf del recurso.
    const PdfView = ({ source = '' }) => {
        return (
            <View style={[styles.ctnPdfView]}>
                <PDFView
                    fadeInDuration={250}
                    style={{ width: '100%', height: '100%', zIndex: 10 }}
                    resource={source}
                    resourceType={resourceType}
                    onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                    onError={(error) => console.log('Cannot render PDF', error)} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Animated.View style={[styles.viewResource, { opacity: opacity }, { transform: [{ scale: scale }] }]}>
            <MyButton
                ctnButton={[styles.btnClose]}
                buttonOnpress={onPress}
                iconName={'close'}
                iconSize={FONTSIZE_ICON}
                iconColor={colors.White} />
            <Title label={title} />
            <PdfView source={file} />
            <MyButton
                ctnButton={[styles.btnOpenFile]}
                buttonOnpress={onPressFile}
                textStyle={[styles.titleText, { color: colors.White }]}
                iconSize={FONTSIZE_ICON}
                text={t('buttons:descargar') + ' PDF'} />
        </Animated.View>
    );
}
export default MyViewResources;
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Vista Recurso
    viewResource: {
        position: 'absolute',
        bottom: height * 0.02,
        right: width * 0.05,
        width: width * 0.9,
        height: height * 0.88,
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
        zIndex: 20,
    },
    //Estilo >> Boton de cierre
    btnClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        width: width * 0.08,
        height: width * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 100,
        zIndex: 20,
    },
    //Estilo >> Contenedor Titulo
    ctnTitle: {
        flex: 0.08,
        width: '100%',
        paddingHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: colors.Blue
    },
    //Estilo >> Titulo
    titleText: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.White,
        fontFamily: letter.Title,
        textAlign: 'center',
    },
    //Estilo >> Contenedor de vista PDF
    ctnPdfView: {
        flex: 0.84,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Vista PDF
    pdfView: {
        flex: 1,
    },
    //Estilo >> Boton de apertura de PDF
    btnOpenFile: {
        flex: 0.08,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: colors.Blue
    },
})
