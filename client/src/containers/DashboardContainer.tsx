import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { SectionContainer } from '../components/SectionContainer';
import { WordBox } from '../components/WordBox';
import { styled } from '../components/theme';
import useFetch from '../hooks/useFetch';
import { IAgeGroupAvg, IBingoWord, ITheme } from '../interfaces/Interfaces';
import { DecoratedContainer } from '../components/DecoratedContainer';
import Button from '../components/Button';
import tokens from '../tokens/baseTokens';

const ModalContainer = styled.div`
position: fixed;  
left: 0;
display:flex;
right:0;
bottom:0;
top:0;
background-color: ${(props) => props.theme.alphaBackground};
z-index: 9999;
align-items: center;
`;
const WordSelectionContainer = styled.div`
> * {
  height:600px;
  display:flex;
  flex-direction:column;
  margin-left: .5rem;
}

`;
interface MobileWrapperProps {
  readonly state: {
      isWordSelectionContainerOpen : boolean

  };
}
const MobileWrapper = styled.div <MobileWrapperProps>`


@media ${tokens.constants.device.tablet} {
position: fixed;
left: 1rem;
right: 1rem;
z-index: 999;
bottom: -61%;

transition: .4s ease-in-out bottom;

${(props) => props.state.isWordSelectionContainerOpen ? `
bottom: 0%;

` : ""
}

`;
const WordSelectionModalListContainer = styled.div`
overflow-y: scroll;
flex: auto;

::-webkit-scrollbar {
  width: 4px;
  height: 2px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #e1e1e1;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #ffffff;
}
::-webkit-scrollbar-thumb:active {
  background: #000000;
}
::-webkit-scrollbar-track {
  background: #666666;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #666666;
}
::-webkit-scrollbar-track:active {
  background: #333333;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
`;
const WordSelectionModalList = styled.div`
div {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0rem;
  background-color: ${(props) => props.theme.background};

}
`;
interface WordSelectionModalElementProps {
  readonly state: {
    isUsed: boolean,

  };
}
const WordSelectionModalElement = styled.button<WordSelectionModalElementProps>`
margin: .125rem 0;
padding: .25rem .5rem;
cursor: pointer;
border:none;
width:100%;
text-align: left;
background-color: ${(props) => props.theme.interactive.primary.default};
color: ${(props) => props.theme.interactive.primary.defaultText};
transition: color .1s ease-in, background-color .1s ease-in; 
border: 1px solid ${(props) => props.theme.interactive.primary.activeText};
outline-color: ${(props) => props.theme.focus.default};

&:focus-within {
   
}
&:hover {
  background-color: ${(props) => props.theme.interactive.primary.hover};
  color: ${(props) => props.theme.interactive.primary.hoverText};
}

${props => props.state.isUsed ? `
background-color: ${props.theme.interactive.primary.disabled};
color: ${props.theme.interactive.primary.disabledText};
border: 1px solid ${props.theme.interactive.primary.disabledText};
cursor: default;
&:hover {
    color: ${props.theme.interactive.primary.disabledText};
    background-color: ${props.theme.interactive.primary.disabled};

` : ""};
`;

interface GridProps {
  readonly state?: {
    gridSize?: number
  };
}
const GridWrapper = styled.div<GridProps>`
display: grid;
margin: 0 auto;
grid-gap: 8px;
grid-template-columns: repeat(${(props) => props.state?.gridSize ? props.state.gridSize : 5} , minmax(50px, .75fr));
grid-template-rows: repeat(${(props) => props.state?.gridSize ? props.state.gridSize : 5} , minmax(50px, .75fr));
grid-auto-flow: row;
`;

const DashboardContainer: React.FC = (() => {
  const theme = useContext(ThemeContext).theme as ITheme;

  const url = "https://pires-bingo-app-server.herokuapp.com/token?id="
  const localUrl = "http://localhost:3001/token?id="
  const [searchParams, setSearchParams] = useSearchParams();
  const lotteryId = searchParams.get("id")

  const [boardSize, setBoardSize] = useState(5);
  const [isWordModalShowing, setIsWordModalShowing] = useState(false);
  const [isGameMode, setIsGameMode] = useState(false);

  const [isWordSelectionContainerOpen, setIsWordSelectionContainerOpen] = useState(false);
  const [isSelectingWord, setIsSelectingWord] = useState(false)
  const [bingoWordsOnBoard, setBingoWordsOnBoard] = useState<IBingoWord[]>([]);
  const [bingoWords, setBingoWords] = useState<IBingoWord[]>();

  const [currentlySelectedWord, setCurrentlySelectedWord] = useState<IBingoWord>();
  const [currentlySelectedWordBoxString, setCurrentlySelectedWordBoxString] = useState<string>();
  const { data, error } = useFetch<IBingoWord[]>(url + lotteryId);

  useEffect(() => {

    setBingoWords(data)

    let startBingoWordsArray: IBingoWord[] = [];

    for (let i = 0; i < (boardSize * boardSize); i++) {

      startBingoWordsArray?.push({ word: "", isUsed: false });
    }
    setBingoWordsOnBoard(startBingoWordsArray);

  }, [data])




  function toggleModal() {
    setIsWordModalShowing(!isWordModalShowing)
  }

  function elementClicked(wordObj: IBingoWord) {
    setIsWordSelectionContainerOpen(false)
    setCurrentlySelectedWord(wordObj)
    setIsSelectingWord(true)

  }

  function GetWordFromChild(word: string) {

    console.log(word);
    setCurrentlySelectedWordBoxString(word);
  }

  function switchWordbox() {

  }

  function setWordInBox(boxWord: string, bingoWordIndex: number) {
    let newBingoWords = bingoWords;
    let newBingoWordsOnBoardArray = bingoWordsOnBoard;
    setIsWordSelectionContainerOpen(true)

    if (bingoWords && newBingoWords) {
      console.log(isSelectingWord);

      for (let i = 0; i < newBingoWords.length; i++) {
        if (newBingoWords[i].word === currentlySelectedWord?.word) {

          newBingoWords[i] = { word: currentlySelectedWord.word, isUsed: true };
          newBingoWordsOnBoardArray[bingoWordIndex] = { word: isSelectingWord ? currentlySelectedWord.word : "", isUsed: true };

        } else if (!isSelectingWord) {
          newBingoWords[i] = { word: newBingoWords[i].word, isUsed: false };
          newBingoWordsOnBoardArray[bingoWordIndex] = { word: isSelectingWord ? newBingoWordsOnBoardArray[bingoWordIndex].word : "", isUsed: false };
        }
      }

      let result1 = newBingoWordsOnBoardArray.filter(e => e.isUsed)
      let result2 = newBingoWords.filter(person => newBingoWordsOnBoardArray.every(person2 => !person2.word.includes(person.word)))
      console.log(newBingoWords);
      console.log(newBingoWordsOnBoardArray);


      for (let i = 0; i < result2.length; i++) {
        result2[i] = { word: result2[i].word, isUsed: false };
      }


      let newnewnew = result1.concat(result2)


      setBingoWords(newnewnew);
      setBingoWordsOnBoard(newBingoWordsOnBoardArray);
      setCurrentlySelectedWord(undefined);
      setIsSelectingWord(false)

    }


  }

  return (
    <>

      {isWordModalShowing ?
        <ModalContainer onClick={() => { toggleModal() }}>

        </ModalContainer> : ""}
      <Button onClick={() => { setIsGameMode(!isGameMode) }} disabled={false} children={isGameMode ? "Game on" : "Select the words"}></Button>
      <SectionContainer state={{ direction: "row", wrap: "flex-wrap", childrenFlex: 1 }}>
        <GridWrapper state={{ gridSize: boardSize }}>
          {bingoWordsOnBoard.map((x, i) =>
            <WordBox key={i} isGame={isGameMode} onClick={() => {
              isGameMode ? switchWordbox() :
              
                setWordInBox(currentlySelectedWord ? currentlySelectedWord.word : "", i)
            }} word={currentlySelectedWord ? currentlySelectedWord.word : ""

            } />
          )}
        </GridWrapper>
        <MobileWrapper state= {{isWordSelectionContainerOpen: isWordSelectionContainerOpen}}className='test'>
          <WordSelectionContainer >
            <DecoratedContainer >
            <Button onClick={() => setIsWordSelectionContainerOpen(!isWordSelectionContainerOpen)} disabled={false} children={"open"}></Button>
            <span>Valgt ord: {currentlySelectedWord?.word}</span>
              <WordSelectionModalListContainer>
                <WordSelectionModalList className={"inner-list"}>
                  <div>

                  </div>

                  {bingoWords?.map((wordObj: IBingoWord, i: number) => {
                    return (
                      <WordSelectionModalElement key={i} state={{ isUsed: wordObj.isUsed }} disabled={wordObj.isUsed} onClick={!wordObj.isUsed ? () => { elementClicked(wordObj) } : () => { }}>
                        {wordObj.word}
                      </WordSelectionModalElement>
                    )
                  })}
                </WordSelectionModalList>
              </WordSelectionModalListContainer>
            </DecoratedContainer>
          </WordSelectionContainer>
        </MobileWrapper>

      </SectionContainer>
    </>
  )

})


export default DashboardContainer;