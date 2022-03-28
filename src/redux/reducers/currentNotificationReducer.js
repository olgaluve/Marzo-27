//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> currentNotification--------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_CURRENT_NOTIFICATION, CLEAN_CURRENT_NOTIFICATION } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: {
        id: '',
        body: '',
        url_image: '',
        show: false,
    },//Objeto >> Notificacion actual
    error: false
}
//Instancia de reducer
export default currentNotificationReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ADD_CURRENT_NOTIFICATION:
            return {
                ...state,
                data: {
                    id: action.data.id,
                    body: action.data.body,
                    url_image: action.data.url_image,
                    show: true,
                }
            }
        case CLEAN_CURRENT_NOTIFICATION:
            return {
                ...state,
                data: {
                    id: '',
                    body: '',
                    url_image: '',
                    show: false,
                }
            }
        default:
            return state;
    }
}
