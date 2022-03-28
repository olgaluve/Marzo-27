//---------------------------------------------------------------------------------------------
//-------------------------------------Actions de APP------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_VIDEO_PLAY, CLEAN_VIDEO_PLAY, ERROR_VIDEO_PLAY } from '../constans';
//---------------------------------------------------------------------------------------------
//----------------------------------Instancia de Actions---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//-------------------------------Actions >> Video seleccionado---------------------------------
//---------------------------------------------------------------------------------------------
//-----------------------------------Action >> Agregar Video-----------------------------------
const AddVideoPlay = data => {
    return {
        type: ADD_VIDEO_PLAY,
        data
    }
}
//------------------------------------Action >> Limpiar Video-----------------------------------
const CleanVideoPlay = () => {
    return {
        type: CLEAN_VIDEO_PLAY
    }
}
//------------------------------------Action >> Error Video-------------------------------------
const ErrorVideoPlay = () => {
    return {
        type: ERROR_VIDEO_PLAY
    }
}

export { AddVideoPlay, CleanVideoPlay, ErrorVideoPlay }
