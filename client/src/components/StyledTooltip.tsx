import { Children } from "react";
import { Decoration } from "./Decoration";
import { styled } from "./theme";

const Tooltip = styled.div`
position: relative;
background-color: ${(props) => props.theme.background};
border: 1px solid ${(props) => props.theme.interactive.primary.defaultText};
color: ${(props) => props.theme.text};
padding:.5rem;
* {
    margin: 0;
}
p {
    line-height:1.25rem;
}
`;
interface LayoutProps  { 
    children?: React.ReactNode
 }

export const StyledTooltip: React.FC = ((props: LayoutProps) => {
    return (
        <Tooltip>
             <Decoration state={{ alignPos: "top-left", size: 6 }} />
            <Decoration state={{ alignPos: "top-right", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-left", size: 6 }} />
            <Decoration state={{ alignPos: "bottom-right", size: 6 }} />
            {props.children}
        </Tooltip>
    )
}) 