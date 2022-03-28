//---------------------------------------------------------------------------------------------
//-----------------------------------Pantalla >> WebView---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
//-------------------------Componentes y dependencias React-Native-----------------------------
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
//-----------------------------------Librerias Adicionales-------------------------------------
import { WebView } from 'react-native-webview';
import { onReview } from '../functions/functions';
//----------------------------------------Componentes------------------------------------------
import Wallpaper from '../components/Wallpaper';
import MyDrawMenuButton from '../components/MyDrawMenuButton';
//------------------------------------------Redux----------------------------------------------
import { connect } from 'react-redux';
//-------------------------------------------Estilos-------------------------------------------
import { WebViewStyles } from '../styles/styles';
import { colors } from '../styles/colors';
//---------------------------------------------------------------------------------------------
//--------------------------------------Instancia >> App---------------------------------------
//---------------------------------------------------------------------------------------------
const WebViewScreen = props => {
    const { navigation } = props;
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Estados--------------------------------------
    //-------------------------------------------------------------------------------------------
    const [render, setRender] = useState(false);//Estado >> Render
    const [title, setTitle] = useState('');//Estado >> Titulo.
    const [url, setUrl] = useState('');//Estado >> url.
    const [route, setRoute] = useState('');//Estado >> routa de Go Back;
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Funciones------------------------------------
    //-------------------------------------------------------------------------------------------
    const cleanWebView = ({ route: route }) => {
        navigation.navigate(route);
    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Componentes----------------------------------
    //-------------------------------------------------------------------------------------------
    //----------------------------------Componente >> ButtonsRoutes------------------------------
    //Descripcion : Permite visualizar los botones de ruta de home.
    const LoadingPage = () => {
        return (<ActivityIndicator color={colors.Blue} size="small" style={[WebViewStyles.ctnWebView]} />);
    }
    //-------------------------------------------------------------------------------------------
    //-------------------------------Declaracion >> Effects--------------------------------------
    //-------------------------------------------------------------------------------------------
    //--------------------------Effects >> Obtencion de parametros-------------------------------
    useLayoutEffect(() => {
        let urlWebView = props.urlWebView.data;
        if (urlWebView) {
            setTitle(urlWebView.title);
            setUrl(urlWebView.url);
            setRoute(urlWebView.route);
        }
    }, [props.urlWebView.data]);
    //-----------------------------------------------------------------------------------------
    //--------------------------------Diseño de cuerpo de App----------------------------------
    //-----------------------------------------------------------------------------------------
    return (
        <Wallpaper>
            <MyDrawMenuButton
                title={title}
                navigation={navigation}
                route={route} />
            <WebView
                style={[WebViewStyles.ctnWebView]}
                source={{ uri: url }}
                renderLoading={LoadingPage}
                cacheEnabled={false}
                startInLoadingState={true}
                scalesPageToFit={false}
                onNavigationStateChange={(navState) => {
                    //console.group('Objeto de Navegacion');
                    //console.log(navState);
                    //console.groupEnd();
                }}
                onMessage={(event) => {
                    switch (event.nativeEvent.data) {
                        case "endGame":
                            cleanWebView({ route: route });
                            break;
                        case "reviewApp":
                            //Alert.alert('Review App');
                            onReview();
                            break;
                        default:
                            console.group('Evento de WebView');
                            console.log(event.nativeEvent.data);
                            console.groupEnd();
                            break;
                    }
                }}
            />
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
export default connect(mapStateToProps)(WebViewScreen);

