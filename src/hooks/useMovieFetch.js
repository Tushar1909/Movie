import {useState,useEffect} from'react';
import API from '../API';
import { isPressitantState } from '../helpers';


export const useMovieFetch= movieid=>{
    const [state,setState]=useState({});
    const [loading,setLoading]=useState(true);   
    const [error,setError]=useState(false);

    //For fetching movie from API
    useEffect(()=>{
        const fetchMovie= async ()=>{
            try{
                setLoading(true);
                setError(false);
                
                const movie= await API.fetchMovie(movieid);
                const credits= await API.fetchCredits(movieid);
                const directors= credits.crew.filter(
                        element =>element.job === 'Director'
                );

                setState({
                    ...movie,
                    actors:credits.cast,
                    directors
                })

            }catch(error){
                setError(true);
            }
        }
            const sessionState=isPressitantState(movieid);
            if(sessionState){
                setState(sessionState);
                setLoading(false);
                return;
            }
        fetchMovie();
        setLoading(false);
    },[movieid]);

    //Storing movie in session storage
    useEffect(()=>{
            sessionStorage.setItem(movieid,JSON.stringify(state));
    },[movieid,state])

    return {state,loading,error};
}