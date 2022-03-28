import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
//import Routes from './src/screens/routes/Routes';
import Routes from './src/routes/Routes';
import { Provider } from 'react-redux';
import configureStore from './src/redux/configureStore';
//------------------Inicializacion >> Seguidor de Conversaciones >> Twitter--------------------
import './src/twitter/index';
//------------------------Inicializacion >> Configuracion de Lenguaje--------------------------
import './src/translations';
//---------------------------------------React Native------------------------------------------
import { Platform } from 'react-native';
import VersionInfo from 'react-native-version-info';
import RNBootSplash from 'react-native-bootsplash';
//-----------------------------------------Servicies-------------------------------------------
import { UpdateApp } from './src/services/services';
//-------------------------------------------Screens-------------------------------------------
import UpdateAppScreen from './src/screens/UpdateAppScreen';
//------------------------Inicializacion >> Google Analitics-----------------------------------
//---------------------------------------------------------------------------------------------
//---------------------------------Declaracion de cuerpo de App--------------------------------
//---------------------------------------------------------------------------------------------
let store = configureStore();
export default function App() {
  //-------------------------------------------------------------------------------------------
  //------------------------------------Declaracion >> Estados---------------------------------
  //-------------------------------------------------------------------------------------------
  const [needUpdate, setNeedUpdate] = useState(false);
  //-------------------------------------------------------------------------------------------
  //------------------------------------Declaracion >> Funciones-------------------------------
  //-------------------------------------------------------------------------------------------
  //Descripcion : Obtiene la version actual de la App de acuerdo a la plataforma y la compara
  //              con la version instalada por el usuario.
  const verifyVersion = async ({ version = '', plataforma = '' }) => {
    try {
      let responseVersion = await UpdateApp({ version: version, plataforma: plataforma });
      responseVersion = responseVersion.data.data;
      if (!responseVersion) setNeedUpdate(true);
      RNBootSplash.hide({ fade: true });
    } catch (error) {
      console.log('Error Network App');
    }
  }
  //-------------------------------------------------------------------------------------------
  //------------------------------------Declaracion >> Effects---------------------------------
  //-------------------------------------------------------------------------------------------
  useEffect(() => {
    if(Platform.OS !== 'ios')
      verifyVersion({ version: VersionInfo.appVersion, plataforma: Platform.OS });
    else
    //console.log(VersionInfo.appVersion);
      setTimeout(() => RNBootSplash.hide({ fade: true }), 500);
  }, [])
  //-------------------------------------------------------------------------------------------
  //------------------------------------Declaracion >> MainComponent---------------------------
  //-------------------------------------------------------------------------------------------
  if (needUpdate)
    return <UpdateAppScreen />
  else
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  )
}

