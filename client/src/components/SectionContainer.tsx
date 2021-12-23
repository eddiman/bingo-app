import tokens from "../tokens/baseTokens";
import { styled } from "./theme";

interface FlexProps {
    readonly state?: {
        direction?: string
        wrap?: string,
        marginAuto?: boolean
    };
}

export const SectionContainer = styled.section<FlexProps>`
    display:flex;
    flex-wrap: ${(props) => props.state?.wrap ? props.state.wrap : ""} ;
    flex-direction: ${(props) => props.state?.direction ? props.state.direction : ""} ;
    margin: 1rem ${(props) => props.state?.marginAuto ? "auto" : "0"};
    h3 {
        margin-bottom: 1rem;
    }

    @media ${tokens.constants.device.tablet} {
        flex-wrap: wrap;
        }
    `;