//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> Test------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
import MyCardTest from '../components/MyCardTest';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
//-------------------------------------------Estilos-------------------------------------------
import { TestStyles } from '../styles/styles';
//---------------------------------------Recursos Graficos-------------------------------------
//-----------------------------------------Logos >> Test---------------------------------------
import LogoTrivia from '../assets/games-trivia.jpg';
import LogoIlustracion1 from '../assets/games-map.jpg';
import LogoIlustracion2 from '../assets/games-map.jpg';
import LogoAdivinaPalabra from '../assets/games-words.jpg';
import LogoCrucigrama from '../assets/games-cross.jpg';
let m = 0;
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia de App---------------------------------------
//---------------------------------------------------------------------------------------------
const TestScreen = props => {
    const { navigation } = props;
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //----------------------------Declaracion  >> Constantes locales---------------------------
    const TEST_COMPANY = [
        {
            id: '1',
            title: t('test:trivia'),
            label: t('test:test_0'),
            logo: LogoTrivia,
            url: {
                'en': 'http://app.cursos.croplifela.org/test/engTrivia',
                'es': 'http://app.cursos.croplifela.org/test/trivia',
                'pt': 'http://app.cursos.croplifela.org/test/ptTrivia',
            }
        },
        {
            id: '2',
            title: t('test:ilustracion_1'),
            label: t('test:test_1'),
            logo: LogoIlustracion1,
            url: {
                'en': 'http://app.cursos.croplifela.org/test/engInteractive_illustration',
                'es': 'http://app.cursos.croplifela.org/test/interactive_illustration',
                'pt': 'http://app.cursos.croplifela.org/test/ptInteractive_illustration',
            }
        },
        {
            id: '3',
            title: t('test:ilustracion_2'),
            label: t('test:test_2'),
            logo: LogoIlustracion2,
            url: {
                'en': 'http://app.cursos.croplifela.org/test/engInteractive_illustration2',
                'es': 'http://app.cursos.croplifela.org/test/interactive_illustration2',
                'pt': 'http://app.cursos.croplifela.org/test/ptInteractive_illustration2',
            }
        },
        {
            id: '4',
            title: t('test:descubrePalabra'),
            label: t('test:test_3'),
            logo: LogoAdivinaPalabra,
            url: {
                'en': 'http://app.cursos.croplifela.org/test/engDiscover_the_word',
                'es': 'http://app.cursos.croplifela.org/test/discover_the_word',
                'pt': 'http://app.cursos.croplifela.org/test/ptDiscover_the_word',
            }
        },
        {
            id: '5',
            title: t('test:crucigrama'),
            label: t('test:test_4'),
            logo: LogoCrucigrama,
            url: {
                'en': 'http://app.cursos.croplifela.org/test/engCrossword',
                'es': 'http://app.cursos.croplifela.org/test/crossword',
                'pt': 'http://app.cursos.croplifela.org/test/ptCrossword',
            }
        },
    ];//Tabla de botones de Main
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const [language, setLanguage] = useState('');
    const [idUser, setIdUser] = useState('');//Estado >> idUser
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------------Componente >> ButtonsRoutes------------------------------
    //Descripcion : Permite visualizar los botones de ruta de home.
    const TestCompany = (props) => {
        const { test, idUser } = props;//Extraccion >> Propiedad Test
        return (
            <View style={[TestStyles.ctnTest]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[TestStyles.scrollTest]}>
                    {test.map(data =>
                        <MyCardTest
                            {...props}
                            key={data.id}
                            data={data}
                            idUser={idUser}
                            navigation={navigation} />
                    )}
                </ScrollView>
            </View>
        );
    }
    //-----------------------------------------------------------------------------------------
    //----------------------------------Declaracion >> Efects----------------------------------
    //-----------------------------------------------------------------------------------------
    //---------------------------------Effect >> Cambio de url---------------------------------
    useLayoutEffect(() => {
        if (props.user.data)
            setIdUser(props.user.data.id);
    }, [])
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={t('test:title')}
                navigation={navigation} />
            <TestCompany
                {...props}
                test={TEST_COMPANY}
                idUser={idUser} />
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
        urlWebView: state.url,
    }
}
//---------------------------------------------------------------------------------------------
//--------------------------------------Conexion >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//connect(mapStateToProps,actions)(NameFunctionScreen);
//si solo se desea utilizar actions >> connect(null,actions)(NameFunctionScreen);
export default connect(mapStateToProps)(TestScreen);

