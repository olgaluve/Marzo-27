//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> user-----------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_USER, CLEAN_USER, ERROR_USER, UPDATE_USER } from '../constans';
import { UPDATE_PASSWORD, UPDATE_LOGROS } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: [],
    error: false
}
//Instancia de reducer
export default userReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_USER:
            return {
                ...state,
                data: [],
            };
        case ADD_USER:
            return {
                ...state,
                data: action.data,
            };
        case ERROR_USER:
            return {
                ...state,
                data: [],
                error: true
            }
        case UPDATE_USER:
            return {
                ...state,
                data: {
                    ...state.data,
                    name: action.data.name,
                    lastname: action.data.lastname,
                    country: action.data.country,
                    city: action.data.city,
                    area: action.data.area,
                    company: action.data.company,
                    position: action.data.position,
                    language: action.data.language,
                    url_avatar: action.data.url_avatar
                }
            }
        case UPDATE_PASSWORD:
            return {
                ...state,
                data: {
                    ...state.data,
                    password: action.data
                }
            }
        case UPDATE_LOGROS:
            return {
                ...state,
                data: {
                    ...state.data,
                    logros: action.data
                }
            }
        //state.data.password = '0000';
        default:
            return state;
    }
}

