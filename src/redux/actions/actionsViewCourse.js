//---------------------------------------------------------------------------------------------
//-------------------------------------Actions de APP------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_VIEW_COURSE, CLEAN_VIEW_COURSE, ERROR_VIEW_COURSE, SHOW_VIEW_COURSE } from '../constans';
//---------------------------------------------------------------------------------------------
//----------------------------------Instancia de Actions---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//----------------------------------Actions >> Vista de Curso----------------------------------
//---------------------------------------------------------------------------------------------
//-----------------------------------Action >> Agregar datos curso-----------------------------
const AddViewCourse = data => {
    return {
        type: ADD_VIEW_COURSE,
        data
    }
}
//-----------------------------------Action >> Mostrar modal de curso---------------------------
const ShowViewCourse = data => {
    return {
        type: SHOW_VIEW_COURSE,
        data
    }
}
//-----------------------------------Action >> Limpiar datos curso------------------------------
const CleanViewCourse = () => {
    return {
        type: CLEAN_VIEW_COURSE
    }
}
//------------------------------------Action >> Error datos curso-------------------------------
const ErrorViewCourse = () => {
    return {
        type: ERROR_VIEW_COURSE
    }
}
export { AddViewCourse, ShowViewCourse, CleanViewCourse, ErrorViewCourse }
