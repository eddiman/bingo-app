import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import DashboardContainer from './containers/DashboardContainer'
import AgeGroupContainer from './containers/AgeGroupContainer'
import styled from 'styled-components';
import { IPage } from './interfaces/Interfaces';
import {
  BrowserRouter,
  Route,
  Link,
  Routes
} from "react-router-dom";
import TabButton from './components/TabButton';

const OuterContainer = styled.div`
max-width: 1200px;
margin:2rem auto 2rem auto;
border:black 1px solid;
.color-bar {
  width:100%;
  height: .5rem;
  display:flex;
  .color-1 {
    background-color: #6A5EED;
    flex:1;
  }
  .color-2 {
    background-color: #ED5E5E;
    flex:2;
  }
  .color-3 {
    background-color: #77ED5A;
    flex:3;
  }
  .color-4 {
    background-color: #EDE15E;
    flex:4;
  }
}
`;

const MainContainer = styled.div`
`;

const Header = styled.header`
padding 1rem 0 0; 
display:flex;
flex-direction  : column;
border-bottom: 1px solid black;
padding: 1rem 1rem 0 1rem;
`;

const TabNavGroupStyled = styled.nav`
display:flex;

a:first-child {
  margin: 0 .125rem 0 0;
}
`;


const pages: IPage[] = [
  {
  name: "Overview",
  slug: ""
},
{
  name : "Aldersgrupper",
  slug : "agegroup"
}];


function App() {
  const [active, setActive] = useState(pages[0].slug);
  const [currentPage, seturrentPage] = useState(pages[0]);

  const tabGroup = (group: string) => {
    setActive(group)

    console.log(active, currentPage);

  }
  return (
    <BrowserRouter>
      <OuterContainer>
        <div className="color-bar">
          <div className='color-1' />
          <div className='color-2' />
          <div className='color-3' />
          <div className='color-4' />
        </div>
        <MainContainer>
          <Header>
            <h1>title</h1>
            <TabNavGroupStyled>
              {pages.map((page, index) => {
                return(
                <TabButton route={'/' + page.slug} key={index}label={page.name} active={active === page.slug} onClick={() => setActive(page.slug)} />
              )})}

            </TabNavGroupStyled>
          </Header>

          <Routes>
            <Route path="/" element={<DashboardContainer />} />
            <Route path="/agegroup" element={<AgeGroupContainer />} />

          </Routes>
        </MainContainer>
      </OuterContainer>
    </BrowserRouter>
  );
}

export default App;
