//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Recursos--------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useRef, useState, useEffect } from 'react';
import { Animated, Text, View, ActivityIndicator, Dimensions, Alert, Linking } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyButtonsResources from '../components/MyButtonsResources';
import MyCardResources from '../components/MyCardResources';
import MyIndicator from '../components/MyIndicator';
import MyViewResources from '../components/MyViewResources';
//------------------------------------------Redux----------------------------------------------
import { useSelector } from 'react-redux';
//------------------------------------------Servicies------------------------------------------
import { getResourceType } from '../services/services';
//-------------------------------------------Estilos-------------------------------------------
import { ResourcesStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------Recursos Graficos-------------------------------------
import LogoAfiche from '../assets/LogoRecursosAfiche.png'
import LogoInfografia from '../assets/LogoRecursosInfografia.png'
import LogoPresentacion from '../assets/LogoRecursosPresentacion.png'
//------------------------------------------Constantes Globales--------------------------------
const { width, height } = Dimensions.get('window');
const SIZE_ITEM_WIDTH = width * 0.4;//Tamaño item >> Scroll Horizontal.
const SIZE_ITEM_HEIGHT = height * 0.205;//Tamaño item >> Scroll Vertical.
const SIZE_ITEM_EMPTY = (width - SIZE_ITEM_WIDTH) / 2;//Tamaño >> Espacio entre items.
const TIME_ANIMATION = 800;//Tiempo de transicion de animaciones.
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const ResourcesScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Referencias-----------------------------------
    //-----------------------------------------------------------------------------------------
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollY = useRef(new Animated.Value(0)).current;
    const opacityView = useRef(new Animated.Value(0)).current;
    const refListItems = useRef();
    const refListButtons = useRef();
    //--------------------------------Referencia >> Animacion------------------------------------
    //---------------------Animacion >> Desplazamiento en Y de cuadrado--------------------------
    const Opacity_Show = useRef(
        Animated.timing(opacityView, {
            toValue: 1,
            duration: TIME_ANIMATION,
            useNativeDriver: true,
        })).current;
    const Opacity_Hide = useRef(
        Animated.timing(opacityView, {
            toValue: 0,
            duration: TIME_ANIMATION,
            useNativeDriver: true,
        })).current;
    //-------------------------------Constantes de interpolacion---------------------------------
    const scaleView = opacityView.interpolate({
        inputRange: [0, 1],
        outputRange: [0.01, 1],
        extrapolate: 'clamp'
    });
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objetos Redux---------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------------State---------------------------------------------
    const user = useSelector(state => state.user);
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes------------------------------------
    //-----------------------------------------------------------------------------------------
    const BUTTTONS_RESOURCES = [
        {
            id: 'empty-left',
        },
        {
            id: '1',
            title: 'Afiche',
            recursos: 10,
            views: '5',
            logo: LogoAfiche
        },
        {
            id: '2',
            title: 'Infografia',
            recursos: 0,
            views: '5',
            logo: LogoInfografia
        },
        {
            id: '3',
            title: 'Presentacion',
            recursos: 0,
            views: '5',
            logo: LogoPresentacion
        },
        {
            id: 'empty-right',
        }
    ];
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Estados App-----------------------------------
    //-----------------------------------------------------------------------------------------
    const [selectResource, setSelectResource] = useState('1');//Estado >> Seleccion Recursos.
    const [resources, setResources] = useState([]);//Estado >> Recursos.
    const [render, setRender] = useState(false);//Estado >> Render.
    const [selectItem, setSelectItem] = useState([]);//Estado >> Seleccion de item.
    const [language, setLanguage] = useState('es');//Estado >> Lenguage de usuario.
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones----------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Funcion >> Obtencion de datos-------------------------------
    //Descripcion : Obtiene mediante una solicitud de tipo 'GET', los datos referentes a los
    //              recursos de la compania.
    const getData = async ({ type = '1', language = 'es' }) => {
        setRender(false);
        try {
            let responseResources = await getResourceType({ type: type, language: language });
            let verify = responseResources.data.status;
            if (verify) {
                setResources(responseResources.data.data);
                setRender(true);
            } else {
                setResources([]);
                setRender(true);
            }
        } catch (e) {
            console.log('Error Resources : ', e);
        }
    }
    //------------------------------------Funcion >> OpenUrl-----------------------------------
    //Descripcion : Abre el enlace web del pdf , para posteriormente descargarlo.
    const OpenUrl = async ({ url = '' }) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
        if (supported)
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        else
            Alert.alert(`Don't know how to open this URL: ${url}`);
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes--------------------------------
    //-----------------------------------------------------------------------------------------
    //--------------------------------Componente >> MyListItem---------------------------------
    //Descripcion : Renderiza los botones de seleccion de recursos.
    const MyListButtonItem = ({ item, index, scrollX }) => {
        if (item.id === 'empty-left' || item.id === 'empty-right')
            return (<View style={{ width: SIZE_ITEM_EMPTY }} />)
        const backgroundColor = item.id === selectResource ? colors.Blue : colors.White;
        const color = item.id === selectResource ? colors.White : colors.DarkBlue;
        const FirstScroll = (index - 2) * SIZE_ITEM_WIDTH;
        const SecondScroll = (index - 1) * SIZE_ITEM_WIDTH;
        const ThirtScroll = index * SIZE_ITEM_WIDTH;
        const inputRange = [FirstScroll, SecondScroll, ThirtScroll];
        const outputOpacity = [0.5, 1, 0.5];//Salida >> Opacidad de tarjeta.
        const outputScale = [0.5, 1, 0.5];//Salida >> Escala de tarjeta.
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
            <MyButtonsResources
                item={item}
                opacity={{ opacity }}
                scale={{ scale }}
                backgroundColor={{ backgroundColor }}
                color={{ color }}
                onPress={() => {
                    setSelectResource(item.id);
                    refListButtons.current.scrollToIndex({ index: parseInt(item.id - 1) });
                    getData({ type: item.id, language: language });
                }} />
        );
    };
    //------------------------------Componente >> MyListItem-----------------------------------
    //Descripcion : Renderiza las tarjetas de presentacion de recursos.
    const MyListItem = ({ item, index, scrollY }) => {
        const FirstScroll = index * SIZE_ITEM_HEIGHT;
        const SecondScroll_Scale = (index + 2) * SIZE_ITEM_HEIGHT;
        const SecondScroll_Opacity = (index + 0.5) * SIZE_ITEM_HEIGHT;
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
            <MyCardResources
                data={item}
                opacity={{ opacity }}
                scale={{ scale }}
                onPress={() => {
                    setSelectItem(item);
                    Opacity_Show.start();
                }} />
        );

    }
    //------------------------------Componente >> Loading Data---------------------------------
    //Descripcion : Renderiza un componnete de carga de datos.
    const Loading = () => {
        return (
            <View style={[ResourcesStyles.ctnLoading]}>
                <ActivityIndicator size="small" color={colors.Blue} />
                <Text style={[ResourcesStyles.loadingText]}> Loading...</Text>
            </View>
        );
    }
    //------------------------------Componente >> Loading Data---------------------------------
    //Descripcion : Renderiza un componnete de carga de datos.
    const NoData = () => {
        return (
            <View style={[ResourcesStyles.ctnLoading]}>
                <Text style={[ResourcesStyles.loadingText]}> Sin recursos disponibles</Text>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects------------------------------------
    //-----------------------------------------------------------------------------------------
    //-----------------------------Instancia >> Obtencion de datos-----------------------------
    //Descripcion : Realiza la llamada para la obtencion de recursos.
    useEffect(() => {
        setLanguage(user.data.language);
        setSelectResource('1');
        if (user.data.language)
            getData({ type: '1', language: language });
    }, [user.data.language]);
    //-----------------------------Instancia >> Scroll de lista--------------------------------
    //Descripcion : Realiza el scroll al primer item de la lista de recursos.
    useEffect(() => {
        let index = 1;
        let verify = resources.length !== 0;
        if (render && verify)
            refListItems.current.scrollToIndex({ index });
    }, [render])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:recursos')}
                navigation={navigation} />
            {/*-------------------------CardButtonsResource---------------------------------*/}
            <View style={[ResourcesStyles.ctnButtonsResources]}>
                <Animated.FlatList
                    ref={refListButtons}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={(data, index) => (
                        { length: SIZE_ITEM_WIDTH, offset: SIZE_ITEM_WIDTH * index, index }
                    )}
                    horizontal
                    contentContainerStyle={[ResourcesStyles.scrollButtonsResources]}
                    data={BUTTTONS_RESOURCES}
                    renderItem={({ item, index }) =>
                        <MyListButtonItem
                            item={item}
                            index={index}
                            scrollX={scrollX} />
                    }
                    keyExtractor={(item) => item.id}
                    extraData={selectResource}
                    onScroll={
                        Animated.event([{
                            nativeEvent: { contentOffset: { x: scrollX } }
                        }], { useNativeDriver: true })
                    }
                    scrollEventThrottle={16}
                    snapToInterval={SIZE_ITEM_WIDTH}
                    snapToAlignment='center'
                    disableIntervalMomentum={true} />
            </View>
            <View style={[ResourcesStyles.viewIndicator]}>
                <MyIndicator
                    container={[ResourcesStyles.ctnIndicator]}
                    data={BUTTTONS_RESOURCES.slice(1, BUTTTONS_RESOURCES.length - 1)}
                    scrollX={scrollX}
                    sizeItem={SIZE_ITEM_WIDTH}
                    color={colors.Black + '0F'}
                    colorActive={colors.Blue} />
            </View>
            <View style={[ResourcesStyles.ctnCardResources]}>
                {!render && <Loading />}
                {(render && resources.length !== 0) &&
                    <Animated.FlatList
                        ref={refListItems}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={[ResourcesStyles.scrollResources]}
                        getItemLayout={(data, index) => (
                            { length: SIZE_ITEM_HEIGHT, offset: SIZE_ITEM_HEIGHT * index, index }
                        )}
                        data={resources}
                        renderItem={({ item, index }) =>
                            <MyListItem
                                item={item}
                                index={index}
                                scrollY={scrollY} />
                        }
                        keyExtractor={(item) => item.id}
                        onScroll={
                            Animated.event([{
                                nativeEvent: { contentOffset: { y: scrollY } }
                            }], { useNativeDriver: true })
                        }
                        scrollEventThrottle={16}
                        snapToInterval={SIZE_ITEM_HEIGHT}
                        snapToAlignment='center'
                        disableIntervalMomentum={true} />
                }
                {(render && resources.length === 0) && <NoData />}
            </View>
            <MyViewResources
                title={selectItem['title'] !== undefined ? selectItem['title'] : 'Titulo Archivo'}
                file={selectItem['file'] !== undefined ? selectItem['file'] : null}
                opacity={opacityView}
                scale={scaleView}
                onPress={() => Opacity_Hide.start()}
                onPressFile={() => {
                    Opacity_Hide.start();
                    setTimeout(() => OpenUrl({ url: selectItem['file'] }), TIME_ANIMATION);
                }} />
        </Wallpaper>
    );
};
export default ResourcesScreen;

