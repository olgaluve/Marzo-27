//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> VideosPlay------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { AppState, Text, View, Button, Dimensions } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import YoutubePlayer from "react-native-youtube-iframe";
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MySpace from '../components/MySpace';
//------------------------------------------Redux----------------------------------------------
import { useSelector } from 'react-redux';
//-------------------------------------------Estilos-------------------------------------------
import { VideosStyles } from '../styles/styles';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
const SIZE_PLAYER = height * 0.3;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const VideosPlayScreen = props => {
    const { navigation } = props;
    const appState = useRef(AppState.currentState);
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------------State---------------------------------------------
    const videoPlay = useSelector(state => state.videoPlay);
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    const monthsLabel = {
        '01': 'Ene.',
        '02': 'Feb.',
        '03': 'Mar.',
        '04': 'Abr.',
        '05': 'May.',
        '06': 'Jun.',
        '07': 'Jul.',
        '08': 'Ago.',
        '09': 'Sep.',
        '10': 'Oct.',
        '11': 'Nov.',
        '12': 'Dec.',
    };
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [appStateVisible, setAppStateVisible] = useState(appState.current);//Estado >> Estado App.
    const [playing, setPlaying] = useState(true);//Estado >> Reproducion de video.
    const [data, setData] = useState({});//Estado >> Datos de video.
    const [render, setRender] = useState(false);//Estado de render.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------Funcion >> Cambio de estado de pantalla--------------------------
    const _handleAppStateChange = (nextAppState) => {
        let verify = appState.current.match(/inactive|background/) && nextAppState === "active";
        if (verify)
            console.log('Aplicacion Primer Plano');
        else
            console.log('Aplicaion Segundo Plano')
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.group('Estado App');
        console.log("AppState", appState.current);
        console.groupEnd();
    };
    //----------------------Funcion >> Llamada >> Finalizacion de video------------------------
    //Descripcion : Detecta la finalizacion del video y genera un estado de pausa.
    const onStateChange = useCallback((state) => {
        if (state === "ended")
            setPlaying(false);
    }, []);
    //----------------------Funcion >> Llamada >> Cambio de estado Reproduccion----------------
    //Descripcion : Detecta un cambio de estado en la reproduccion del video por parte del usuario
    //              cambiando de un estado de Play a Pause y viseversa.
    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------------Componente >> VideoPlayer------------------------------
    //Desrcipcion : Renderiza el reproductor de video.
    const VideoPlayer = ({ data }) => {
        return (
            <Fragment>
                <View style={[VideosStyles.ctnPlayVideo]}>
                    <YoutubePlayer
                        height={SIZE_PLAYER}
                        width={width * 0.9}
                        play={playing}
                        videoId={data.video}
                        onChangeState={onStateChange} />
                </View>
                <VideoDetails data={data} />
            </Fragment>
        );
    }
    //----------------------------Componente >> Detalles Video---------------------------------
    //Desrcipcion : Renderiza los detalles del video seleccionado video.
    const VideoDetails = ({ data }) => {
        return (
            <View style={[VideosStyles.ctnDetails]}>
                <Text style={[VideosStyles.textTitle]}>Descripcion</Text>
                <MySpace ctnSpace={{ height: height * 0.02, width }} />
                <Text style={[VideosStyles.textDetail]}>{data.title}</Text>
                <MySpace ctnSpace={{ height: height * 0.02, width }} />
                <VideoProperty
                    views={data.views}
                    date_video={data.date_time} />
                <MySpace ctnSpace={{ height: height * 0.02, width }} />
                <View style={[VideosStyles.sectionDivider]} />
                <MySpace ctnSpace={{ height: height * 0.02, width }} />
                <Text style={[VideosStyles.textTitle]}>{data.des}</Text>
            </View>
        );
    }
    //---------------------------Componente >> Propiedades de video----------------------------
    //Descripcion : Render las propiedades del video seleccionado.
    const VideoProperty = ({ views, date_video }) => {
        //console.log(date_video);
        let newDate = date_video.split(' ');
        let date = newDate[0].split('-');
        let year = date[0];
        let day = date[2];
        let month = monthsLabel[date[1]];
        let valueDate = month + ' ' + day;
        return (
            <View style={[VideosStyles.ctnVideoProperty]}>
                <PropertyValue label={t('videos:views')} value={views} />
                <MySpace ctnSpace={{ height: '100%', flex: 0.2 }} />
                {/*<PropertyValue label={'2020'} value={'Feb. 2'} />*/}
                <PropertyValue label={year} value={valueDate} />
            </View>
        );
    }
    //---------------------------Componente >> Valor de propiedad------------------------------
    //Descripcion : Renderiza el valor de una propiedad del video seleccionado.
    const PropertyValue = ({ label = '', value = '' }) => {
        return (
            <View style={[VideosStyles.ctnValueProperty]}>
                <Text style={[VideosStyles.textDetail]}>{value}</Text>
                <Text style={[VideosStyles.textTitle]}>{label}</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------Instancia >> Objeto de escucha >> Estado de app-------------------
    //Descripcion : Instancia un evento de escucha que permite conocer el estado actual de la App.
    //              (Foreground/BackGround). Se da con el fin de generar un render condicional
    //              del reproductor de video, con el fin de cumplir las normas predispuesta por
    //              google play.
    //Nota : Para efectos de referencia consultar los siguientes links :
    //          >>https://lonelycpp.github.io/react-native-youtube-iframe/basic-usage
    //          >>https://reactnative.dev/docs/appstate
    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);
    //-----------------------Instancia >> Objeto de escucha >> Estado de app-------------------
    //-----------------------------Effect >> Obtencio Datos Video------------------------------
    useEffect(() => {
        let keysData = Object.keys(videoPlay.data).length;
        let verify = keysData > 0;
        if (verify) {
            setRender(true);
            setData(videoPlay.data);
        }
    }, [videoPlay.data])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:videos')}
                route={'VideosHome'}
                navigation={navigation} />
            {
                (appStateVisible === 'active' && render) &&
                <VideoPlayer data={data} />
            }
        </Wallpaper>
    );
};
export default VideosPlayScreen;

