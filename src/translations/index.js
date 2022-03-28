//---------------------------------------------------------------------------------------------
//----------------------------Configuracion >> Soporte Multilenguaje---------------------------
//---------------------------------------------------------------------------------------------
//Nota :  Este archivo se encarga de realizar la configuracion adecuada de la libreria i18n para
//        el soporte multilenguaje de la app. Para efectos de documentacion sobre su
//        funcionamiento remitase al siguiente enlace :
//          >>https://medium.com/cybermonkey/multiple-language-support-in-react-native-part-1-fa6966b62332

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import i18n, { LanguageDetectorAsyncModule, Services, InitOptions, } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import 'moment/min/locales';
import moment from 'moment';
//---------------------------------------------Data--------------------------------------------
import { keyAsync } from '../data/data';
//---------------------------------------------------------------------------------------------
//---------------------------Importacion >> Diccionarios de idiomas----------------------------
//---------------------------------------------------------------------------------------------
import en from './en';//Ingles
import es from './es';//Español
import pt from './pt';//Portugues
//---------------------------------------------------------------------------------------------
//---------------------------Declaracion >> Constantes Globales--------------------------------
//---------------------------------------------------------------------------------------------
export const AVAILABLE_LANGUAGES = { en, es, pt };//Objeto de idiomas disponibles
const AVALAILABLE_LANG_CODES = Object.keys(AVAILABLE_LANGUAGES);//Generacion de objeto con claves de idioma
//---------------------------------------------------------------------------------------------
//----------------------------------Declaracion >> Funciones-----------------------------------
//---------------------------------------------------------------------------------------------
//-----------------------Funcion >> Deteccion de configuacion de idioma------------------------
//Descripcion : Permite detectar la configuracion de idioma actual de usuario, consultando el
//              almacenamiento en cache de la App, si no encuentra una configuracion establecida,
//              selecciona la configuracion de idioma mas adecuada, respecto a la configuracion
//              general de idioma del telefono, y como ultimo recurso selecciona la opcion por
//              default. (en >> Ingles)
const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => { },
  detect: (callback) => {
    //Consulta de configuracion de idioma
    AsyncStorage.getItem(keyAsync.languaje, (err, response) => {
      console.log('Cache >> lenguaje : ', response);
      if (err || !response) {
        if (err) console.log('Error >> ', err);
        else console.log('Sin configuracion de lenguaje');
        const bestLng = RNLocalize.findBestAvailableLanguage(AVALAILABLE_LANG_CODES);
        callback(bestLng?.languageTag ?? 'en');
        return;
      }
      callback(response);
    });
  },
  cacheUserLanguage: (languaje) => AsyncStorage.setItem(keyAsync.languaje, languaje),
};
//-----------------------Funcion >> Interpolacion de elementos---------------------------------
//Descripcion:  Permite realizar interpolaciones personalizadas en las cadenas Json de los
//              diccionarios de idiomas.
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: AVAILABLE_LANGUAGES,
    react: { useSuspense: false, },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'buttons',
  });
//-----------------------Funcion >> Cambio de Lenguaje-----------------------------------------
//Descripcion : Permite cambiar entre las distintas configuracion de idioma disponibles.
i18n.on('languageChanged', (lng) => moment.locale(lng));
