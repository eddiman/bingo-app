import { prependOnceListener } from "process";
import { Children, useState } from "react";
import tokens from "../tokens/baseTokens";
import { Decoration } from "./Decoration";
import { styled } from "./theme";

interface StyledWordBoxProps {
    readonly state: {
        isSelected : boolean
        isGame : boolean,
        isPrefilled : boolean
    };
}

const StyledWordBox = styled.button <StyledWordBoxProps>`
position: relative;
background-color: unset;
border: 1px solid ${(props) => props.theme.miscColors.color3};
color: ${(props) => props.theme.text};
cursor: pointer;
padding:.5rem;
transition: background-color .1s ease-in-out;
outline-color: ${(props) => props.theme.focus.default};
word-break: break-word;

&:hover {
    background-color: ${(props) => props.theme.miscColors.color2};
}


@media ${tokens.constants.device.tablet} {
    p {
        line-height:1rem;
        font-size: .75rem;
    } 
}

${(props) => props.state.isSelected || props.state.isPrefilled ? `
background-color: ${props.theme.miscColors.color5};
 p {
    color: white;
 }
` : ""}



* {
    margin: 0;
}

`;
interface LayoutProps { 
    onClick: (s : string) => void,
    word: string,
    isGame : boolean,
    index : number
 } 


 export const WordBox = ({ onClick, word, isGame, index }: LayoutProps): JSX.Element => {
     const [selectedWord, setSelectedWord] = useState("")
     const [isSelected, setIsSelected] = useState(false)
     const onClicked =( () => {
        if(!isGame && index !== 12) {
            onClick(selectedWord);
            setSelectedWord(word)
        }
        else {
            setIsSelected(!isSelected)
        }
            
     })

    return (
        <StyledWordBox state={{ isSelected: isSelected, isGame: isGame, isPrefilled : index == 12}} onClick={onClicked}>
            <Decoration state={{ alignPos: "top-left", size: 6 }} />
            <Decoration state={{ alignPos: "top-right", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-left", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-right", size: 6 }} />
            <p> 

            {selectedWord}
            </p>
        </StyledWordBox>
    )
} 