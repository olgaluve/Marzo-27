//---------------------------------------------------------------------------------------------
//-------------------------------------Actions de APP------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_USER, CLEAN_USER, ERROR_USER, UPDATE_USER } from '../constans';
import { UPDATE_PASSWORD, UPDATE_LOGROS } from '../constans';
//---------------------------------------------------------------------------------------------
//----------------------------------Instancia de Actions---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//-------------------------------Actions de perfil de usuario----------------------------------
//---------------------------------------------------------------------------------------------
//-----------------------------------Action >> Obtener Usuario---------------------------------
const AddUser = data => {
    return {
        type: ADD_USER,
        data
    }
}
//-----------------------------------Action >> Limpiar Usuario----------------------------------
const CleanUser = () => {
    return {
        type: CLEAN_USER
    }
}
//------------------------------------Action >> Error Usuario-----------------------------------
const ErrorUser = () => {
    return {
        type: ERROR_USER
    }
}
//----------------------------Action >> Actualizacion de nombre de usuario----------------------
const UpdateUser = data => {
    return {
        type: UPDATE_USER,
        data
    }
}
//------------------------------Action >> Actualizacion de contrase??a---------------------------
const UpdatePassword = data => {
    return {
        type: UPDATE_PASSWORD,
        data
    }
}
//------------------------------Action >> Actualizacion de logros--------------------------------
const UpdateLogros = data => {
    return {
        type: UPDATE_LOGROS,
        data
    }
}

export {
    AddUser, CleanUser, ErrorUser, UpdateUser, UpdatePassword, UpdateLogros
}

