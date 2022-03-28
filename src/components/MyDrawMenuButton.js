//---------------------------------------------------------------------------------------------
//------------------------------Archivo de componente: MyDrawMenuButton------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { Fragment } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, Image, View, Text } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//-------------------------------------Recursos Graficos---------------------------------------
import LogoCompany from '../assets/logo-croplife.jpg'
//-------------------------------------Constanntes Globales------------------------------------
const { width, height } = Dimensions.get('screen');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(14) : moderateScale(18);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyDrawMenuButton = ({ title, navigation, route = '', type = false, Onpress, icon }) => {
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> MyTitle-----------------------------------
    //Descripcion : Renderiza el titulo de seccion.
    const MyTitle = ({ title }) => {
        return (
            <Fragment>
                <MySpace ctnSpace={{ height: '100%', flex: 0.05 }} />
                <View style={[styles.ctnHeader]}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
                <MySpace ctnSpace={{ height: '100%', flex: 0.05 }} />
            </Fragment>
        );
    }
    //----------------------------------Componente >> MyButtonLeft-----------------------------
    //Descripcion : Renderiza el boton izquierdo del header.
    const MyButtonLeft = ({ route, navigation }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.buttonDrawer]}
                onPress={() => route !== '' ? navigation.navigate(route) : navigation.toggleDrawer()}>
                <Icon
                    name={route !== '' ? "arrow-left" : "menu"}
                    size={moderateScale(25)}
                    color={colors.Blue} />
            </TouchableHighlight>
        );
    }
    //---------------------------------Componente >> MyButtonRight-----------------------------
    //Descripcion : Renderiza el boton derecho del header.
    const MyButtonRight = ({ icon, Onpress }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.ctnLogoCompany]}
                onPress={Onpress}>
                <Icon
                    name={icon}
                    size={moderateScale(25)}
                    color={colors.Blue} />
            </TouchableHighlight>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Fragment>
            <MySpace ctnSpace={{ flex: 0.04, width }} />
            <View style={[styles.ctnButtonDrawer]}>
                <MyButtonLeft
                    route={route}
                    navigation={navigation} />
                <MyTitle title={title} />
                {type === false &&
                    <Image
                        resizeMode="contain"
                        style={styles.ctnLogoCompany}
                        source={LogoCompany} />}
                {type === true && <MyButtonRight icon={icon} Onpress={Onpress} />}
            </View>
        </Fragment>
    );
}
export default MyDrawMenuButton;
const styles = StyleSheet.create({
    //Estilo de contenedor de boton de menu
    ctnButtonDrawer: {
        flex: 0.08,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de boton de menu
    buttonDrawer: {
        flex: 0.1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de logo de compañia
    ctnLogoCompany: {
        flex: 0.1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo de contenedor de header
    ctnHeader: {
        height: '80%',
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomWidth: 2,
        //borderColor: colors.Blue,
    },
    //Estilo de texto de header
    title: {
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.Blue,
        textAlign: 'center'
    },
})
