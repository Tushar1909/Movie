import React from "react";
import { useParams } from "react-router-dom";

//config
import { IMAGE_BASE_URL, POSTER_SIZE} from "../../config";

//components
import Grid from "../Grid";
import Spinner from "../Spinner";
import Breadcum from "../Breadcum";
import MovieInfo from "../MovieInfo";
import MovieInfoBar from "../MovieInfoBar";
import Actors from "../Actors";
//Hook
import { useMovieFetch } from "../../hooks/useMovieFetch";

//Image
import Noimage from"../../images/no_image.jpg";

const Movie= () => {
    const {movieid}=useParams();
    const {state: movie, loading, error}= useMovieFetch(movieid);
    if(loading)
        <Spinner/>
    if(error)
        return <div>Something Went Wrong.........</div>
    return( 
        <>
            <Breadcum movieTitle={movie.original_title} />
            <MovieInfo movie={movie}/>
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}/>
            <Grid header="ACTORS">
            {movie.actors?
                    movie.actors.map(actor =>(
                    <Actors key={actor.credit_id} name={actor.name} character={actor.character}
                            imageUrl={actor.profile_path? 
                                `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`: Noimage
                            }
                    />
                    )):""
            }
            </Grid>
        </>
    )
}

export default Movie