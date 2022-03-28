//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Cursos----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Animated, Text, View, ScrollView, Dimensions, FlatList, Image } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
import { FlingGestureHandler, Directions, State, LongPressGestureHandler } from 'react-native-gesture-handler';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardNewCourse from '../components/MyCardNewCourse';
import MyCardFooter from '../components/MyCardFooter';
import MyViewCourses from '../components/MyViewCourses';
//------------------------------------------Redux----------------------------------------------
import { AddViewCourse } from '../redux/actions/actions';
import { connect } from 'react-redux';
//-------------------------------------------Estilos-------------------------------------------
import { CoursesStyles } from '../styles/styles';
import { letter } from '../styles/letter';
//---------------------------------------Recursos Graficos-------------------------------------
//-----------------------------------Logos >> Cursos Croplife----------------------------------
import LogoGestionRiesgo from '../assets/LogoGestionRiesgo.png';
import LogoPolinizadores from '../assets/LogoPolinizadores.png';
import LogoCamasBiologicas from '../assets/LogoCamasBiologicas.png';
import LogoCicloVida from '../assets/LogoCicloVida.png';
import LogoFAO from '../assets/LogoFAO.png';
import LogoBiotecnologia from '../assets/LogoBiotecnologia.png';
import LogoMOA from '../assets/LogoMOA.png';
//-----------------------------------Logos >> Footer-------------------------------------------
import LogoFooterCertificado from '../assets/LogoFooterCertificado.png';
import LogoFooterRitmo from '../assets/LogoFooterRitmo.png';
import LogoFooterRecursos from '../assets/LogoFooterRecursos.png';
import LogoFooterEtica from '../assets/LogoFooterEtica.png';
import LogoFooterProfesores from '../assets/LogoFooterProfesores.png';
//------------------------------------Constantes Globales--------------------------------------
const URL_CURSOS = 'https://cursos.croplifela.org/';
const { width, height } = Dimensions.get('window');
const OVERFLOW_HEIGHT = height * 0.15;
const SPACING = width * 0.025;
const ITEM_WIDTH = width * 0.7;
const ITEM_HEIGHT = height * 0.6;
const VISIBLE_ITEMS = 3;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const CoursesScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //----------------------------Declaracion  >> Constantes locales---------------------------
    const COURSES = [
        {
            //Parametros >> Boton Curso
            id: '1',
            label: t('gestionRiesgo:name'),
            logo: LogoGestionRiesgo,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/GESTION_RIESGO.jpg',
            modules: '3',
            language: t('language:espanol') + ' / ' + t('language:ingles') + ' / ' + t('language:portugues'),
            //Parametros >> Tarjeta Presentacion
            title: t('gestionRiesgo:title'),
            titleDefault: 'Gestión del Riesgo',//Label Analitics
            body: t('gestionRiesgo:body'),
            points: t('gestionRiesgo:points'),
            modulo: true,
            modulos: [
                { id: '1', label: t('gestionRiesgo:modulo_0') },
                { id: '2', label: t('gestionRiesgo:modulo_1') },
                { id: '3', label: t('gestionRiesgo:modulo_2') }
            ],
            url: {
                'en': URL_CURSOS + 'en/my-courses?view=cursoiniciar&layout=intro&curso=16&ptusrid=',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=14&ptusrid=',
                'pt': URL_CURSOS + 'pt/meu-curso?view=cursoiniciar&layout=intro&curso=15&ptusrid=',
            },
            idCourse: {
                'en': '16',
                'es': '14',
                'pt': '15',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '2',
            label: t('polinizadores:name'),
            logo: LogoPolinizadores,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/POLINIZADORES.jpg',
            modules: '3',
            language: t('language:espanol') + ' / ' + t('language:ingles') + ' / ' + t('language:portugues'),
            //Parametros >> Tarjeta Presentacion
            title: t('polinizadores:title'),
            titleDefault: 'Polinizadores',//Label Analitics
            body: t('polinizadores:body'),
            points: t('polinizadores:points'),
            modulo: true,
            modulos: [
                { id: '1', label: t('polinizadores:modulo_0') },
                { id: '2', label: t('polinizadores:modulo_1') },
                { id: '3', label: t('polinizadores:modulo_2') }
            ],
            url: {
                'en': URL_CURSOS + 'en/my-courses?view=cursoiniciar&layout=intro&curso=11&ptusrid=',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=8&ptusrid=',
                'pt': URL_CURSOS + 'pt/meu-curso?view=cursoiniciar&layout=intro&curso=10&ptusrid=',
            },
            idCourse: {
                'en': '11',
                'es': '8',
                'pt': '10',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '3',
            label: t('camasBiologicas:name'),
            logo: LogoCamasBiologicas,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/CAMAS_BIOLOGICAS.jpg',
            modules: '6',
            language: t('language:espanol') + ' / ' + t('language:ingles') + ' / ' + t('language:portugues'),
            //Parametros >> Tarjeta Presentacion
            title: t('camasBiologicas:title'),
            titleDefault: 'Camas Biologicas',//Label Analitics
            body: t('camasBiologicas:body'),
            points: t('camasBiologicas:points'),
            modulo: false,
            modulos: [
                { id: '1', label: t('camasBiologicas:capitulo_0') },
                { id: '2', label: t('camasBiologicas:capitulo_1') },
                { id: '3', label: t('camasBiologicas:capitulo_2') },
                { id: '4', label: t('camasBiologicas:capitulo_3') },
                { id: '5', label: t('camasBiologicas:capitulo_4') },
                { id: '6', label: t('camasBiologicas:capitulo_5') }
            ],
            url: {
                'en': URL_CURSOS + 'en/my-courses?view=cursoiniciar&layout=intro&curso=13&ptusrid=',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=4&ptusrid=',
                'pt': URL_CURSOS + 'pt/meu-curso?view=cursoiniciar&layout=intro&curso=5&ptusrid=',
            },
            idCourse: {
                'en': '13',
                'es': '4',
                'pt': '5',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '4',
            label: t('cicloVida:name'),
            logo: LogoCicloVida,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/CICLO_VIDA.jpg',
            modules: '8',
            language: t('language:espanol') + ' / ' + t('language:ingles') + ' / ' + t('language:portugues'),
            //Parametros >> Tarjeta Presentacion
            title: t('cicloVida:title'),
            titleDefault: 'Ciclo de Vida',//Label Analitics
            body: t('cicloVida:body'),
            points: t('cicloVida:points'),
            modulo: false,
            modulos: [
                { id: '1', label: t('cicloVida:capitulo_0') },
                { id: '2', label: t('cicloVida:capitulo_1') },
                { id: '3', label: t('cicloVida:capitulo_2') },
                { id: '4', label: t('cicloVida:capitulo_3') },
                { id: '5', label: t('cicloVida:capitulo_4') },
                { id: '6', label: t('cicloVida:capitulo_5') },
                { id: '7', label: t('cicloVida:capitulo_6') },
                { id: '8', label: t('cicloVida:capitulo_7') }
            ],
            url: {
                'en': URL_CURSOS + 'en/my-courses?view=cursoiniciar&layout=intro&curso=12&ptusrid=',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=2&ptusrid=',
                'pt': URL_CURSOS + 'pt/meu-curso?view=cursoiniciar&layout=intro&curso=6&ptusrid=',
            },
            idCourse: {
                'en': '12',
                'es': '2',
                'pt': '6',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '5',
            label: t('codigoFAO:name'),
            logo: LogoFAO,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/FAO.jpg',
            modules: '4',
            language: t('language:espanol') + ' / ' + t('language:portugues'),
            //Parametros >> Tarjeta Presentacion
            title: t('codigoFAO:title'),
            titleDefault: 'Código Fao',//Label Analitics
            body: t('codigoFAO:body'),
            points: t('codigoFAO:points'),
            modulo: true,
            modulos: [
                { id: '1', label: t('codigoFAO:modulo_0') },
                { id: '2', label: t('codigoFAO:modulo_1') },
                { id: '3', label: t('codigoFAO:modulo_2') },
                { id: '4', label: t('codigoFAO:modulo_3') }
            ],
            url: {
                'en': '',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=1&ptusrid=',
                'pt': URL_CURSOS + 'pt/meu-curso?view=cursoiniciar&layout=intro&curso=7&ptusrid=',
            },
            idCourse: {
                'en': '',
                'es': '1',
                'pt': '7',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '6',
            label: t('biotecnologia:name'),
            logo: LogoBiotecnologia,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/BIOTECNOLOGIA.jpg',
            modules: '4',
            language: t('language:espanol'),
            //Parametros >> Tarjeta Presentacion
            title: t('biotecnologia:title'),
            titleDefault: 'Biotecnología',//Label Analitics
            body: t('biotecnologia:body'),
            points: t('biotecnologia:points'),
            modulo: true,
            modulos: [
                { id: '1', label: t('biotecnologia:modulo_0') },
                { id: '2', label: t('biotecnologia:modulo_1') },
                { id: '3', label: t('biotecnologia:modulo_2') },
                { id: '4', label: t('biotecnologia:modulo_3') }
            ],
            url: {
                'en': '',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=9&ptusrid=',
                'pt': '',
            },
            idCourse: {
                'en': '',
                'es': '9',
                'pt': '',
            }
        },
        {
            //Parametros >> Boton Curso
            id: '7',
            label: t('moa:name'),
            logo: LogoMOA,
            urlLogo: 'https://app.cursos.croplifela.org/assets/slideCursosApp/MOA.jpg',
            modules: '3',
            language: t('language:espanol'),
            //Parametros >> Tarjeta Presentacion
            title: t('moa:title'),
            titleDefault: 'MoA',//Label Analitics
            body: t('moa:body'),
            points: t('moa:points'),
            modulo: true,
            modulos: [
                { id: '1', label: t('moa:modulo_0') },
                { id: '2', label: t('moa:modulo_1') },
                { id: '3', label: t('moa:modulo_2') }
            ],
            url: {
                'en': '',
                'es': URL_CURSOS + 'es/mis-cursos?view=cursoiniciar&layout=intro&curso=17&ptusrid=',
                'pt': '',
            },
            idCourse: {
                'en': '',
                'es': '17',
                'pt': '',
            }
        }
    ];//Tabla >> Cursos Croplife
    const FOOTER = [
        {
            id: '1',
            label: t('footer:title_0'),
            descripcion: t('footer:body_0'),
            logo: LogoFooterCertificado

        },
        {
            id: '2',
            label: t('footer:title_1'),
            descripcion: t('footer:body_1'),
            logo: LogoFooterRitmo
        },
        {
            id: '3',
            label: t('footer:title_2'),
            descripcion: t('footer:body_2'),
            logo: LogoFooterRecursos
        },
        {
            id: '4',
            label: t('footer:title_3'),
            descripcion: t('footer:body_3'),
            logo: LogoFooterEtica
        },
        {
            id: '5',
            label: t('footer:title_4'),
            descripcion: t('footer:body_4'),
            logo: LogoFooterProfesores
        },
    ];//Tabla >> Footer
    //-------------------------------------------------------------------------------------------
    //-----------------------Declaracion de variables de animacion-------------------------------
    //-------------------------------------------------------------------------------------------
    const opacity = useRef(new Animated.Value(0));//Estado inicial : Opacidad de Vista
    const scrollXIndex = useRef(new Animated.Value(0)).current;//Index Actual
    const scrollXAnimated = useRef(new Animated.Value(0)).current;//Valor de animacion de scroll
    //--------------------------------Referencia >> Animacion------------------------------------
    //---------------------Animacion >> Desplazamiento en Y de cuadrado--------------------------
    const Opacity_Show = useRef(
        Animated.timing(opacity.current, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        })).current;
    const Opacity_Hide = useRef(
        Animated.timing(opacity.current, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        })).current;
    //-------------------------------Constantes de interpolacion---------------------------------
    const scale = opacity.current.interpolate({
        inputRange: [0, 1],
        outputRange: [0.01, 1],
        extrapolate: 'clamp'
    });
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Estados--------------------------------------
    //-------------------------------------------------------------------------------------------
    const [index, setIndex] = useState(0);//Index actual
    const [showModal, setShowModal] = useState(false);//Mostrar Modal
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Callbacks------------------------------------
    //-------------------------------------------------------------------------------------------
    const setActiveIndex = useCallback((activeIndex) => {
        scrollXIndex.setValue(activeIndex);
        setIndex(activeIndex);
    });//Cambio de inedex
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //-------------------------------Componente >> DetailsCourse---------------------------------
    //Descripcion : Renderiza los detalles del curso, de acuerdo al indice actual de la lista.
    const DetailsCourse = ({ data, scrollXAnimated }) => {
        const inputRange = [-1, 0, 1];
        const translateY = scrollXAnimated.interpolate({
            inputRange,
            outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
        });
        return (
            <View style={[CoursesStyles.viewDetailsCourse]}>
                <Animated.View style={{ transform: [{ translateY }] }}>
                    {data.map((item, index) => {
                        let label = item.label;
                        let modulo = item.modulo;
                        let modules = item.modules;
                        let language = item.language;
                        let strModules = modulo ? t('courses:modulos') : t('courses:capitulos');
                        return (
                            <View
                                key={item.id + '_Details'}
                                style={[CoursesStyles.ctnDetailsCourse]}>
                                <Text style={[CoursesStyles.moduleTitle, { textAlign: 'center' }]}>
                                    CONTENIDO
                                </Text>
                                <Text style={[CoursesStyles.moduleText, { fontFamily: letter.Title }]}>{modules}{'  '}{strModules}</Text>
                                <Text style={[CoursesStyles.moduleText]}>{t('courses:languangeAvailable')}</Text>
                                <Text style={[CoursesStyles.moduleText]}>{language}</Text>
                            </View>
                        );
                    })}
                </Animated.View>
            </View>
        )
    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects--------------------------------------
    //-------------------------------------------------------------------------------------------
    //------------------------------Effect >> Init Animated Card---------------------------------
    useEffect(() => {
        Animated.spring(scrollXAnimated, {
            toValue: scrollXIndex,
            useNativeDriver: true,
        }).start();
    });
    //------------------------------Effect >> Show Modal---------------------------------------
    useEffect(() => {
        showModal ? Opacity_Show.start() : Opacity_Hide.start();
    }, [showModal])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:cursos')}
                navigation={navigation} />
            <View style={[CoursesStyles.ctnCourses]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[CoursesStyles.scrollCourse]}>
                    <LongPressGestureHandler
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) {
                                const { modules, language, ...rest } = COURSES[index];
                                setShowModal(true);
                                props.AddViewCourse(rest);
                            }
                        }}
                        minDurationMs={250}>
                        <FlingGestureHandler
                            key='left'
                            direction={Directions.LEFT}
                            onHandlerStateChange={(ev) => {
                                if (ev.nativeEvent.state === State.END) {
                                    if (index === COURSES.length - 1) {
                                        return;
                                    }
                                    setActiveIndex(index + 1);
                                }
                            }}>
                            <FlingGestureHandler
                                key='right'
                                direction={Directions.RIGHT}
                                onHandlerStateChange={(ev) => {
                                    if (ev.nativeEvent.state === State.END) {
                                        if (index === 0) {
                                            return;
                                        }
                                        setActiveIndex(index - 1);
                                    }
                                }}>
                                <FlatList
                                    data={COURSES}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    contentContainerStyle={{
                                        width: '100%',
                                        height: ITEM_HEIGHT * 1.05,
                                        justifyContent: 'center',
                                        padding: SPACING * 2,
                                    }}
                                    scrollEnabled={false}
                                    removeClippedSubviews={false}
                                    CellRendererComponent={
                                        ({ item, index, children, style, ...props }) => {
                                            const newStyle = [style, { zIndex: COURSES.length - index }];
                                            return (
                                                <View style={newStyle} index={index} {...props}>
                                                    {children}
                                                </View>
                                            );
                                        }}
                                    renderItem={({ item, index }) => {
                                        const inputRange = [index - 1, index, index + 1];
                                        const translateX = scrollXAnimated.interpolate({
                                            inputRange,
                                            outputRange: [50, 0, -100],
                                        });
                                        const scale = scrollXAnimated.interpolate({
                                            inputRange,
                                            outputRange: [0.8, 1, 1.3],
                                        });
                                        const opacity = scrollXAnimated.interpolate({
                                            inputRange,
                                            outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
                                        });
                                        return (
                                            <MyCardNewCourse
                                                data={item}
                                                opacity={{ opacity }}
                                                scale={{ scale }}
                                                translateX={{ translateX }} />
                                        );
                                    }}
                                />
                            </FlingGestureHandler>
                        </FlingGestureHandler>
                    </LongPressGestureHandler>
                    <DetailsCourse data={COURSES} scrollXAnimated={scrollXAnimated} />
                    <Text style={[CoursesStyles.footerTitle]}>
                        {t('courses:title_1')}
                    </Text>
                    {
                        FOOTER.map(data =>
                            <MyCardFooter
                                key={data.id}
                                data={data} />
                        )
                    }
                </ScrollView>
            </View>
            <MyViewCourses
                {...props}
                show={setShowModal}
                opacity={opacity.current}
                scale={scale} />
        </Wallpaper>
    );
};
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de Actions-----------------------------------
//---------------------------------------------------------------------------------------------
//Retorna el 'state' almacenado en el 'store' de redux.
//Nota >> En este caso se retorna un parte de este.
const mapDispatchToProps = dispatch => {
    return {
        AddViewCourse: (data) => dispatch(AddViewCourse(data)),
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(null, mapDispatchToProps)(CoursesScreen);

