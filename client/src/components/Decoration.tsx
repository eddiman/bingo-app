import tokens from "../tokens/baseTokens";
import { styled } from "./theme";
interface StyledDecoratorProps {
    readonly state: {
        alignPos: string,
        size: number,
    };
  }
  //Used for those little rectangles on each corner, must be inserted in to a 'position: relative' container
export const Decoration = styled.div<StyledDecoratorProps>`
@media ${tokens.constants.device.mobileL} { 
   height:${(props) =>props.state.size/1.25}px;
   width: ${(props) =>props.state.size/1.25}px;
}
  height:${(props) =>props.state.size}px;
  width: ${(props) =>props.state.size}px;
  border-radius: 20px;
  position: absolute;
  background-color: #ffe200};
  ${(props) => handleAlignment(props.state.alignPos, props.state.size) }

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
    }
  };