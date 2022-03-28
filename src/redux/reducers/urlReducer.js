//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> url------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_URL, CLEAN_URL, ERROR_URL } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: {
        url: '',
        route: '',
        title: '',
    },
    error: false
}
//Instancia de reducer
export default urlReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_URL:
            return {
                ...state,
                data: {},
            };
        case ADD_URL:
            return {
                ...state,
                data: {
                    url: action.data.url,
                    route: action.data.route,
                    title: action.data.title,
                },
            };
        case ERROR_URL:
            return {
                ...state,
                data: [],
                error: true
            }
        default:
            return state;
    }
}

