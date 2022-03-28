//---------------------------------------------------------------------------------------------
//-------------------------------------Actions de APP------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_NOTIFICATION, CLEAN_NOTIFICATION, ERROR_NOTIFICATION } from '../constans';
import { UPDATE_NOTIFICATION, GET_NOTIFICATION, DELETE_NOTIFICATION } from '../constans';
import { ADD_CURRENT_NOTIFICATION, CLEAN_CURRENT_NOTIFICATION } from '../constans';
//---------------------------------------------------------------------------------------------
//----------------------------------Instancia de Actions---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//-------------------------------Actions de notificaciones de usuario--------------------------
//---------------------------------------------------------------------------------------------
//-----------------------------------Action >> Obtener Notificaciones--------------------------
const GetNotification = data => {
    return {
        type: GET_NOTIFICATION,
        data
    }
}
//-----------------------------------Action >> Agregar Notificacion----------------------------
const AddNotification = data => {
    return {
        type: ADD_NOTIFICATION,
        data
    }
}
//-----------------------------------Action >> Limpiar Notificaciones--------------------------
const CleanNotification = () => {
    return {
        type: CLEAN_NOTIFICATION
    }
}
//------------------------------------Action >> Error Notificaciones---------------------------
const ErrorNotification = () => {
    return {
        type: ERROR_NOTIFICATION
    }
}
//----------------------------Action >> Actualizacion Notificaciones---------------------------
const UpdateNotification = data => {
    return {
        type: UPDATE_NOTIFICATION,
        data
    }
}
//-----------------------------Action >> Eliminar Notificacion----------------------------------
const DeleteNotification = data => {
    return {
        type: DELETE_NOTIFICATION,
        data
    }
}
//--------------------------Action >> Agregar Notificacion Actual-------------------------------
const GetCurrentNotification = data => {
    return {
        type: ADD_CURRENT_NOTIFICATION,
        data
    }
}
//--------------------------Action >> Limpiar Notificacion Actual-------------------------------
const CleanCurrentNotification = () => {
    return {
        type: CLEAN_CURRENT_NOTIFICATION
    }
}

export {
    GetNotification, AddNotification, CleanNotification, ErrorNotification, UpdateNotification,
    DeleteNotification, GetCurrentNotification, CleanCurrentNotification
}

