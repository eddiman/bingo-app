import { Children, useState } from "react";
import { Decoration } from "./Decoration";
import { styled } from "./theme";


const StyledWordBox = styled.button`
position: relative;
background-color: ${(props) => props.theme.background};
border: 1px solid ${(props) => props.theme.interactive.primary.defaultText};
color: ${(props) => props.theme.text};
cursor: pointer;
padding:.5rem;
transition: background-color .1s ease-in-out;
outline-color: ${(props) => props.theme.focus.default};

&:hover {
    background-color: ${(props) => props.theme.interactive.primary.border};
    color: ${(props) => props.theme.interactive.primary.defaultText};
}

* {
    margin: 0;
}
span {
    line-height:1.25rem;
    word-break: break-word;
}
`;
interface LayoutProps { 
    onClick: (s : string) => void,
    word: string,
 } 


 export const WordBox = ({ onClick, word }: LayoutProps): JSX.Element => {
     const [selectedWord, setSelectedWord] = useState("--")
     //const [isWordSelectable, setIsWordSelectable] = useState(true)
     const onClicked =( () => {
         let s : string = selectedWord;
         console.log("ffff", selectedWord);
         onClick(s);
         setSelectedWord(word)
        
     })

    return (
        <StyledWordBox onClick={onClicked}>
            <Decoration state={{ alignPos: "top-left", size: 6 }} />
            <Decoration state={{ alignPos: "top-right", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-left", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-right", size: 6 }} />
            <span> 

            {selectedWord}
            </span>
        </StyledWordBox>
    )
} 