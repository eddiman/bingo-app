import { Children, useState } from "react";
import tokens from "../tokens/baseTokens";
import { Decoration } from "./Decoration";
import { styled } from "./theme";

interface StyledWordBoxProps {
    readonly state: {
        isSelected : boolean

    };
}

const StyledWordBox = styled.button <StyledWordBoxProps>`
position: relative;
background-color: ${(props) => props.theme.background};
border: 1px solid ${(props) => props.theme.interactive.primary.defaultText};
color: ${(props) => props.theme.text};
cursor: pointer;
padding:.5rem;
transition: background-color .1s ease-in-out;
outline-color: ${(props) => props.theme.focus.default};


@media only screen and ( min-width: ${tokens.constants.device.tablet}) {
&:hover {
    background-color: ${(props) => props.theme.interactive.primary.border};
    color: ${(props) => props.theme.interactive.primary.defaultText};
}}

* {
    margin: 0;
}
p {
@media ${tokens.constants.device.tablet} {

    line-height:1rem;
    font-size: .75rem;
}
}

${(props) => props.state.isSelected ? `
background-color: ${props.theme.miscColors.color4};
 span {
    filter: invert(1);
 }
` : ""}
`;
interface LayoutProps { 
    onClick: (s : string) => void,
    word: string,
    isGame : boolean
 } 


 export const WordBox = ({ onClick, word, isGame }: LayoutProps): JSX.Element => {
     const [selectedWord, setSelectedWord] = useState("")
     const [isSelected, setIsSelected] = useState(false)
     const onClicked =( () => {
        if(!isGame) {

            let s : string = selectedWord;
            console.log("ffff", selectedWord);
            onClick(s);
            setSelectedWord(word)
        } else {
                setIsSelected(!isSelected)
        }
            
     })

    return (
        <StyledWordBox state={{ isSelected: isSelected}} onClick={onClicked}>
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