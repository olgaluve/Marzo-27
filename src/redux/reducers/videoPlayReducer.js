//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> videoPlay------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_VIDEO_PLAY, CLEAN_VIDEO_PLAY, ERROR_VIDEO_PLAY } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: [],
    error: false
}
//Instancia de reducer
export default videoPlayReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_VIDEO_PLAY:
            return {
                ...state,
                data: [],
            };
        case ADD_VIDEO_PLAY:
            return {
                ...state,
                data: action.data,
            };
        case ERROR_VIDEO_PLAY:
            return {
                ...state,
                data: [],
                error: true
            }
        //state.data.password = '0000';
        default:
            return state;
    }
}

