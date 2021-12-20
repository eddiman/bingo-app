import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


interface StyledTabProps {
    readonly state: {};
}

const TabButtonStyled = styled(Link) <StyledTabProps>`
background-color: #C4C4C4;
color: #2f2f2f;
min-width: 8rem;
width: 8rem;
padding: .5rem;
margin: 0 .125rem 0 .125rem;
text-decoration: none;
position:relative;
border-left: 1px solid #C4C4C4;
border-right: 1px solid #C4C4C4;
border-top: 1px solid #C4C4C4;
transition: background-color .2s ease-in-out, color .2s ease-in-out;
z-index:0;

&:after {
    transition: background-color .25s ease-in-out, height, .2s ease-in-out;
    content:'';
    position:absolute;
    left:-1px;
    right:-1px;
    bottom: 0;
    height:0;
    z-index: -1;    
}


&:hover {
  color: #ffffff;
  &:after {
      bottom:0;
    background-color: #2f2f2f;
    height:calc(100% + 1px);
  } 
}

${props => props.state.isActive ? `
background-color: #fff; 
color: #2f2f2f;
border: 1px solid black; 
border-bottom: 0;
&:after {
    border-left: 1px solid #000;
    border-right: 1px solid #000;
    bottom:-1px;
    height: 1px;
    background-color: #fff;
}` : ""}
`;


type TabProps = {
    label: string,
    route: string,
    active: boolean,
    onClick: () => void

}
const TabButton = ({ label, route, active, onClick }: TabProps): JSX.Element =>
    <TabButtonStyled state={{ isActive: active }} to={route} onClick={onClick}>
        {label}
    </TabButtonStyled>;



export default TabButton;