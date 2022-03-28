//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyPodcastSlider---------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      container           >> Estilo de contemedor.
//      colorSlider         >> Color de Slider.
//      colorPoint          >> Color de punto de Slider.
//      minimumValue        >> Valor minimo.
//      maximumValue        >> Valor maximo.
//      value               >> Valor actual.
//      onValueChange       >> Evento >> Arrastre de control deslizante.
//      onSlidingComplete   >> Evento >> Soltar control deslizante.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
//--------------------------------------Librerias Adicionales----------------------------------
import Slider from '@react-native-community/slider';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
import { moderateScale } from '../styles/scale';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const FONTSIZE_TEXT_TIME = width < 350 ? moderateScale(12) : moderateScale(18);
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyPodcastSlider = props => {
    const { container, colorSlider, colorPoint, minimumValue, maximumValue } = props;
    const { value, onValueChange, onSlidingComplete } = props;
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declracion >> Funciones-----------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------Funcion >> Formato de progreso-------------------------------
    //Descripcion : Permite dar un formato mas amigable con el usuario, a los datos
    //              correspondientes al progreso de la pista.
    const formatTime = ({ time = 0 }) => {
        let minutes = Math.floor(time / 60);
        let seconds = Math.ceil(time - minutes * 60);
        if (seconds < 10)
            seconds = `0${seconds}`;
        return `${minutes}:${seconds}`;
    };
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={container}>
            <Slider
                style={[styles.slider]}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                value={value}
                onValueChange={onValueChange}//Evento >>  Arrastrar el control deslizante.
                onSlidingComplete={onSlidingComplete}//Evento >>  Soltar el control deslizante.
                minimumTrackTintColor={colorSlider}
                maximumTrackTintColor={colorSlider + 'AF'}
                thumbTintColor={colorPoint} />
            <View style={[styles.ctnTime]}>
                <Text style={[styles.textTime, { color: colorSlider }]}>{formatTime({ time: value })}</Text>
                <Text style={[styles.textTime, { color: colorSlider }]}>{formatTime({ time: maximumValue })}</Text>
            </View>
        </View>
    );
}
export default MyPodcastSlider;
//---------------------------------------------------------------------------------------------
//------------------------------------Estilos de Componente------------------------------------
//---------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo >> Contenedor de slider.
    slider: {
        flex: 0.6,
        width: '90%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    //Estilo >> Contenedor progreso.
    ctnTime: {
        flex: 0.4,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    //Estilo >> Texto de time
    textTime: {
        color: colors.DarkBlue,
        fontFamily: letter.Title,
        fontSize: FONTSIZE_TEXT_TIME
    },
});
