import { useEffect,useState } from "react";

//API
import API from '../API';
import {isPressitantState} from "../helpers";

const intitalState= {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
}

export const useHomeFetch= ()=>{
    const [searchBar, setSearchBar]=useState("");
    const [state, setState] = useState(intitalState);
    const [loading, setLoading]= useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore,setLodingMore]= useState(false);

    const fetchMovies=  async (page,searchTerm="")=>{
        try{
            setLoading(true);
            setError(false);
            const movies= await API.fetchMovies(searchTerm,page);

            setState(prev => ({
                ...movies,
                results: 
                    page>1?[...prev.results, ...movies.results]: [...movies.results]
            }));
        }catch(error){
            setError(true);
        }
        setLoading(false);
    }
    
    //For Fetching Movies For Home Page
    useEffect(()=>{
        if(!searchBar){
            const sessionState=isPressitantState("homeState");
            if(sessionState){
                setState(sessionState);
                return;
            }
        }
        fetchMovies(1,searchBar);
    },[searchBar]);

    //For Fetching Movies Search Bar
    useEffect(()=>{
        if(!isLoadingMore)
            return;
        fetchMovies(state.page +1,searchBar);
        setLodingMore(false);
        
    },[isLoadingMore,state.page,searchBar]);

    //For storing movies in session storage
    useEffect(()=>{
        if(!searchBar){
            sessionStorage.setItem("homeState",JSON.stringify(state));
        }
    },[searchBar,state])
    return{ state, loading, error, setSearchBar, searchBar, setLodingMore};
};