//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> VideosPlay------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, Animated } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//---------------------------------------Track Player------------------------------------------
import TrackPlayer, { usePlaybackState, useProgress } from 'react-native-track-player';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardPodcastPlay from '../components/MyCardPodcastPlay';
import MyPodcastSlider from '../components/MyPodcastSlider';
import MyPodcastButtons from '../components/MyPodcastButtons';
//------------------------------------------Redux----------------------------------------------
import { useSelector } from 'react-redux';
//-------------------------------------------Estilos-------------------------------------------
import { PodcastStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
const ITEM_SIZE_WIDTH = width;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const PodcastPlay = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------------State---------------------------------------------
    const podcastPlay = useSelector(state => state.podcastPlay);
    let lenghData = podcastPlay.data.length;
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Objetos TrackPlayer------------------------
    //-----------------------------------------------------------------------------------------
    const playbackState = usePlaybackState();
    const { position, duration } = useProgress(1000, null);
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Referencias-----------------------------------
    //-----------------------------------------------------------------------------------------
    const scrollX = useRef(new Animated.Value(0)).current;
    const listReproduction = useRef();//Estado de referencia de Flatlist
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [podcastIndex, setPodcastIndex] = useState(-1);//Indice >> Podcast.
    const [sliderEvent, setSliderEvent] = useState(false);//Evento >> Arrastre de slider.
    const [sliderPosition, setSliderPosition] = useState(0);//Posicion >> Slider.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------Funcion >> Reproduccion New Element----------------------------
    const playTrack = async ({ trackIndex = 0 }) => {
        await TrackPlayer.skip(trackIndex);
        TrackPlayer.play();
    }
    //--------------------------Funcion >> Reproduccion Element--------------------------------
    const controlPlay = () => {
        if (playbackState === 'paused' || playbackState === 2)
            TrackPlayer.play();
        else
            TrackPlayer.pause();
        console.log('Event Touche >> Play Audio');
    }
    //--------------------------Funcion >> Reproduccion Next Element---------------------------
    //Descripcion : Permite la reproduccion del proximo elemento.
    const goNext = () => {
        let index = podcastIndex + 1;
        let verify = podcastIndex === lenghData - 1;
        if (verify)
            index = 0;
        listReproduction.current.scrollToIndex({ index });//Scroll >> Next Element.
        console.log('Event Touche >> Next Audio');
    };
    //--------------------------Funcion >> Reproduccion Prev Element---------------------------
    //Descripcion : Permite la reproduccion del anterior elemento.
    const goPrv = () => {
        let index = podcastIndex - 1;
        let verify = podcastIndex === 0;
        if (verify)
            index = lenghData - 1;
        listReproduction.current.scrollToIndex({ index });//Scroll >> Prev Element.
        console.log('Event Touche >> Prev Audio');
    };
    //---------------------------Funcion >> Reproduccion +10 Element---------------------------
    //Descripcion : Permite adelantar la pista 10 [s], de su valor actual de repoduccion.
    const goMore = () => {
        TrackPlayer.seekTo(position + 10);
        console.log('Event Touche >> More 10')
    }
    //---------------------------Funcion >> Reproduccion -10 Element---------------------------
    //Descripcion : Permite retrasar la pista 10 [s], de su valor actual de repoduccion.
    const goLess = () => {
        TrackPlayer.seekTo(position - 10);
        console.log('Event Touche >> Less 10')
    }
    //-------------------------------Funcion >> Evento de Slider-------------------------------
    //Descripcion : Accion del evento >> Soltar Slider.
    const handleChange = ({ value = 0 }) => {
        TrackPlayer.seekTo(value).then(() =>
            setTimeout(() => setSliderEvent(false), 1000)
        );
    };
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> ReproductorItem----------------------------
    //Descripcion : Permite renderizar la lista de reproduccion.
    const ReproductorItem = props => {
        const { item, index, scrollX } = props;
        const FirstScroll = (index - 0.5) * ITEM_SIZE_WIDTH;
        const SecondScroll = index * ITEM_SIZE_WIDTH;
        const ThirtScroll = (index + 0.5) * ITEM_SIZE_WIDTH;
        const inputRange = [FirstScroll, SecondScroll, ThirtScroll];
        const outputRange = [0, 1, 0];
        const opacity = scrollX.interpolate({
            inputRange,
            outputRange,
            extrapolate: 'clamp',
        });
        return (
            <MyCardPodcastPlay
                item={item}
                opacity={{ opacity }} />
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Instancia >> Scroll de lista--------------------------------
    //Descripcion : Realiza el scroll al primer item de la lista de recursos.
    useEffect(() => {
        listReproduction.current.scrollToIndex({ index:podcastPlay.current.index });
        setPodcastIndex(podcastPlay.current.index);
        console.log(podcastPlay.current.index);
    }, [podcastPlay.current]);
    //----------------------------Instancia >> Escucha ScrollX---------------------------------
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            let indexCurrent = Math.round(value / width);
            setPodcastIndex(prev => {
                if (prev !== indexCurrent)
                    return indexCurrent;
                return prev;
            });
        });
        return () => {
            scrollX.removeAllListeners();
        };
    }, []);
    //----------------------------Instancia >> Comparacion Valor Posicion----------------------
    //Descripcion : Compara la posicion actual de reproduccion, con la duracion total en [s] de
    //              la pista, para avanzar al siguiente elemento.
    useEffect(() => {
        let newPosition = Math.floor(position);
        if (newPosition === duration - 1) {
            let index;
            let data = podcastPlay.data;
            index = podcastIndex === data.length - 1 ? 0 : podcastIndex + 1;
            listReproduction.current.scrollToIndex({ index });//Scroll >> Prev Element.
        }
    }, [position]);
    //-----------------Instancia >> Evento Cambio de indice de reproduccion--------------------
    //Descripcion : Genera la reproduccion de pista, de acuerdo al cambio en el indice de lista.
    useEffect(() => {
        if (podcastIndex>=0)
            playTrack({ trackIndex: podcastIndex });//Reproduccion >> Pista.
    }, [podcastIndex]);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:podcast')}
                route={'PodcastHome'}
                navigation={navigation} />
            <View style={[PodcastStyles.ctnList]}>
                <Animated.FlatList
                    ref={listReproduction}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    renderToHardwareTextureAndroid
                    getItemLayout={(data, index) => (
                        { length: ITEM_SIZE_WIDTH, offset: ITEM_SIZE_WIDTH * index, index }
                    )}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    data={podcastPlay.data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) =>
                        <ReproductorItem item={item} index={index} scrollX={scrollX} />
                    }
                    onScroll={
                        Animated.event([{
                            nativeEvent: { contentOffset: { x: scrollX } }
                        }], { useNativeDriver: true })}
                    scrollEventThrottle={16} />
            </View>
            <MyPodcastSlider
                container={[PodcastStyles.ctnSlider]}
                //colorSlider={colors.DarkBlue}
                colorSlider={'#3565BD'}
                colorPoint={colors.Blue}
                minimumValue={0}
                maximumValue={duration}
                value={sliderEvent ? sliderPosition : position}
                onValueChange={value => {
                    //TrackPlayer.pause();
                    setSliderEvent(true);
                    setSliderPosition(value);
                }}
                onSlidingComplete={value => handleChange({ value: value })} />
            <MyPodcastButtons
                container={[PodcastStyles.ctnButtonsPlay]}
                backgroundColor={'#3565BD'}
                color={colors.White}
                onLess={() => goLess()}
                onMore={() => goMore()}
                onNext={() => goNext()}
                onPrv={() => goPrv()}
                onPlay={() => controlPlay()} />
        </Wallpaper>
    );
};
export default PodcastPlay;

