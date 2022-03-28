//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Videos----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useState, useLayoutEffect, useRef } from 'react';
import { Text, View, ScrollView, ActivityIndicator, Animated, Dimensions, Platform } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardVideos from '../components/MyCardVideos';
import MyCardVideosLike from '../components/MyCardVideosLike';
//------------------------------------------Redux----------------------------------------------
import { useSelector, useDispatch } from 'react-redux';
//------------------------------------------Servicies------------------------------------------
import { getVideos } from '../services/services';
import { AddVideoPlay } from '../redux/actions/actions';
//-------------------------------------------Estilos-------------------------------------------
import { VideosStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------Constantes Globales-----------------------------------
const { width, height } = Dimensions.get('window');
const MINIMAL_VIEWS = 5;//Vistas minimas de video.
//Constantes >> Dimension >> Tarjeta Videoslike
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.7;//Tamaño de item.
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;//Tamaño >> Espacio entre items
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const VideosScreen = props => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux-----------------------------------
    //-------------------------------------------------------------------------------------------
    //---------------------------------------State-----------------------------------------------
    const user = useSelector(state => state.user);
    //--------------------------------------Actions----------------------------------------------
    const dispatch = useDispatch();
    const add_videoPlay = data => dispatch(AddVideoPlay(data));
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //-----------------------Inicializacion de variables de animacion--------------------------
    //-----------------------------------------------------------------------------------------
    const scrollX = useRef(new Animated.Value(0)).current;//Estado de desplazamiento de flatList
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [videos, setVideos] = useState();//Estado >> Videos.
    const [videosLike, setVideosLike] = useState();//Estado >> Videos mas vistos.
    const [render, setRender] = useState(false);//Estado >> Render.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Funcion >> Obtencion Datos---------------------------------
    //Descripcion : Obtiene los datos correspondiente a los videos de la compañia, mediante una
    //              peticion tipo get.
    const getData = async ({ language = 'es' }) => {
        try {
            let responseVideos = await getVideos({ language: language });
            let verify = responseVideos.data.status;
            if (verify) {
                let data = responseVideos.data.data;
                let dataLike = data.filter(data => data.views > MINIMAL_VIEWS);
                setVideos(data);//List >> Videos
                setVideosLike([{ id: 'empty-left', title: '' }, ...dataLike, { id: 'empty-right', title: '' }]);//List >> Most viewed videos
                setRender(true);
            }

        } catch (e) {
            console.log('Error Resources : ', e);
        }
    }
    //-----------------------------Funcion >> Seleccionar Video--------------------------------
    //Descripcion : Permite navegar a la pantalla de reproduccion de videos, cuando se selecciona
    //              uno de ellos.
    const selectVideo = ({ item = {} }) => {
        add_videoPlay(item);
        navigation.navigate('VideosPlay');
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //------------------------------Componente >> VideosLikeCompany----------------------------
    //Descripcion : Renderiza los videos mas visto de la compañia en un contenedor de scroll
    //              horizontal (FlatList).
    const VideosLikeCompany = (props) => {
        const { videos } = props;
        return (
            <View style={[VideosStyles.ctnVideosLike]}>
                <Animated.FlatList
                    horizontal
                    pagingEnabled
                    contentContainerStyle={{ alignItems: 'center' }}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    renderToHardwareTextureAndroid
                    onScroll={
                        Animated.event([{
                            nativeEvent: { contentOffset: { x: scrollX } }
                        }], { useNativeDriver: false })
                    }
                    scrollEventThrottle={16}
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) =>
                        <VideosItem item={item} index={index} scrollX={scrollX} />
                    }
                    decelerationRate={Platform.OS === 'ios' ? 0 : 0.9}//Número de punto flotante que determina qué tan rápido se desacelera la vista de desplazamiento después de que el usuario levanta el dedo.
                    snapToInterval={ITEM_SIZE}//La vista de desplazamiento se detenga en múltiplos del valor de snapToInterval.
                    snapToAlignment='center'//Define la relación del ajuste a la vista de desplazamiento.
                    disableIntervalMomentum={true}//la vista de desplazamiento se detiene en el siguiente índice.
                />
            </View>
        );
    }
    //------------------------------Componente >> VideosLikeCompany----------------------------
    //----------------------------------Componente >> VideosItem-------------------------------
    //Descripcion : Renderiza el item de la lista de videosLike.
    const VideosItem = props => {
        const { item, index, scrollX } = props;
        const { title, des, video, thumb, views, date_time } = item;
        //Condicional >> Espaciados Izquierdo/Derecho de lista.
        if (!title)
            return <View style={{ width: EMPTY_ITEM_SIZE }} />
        //Especificacion de limites de desplazamiento de elementos
        //Nota : La lista de videos con mas vistas se realiza con un efecto de enfoque que depende del valor
        //      actual del scroll (Entiendase como 'scroll' al desplazamiento horizontal que
        //      realiza el usuario con el fin de visualizar la lista de productos).
        //      Para lograr el efecto de enfoque se realiza el calculo de los limites de los valores
        //      de desplazamiento del elemento.
        let FirstScroll, SecondScroll, ThirtScroll;//Scroll Position
        FirstScroll = (index - 2) * ITEM_SIZE;
        SecondScroll = (index - 1) * ITEM_SIZE;
        ThirtScroll = index * ITEM_SIZE;
        const inputRange = [FirstScroll, SecondScroll, ThirtScroll];
        const outputOpacity = [0.5, 1, 0.5];//Salida >> Opacidad de tarjeta.
        const outputScale = [0.8, 1, 0.8];//Salida >> Escala de tarjeta.
        const outputScaleImage = [1, 1.2, 1];//Salida >> Escala de imagen.
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
        const scaleImage = scrollX.interpolate({
            inputRange,
            outputRange: outputScaleImage,
            extrapolate: 'clamp',
        });
        return (
            <MyCardVideosLike
                title={title}
                des={des}
                video={video}
                thumb={thumb}
                views={views}
                date_time={date_time}
                selectItem={(action) => selectVideo({ action: action, item: item })}
                opacity={opacity}
                scale={scale}
                scaleImage={scaleImage} />
        );
    }
    //------------------------------Componente >> VideosCompany--------------------------------
    //Descripcion : Renderiza los videos de la compañia en un contenedor desplazable (Scroll).
    const VideosCompany = (props) => {
        const { videos } = props;
        return (
            <View style={[VideosStyles.ctnVideos]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[VideosStyles.scrollVideos]}>
                    {videos.map(data =>
                        <MyCardVideos
                            key={data.id}
                            data={data}
                            selectItem={(action) => selectVideo({ action: action, item: data })}
                            navigation={navigation} />
                    )}
                </ScrollView>
            </View>
        )
    }
    //------------------------------Componente >> Texto Video----------------------------------
    //Descripcion : Renderiza el titulo de la seccion de video.
    const VideosText = ({ label }) => {
        return (
            <View style={[VideosStyles.ctnLabel]}>
                <Text style={[VideosStyles.textLabel]}>{label}</Text>
            </View>
        );
    }
    //------------------------------Componente >> Loading Data---------------------------------
    //Descripcion : Renderiza un indicador de carga de datos, mientras se resuleve la solicitud
    //              de red para obtener los datos.
    const Loading = () => {
        return (
            <View style={[VideosStyles.ctnVideos, { justifyContent: 'center' }]}>
                <View style={[VideosStyles.ctnLoading]}>
                    <ActivityIndicator size="small" color={colors.Blue} />
                    <Text style={[VideosStyles.loadingText]}> Loading...</Text>
                </View>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    useLayoutEffect(() => {
        let language = user.data.language;
        if (language)
            getData({ language: language });
    }, [user.data.language]);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:videos')}
                navigation={navigation} />
            {!render && <Loading />}
            {render && <VideosText label={t('videos:moreViews')} />}
            {render && <VideosLikeCompany {...props} videos={videosLike} />}
            {render && <VideosText label={t('videos:otherVideos')} />}
            {render && <VideosCompany {...props} videos={videos} />}
        </Wallpaper>
    );
};
export default VideosScreen;

