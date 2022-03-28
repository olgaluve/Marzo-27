//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCardCourses-----------------------------
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
import React, { useCallback } from 'react';
import { View, StyleSheet, Text, Linking, Alert, Dimensions, TouchableOpacity } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    //return <Button title={children} onPress={handlePress} />;
    return <TouchableOpacity
        style={{
            backgroundColor: '#487aa8',
            justifyContent: 'center', alignItems: 'center',
            width: width * 0.9, height: height * 0.05,
            borderRadius: 10,
            marginLeft: width * 0.05
        }}
        onPress={handlePress}>
        <Text style={{ fontSize: width * 0.05, color: '#FFFFFF', textAlign: 'center', }}>
            {children}
        </Text>
    </TouchableOpacity>
};


const MyCardEvents = (props) => {
    const { title, des, link, navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------

    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{des}</Text>
            {
                link !== '' &&
                <OpenURLButton url={link}>
                    Enlace al evento
                </OpenURLButton>
            }
        </View>

    );
}
export default MyCardEvents;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    item: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        shadowColor: '#000',
        marginBottom: 5,
    },
    title: {
        color: '#487aa8',
        fontWeight: 'bold',
        textAlign: 'center',
        left: 5,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 12,
        marginHorizontal: 10,
        marginVertical: 10,
        textAlign: 'center'
    },
})
