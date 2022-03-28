//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Podcast----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Animated, Dimensions, Platform } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import TrackPlayer,  { Capability } from 'react-native-track-player';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardPodcast from '../components/MyCardPodcast';
import MyCardPodcastLike from '../components/MyCardPodcastLike';
//------------------------------------------Redux----------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
//------------------------------------------Servicies------------------------------------------
import { getPodcast } from '../services/services';
import { AddPodcastPlay, AddPodcast } from '../redux/actions/actions';
//-------------------------------------------Estilos-------------------------------------------
import { PodcastStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
//Constantes >> Dimension >> Tarjeta Videoslike
const ITEM_SIZE_HORIZONTAL = width * 0.75;//Tamaño de item >> Scroll Horizontal.
const ITEM_SIZE_VERTICAL = height * 0.15;//Tamalo de item >> Scroll Vertical.
const EMPTY_ITEM_SIZE_HORIZONTAL = (width - ITEM_SIZE_HORIZONTAL) / 2;//Tamaño >> Espacio entre items
const EMPTY_ITEM_SIZE_VERTICAL = (ITEM_SIZE_VERTICAL) / 2;//Tamaño >> Espacio entre items
const TRACK_PLAYER_CONTROLS_OPTS = {
    waitforBuffer: true,
    stopWithApp: true,
    alwaysPauseOnInterruption: true,
    capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
    ],
    compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
    ],
};
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const PodcastScreen = props => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux-----------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------------------State-----------------------------------------------
    const user = useSelector(state => state.user);
    //--------------------------------------Actions----------------------------------------------
    const dispatch = useDispatch();
    const add_podcast = data => dispatch(AddPodcast(data));
    const add_podcastPlay = data => dispatch(AddPodcastPlay(data));
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Constantes---------------------------------
    //-----------------------------------------------------------------------------------------
    const MONTHS = {
        '01': t('events:enero'),
        '02': t('events:febrero'),
        '03': t('events:marzo'),
        '04': t('events:abril'),
        '05': t('events:mayo'),
        '06': t('events:junio'),
        '07': t('events:julio'),
        '08': t('events:agosto'),
        '09': t('events:septiembre'),
        '10': t('events:octubre'),
        '11': t('events:noviembre'),
        '12': t('events:diciembre'),
    };
    //-----------------------------------------------------------------------------------------
    //-----------------------Inicializacion de variables de animacion--------------------------
    //-----------------------------------------------------------------------------------------
    const scrollX = useRef(new Animated.Value(0)).current;//Valor >> Desplazamiento en Y
    const scrollY = useRef(new Animated.Value(0)).current;//Valor >> Desplazamiento en Y
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [podcast, setPodcast] = useState([]);//Estado >> Podcast.
    const [podcastLike, setLikePodcast] = useState();//Estado >> Podcast mas vistos.
    const [render, setRender] = useState(false);//Estado >> Render.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Funcion >> Obtencion Datos---------------------------------
    //Descripcion : Obtiene los datos correspondiente a los videos de la compañia, mediante una
    //              peticion tipo get.
    const getData = async ({ language = 'es' }) => {
        try {
            let responsePodcast = await getPodcast({ language: language });
            let verify = responsePodcast.data.status;
            if (verify) {
                let data = responsePodcast.data.data;
                let dataLike = responsePodcast.data.dataPopular;
                data.map(data => {
                    let objectDate = data.date.split('-');
                    data.date = MONTHS[objectDate[1]] + ' ' + objectDate[0];
                })
                setPodcast(data);
                setLikePodcast([{ id: 'empty-left' }, ...dataLike, { id: 'empty-right' }]);//List >> Most viewed Podcast.
                add_podcast(data);//Listas de podcast.
                setRender(true);
            }

        } catch (e) {
            console.log('Error Resources : ', e);
        }
    }
    //-----------------------------Funcion >> Seleccionar Podcast------------------------------
    //Descripcion : Permite navegar a la pantalla de reproduccion de podcast, cuando se selecciona
    //              uno de ellos.
    const selectPodcast = ({ item = {} }) => {
        console.log(item);
        add_podcastPlay(item);
        navigation.navigate('PodcastPlay');
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------------Componente >> PodcastItemLike--------------------------
    //Descripcion : Renderiza el item de la lista de podcastLike.
    const PodcastLikeItem = props => {
        const { item, index, scrollX } = props;
        //Condicional >> Espaciados Izquierdo/Derecho de lista.
        if (item.id === 'empty-left' || item.id === 'empty-right')
            return <View style={{ width: EMPTY_ITEM_SIZE_HORIZONTAL }} />
        //Especificacion de limites de desplazamiento de elementos
        //Nota : La lista de videos con mas vistas se realiza con un efecto de enfoque que depende del valor
        //      actual del scroll (Entiendase como 'scroll' al desplazamiento horizontal que
        //      realiza el usuario con el fin de visualizar la lista de productos).
        //      Para lograr el efecto de enfoque se realiza el calculo de los limites de los valores
        //      de desplazamiento del elemento.
        const FirstScroll = (index - 2) * ITEM_SIZE_HORIZONTAL;
        const SecondScroll = (index - 1) * ITEM_SIZE_HORIZONTAL;
        const ThirtScroll = index * ITEM_SIZE_HORIZONTAL;
        const inputRange = [FirstScroll, SecondScroll, ThirtScroll];
        const outputOpacity = [0.5, 1, 0.5];//Salida >> Opacidad de tarjeta.
        const outputScale = [0.85, 1, 0.85];//Salida >> Escala de tarjeta.
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: outputOpacity,
            extrapolate: 'clamp',
        });
        const scale = scrollX.interpolate({
            inputRange,
            outputRange: outputScale,
            extrapolate: 'clamp',
        });
        return (
            <MyCardPodcastLike
                item={item}
                opacity={{ opacity }}
                scale={{ scale }}
                onPress={() => selectPodcast({ item: {...item,index} })} />
        );
    }
    //------------------------------Componente >> PodcastItem----------------------------------
    //Descripcion : Renderiza el item de la lista de podcast.
    const PodcastItem = props => {
        const { item, index, scrollY } = props;
        //Condicional >> Espaciados Izquierdo/Derecho de lista.
        if (item.id === 'empty-left' || item.id === 'empty-right')
            return <View style={{ height: EMPTY_ITEM_SIZE_VERTICAL }} />
        const FirstScroll = index * ITEM_SIZE_VERTICAL;
        const SecondScroll_Scale = (index + 2) * ITEM_SIZE_VERTICAL;
        const SecondScroll_Opacity = (index + 0.5) * ITEM_SIZE_VERTICAL;
        //const ThirtScroll = index * ITEM_SIZE;
        const inputRangeScale = [-1, 0, FirstScroll, SecondScroll_Scale];//Entrada >> Escala de tarjeta.
        const inputRangeOpacity = [-1, 0, FirstScroll, SecondScroll_Opacity];//Entrada >> Opacidad de tarjeta.
        const outputRange = [1, 1, 1, 0];//Salida >> Opacidad de tarjeta.
        const scale = scrollY.interpolate({
            inputRange: inputRangeScale,
            outputRange,
            extrapolate: 'clamp',
        });
        const opacity = scrollY.interpolate({
            inputRange: inputRangeOpacity,
            outputRange,
            extrapolate: 'clamp',
        });
        return (
            <MyCardPodcast
                item={item}
                opacity={{ opacity }}
                scale={{ scale }}
                onPress={() => selectPodcast({ item: {...item,index} })} />
        );
    }
    //------------------------------Componente >> Texto Video----------------------------------
    //Descripcion : Renderiza el titulo de la seccion de video.
    const PodcastText = ({ label }) => {
        return (
            <View style={[PodcastStyles.ctnLabel]}>
                <Text style={[PodcastStyles.textLabel]}>{label}</Text>
            </View>
        );
    }
    //------------------------------Componente >> Loading Data---------------------------------
    //Descripcion : Renderiza un indicador de carga de datos, mientras se resuleve la solicitud
    //              de red para obtener los datos.
    const Loading = ({ ctnStyle }) => {
        return (
            <View style={[PodcastStyles.ctnPodcast, ctnStyle]}>
                <View style={[PodcastStyles.ctnLoading]}>
                    <ActivityIndicator size="small" color={colors.Blue} />
                    <Text style={[PodcastStyles.loadingText]}> Loading...</Text>
                </View>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Instancia >> Obtencion de datos-----------------------------
    //Descripcion : Realiza la llamada para la obtencion de recursos.
    useLayoutEffect(() => {
        if (user.data.language)
            getData({ type: '1', language: user.data.language });
    }, [user.data.language]);
    //---------------------------Instancia >> Configuracion Reproductor------------------------
    //Descripcion : COnfigura el reproductor, una vez se obtinen los datos de pista.
    useEffect(() => {
        let verify = render && podcast.length > 0;
        if (verify) {
            //Creacion >> Track Object
            let objectTracker = podcast.map(data => {
                return ({
                    title: data.title,
                    artist: data.invited,
                    artwork: data.image,
                    url: data.url,
                    duration: parseInt(data.duration)
                });
            });
            //Configuracion >> Libreria de reproduccion
            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.reset();//Reproductor >> Reset.
                await TrackPlayer.add(objectTracker);//Reproductor >> Agregar pistas.
                await TrackPlayer.updateOptions(TRACK_PLAYER_CONTROLS_OPTS);//Reproductor >> Configuracion.
                ////Interrupcion >> Reproduccion de material multimedia por otras apps.
                TrackPlayer.addEventListener('remote-duck', e => {
                    console.group('Event >> External Reproduction');
                    console.log(e);
                    console.groupEnd();
                    if (e.paused)
                        TrackPlayer.pause();
                    else
                        TrackPlayer.play();
                });
            });

        }
        return () => {
            TrackPlayer.destroy();
        };
    }, [render]);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:podcast')}
                navigation={navigation} />
            <PodcastText label={t('podcast:others')} />
            {!render && <Loading ctnStyle={[PodcastStyles.ctnPodcast]} />}
            {
                render &&
                <View style={[PodcastStyles.ctnPodcast]}>
                    <Animated.FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        data={podcast}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) =>
                            <PodcastItem item={item} index={index} scrollY={scrollY} />
                        }
                        //bounces={false}
                        renderToHardwareTextureAndroid
                        decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}//Número de punto flotante que determina qué tan rápido se desacelera la vista de desplazamiento después de que el usuario levanta el dedo.
                        snapToInterval={ITEM_SIZE_VERTICAL}//La vista de desplazamiento se detenga en múltiplos del valor de snapToInterval.
                        snapToAlignment='center'//Define la relación del ajuste a la vista de desplazamiento.
                        disableIntervalMomentum={true}//la vista de desplazamiento se detiene en el siguiente índice.
                        onScroll={
                            Animated.event([{
                                nativeEvent: { contentOffset: { y: scrollY } }
                            }], { useNativeDriver: true })
                        }
                        scrollEventThrottle={16} />
                </View>
            }
        </Wallpaper>
    );
};
export default PodcastScreen;

/*
    title: 'death bed',
    artist: 'Powfu',
    artwork: require('../assets/album-arts/death-bed.jpg'),
    url: 'https://sample-music.netlify.app/death%20bed.mp3',
    duration: 2 * 60 + 53,
    id: '1',


*/