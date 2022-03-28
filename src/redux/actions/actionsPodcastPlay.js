//---------------------------------------------------------------------------------------------
//-------------------------------------Actions de APP------------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//---------------------------Importar dependencias y componentes-------------------------------
//---------------------------------------------------------------------------------------------
import { ADD_PODCAST, CLEAN_PODCAST } from '../constans';
import { ADD_PODCAST_PLAY, CLEAN_PODCAST_PLAY } from '../constans';
//---------------------------------------------------------------------------------------------
//----------------------------------Instancia de Actions---------------------------------------
//---------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
//-------------------------------Actions >> Podcast seleccionado-------------------------------
//---------------------------------------------------------------------------------------------
//-----------------------------------Action >> Agregar Podcast---------------------------------
const AddPodcast = data => {
    return {
        type: ADD_PODCAST,
        data
    }
}
//-----------------------------Action >> Limpiar Podcast Seleccionado---------------------------
const CleanPodcast = () => {
    return {
        type: CLEAN_PODCAST
    }
}
//----------------------------Action >> Agregar Podcast Seleccionado---------------------------
const AddPodcastPlay = data => {
    return {
        type: ADD_PODCAST_PLAY,
        data
    }
}
//-----------------------------Action >> Limpiar Podcast Seleccionado---------------------------
const CleanPodcastPlay = () => {
    return {
        type: CLEAN_PODCAST_PLAY
    }
}

export { AddPodcastPlay, CleanPodcastPlay, AddPodcast, CleanPodcast }
