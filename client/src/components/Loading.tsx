import { useContext } from "react";
import { ITheme } from "../interfaces/Interfaces";
import tokens from "../tokens/baseTokens";
import { styled } from "./theme";
import { ThemeContext } from "./ThemeProvider";

interface LoadingContainerProps {
    readonly state: {
        size: number
    };
}
interface BarProps {
    readonly state: {
        color: string
    };
}

export const StyledLoading = styled.div<LoadingContainerProps>`
        height: ${(props) => props.state.size}rem;
        width:  ${(props) => props.state.size}rem;
        position: relative;
    `;

export const StyledLoadingBar = styled.div<BarProps>`
background-color: ${(props) => props.state.color};
position: absolute;

`;

const handleAlignment = (alignedPos : string, size: number) => {
    switch (alignedPos) {
       case "top-left":
          return "top: " + (size/2)*-1 + "px; left: " + (size/2)*-1 + "px;";
       case "top-right":
          return "top: " + (size/2)*-1 + "px; right: " + (size/2)*-1 + "px;";
       case "bottom-left":
          return "bottom: " + (size/2)*-1 + "px; left: " + (size/2)*-1 + "px;";
       case "bottom-right":
          return "bottom: " + (size/2)*-1 + "px; right: " + (size/2)*-1 + "px;";
       default:
          return "#fff";
    }}

    export const Loading = () => {
    const theme = useContext(ThemeContext).theme as ITheme;

        return(

            <StyledLoading state={{size:6}}>
            <StyledLoadingBar state={{color:theme.miscColors.color1}}/>
            <StyledLoadingBar state={{color:theme.miscColors.color2}}/>
            <StyledLoadingBar state={{color:theme.miscColors.color3}}/>
            <StyledLoadingBar state={{color:theme.miscColors.color4}}/>
            </StyledLoading>
            )
    }