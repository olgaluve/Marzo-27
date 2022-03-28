//---------------------------------------------------------------------------------------------
//--------------------------Reducers Data : ID >> viewCourseReducer----------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_VIEW_COURSE, CLEAN_VIEW_COURSE, ERROR_VIEW_COURSE, SHOW_VIEW_COURSE } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: {
        show: false,
        logo: '',
        title: '',
        titleDefault: '',
        body: '',
        points: '',
        modulo: false,
        modulos: {},
        url: {},
    },
    error: false
}
//Instancia de reducer
export default viewCourseReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_VIEW_COURSE:
            return {
                ...state,
                data: {},
            };
        case ADD_VIEW_COURSE:
            return {
                ...state,
                data: {
                    label: action.data.label,
                    logo: action.data.logo,
                    title: action.data.title,
                    titleDefault: action.data.titleDefault,
                    body: action.data.body,
                    points: action.data.points,
                    modulo: action.data.modulo,
                    modulos: action.data.modulos,
                    url: action.data.url,
                    idCourse: action.data.idCourse,
                },
            };
        case SHOW_VIEW_COURSE:
            return {
                ...state,
                data: {
                    ...state.data,
                    show: action.data,
                },
            };
        case ERROR_VIEW_COURSE:
            return {
                ...state,
                data: [],
                error: true
            }
        default:
            return state;
    }
}