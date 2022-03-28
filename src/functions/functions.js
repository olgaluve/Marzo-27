//---------------------------------------------------------------------------------------------
//---------------------------------------Funciones de App--------------------------------------
//---------------------------------------------------------------------------------------------
//------------------------------------Librerias Adicionales------------------------------------
import { useAsyncStorage } from '@react-native-community/async-storage';
import InAppReview from 'react-native-in-app-review';
import messaging from '@react-native-firebase/messaging';
//-------------------------------------------Data----------------------------------------------
import { languajeSelect, keyAsync } from '../data/data';
const { getItem, setItem } = useAsyncStorage(keyAsync.review);
const NUM_MES = 5;
const TIME_LIMIT_ON_REVIEW = NUM_MES * 30;
//-----------------------------Funcion >> Tiempo de espera-------------------------------------
//Descripcion : Permite adicionar un tiempo de espera en la ejecucion de  una accion.
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
//--------------------------Funcion >> visualizacion de nombre---------------------------------
//Descripcion:  Permite la visualizacion de nombre de usuario en un formato mas agradable.
function strNewFormat({ str = "" }) {
    if (str !== '') {
        let newStr = str.toLowerCase();
        let array = newStr.split(" ");//Conversion a vector
        let StrArray = '';//String de nombre organizado
        console.log(str);
        console.log(array);
        array.forEach(function name(element, index, array) {
            if (index % 2 === 0) StrArray += element[0].toUpperCase() + element.substr(1, element.length - 1) + ' ';
            else StrArray += element[0].toUpperCase() + '. ';
        });
        return StrArray;
    }
    return "";
}
//-----------------------------Funcion >> Label de Propiedad-------------------------------
//Descripcion : Busca el label correspondiente en el objeto dado , a traves del id dado.
const labelProperty = ({ data = [], id }) => {
    let label = '';
    if (data.length > 0) {
        data.map(data => {
            if (data.id === id)
                label = data.label;
        });
    }
    return label;
}
//--------------------------------Funcion >> Busquedad de lenguaje-------------------------
//Descripcion : Devuelve el codigo de lenguage de acuerdo al codigo dado como parametro.
const FindLanguage = ({ idLanguage = 'es' }) => {
    let code = '3';
    languajeSelect.map(data => {
        if (data.id === idLanguage) code = data.code;
    })
    return code;
}
//---------------------------------------------------------------------------------------------
//-------------------------------------Funciones >> Registro-----------------------------------
//---------------------------------------------------------------------------------------------
//------------------------Funcion >> Verificacion Ortografica de email-------------------------
//Descripcion : Verifica que la direccion de email ingresada sea ortograficamente correcta.
//Nota >> Una direccion de email es ortograficamente correcta cuando cumple con la siguiente
//        estructura #($^%#$@^(#$^.com , sin embargo esto no indica que sea valida. Para la
//        correcta verificacion de email se debe enviar un correo o ping de verificacion de
//        existencia de la direccion.
const VerificarEmail = (email) => {
    let regularExpresion = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    let verifyEmail = regularExpresion.test(email);
    return (verifyEmail ? true : false);
}
//---------------------------------------------------------------------------------------------
//-------------------------------------Funciones >> Logros-------------------------------------
//---------------------------------------------------------------------------------------------
//----------------------------Funcion >> Obtencion Total de Puntos-----------------------------
//Descripcion : Obtiene los puntos totales del usuario.
const totalScore = ({ arrayScore }) => {
    let total = 0;
    total += arrayScore.pointsGame !== null ? parseInt(arrayScore.pointsGame) : 0;
    total += arrayScore.pointsCourse !== null ? parseInt(arrayScore.pointsCourse) : 0;
    total += arrayScore.pointsModule !== null ? parseInt(arrayScore.pointsModule) : 0;
    return total;
}
//----------------------------Funcion >> Calculo de nivel de usuario---------------------------
//Descripcion : Obtiene los parametros level, nextLevel, missingPoints, de acuerdo a los puntos
//              totales del usuario, y los devuelve en forma de objeto.
const categoryParameters = ({ score }) => {
    const CATEGORIAS = [
        { label: 'oro', limitInferior: 351, limitSuperior: 440 },
        { label: 'plata', limitInferior: 201, limitSuperior: 350 },
        { label: 'bronce', limitInferior: 50, limitSuperior: 200 },
        { label: 'sinPuntos', limitInferior: 0, limitSuperior: 49 },
    ];
    let labelLevel = 'sinPuntos';
    let labelNextLabel = 'bronce';
    let missingPoints = 0;
    let ObjectLevel = new Object();
    CATEGORIAS.map((data, index) => {
        if (score >= data.limitInferior && score <= data.limitSuperior) {
            labelLevel = data.label;
            missingPoints = data.limitSuperior - score + 1;
            if (data.label !== 'oro')
                labelNextLabel = CATEGORIAS[index - 1].label;
            else
                labelNextLabel = 'oro';
        }
    });
    ObjectLevel.labelLevel = labelLevel;
    ObjectLevel.missingPoints = missingPoints;
    ObjectLevel.labelNextLabel = labelNextLabel;
    return ObjectLevel;
}
//---------------------------------------------------------------------------------------------
//-------------------------------------Funciones >> Redux--------------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------Funcion >> Index de ELemento--------------------------------
//Descripcion : Permite comprar la existencia de un elemento y ubicacion en una matriz, haciendo
//              uso del valor de su identificador.
const searchIndex = ({ data, id = '0' }) => {
    let element = new Object();
    element.index = 0;
    element.search = false;
    data.map((data, index) => {
        if (data.id === id) {
            element.index = index;
            element.search = true;
        }
    });
    return element;
}
//---------------------------------Funcion >> Añadir nuevo elemento----------------------------
//Descripcion : Permite añadir un nuevo elemento a la matriz existente del redux.
const addItemRedux = ({ data, item = {} }) => {
    let dimension = data.length;
    return [...data.slice(0, dimension), item]
}
//---------------------------------Funcion >> Actualizar elemento------------------------------
//Descripcion : Permite actualizar una propiedad de un elemento existente en el redux.
const updateItemRedux = ({ data, item = { id: '0', name: '', value: false } }) => {
    let newData, newItem;
    let element = searchIndex({ data: data, id: item.id });
    if (element.search) {
        dimension = data.lenght;
        newItem = data[element.index];
        newItem[item.name] = item.value;
        newData = [...data.slice(0, element.index), newItem, ...data.slice(element.index + 1)];
    } else newData = data;
    return newData;
}
const deleteItemRedux = ({ data, id = '0' }) => {
    let newData = data.filter(data => data.id !== id);
    return newData;
}
//---------------------------------------------------------------------------------------------
//---------------------------------Funciones >> Notificaciones---------------------------------
//---------------------------------------------------------------------------------------------
//------------------------------Funcion >> Solicitud de Permiso--------------------------------
//Descripcion : Solicita permiso al usuario para generar una subcripcion de envio de
//              notificaciones de la aplicacion.
const permisoNotificacion = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.group('Permisos de dispositivo');
    if (enabled) {
        //Nota >> El token de dispositivo, es un ID que le permite a FCM,
        //        identificar al dispositivo al cual se le es enviado un msm.
        getFcmToken();//Obtencion de Token de dispositivo
        console.log('Estado de autorizacion : ' + authStatus);
    } else console.log('Estado de autorizacion : Denegado');
    console.groupEnd();
}
//------------------------------Funcion >> Obtencion de Token----------------------------------
//Descripcion : Permite conocer el token de acceso del dispositivo.
const getFcmToken = async () => {
    try {
        const fcmToken = await messaging().getToken();
        console.group('Token Dispositivo');
        if (fcmToken) console.info('Token : ' + fcmToken);
        console.groupEnd();
        return fcmToken;
    } catch (error) {
        console.error('Obtencion de Token fallido >> ', error);
    }
}
//---------------------------------------------------------------------------------------------
//---------------------------------Funciones >> Evaluacion App---------------------------------
//---------------------------------------------------------------------------------------------
//------------------------------Funcion >> Calificacion de App---------------------------------
//Descripcion : Genera una interfaz de calificacion de la App.
const onReview = async () => {
    try {
        let response = await InAppReview.RequestInAppReview();
        console.group('Response Review');
        console.log(response);
        console.groupEnd();
    } catch (error) {
        console.group('Error Review');
        console.log(error);
        console.groupEnd();
    }
};


export {
    wait, strNewFormat, labelProperty, FindLanguage,
    VerificarEmail,
    totalScore, categoryParameters,
    addItemRedux, updateItemRedux, deleteItemRedux,
    permisoNotificacion,
    onReview
}