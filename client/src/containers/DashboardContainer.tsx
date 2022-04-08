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
  height: 600px;
  display:flex;
  flex-direction:column;
 .top-header {
   display: flex; 
   flex-direction: row;
 }
}

`;
interface MobileWrapperProps {
  readonly state: {
    isWordSelectionContainerOpen: boolean
    isGameMode: boolean

  };
}
interface CardSheetProps {
  readonly state: {
    isWordSelectionContainerOpen: boolean

  };
}



const MobileWrapperBg = styled.div`
position: fixed;
top:0;
bottom:0;
left:0;
right:0;
background-color:black;
opacity: 0.5;
z-index: 998;
animation: fadein ease-in-out .2s;
`;
const MobileWrapper = styled.div <MobileWrapperProps>`
transition: .2s opacity;
${(props) => props.state.isGameMode ? `
opacity: .5;
` : ""
  }

@media ${tokens.constants.device.tablet} {
position: fixed;
left: 1rem;
right: 1rem;
z-index: 999;
top: calc(100% - 80px);

transition: .2s ease-in-out top;

${(props) => props.state.isWordSelectionContainerOpen ? `
top: calc(100% - 50%);
` : ""
  }
${(props) => props.state.isGameMode ? `
top: 110vh;
` : ""
  }
  }

`;
const WordSelectionModalListContainer = styled.div`
overflow-y: scroll;
flex: auto;
@media ${tokens.constants.device.tablet} { 
/*hotfix*/
margin-bottom: 14rem;


}

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
    isDisabled: boolean,

  };
}
const CardSheetButton = styled.button <CardSheetProps>`
width: 100%;
text-align: left;
padding: 0 1rem;
margin-bottom: 1rem;
background-color: unset;
color: ${(props) => props.theme.text};
border: 1px rgba(0,0,0,0) solid;
height: 4rem;
cursor: pointer;
transition: .2s background-color ease-in;
transition: .2s border ease-in;
position:relative;
&:hover {
  border: 1px white solid;
  background-color: rgba(0,0,0,0.2);
}

&:after, &:before {
  transition: .45s transform;
  position: absolute;
  content:'';
  background-color: ${(props) => props.theme.text};
  height: 2px;
  width: .75rem;
  top:calc(50% - 5px);
}
&:after {
  transform: rotate(45deg);
  right:0;
  right:23px;

  ${(props) => props.state.isWordSelectionContainerOpen ? `
  transform: rotate(-45deg);
` : ""
  }

}
&:before {
  transform: rotate(-45deg);
  right:16px;
  ${(props) => props.state.isWordSelectionContainerOpen ? `
  transform: rotate(45deg);
  ` : ""
  }
}

`

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

${props => props.state.isDisabled ? `
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
  const [isMobileWindow, setIsMobileWindow] = useState(false);
  const [isWordSelectionContainerOpen, setIsWordSelectionContainerOpen] = useState(false);
  const [isSelectingWord, setIsSelectingWord] = useState(false)
  const [bingoWordsOnBoard, setBingoWordsOnBoard] = useState<IBingoWord[]>([]);
  const [bingoWords, setBingoWords] = useState<IBingoWord[]>();

  const [currentlySelectedWord, setCurrentlySelectedWord] = useState<IBingoWord>();
  const [currentlySelectedWordBoxString, setCurrentlySelectedWordBoxString] = useState<string>();
  const { data, error } = useFetch<IBingoWord[]>(url + lotteryId, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


  useEffect(() => {


    const width = getWindowDimensions().width;

    //TODO: rewirte tablet token to number
    if (width > 768) {
      setIsMobileWindow(false);
    } else {
      setIsMobileWindow(true)
    }


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



  function switchWordbox() {

  }

  function setWordInBox(boxWord: string, bingoWordIndex: number) {
    let newBingoWords = bingoWords;
    let newBingoWordsOnBoardArray = bingoWordsOnBoard;

    isMobileWindow ? setIsWordSelectionContainerOpen(true) : setIsWordSelectionContainerOpen(false)

    if (bingoWords && newBingoWords) {

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

      <SectionContainer state={{ direction: "column", wrap: "flex-wrap", childrenFlex: 1 }}>
        <h2>{isGameMode ? "Bingo mode" : "Word selection mode"}</h2>
        <Button onClick={() => { setIsGameMode(!isGameMode) }} disabled={false} children={"Toggle mode"}></Button>
      </SectionContainer>
      <SectionContainer state={{ direction: "row", wrap: "flex-wrap", childrenFlex: 1 }}>
        <GridWrapper state={{ gridSize: boardSize }}>
          {bingoWordsOnBoard.map((x, i) => 
            <WordBox key={i} index={i} isGame={isGameMode} onClick={() => {
              isGameMode ? switchWordbox() :
                setWordInBox(currentlySelectedWord ? currentlySelectedWord.word : "", i)
            }} word={currentlySelectedWord ? currentlySelectedWord.word : ""

            } />
          )}
        </GridWrapper>
        {isWordSelectionContainerOpen ? <MobileWrapperBg onClick={() => { setIsWordSelectionContainerOpen(!isWordSelectionContainerOpen) }} /> : ""}
        <MobileWrapper state={{ isWordSelectionContainerOpen: isWordSelectionContainerOpen, isGameMode: isGameMode }} className='test'>
          {
            <WordSelectionContainer >
              <DecoratedContainer >
                <div className='top-header'>
                  {isMobileWindow ?
                    <CardSheetButton onClick={() => setIsWordSelectionContainerOpen(!isWordSelectionContainerOpen)}
                      state={{ isWordSelectionContainerOpen: isWordSelectionContainerOpen }}
                      disabled={false} children={(currentlySelectedWord ? "Valgt ord: " + currentlySelectedWord?.word :
                        data ? " Velg et ord" : "Laster inn...")} />

                    :

                    <p>{(currentlySelectedWord ? "Valgt ord: " + currentlySelectedWord?.word :
                      data ? " Velg et ord" : "Laster inn...")}</p>
                  }
                </div>
                <WordSelectionModalListContainer>
                  <WordSelectionModalList className={"inner-list"}>
                    {bingoWords?.map((wordObj: IBingoWord, i: number) => {
                      return (
                        <WordSelectionModalElement key={i} state={{ isUsed: wordObj.isUsed, isDisabled: isGameMode || wordObj.isUsed }} disabled={isGameMode || wordObj.isUsed} onClick={!wordObj.isUsed ? () => { elementClicked(wordObj) } : () => { }}>
                          {wordObj.word}
                        </WordSelectionModalElement>
                      )
                    })}
                  </WordSelectionModalList>
                </WordSelectionModalListContainer>
              </DecoratedContainer>
            </WordSelectionContainer>

          }
        </MobileWrapper>

      </SectionContainer>
    </>
  )

})


export default DashboardContainer;