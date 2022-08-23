import styled from "styled-components";

export const Wrapper= styled.button`
    border-radius: 30px;
    display: block;
    width: 25%;
    min-width: 200px;
    height: 60px;
    border: 0;
    background: var(--darkGrey);
    color: var(--white);
    font-size: var(--fontBig);
    margin: 20px auto;
    transition: all 0.3s;
    outline: none;
    cursor: pointer;

    :hover{
        opacity: 0.8;
    }
`;