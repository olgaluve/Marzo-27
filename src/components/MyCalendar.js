//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyCalendar--------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      styleCtnInput >> Estilo de contenedor de Input.
//      inputCheck    >> Check de entrada de texto.
//------------------------------------Configuracion de icono-----------------------------------
//      iconName      >> Nombre de icono.
//      iconSize      >> Tamaño de icono.
//      iconColor     >> Color de icono.
//----------------------------Configuracion de parametros de TextInput-------------------------
//      inputBg                 >> Color de fondo.
//      inputPlaceHolder        >> Placeholder.
//      inputPlaceHolderColor   >> Color de Placeholder.
//      inputSecurity           >> Seguridad de entrada.
//      inputKeyboard           >> tipo de entrada.
//      inputOnChangeText       >> Llamada de cambio de texto.
//      inputValue              >> Valor de entrada de texto.
//      inputEditable           >> Configuracion de edicion de entrada.
//      onFocus                 >> Llamada de evento de 'Enfoque' de entrada.
//-------------------------------Configuracion de boton de TextInput---------------------------
//      button          >>  Bandera de render.
//      buttonStyle     >>  Estilo de boton.
//      buttonOnpress   >>  Funcion de boton.
//      buttonIcon      >>  Icono de boton.

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React from 'react';
import { View, StyleSheet } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '@styles/colors';
import { letter } from '@styles/letter';
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyCalendar(props) {
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de Componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------Componente >> Calendario de Eventos----------------------------
    //Descripcion : Renderiza un calendario de eventos, con la informacion de los eventos a
    //              realizar y realizados, obtenida desde la api.
    const CalendarEvents = () => {

        return (
            <Calendar
                current={'2020-11-01'}
                startFromMonday={true}
                dayShape={'circle'}
                onDayPress={(day) => {
                    getEventDetails(day.dateString);
                }}
                markingType={'period'}
                markedDates={markedDates}
                style={{ backgroundColor: '#357cbd', borderRadius: 10 }}
                theme={{
                    backgroundColor: '#357cbd',
                    calendarBackground: '#357cbd',
                    textSectionTitleColor: '#065187',
                    textSectionTitleDisabledColor: '#065187',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#fff',
                    dayTextColor: '#fff',
                    textDisabledColor: '#065187',
                    dotColor: '#065187',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'white',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: '#065187',
                    textMonthFontWeight: 'bold',
                    indicatorColor: '#065187',
                    textDayFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                }}
                onMonthChange={(month) => {
                    console.log('month changed', month);
                }}
            />
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <View style={[props.styleCtnCalendar]}>

        </View>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de calendario
    iconTextInput: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    //Estilo de textInput
    textInput: {
        height: '100%',
        flex: 0.8,
        fontSize: 15,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    //Estilo de boton Show/Hide Password
    buttonStyle: {
        height: '100%',
        width: '20%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 2
    },
})
