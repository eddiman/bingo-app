import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import DashboardContainer from './containers/DashboardContainer'
import { ThemeContext } from "./components/ThemeProvider";
import { IPage, ITheme } from './interfaces/Interfaces';
import {
  BrowserRouter,
  Route,
  Link,
  Routes,
  useLocation,
  useParams
} from "react-router-dom";
import TabButton from './components/TabButton';
import { otDarkTheme, otLightTheme, piresDarkTheme, piresLightTheme, styled } from './components/theme';
import { Decoration } from './components/Decoration';
import tokens from './tokens/baseTokens';
import Button from './components/Button';
import { SectionContainer } from './components/SectionContainer';

const Container = styled.div`
background-color: ${(props) => props.theme.background};
color: ${(props) => props.theme.text};
padding: 2rem;
display:flex;
min-height:99vh; /*WOO OMAGCIS NUMABAR*/
flex-direction: column;
transition: background-color .2s ease-in-out, color .2s ease-in-out;
@media ${tokens.constants.device.tablet} {
  padding: 1rem;
}
tspan {
  fill: ${(props) => props.theme.text};
  @media ${tokens.constants.device.tablet} {
    font-size: 0.75rem;
    padding: 1rem;
  
      }
}
`;
const ScreenContainer = styled.div`
max-width: 1200px;
margin: 0 auto;
width:100%;

`;

const OuterContainer = styled.div`
border:1px solid ${(props) => props.theme.text};
position: relative;

.color-bar {
  width:100%;
  height: .5rem;
  display:flex;
  
    transition: height .2s ease-in-out;
    &:hover {
      height:2rem;
    

  }
  .color-1 {
    background-color: ${(props) => props.theme.miscColors.color1};
    flex:1;
    animation: anim1 30s infinite ease-in-out;
  }
  .color-2 {
    background-color: ${(props) => props.theme.miscColors.color2};
    flex:2;
    animation: anim2 22s infinite ease-in-out;
    
  }
  .color-3 {
    background-color: ${(props) => props.theme.miscColors.color3};
    flex:3;

  }
  .color-4 {
    background-color: ${(props) => props.theme.miscColors.color4};
    flex:4;
    animation: anim2 26s infinite ease-in-out;
    
  }
  .color-5 {
    background-color: ${(props) => props.theme.miscColors.color5};
    flex:5;
  }

  @keyframes anim1 {
    0% {flex:1;}
    50% {flex:8;}
    100% {flex:1;}
  }
  @keyframes anim2 {
    0% {flex:2;}
    50% {flex:4;}
    100% {flex:2;}
  }
  @keyframes anim4 {
    0% {flex:4;}
    50% {flex:1;}
    100% {flex:4;}
  }
}
`;
const MainContainer = styled.div`
`;

const Header = styled.header`
display:flex;
flex-direction: column;
border-bottom: 1px solid ${(props) => props.theme.text};
padding: 1.5rem 1.5rem 0 1.5rem;

    
@media ${tokens.constants.device.tablet} {
  padding: 1rem 1rem 0 1rem;
    }

`;

const TabNavGroupStyled = styled.nav`
display:flex;
position: relative;
overflow-x: scroll;
top:1px;
&::-webkit-scrollbar {
  display: none;
}

a:first-child {
  margin: 0 .125rem 0 0;
}
/*
&:after {
  content:'';
  position: fixed;
  right:3rem;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, ${(props) => props.theme.background} 100%);
  height:2.75rem;
  width:4rem;
  color: black;
  z-index: 2;
  
}
*/
@media ${tokens.constants.device.tablet} {
  }
`;



function App() {

  const [active, setActive] = useState(window.location.pathname.substring(1));
  const { setMainTheme } = useContext(ThemeContext)
  const setLocalStorageTheme = (themeString: string) => {
    window.localStorage.setItem('theme', themeString)
  };
  const getLocalStorageTheme = () => {
    return window.localStorage.getItem('theme')
  };
  const [currentTheme, setCurrentTheme] = useState(getLocalStorageTheme());

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    console.log(localTheme);
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme) {
      setAppTheme("otDarkTheme");
    } else {
      setAppTheme(localTheme ? localTheme : "otLightTheme");
    }
  }, []);

  const setAppTheme = (themeName: string) => {
    switch (themeName) {

      case "otLightTheme":
        setMainTheme(otLightTheme);
        setLocalStorageTheme('otLightTheme')
        break;
      case "otDarkTheme":
        setMainTheme(otDarkTheme);
        setLocalStorageTheme('otDarkTheme')
        break;
    }
  };

  const toggleAppTheme = () => {
    if (getLocalStorageTheme() === "otDarkTheme") {
      setAppTheme("otLightTheme");
    } else {
      setAppTheme("otDarkTheme");
    }
  }


  return (
    <BrowserRouter>
      <Container>
        <ScreenContainer>
          <OuterContainer>
            <div className="color-bar">
              <div className='color-1' />
              <div className='color-2' />
              <div className='color-3' />
              <div className='color-4' />
              <div className='color-5' />
            </div>
            <Decoration state={{ alignPos: "top-left", size: 10 }} />
            <Decoration state={{ alignPos: "top-right", size: 10 }} />
            <Decoration state={{ alignPos: "bottom-left", size: 10 }} />
            <Decoration state={{ alignPos: "bottom-right", size: 10 }} />
            <MainContainer>
              <Header>
                <h1>Bingo</h1>
              </Header>

              <Routes>
                <Route path="/" element={<DashboardContainer />} />

              </Routes>
            </MainContainer>
          </OuterContainer>
        </ScreenContainer>
        <SectionContainer state={{marginAuto : true}}>
          <div>

            <Button disabled={false} onClick={() => toggleAppTheme()}>Toggle theme</Button>
          </div>
        </SectionContainer>
      </Container>

    </BrowserRouter>
  );
}

export default App;
