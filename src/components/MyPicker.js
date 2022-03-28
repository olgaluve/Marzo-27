//---------------------------------------------------------------------------------------------
//----------------------------Archivo de componente: MyPicker----------------------------------
//---------------------------------------------------------------------------------------------
//Nota : Este componente recibe las siguientes propiedades de configuracion :
//      styleCtnPicker  >> Estilo de contenedor de picker.
//      pickerCheck     >> Check de lista de seleccion.
//------------------------------------Configuracion >> Icono-----------------------------------
//      iconName        >> Nombre de icono.
//      iconSize        >> Tamaño de icono.
//      color           >> Color de icono.
//----------------------------Configuracion >> Parametros de Picker----------------------------
//      data                >> Datos de lista seleccionable.
//      titlePicker         >> Titulo de lista.
//      placeHolderPicker   >> PlaceHolder de lista.
//      sizeList            >> Tamaño de lista.
//----------------------------Configuracion >> Estilo de seccion-------------------------------
//      bgSection           >> Color de fondo de seccion.
//      colorSection        >> Color de letra de seccion.
//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import React, { Fragment, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Animated, Dimensions } from 'react-native';
import { FlatList, Text, Modal } from 'react-native';
//------------------------------------Librerias Adicionales------------------------------------
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// Nota >> Para efectos de documentacion sobre alguna libreria o componente de esta remitase a
//         los siguientes enlaces:
//          Svg >> https://github.com/react-native-svg/react-native-svg#automatically
//----------------------------------------Componentes------------------------------------------
import MySpace from '@components/MySpace';
//-------------------------------------------Estilos-------------------------------------------
import { colors } from '@styles/colors';
import { letter } from '@styles/letter';
//--------------------------------------Constantes Globales------------------------------------
const { width, height } = Dimensions.get('window');//Dimensiones de pantalla
//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Componente-----------------------------------
//---------------------------------------------------------------------------------------------
export default function MyPicker(props) {
    const dataPicker = props.data;
    const borderColorItem = props.bgSection;
    const pickerBg = props.pickerCheck ? 'transparent' : colors.Red + 'AF';//Color de fondo de picker
    //-----------------------------------------------------------------------------------------
    //-------------------------Declaracion >> Estados de Componente----------------------------
    //-----------------------------------------------------------------------------------------
    const [show, setShow] = useState(false);//Estado >> Show de modal de lista.
    //const [pickerBg, setPickerBg] = useState(props.pickerCheck ? 'transparent' : colors.Red + 'AF');//Estado >> Color de fondo de componente.
    const [valuePicker, setValuePicker] = useState('');//Estado >> Valor seleccionado de lista.
    const [labelPicker, setLabelPicker] = useState(props.placeHolderPicker);//Estado >> Label de picker
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
                onPress={() => setValuePicker(item.id)}>
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
        if (valuePicker) {
            let valueSelect = dataPicker.filter(itemPicker => itemPicker.id === valuePicker);
            setLabelPicker(valueSelect[0].label);
            setShow(false);
            props.onChange(valuePicker);
        }
    }, [valuePicker]);
    //-----------------------------------------------------------------------------------------
    //----------------------------Diseño de cuerpo de Componente-------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Fragment>
            {/*-------------------------Botton >> Seleccion de lista------------------------*/}
            <View
                style={[props.styleCtnPicker]}>
                <View style={[styles.iconPicker, { backgroundColor: pickerBg }]}>
                    <Icon name={props.iconName} size={props.iconSize} color={props.color} />
                </View>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    style={[styles.ctnButtonPicker, { backgroundColor: pickerBg }]}
                    onPress={() => setShow(true)}>
                    <Text style={[styles.textButtonPicker, { color: props.color }]}>
                        {labelPicker}
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={'transparent'}
                    style={[styles.iconDrowpDown]}
                    onPress={() => setShow(true)}>
                    <Icon name={'menu-down'} size={props.iconSize + 10} color={props.color} />
                </TouchableHighlight>
            </View>
            {/*-------------------------Vista >> Seleccion----------------------------------*/}
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}>
                <View style={[styles.viewList]}>
                    <Title
                        title={props.titlePicker}
                        backgroundColor={props.bgSection}
                        color={props.colorSection} />
                    <List
                        data={dataPicker}
                        sizeList={props.sizeList} />
                    <MySpace ctnSpace={{ flex: 0.05, width: '80%' }} />
                    <ButtonClose
                        backgroundColor={props.bgSection}
                        color={props.colorSection} />
                    <MySpace ctnSpace={{ flex: 0.05, width: '80%' }} />
                </View>
            </Modal>
        </Fragment>
    );
}
//-----------------------------------------------------------------------------------
//-------------------------------Estilos de Componente-------------------------------
//-----------------------------------------------------------------------------------
const styles = StyleSheet.create({
    //Estilo de icono de picker
    iconPicker: {
        height: '100%',
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    //Estilo de contenedor de picker
    ctnButtonPicker: {
        height: '100%',
        flex: 0.8,
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
    },
    //Estilo de texto de boton de picker
    textButtonPicker: {
        textAlign: 'left',
        fontSize: 15,
    },
    //Estilo de contenedor de icono de lista
    iconDrowpDown: {
        height: '100%',
        width: '20%',
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
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
})
