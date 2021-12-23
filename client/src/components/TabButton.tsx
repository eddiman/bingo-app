import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '../components/theme';


interface StyledTabProps {
    readonly state: {
        isActive: boolean,
        isDisabled: boolean
    };
}

const TabButtonStyled = styled(Link) <StyledTabProps>`
background-color: ${(props) => props.theme.interactive.primary.default};
color: ${(props) => props.theme.interactive.primary.defaultText};
min-width: 8rem;
width: 8rem;
padding: .5rem;
margin: 0 .125rem 0 .125rem;
text-decoration: none;
position:relative;
border-top: 1px solid ${(props) => props.theme.interactive.primary.activeText};
border-left: 1px solid ${(props) => props.theme.interactive.primary.activeText};
border-right: 1px solid ${(props) => props.theme.interactive.primary.activeText};
border-bottom: 1px solid ${(props) => props.theme.interactive.primary.activeText};
transition: background-color .2s ease-in-out, color .2s ease-in-out, border .1s ease-in-out;
z-index:1;

&:after {
    transition: background-color .25s ease-in-out, height .2s ease-in-out;
    content:'';
    position:absolute;
    left:-1px;
    right:-1px;
    bottom:-1px;
    height:0;
    z-index: -1;    
}

&:hover {
  color: ${(props) => props.theme.interactive.primary.hoverText};
  height:calc(100% + 0px);
  
  &:after {
      bottom:-1px;
    background-color: ${(props) => props.theme.interactive.primary.hover};
    height:calc(100% + 1px);
  } 
}



${(props) => props.state.isActive ? `
background-color: ${props.theme.interactive.primary.active};
color: ${props.theme.interactive.primary.activeText};
border-bottom: 1px solid ${ props.theme.interactive.primary.active};
&:after {
    height:0;
}

&:hover {

    &:after {
      height:calc(100% +1px);
    } 
` : ""}

&:active {
    &:after { 
    background-color: #5f5f5f;
    }
}
${props => props.state.isDisabled ? `
background-color: ${props.theme.interactive.primary.disabled};
border-left: 1px solid ${props.theme.interactive.primary.disabled};
border-right: 1px solid ${props.theme.interactive.primary.disabled};
border-top: 1px solid ${props.theme.interactive.primary.disabled};
color: ${props.theme.interactive.primary.disabledText};
cursor: default;
&:hover {
    color: ${props.theme.interactive.primary.disabledText};
    &:after {
    background-color: unset;
    height:0;
    } 
` : ""};

`;


type TabProps = {
    label: string,
    route: string,
    isActiveTab: boolean,
    disabled: boolean
    onClick: () => void

}
const TabButton = ({ label, route, isActiveTab, disabled, onClick }: TabProps): JSX.Element =>
    <TabButtonStyled state={{ isActive: isActiveTab, isDisabled: disabled }} to={disabled ? "#" : route}
     onClick={disabled ? () => { } : onClick}>
        {label}
    </TabButtonStyled>;



export default TabButton;