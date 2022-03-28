
//---------------------------------------------------------------------------------------------
//---------------------Archivo de Configuracion >> Seguidor de conversaciones------------------
//---------------------------------------------------------------------------------------------
//Nota >>   Archivo de configuracion de seguidor de conversaciones de twitter. Para el seguimiento
//          de conversaciones se hace uso del SDK de KOCHAVA, uno de los socios de red de twitter.
//          Para efectos de referencia, consulte el siguiente enlace :
//          >>https://support.kochava.com/sdk-integration/reactnative-sdk-integration/
import KochavaTracker from 'react-native-kochava-tracker';
import { GUID_ANDROID, GUID_IOS } from './constants'
// Configure
var configMapObject = {}
configMapObject[KochavaTracker.PARAM_ANDROID_APP_GUID_STRING_KEY] = GUID_ANDROID;
configMapObject[KochavaTracker.PARAM_IOS_APP_GUID_STRING_KEY] = GUID_IOS;
KochavaTracker.configure(configMapObject);