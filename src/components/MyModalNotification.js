//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyModalNotification-----------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      data >> Objeto de propiedades de modulo. Contiene las siguientes propiedades :
//                  >> body             >> Cuerpo
//                  >> image            >> Imagen
//                  >> onPressDelete    >> Funcion de eliminacion de notificacion.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text } from 'react-native';
//-----------------------------------Librerias Adicionales---------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
import MyButton from '../components/MyButton';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_LABEL = width < 350 ? moderateScale(10) : moderateScale(16);
const FONTSIZE_ICON = width < 350 ? moderateScale(18) : moderateScale(25);
//Constantes >> Tamaño >> Vista de notificacion
const SIZE_NOTIFICATION_MODAL = height * 0.3;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyModalNotification = (props) => {
    const { data, onPressDelete } = props;
    const { body, url_image } = data;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Componente >> Logo--------------------------------------
    //Descripcion : Renderiza el logo de la notificacion.
    const Logo = ({ source }) => {
        return (
            <View style={[styles.ctnLogo]}>
                <Image
                    style={[styles.logo]}
                    source={source}
                    resizeMode={'cover'} />
            </View>
        );
    }
    //---------------------------------Componente >> Descripcion-------------------------------
    //Descripcion : Renderiza la descripcion de la notificacion.
    const Description = ({ body }) => {
        return (
            <View style={[styles.ctnDescription]}>
                <Text style={[styles.notificationBody]}>{body}</Text>
            </View>
        );
    }
    //---------------------------------Componente >> DeleteView--------------------------------
    //Descripcion : Renderiza el boton de eliminacion de notificaciones.
    const DeleteView = ({ msm, onPress }) => {
        return (
            <View style={[styles.ctnBtnDelete]}>
                <MyButton
                    ctnButton={[styles.btnToucheDelete]}
                    buttonOnpress={onPress}
                    iconName={'close-box'}
                    iconSize={FONTSIZE_ICON}
                    iconColor={colors.DarkBlue} />
                <Text style={[styles.notificationBody, { fontFamily: letter.Title }]}>
                    {msm}
                </Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnModal]}>
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Logo source={{ uri: url_image, }} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <Description body={body} />
            <MySpace ctnSpace={{ flex: 0.05, height: '100%' }} />
            <DeleteView
                msm={t('buttonsMenu:deleteNotification')}
                onPress={onPressDelete} />
        </View>
    );
}
export default MyModalNotification;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de modal
    ctnModal: {
        position: 'relative',
        width: width,
        height: SIZE_NOTIFICATION_MODAL,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
    },
    //Estilo >> Contenedor de logo
    ctnLogo: {
        width: height * 0.1,
        height: height * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    //Estilo >> Logo
    logo: {
        height: '100%',
        width: '100%',
        borderRadius: 100,
    },
    //Estilo >> Contenedor de descripcion
    ctnDescription: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    //Estilo >> Texto body
    notificationBody: {
        fontSize: FONTSIZE_TEXT_LABEL,
        color: colors.DarkBlue,
        fontFamily: letter.Text_2,
    },
    //Estilo >> Contenedor boton de eliminacion
    ctnBtnDelete: {
        width: '90%',
        flex: 0.4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        //backgroundColor: 'rgba(0,0,0,0.5)'
    },
    //Estilo >> Boton de evento touche
    btnToucheDelete: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: width * 0.025,
    },
})
