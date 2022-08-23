import React from "react";
import { Wrapper, Image } from "./Actors.style";

const Actors= ({name,character,imageUrl})=>(
    <Wrapper>
        <Image src={imageUrl} alt="actor-image"/>
        <h3>{name}</h3>
        <p>{character}</p>
    </Wrapper>
)

export default  Actors;