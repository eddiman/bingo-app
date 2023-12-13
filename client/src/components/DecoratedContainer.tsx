import { Decoration } from "./Decoration";
import { styled } from "./theme";


const StyledDecoratedContainer = styled.div`
position: relative;
background-color: ${(props) => props.theme.miscColors.color5};
border: 1px solid ${(props) => props.theme.miscColors.color3};
color: ${(props) => props.theme.text};
padding:.5rem;
margin: auto;
`;
interface LayoutProps { 
    children?: React.ReactNode,
 } 

 export const DecoratedContainer = ({children }: LayoutProps): JSX.Element => {

    return (
        <StyledDecoratedContainer>
            <Decoration state={{ alignPos: "top-left", size: 6 }} />
            <Decoration state={{ alignPos: "top-right", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-left", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-right", size: 6 }} />
            {children}
        </StyledDecoratedContainer>
    )
} 