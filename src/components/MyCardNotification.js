//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardNotification------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> title        >> Titulo
//                  >> body         >> Cuerpo
//                  >> image        >> Imagen
//                  >> action       >> Accion de visualizacion

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { LayoutAnimation, Platform, UIManager } from 'react-native';
//--------------------------------------Librerias Adicionales----------------------------------
import RBSheet from "react-native-raw-bottom-sheet";
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
import MyButton from '../components/MyButton';
import MyModalNotification from '../components/MyModalNotification';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
import { UpdateNotification } from '../redux/actions/actions';
//------------------------------------------Servicies------------------------------------------
import { updateNotificacion } from '../services/services';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TITLE = width < 350 ? moderateScale(10) : moderateScale(18);
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
const FONTSIZE_ICON = width < 350 ? moderateScale(18) : moderateScale(25);
//Constantes >> Tamaño >> Vista de notificacion
const SIZE_NOTIFICATION = height * 0.15;
const SIZE_EXPAND_NOTIFICATION = height * 0.4;
const SIZE_NOTIFICATION_MODAL = height * 0.3;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyCardNotification = (props) => {
    const { id, title, body, image, action, route, navigation } = props;
    const currentData = { id: id, body: body, url_image: image };
    const styleShadow = styles.ctnShadow;
    const btnSheet = useRef();//Referencia >> Desplegable
    //-----------------------------------------------------------------------------------------
    //---------------------------Configuracion >> Capa de animacion----------------------------
    //-----------------------------------------------------------------------------------------
    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados---------------------------------------
    //-----------------------------------------------------------------------------------------
    const [firstTouche, setFirstTouche] = useState(action === '0' ? false : true);//Estado >> Primer toque
    const [touche, setTouche] = useState(false);//Estado >> Event Touche
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Funcion >> Event Touche---------------------------------
    //Descripcion : genera la animacion de despliegue de la notificacion.
    const eventTouche = () => {
        if (!firstTouche)
            updateData({ id: id });
        else {
            let tempTouche = !touche;
            setTouche(tempTouche);//Deteccion de accion >> Presionar boton
            //Configuracion >> Capa de animacion
            LayoutAnimation.configureNext(
                LayoutAnimation.create(
                    500,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.opacity
                )
            );
        }

    }
    //--------------------------Funcion >> Actualizacion Notificaione--------------------------
    //Descripcion : permite actualizar el parametro de vista de la notificacion.
    const updateData = async ({ id }) => {
        try {
            let response = await updateNotificacion({ id: id });
            let verify = response.data.status;
            if (verify) {
                setFirstTouche(false);
                let data = new Object();
                data.id = id;
                data.name = 'actionUser';
                data.value = '1';
                props.UpdateNotification(data);
                navigation.navigate(route);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo de la notificacion.
    const Logo = ({ source, touche }) => {
        return (
            <View style={[styles.ctnLogo, { flex: touche ? 0 : 0.275 }]}>
                <Image
                    style={[styles.logo]}
                    source={source}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion del curso.
    const Description = ({ title, body, touche, image, firstTouche }) => {
        const color = firstTouche ? colors.DarkBlue : colors.White;
        return (
            <View style={[styles.ctnDescription,
            { flex: touche ? 0.9 : 0.6, justifyContent: touche ? 'flex-start' : 'center' }]}>
                <MySpace ctnSpace={{ flex: touche ? 0.1 : 0.2, width: '100%' }} />
                <Text style={[styles.notificationTitle, { color }]}>
                    {title}
                </Text>
                <Text
                    style={[styles.notificationBody, { color }]}
                    numberOfLines={touche ? 0 : 3}>
                    {body}
                </Text>
                {touche && <LogoDescripcion source={image} />}
            </View>
        );
    }
    //------------------------------Componente >> Logo Descripcion-----------------------------
    //Descripcion : Renderiza el logo de descripcion.
    const LogoDescripcion = ({ source }) => {
        return (
            <View style={[styles.ctnLogoDescripcion]}>
                <Image
                    style={[styles.logoDescripcion]}
                    source={source}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View
            style={[styles.ctnNotification, [firstTouche ? styleShadow : null],
            {
                backgroundColor: firstTouche ? colors.White : colors.Blue,
                height: touche ? SIZE_EXPAND_NOTIFICATION : SIZE_NOTIFICATION
            }]}>
            <MyButton
                ctnButton={[styles.btnToucheDelete]}
                //buttonOnpress={onPressCurrent}
                buttonOnpress={() => btnSheet.current.open()}
                iconName={'dots-horizontal'}
                iconSize={FONTSIZE_ICON}
                iconColor={firstTouche ? colors.Blue : colors.White} />
            <MyButton
                ctnButton={[styles.btnToucheAction]}
                buttonOnpress={() => eventTouche({ id: id })} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Logo
                source={{ uri: image, }}
                touche={touche} />
            {!touche && <MySpace ctnSpace={{ flex: 0.025, height: '100%' }} />}
            <Description
                title={title}
                body={body}
                image={{ uri: image, }}
                touche={touche}
                firstTouche={firstTouche} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <RBSheet
                ref={btnSheet}
                height={SIZE_NOTIFICATION_MODAL}
                animationType={'fade'}
                openDuration={1000}
                closeDuration={500}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: { backgroundColor: colors.Black + 'AF' },
                    container: { borderRadius: 10, },
                    draggableIcon: { backgroundColor: colors.Black }
                }}>
                <MyModalNotification
                    data={currentData}
                    onPressDelete={() => {
                        btnSheet.current.close();
                        props.deleteItem(id)
                    }} />
            </RBSheet>
        </View>
    );
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        UpdateNotification: (data) => dispatch(UpdateNotification(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(null, mapDispatchToProps)(MyCardNotification);
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Boton de Curso.
    ctnNotification: {
        position: 'relative',
        width: width * 0.9,
        height: height * 0.15,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        backgroundColor: colors.White,
        marginBottom: height * 0.0145,
        marginTop: height * 0.0145,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
    },
    //Estilo >> Contenedor de logo.
    ctnLogo: {
        height: width * 0.25,
        marginTop: '2.5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    //Estilo >> Logo.
    logo: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    //Estilo >> Texto titulo
    notificationTitle: {
        fontSize: FONTSIZE_TEXT_TITLE,
        color: colors.DarkBlue,
        fontFamily: letter.Title,
        marginBottom: 5,
    },
    //Estilo >> Texto body.
    notificationBody: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
        marginBottom: 5,
    },
    //Estilo >> Boton de evento touche.
    btnToucheDelete: {
        position: 'absolute',
        top: width * 0.02,
        right: width * 0.02,
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,

    },
    //Estilo >> Boton de evento touche
    btnToucheAction: {
        position: 'absolute',
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    //Estilo >> Contenedor logo de descripcion.
    ctnLogoDescripcion: {
        position: 'absolute',
        bottom: 0,
        left: -width * 0.045,
        width: width * 0.9,
        height: height * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    //Estilo >> Logo de descripcion.
    logoDescripcion: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    //Estilo >> Contenedor sombreado.
    ctnShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
