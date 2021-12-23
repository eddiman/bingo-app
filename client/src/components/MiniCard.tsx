import tokens from "../tokens/baseTokens";
import { styled } from "./theme";
interface FlexProps {
    readonly state: {
        direction?: string
        wrap?: string
    };
}
export const MiniCard = styled.div<FlexProps>`
border: 1px solid ${(props) => props.theme.interactive.primary.border}; 
padding:1rem;
margin: .25rem;
flex:1;
display: flex;
flex-direction: ${(props) => props.state.direction ? props.state.direction : ""};
*  {
    margin: 0;
}

@media ${tokens.constants.device.tablet} {
    min-width:4rem;
    flex:unset;
    flex:1;
    }
`;