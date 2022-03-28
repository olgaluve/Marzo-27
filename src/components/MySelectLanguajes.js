//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: Selector de Lenguaje----------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { useState, Fragment, useEffect } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Dimensions, } from 'react-native';
import { Modal, FlatList } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
//----------------------------------------Componentes------------------------------------------
import MySpace from '../components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '../styles/colors';
import { letter } from '../styles/letter';
//---------------------------------------------Data--------------------------------------------
import { keyAsync } from '../data/data';
//------------------------------------ Constantes Globales-------------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla.
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MySelectLanguajes({ styleSelect }) {
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Objeto de traduccion--------------------------
    //-----------------------------------------------------------------------------------------
    const { t, i18n } = useTranslation();
    //-----------------------------------------------------------------------------------------
    //----------------------------Declaracion >> Constantes Globales---------------------------
    //-----------------------------------------------------------------------------------------
    const borderColorItem = colors.Blue;
    const LANGUAJES = [
        { id: 'en', label: t('language:ingles') },
        { id: 'es', label: t('language:espanol') },
        { id: 'pt', label: t('language:portugues') },
    ];
    const labelLanguaje = i18n.language === 'pt' ? t('language:portugues')
        : (i18n.language === 'en' ? t('language:ingles')
            : t('language:espanol'));
    //-----------------------------------------------------------------------------------------
    //-------------------------Declaracion >> Estados de Componente----------------------------
    //-----------------------------------------------------------------------------------------
    const [show, setShow] = useState(false);//Estado >> Show de modal de lista.
    const [valueLanguaje, setValueLanguaje] = useState('');//Estado >> Valor de lenguaje.
    const [languajeName, setLanguajeName] = useState(labelLanguaje);//Estado >> Nombre de lenguaje.
    //-----------------------------------------------------------------------------------------
    //------------------------------Declaracion de componentes---------------------------------
    //-----------------------------------------------------------------------------------------
    //----------------------------Componente >> Titulo de lista--------------------------------
    const Title = ({ title, backgroundColor, color }) => {
        return (
            <View style={[styles.ctnTitlePicker, { backgroundColor }]}>
                <Text style={[styles.titlePicker, { color }]}>{title}</Text>
            </View>
        );
    }
    //----------------------------Componente >> Lista de seleccion-----------------------------
    //Descripcion : Renderiza una Lista con los datos de seleccion proporcionados.
    const List = ({ data, sizeList }) => {
        const size = sizeList ? sizeList : 0.5;
        return (
            <View style={[styles.ctnList, { flex: size }]}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={ItemList} />
            </View>
        );
    }
    //----------------------------Componente >> Item de seleccion------------------------------
    //Descripcion : Renderiza los items de la lista de seleccion.
    const ItemList = ({ item }) => {
        const backgroundColor = item.hasOwnProperty('backgroundColor') ? item.backgroundColor : 'transparent';
        const color = item.hasOwnProperty('color') ? item.color : colors.Black;
        return (
            <TouchableHighlight
                underlayColor={borderColorItem}
                style={[styles.buttonItem, { backgroundColor, borderColor: borderColorItem }]}
                onPress={() => { setValueLanguaje(item.id) }}>
                <Text style={[styles.textItem, { color }]}> {item.label} </Text>
            </TouchableHighlight>
        );
    }
    //----------------------------Componente >> Button Cancel----------------------------------
    //Descripcion : Renderiza el boton de cierre de lista.
    const ButtonClose = ({ backgroundColor, color }) => {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styles.buttonClose, { backgroundColor }]}
                onPress={() => setShow(false)}>
                <Text style={[styles.textButtonClose, { color }]}>Cerrar</Text>
            </TouchableHighlight>
        );
    }
    //-----------------------------------------------------------------------------------------
    //---------------------------------Declaracion de Effects----------------------------------
    //-----------------------------------------------------------------------------------------
    useEffect(() => {
        if (valueLanguaje)
            AsyncStorage.setItem(keyAsync.languaje, valueLanguaje)
                .then(() => {
                    console.log('Set Config Languaje : ', valueLanguaje)
                    i18n.changeLanguage(valueLanguaje);
                    setShow(false);
                })
                .catch(error => console.log('Error Config >> Set Languaje', error));
    }, [valueLanguaje]);
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Fragment>
            {/*-------------------------Boton >> Señector de lenguaje ----------------------*/}
            <TouchableHighlight
                underlayColor={'transparent'}
                style={[styleSelect]}
                onPress={() => { setShow(true) }}>
                <Text style={[styles.textSelector]}>{languajeName}</Text>
            </TouchableHighlight>
            {/*-------------------------Vista >> Seleccion----------------------------------*/}
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}>
                <View style={[styles.viewList]}>
                    <Title
                        title={'Lista de Lenguajes'}
                        backgroundColor={colors.Blue}
                        color={colors.White} />
                    <List
                        data={LANGUAJES}
                        sizeList={0.3} />
                    <MySpace ctnSpace={{ flex: 0.05, width: '80%' }} />
                    <ButtonClose
                        backgroundColor={colors.Blue}
                        color={colors.White} />
                    <MySpace ctnSpace={{ flex: 0.05, width: '80%' }} />
                </View>
            </Modal>
        </Fragment>
    );
};
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de contenedor de selector
    ctnSelector: {
        width: width * 0.8,
        height: height * 0.06,
        position: 'absolute',
        //right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.Green,
        borderRadius: 10,
        zIndex: 20
    },
    //Estilo de texto de boton de selector
    textSelector: {
        fontSize: width * 0.04,
        color: colors.Blue,
        textAlign: 'center'
    },
    //Estilo de contenedor de vista de lista
    viewList: {
        height,
        width,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: colors.Black + 'AF'
    },
    //Estilo de contenedor de titulo de lista
    ctnTitlePicker: {
        width: '80%',
        flex: 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: colors.Blue
    },
    //Estio de texto de titulo de lista
    titlePicker: {
        fontFamily: letter.Title,
        textAlign: 'center',
        fontSize: width * 0.05,
        color: colors.White
    },
    //Estilo de contenedor de lista
    ctnList: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: colors.White
    },
    //Estilo de boton de item
    buttonItem: {
        width: width * 0.7,
        height: height * 0.08,
        marginBottom: '2%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderColor: colors.Blue
    },
    //Estilo de texto de item
    textItem: {
        fontFamily: letter.Text_2,
        textAlign: 'left',
        fontSize: width * 0.045,
        marginLeft: 10
    },
    //Estilo de boton de Cancel
    buttonClose: {
        width: '80%',
        flex: 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.Blue,
    },
    //Estilo de texto de boton de Cancel
    textButtonClose: {
        fontFamily: letter.Title,
        textAlign: 'center',
        fontSize: width * 0.05,
        color: colors.White
    },
});