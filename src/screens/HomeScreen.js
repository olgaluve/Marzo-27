//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Home------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { HomeStyles } from '../styles/styles';
//---------------------------------------Recursos Graficos-------------------------------------
import LogoCursos from '../assets/home-cursos.png';
import LogoVideos from '../assets/home-videos.png';
import LogoRecursos from '../assets/home-recursos.png';
import LogoTest from '../assets/home-tests.png';
import LogoEventos from '../assets/home-conferencias.png';
import LogoPerfil from '../assets/menu-perfil.png';
import LogoPodcast from '../assets/menu-podcast_new.png';


import { onReview } from '../functions/functions';
let m = 0;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const HomeScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //----------------------------Declaracion  >> Constantes locales---------------------------
    const HOME_BUTTONS = [
        { id: '1', label: t('buttonsMenu:cursos'), logo: LogoCursos, ruoteName: 'Courses' },
        { id: '2', label: t('buttonsMenu:videos'), logo: LogoVideos, ruoteName: 'Videos' },
        { id: '3', label: t('buttonsMenu:recursos'), logo: LogoRecursos, ruoteName: 'Resources' },
        { id: '4', label: t('buttonsMenu:test'), logo: LogoTest, ruoteName: 'Test' },
        { id: '5', label: t('buttonsMenu:eventos'), logo: LogoEventos, ruoteName: 'Events' },
        //{ id: '6', label: t('buttonsMenu:perfil'), logo: LogoPerfil, ruoteName: 'Profile' },
        { id: '6', label: t('buttonsMenu:podcast'), logo: LogoPodcast, ruoteName: 'Podcast' },
    ];
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------------Componente >> ButtonsRoutes------------------------------
    //Descripcion : Permite visualizar los botones de ruta de home.
    const ButtonsRoutes = ({ data }) => {
        return (
            <View style={[HomeStyles.ctnBtnHome]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={MyCardButton} />
            </View>
        );
    }
    //----------------------------------Componente >> ItemButton---------------------------------
    //Descripcion : Permite renderizar el componente de boton de ruta.
    const MyCardButton = ({ item }) => {
        return (
            <TouchableOpacity
                style={[HomeStyles.ctnButtons]}
                onPress={() => navigation.navigate(`${item.ruoteName}`)}>
                {/*<Icon
                    name={item.icon}
                    size={moderateScale(40)}
                color={colors.Blue} />*/}
                <Image
                    style={[HomeStyles.btnImagen]}
                    source={item.logo}
                    resizeMode={'contain'} />
                <Text style={[HomeStyles.textButtons]}>{item.label}</Text>
            </TouchableOpacity>
        );
    }
    const LANGUAGES_USER = ['en', 'es', 'pt'];
    const ChangeLanguage = () => {
        i18n.changeLanguage(LANGUAGES_USER[m]);
        m++;
        m = m > 2 ? 0 : m;
    }
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('buttonsMenu:title')}
                navigation={navigation}
            //type={true}
            //icon={'apple'}
            //Onpress={() => onReview()} 
            />
            <MySpace ctnSpace={{ flex: 0.1, width: '100%' }} />
            <ButtonsRoutes data={HOME_BUTTONS} />
        </Wallpaper>
    );
};
export default HomeScreen;

