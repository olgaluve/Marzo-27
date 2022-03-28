//-----------------------------------------------------------------------------------------------
//-------------------------Pantalla de Ayuda (Preguntas Frecuentes)------------------------------
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes---------------------------------
//-----------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-------------------------------
import React from 'react';
import { View, Dimensions, FlatList, Text } from 'react-native';
//------------------------------------Librerias Adicionales--------------------------------------
import { useTranslation } from 'react-i18next';
//----------------------------------------Componentes--------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyQuestion from '../components/MyQuestion';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
//------------------------------------------Estilos----------------------------------------------
import { HelpStyles } from '../styles/styles';
//--------------------------------------Constantes Globales--------------------------------------
const { width, height } = Dimensions.get('window');
export default function HelpScreen(props) {
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion----------------------------
    //-------------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();//Objeto de traduccion
    //-------------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes Locales------------------------------
    //-------------------------------------------------------------------------------------------
    const dataQuestion = [
        {
            id: '0',
            title: t('FrequentQuestions:questionTitle_0'),
            body: t('FrequentQuestions:questionBody_0')
        },
        {
            id: '1',
            title: t('FrequentQuestions:questionTitle_1'),
            body: t('FrequentQuestions:questionBody_1')
        },
        {
            id: '2',
            title: t('FrequentQuestions:questionTitle_2'),
            body: t('FrequentQuestions:questionBody_2')
        },
        {
            id: '3',
            title: t('FrequentQuestions:questionTitle_3'),
            body: t('FrequentQuestions:questionBody_3')
        },
        {
            id: '4',
            title: t('FrequentQuestions:questionTitle_4'),
            body: t('FrequentQuestions:questionBody_4')
        },
        {
            id: '5',
            title: t('FrequentQuestions:questionTitle_5'),
            body: t('FrequentQuestions:questionBody_5')
        },
        {
            id: '6',
            title: t('FrequentQuestions:questionTitle_6'),
            body: t('FrequentQuestions:questionBody_6')
        },
        {
            id: '7',
            title: t('FrequentQuestions:questionTitle_7'),
            body: t('FrequentQuestions:questionBody_7')
        },
        {
            id: '8',
            title: t('FrequentQuestions:questionTitle_8'),
            body: t('FrequentQuestions:questionBody_8')
        },
        {
            id: '9',
            title: t('FrequentQuestions:questionTitle_9'),
            body: t('FrequentQuestions:questionBody_9')
        },
        {
            id: '10',
            title: t('FrequentQuestions:questionTitle_10'),
            body: t('FrequentQuestions:questionBody_10')
        },
        {
            id: '11',
            title: t('FrequentQuestions:questionTitle_11'),
            body: t('FrequentQuestions:questionBody_11')
        },
        {
            id: '12',
            title: t('FrequentQuestions:questionTitle_12'),
            body: t('FrequentQuestions:questionBody_12')
        },
    ]
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion de Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------------Componente >> Introduction-------------------------------
    //Descripcion : Permite visualizar la introduccion a preguntas frecuentes.
    const Introduction = ({ label = '' }) => {
        return (
            <View style={[HelpStyles.ctnBody]}>
                <Text style={[HelpStyles.textBody]}>{label}</Text>
                <Text style={[HelpStyles.textLink]}>comunicaciones@croplifela.org</Text>
            </View>
        );
    }
    //----------------------------------Componente >> QuestionData-------------------------------
    //Descripcion : Permite visualizar la lista de preguntas frecuentes al usuario.
    const QuestionData = (props) => {
        return (
            <View style={[HelpStyles.ctnQuestion]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    //contentContainerStyle={[HelpStyles.ctnQuestion]}
                    data={props.data}
                    renderItem={({ item }) =>
                        <MyQuestion
                            id={item.id}
                            title={item.title}
                            body={item.body} />}
                    keyExtractor={item => item.id}
                />
            </View>
        );
    }
    //-------------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App------------------------------------
    //-------------------------------------------------------------------------------------------
    return (
        <Wallpaper styleWallpaper={[{ justifyContent: 'flex-start' }]}>
            <MyDrawMenuButton
                title={t('FrequentQuestions:title')}
                navigation={props.navigation} />
            <Introduction label={t('FrequentQuestions:body')} />
            <QuestionData data={dataQuestion} />
        </Wallpaper>
    );
}
