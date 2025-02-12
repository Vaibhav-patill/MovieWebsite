import axios from '../../utils/axios';
import {loadmovie} from '../reducers/movieSlice';
export {removemovie} from '../reducers/movieSlice';

export const asyncloadmovie = (id) => async(dispatch,getState) => {
    try{
        const detail = await axios.get( `/movie/${id}` );
        const externalids = await axios.get( `/movie/${id}/external_ids` );
        const recommendations = await axios.get( `/movie/${id}/recommendations` );
        const similar = await axios.get( `/movie/${id}/similar` );
        const translations = await axios.get( `/movie/${id}/translations` );
        const videos = await axios.get( `/movie/${id}/videos` );
        const watchproviders = await axios.get( `/movie/${id}/watch/providers` );

        let theUltimateData = {
            detail: detail.data,
            externalids: externalids.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations : translations.data.translations.map(item=> item.name),
            videos: videos.data.results.find( m => ( m.type === 'Trailer' ) ),
            watchProviders: watchproviders.data
        }

        dispatch( loadmovie( theUltimateData ) )
        // console.log( theUltimateData)

    }catch(error){
        console.log("Error:",error);
    }
}

