//---------------------------------------------------------------------------------------------
//------------------------------Archivo de componente: MyIndicator-----------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      array       >> Objeto de datos.
//      scrollX     >> Valor de scroll.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { StyleSheet, Dimensions, View, Animated } from 'react-native';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
//-------------------------------------Constanntes Globales------------------------------------
const { width, height } = Dimensions.get('window');
const SIZE_INDICATOR = width * 0.025;
const SIZE_INDICATOR_MARGIN = SIZE_INDICATOR / 2;
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
const MyIndicator = props => {
    const { container, data, scrollX, sizeItem, color, colorActive } = props;
    const inputRange = [0, (sizeItem) * (data.length - 1)];
    const outputRange = [0, (data.length - 1) * (SIZE_INDICATOR + SIZE_INDICATOR_MARGIN * 2)];
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp',
    });
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[styles.ctnIndicator, container]}>
            {
                data.map(data =>
                    <View
                        key={data.id}
                        style={[styles.indicator, { backgroundColor: color }]} />)
            }
            <Animated.View
                style={[styles.indicatorActive, { backgroundColor: colorActive }, { transform: [{ translateX }] }]} />
        </View>
    );
}
export default MyIndicator;
const styles = StyleSheet.create({
    //Estilo >> Contenedor de indicador
    ctnIndicator: {
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    //Estilo >> Indicador
    indicator: {
        width: SIZE_INDICATOR,
        height: SIZE_INDICATOR,
        marginHorizontal: SIZE_INDICATOR_MARGIN,
        borderRadius: 100,
        backgroundColor: colors.Black + '0F'
    },
    //Estilo >> Indicador activo
    indicatorActive: {
        position: 'absolute',
        left: 0,
        width: SIZE_INDICATOR,
        height: SIZE_INDICATOR,
        marginHorizontal: SIZE_INDICATOR_MARGIN,
        borderRadius: 100,
        backgroundColor: colors.Blue
    }
})
