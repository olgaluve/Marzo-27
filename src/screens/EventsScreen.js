//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Videos----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator, FlatList } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import { Calendar, LocaleConfig } from 'react-native-calendars';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardEvents from '../components/MyCardEvents';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
//------------------------------------------Servicies------------------------------------------
import { getEvents } from '../services/services';
//-------------------------------------------Estilos-------------------------------------------
import { EventsStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------Recursos Graficos-------------------------------------

//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const EventsScreen = props => {
    const { navigation } = props;
    let selectedEvents = [];
    const CurrentDay = new Date();
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    LocaleConfig.locales.es = {
        monthNames: [
            t('events:enero'),
            t('events:febrero'),
            t('events:marzo'),
            t('events:abril'),
            t('events:mayo'),
            t('events:junio'),
            t('events:julio'),
            t('events:agosto'),
            t('events:septiembre'),
            t('events:octubre'),
            t('events:noviembre'),
            t('events:diciembre'),
        ],
        monthNamesShort: [
            'Ene.',
            'Feb.',
            'Mar',
            'Abr',
            'May',
            'Jun',
            'Jul.',
            'Ago',
            'Sep.',
            'Oct.',
            'Nov.',
            'Dec.',
        ],
        dayNames: [
            t('events:domingo'),
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
        ],
        dayNamesShort: [
            t('events:domingo'),
            t('events:lunes'),
            t('events:martes'),
            t('events:miercoles'),
            t('events:jueves'),
            t('events:viernes'),
            t('events:sabado')],
    };
    LocaleConfig.defaultLocale = 'es';
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [eventos, setEventos] = useState();//Estado >> Videos.
    const [render, setRender] = useState(false);//Estado >> Render.
    const [markedDates, setMarkedDates] = useState();//Estado >> Marcadores.
    const [selectedEventsProp, setselectedEventsProp] = useState([]);//Estado >> Seleccion Eventos.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    const getData = async ({ language = 'es' }) => {
        try {
            let responseEventos = await getEvents({ language: language });
            let verify = responseEventos.data.status;
            if (verify) {
                setEventos(responseEventos.data.data);
                setRender(true);
            }

        } catch (e) {
            console.log('Error Resources : ', e);
        }
    }
    const selectedDates = (events) => {
        const event = {};
        events.forEach((item) => {
            event[item] = {
                selected: true,
                marked: true,
                customStyles: {
                    container: {
                        backgroundColor: '#74B1DB'
                    },
                    text: {
                        color: '#FFFFFF',
                    }
                },
            };
        });
        return JSON.parse(JSON.stringify(event));
    };
    function getEventDetails(date) {
        //console.log('selected day is : ' + date);
        let selectedEventsDetails = eventos.filter((x) => x.start_date === date);
        selectedEventsDetails.forEach((item) => {
            let eventItem = { id: item.id, title: item.title, des: item.des, link: item.link };
            selectedEvents.push(eventItem);
        });
        setselectedEventsProp(selectedEvents);
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Componente >> ResourcesCompany-----------------------------
    //Descripcion : Renderiza los eventos de la compañia en un contenedor desplazable (Scroll).
    const EventsCompany = (props) => {
        return (
            <View style={[EventsStyles.ctnEvents]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[EventsStyles.scrollEvents]}>
                    <Calendar
                        current={CurrentDay}//Dia actual
                        firstDay={1}//Dia de comienzo de calendario
                        markingType={'custom'}//Marcador >> Tipo >> Personalizado
                        style={[EventsStyles.calendar]}//Marcador >> Style
                        markedDates={markedDates}//Marcador >> Data
                        onDayPress={(day) => { getEventDetails(day.dateString); }}//Llamada de evento Touche
                        theme={{
                            backgroundColor: '#357BBC',
                            calendarBackground: '#357BBC',
                            textSectionTitleColor: '#014B81',
                            textSectionTitleDisabledColor: '#014B81',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#FFFFFF',
                            todayBackgroundColor: '#FF4848AF',
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
                            textDayHeaderFontSize: 18,
                            arrowColor: '#FFFFFF',
                            'stylesheet.calendar.header': {
                                header: {
                                    flexDirection: 'row',
                                    borderColor: '#FFFFFF',
                                    borderBottomWidth: 2,

                                    marginBottom: 10
                                },
                                headerContainer: {
                                    flex: 0.7,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                },
                                arrow: {
                                    flex: 0.15,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                },

                            }
                        }}
                        onMonthChange={(month) => {
                            //console.log('month changed', month);
                        }} />
                </ScrollView>
            </View>
        )
    }
    const renderConferencesList = ({ item }) => (
        <MyCardEvents
            title={item.title}
            des={item.des}
            link={item.link} />
    );
    const Loading = () => {
        return (
            <View style={[EventsStyles.ctnEvents, { justifyContent: 'center' }]}>
                <View style={[EventsStyles.ctnLoading]}>
                    <ActivityIndicator size="small" color={colors.Blue} />
                    <Text style={[EventsStyles.loadingText]}> Loading...</Text>
                </View>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    useLayoutEffect(() => {
        let language = props.user.data.language;
        if (language)
            getData({ language: language });
    }, [props.user.data.language]);

    useEffect(() => {
        if (eventos) {
            let events = [];
            for (var i = 0; i < eventos.length; i++) {
                if (eventos[i].hasOwnProperty('start_date')) {
                    events.push(eventos[i].start_date);
                }
                if (eventos[i].hasOwnProperty('end_date')) {
                    events.push(eventos[i].end_date);
                }
            }
            setMarkedDates(selectedDates(events));//Marca los dias con fecha
        }
    }, [eventos]);
    //--------------------------Effect >> Obtencion de recursos--------------------------------
    //------------------------------Effect >> Show/Hide Modal----------------------------------
    /*useEffect(() => {
        let showView = props.viewCourse.data.show;
        showView ? Opacity_Show.start() : Opacity_Hide.start();
    }, [props.viewCourse.data.show]);*/
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:eventos')}
                navigation={navigation} />
            {!render && <Loading />}
            {render && <EventsCompany {...props} />}
            {render &&
                <View style={EventsStyles.list}>
                    <FlatList
                        data={selectedEventsProp}
                        renderItem={renderConferencesList}
                        nestedScrollEnabled={true}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }} />
                </View>
            }
        </Wallpaper>
    );
};
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//--------------------------Instancia de Estados almacenados en Store--------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapStateToProps = state => {
    //Instancia de state
    //IdState : State
    //  >> State : Es el Id dado al reducer en el archivo reducers.js.
    //      Ruta Relativa >> app\reducers\reducers.js
    return {
        user: state.user,
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps)(EventsScreen);

