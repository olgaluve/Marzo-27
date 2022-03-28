//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> notification---------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_NOTIFICATION, CLEAN_NOTIFICATION, ERROR_NOTIFICATION } from '../constans';
import { UPDATE_NOTIFICATION, GET_NOTIFICATION, DELETE_NOTIFICATION } from '../constans';
import { ADD_CURRENT_NOTIFICATION, CLEAN_CURRENT_NOTIFICATION } from '../constans';
//--------------------------------------Funciones----------------------------------------------
import { addItemRedux, updateItemRedux, deleteItemRedux } from '../../functions/functions';
//Estado inicial de Reducer
const inicialState = {
    data: [],//Matrix >> Notificaciones
    current: {
        id: '',
        body: '',
        url_image: '',
        show: false,
    },//Objeto >> Notificacion actual
    error: false
}
//Instancia de reducer
export default notificationReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_NOTIFICATION:
            return {
                ...state,
                data: [],
            };
        case GET_NOTIFICATION:
            return {
                ...state,
                data: action.data,
            };
        case ADD_NOTIFICATION:
            let addArray = addItemRedux({ data: state.data, item: action.data });
            return {
                ...state,
                data: addArray,
            };
        case ERROR_NOTIFICATION:
            return {
                ...state,
                data: [],
                error: true
            }
        case UPDATE_NOTIFICATION:
            let updateArray = updateItemRedux({ data: state.data, item: action.data });
            return {
                ...state,
                data: updateArray
            };
        case DELETE_NOTIFICATION:
            let deleteArray = deleteItemRedux({ data: state.data, id: action.data });
            return {
                ...state,
                data: deleteArray,
            };
        case ADD_CURRENT_NOTIFICATION:
            return {
                ...state,
                current: {
                    id: action.data.id,
                    body: action.data.body,
                    url_image: action.data.url_image,
                    show: true,
                }
            }
        case CLEAN_CURRENT_NOTIFICATION:
            return {
                ...state,
                current: {
                    body: '',
                    url_image: '',
                    show: false,
                }
            }
        default:
            return state;
    }
}
