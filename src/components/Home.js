//  config
import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';

// hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

//components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from './SearchBar';
import Button from './Button';
// images
import NoImage from '../images/no_image.jpg';

const Home= ()=>{
    
    const{ state, loading, error, setSearchBar, searchBar, setLodingMore}=useHomeFetch();
    if(error)
        return <div>Something Went Wrong......</div>
    return(
        <>
        {!searchBar && state.results[0]? 
             <HeroImage 
             image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
             title={state.results[0].original_title}
             text={state.results[0].overview}
             />: 
             null }
             <SearchBar setSearchTerm={setSearchBar}/>
        <Grid header={!searchBar?'Popular Movies': 'Search Results'}>
            {state.results.map(movie => (
                <div>
                    <Thumb
                        key={movie.original_title}
                        clickable
                        image={
                            movie.poster_path?
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`:NoImage
                        }
                        movieId={movie.id}
                    />
                </div>
            ))}
        </Grid>
         {loading && <Spinner/>}  

         {state.page<state.total_pages && !loading && (
         <Button text='Load More' callback={()=> setLodingMore(true)}/>
         )}             
        </>
    )
};

export default Home