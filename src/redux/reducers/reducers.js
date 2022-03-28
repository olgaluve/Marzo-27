//---------------------------------------------------------------------------------------------
//--------------------------------------Reducers de App----------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { combineReducers } from 'redux';
import userReducer from './userReducer';//Reducer >> usuario.
import urlReducer from './urlReducer';//Reducer >> url.
import viewCourseReducer from './viewCourseReducer';//Redux >> Vista de cursos.
import notificationReducer from './notificationReducer';//Redux >> Notificaciones usuario.
import currentNotificationReducer from './currentNotificationReducer';//Redux >> Notificacion Actual.
import videoPlayReducer from './videoPlayReducer';//Redux >> Video Seleccionado.
import podcastPlayReducer from './podcastPlayReducer';//Redux >> Podcast Seleccionado.
//Nota: Para efectos de documentacion sobre el funcionamiento de redux y algun componente
//      derivado referenciarse a los siguientes links:
//      Redux           >> https://redux.js.org/introduction/getting-started
//      Implementación
//      de redux en
//      react-native    >> https://medium.com/@debian789/implementaci%C3%B3n-de-redux-en-react-native-6324e2a8c4aa

//---------------------------------------------------------------------------------------------
//-----------------------------------Instancia de Reducers-------------------------------------
//---------------------------------------------------------------------------------------------
export default combineReducers({
    //Instancia de reducers
    //IdReducer : DataReducer
    user: userReducer,
    url: urlReducer,
    viewCourse: viewCourseReducer,
    notification: notificationReducer,
    currentNotification: currentNotificationReducer,
    videoPlay: videoPlayReducer,
    podcastPlay: podcastPlayReducer,
})