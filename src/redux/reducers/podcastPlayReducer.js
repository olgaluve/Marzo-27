//---------------------------------------------------------------------------------------------
//--------------------------------Reducers Data : ID >> podcastPlay------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_PODCAST_PLAY, CLEAN_PODCAST_PLAY } from '../constans';
import { ADD_PODCAST, CLEAN_PODCAST } from '../constans';
//Estado inicial de Reducer
const inicialState = {
    data: [],
    current: [],
    error: false
}
//Instancia de reducer
export default podcastPlayReducer = (state = inicialState, action) => {
    switch (action.type) {
        case CLEAN_PODCAST_PLAY:
            return {
                ...state,
                current: [],
            };
        case ADD_PODCAST_PLAY:
            return {
                ...state,
                current: action.data,
            };
        case CLEAN_PODCAST:
            return {
                ...state,
                data: [],
            };
        case ADD_PODCAST:
            return {
                ...state,
                data: action.data,
            };
        default:
            return state;
    }
}

