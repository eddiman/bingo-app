import { ITheme } from "../interfaces/Interfaces";
import baseTokens from "../tokens/baseTokens";
import piresTokens from "../tokens/piresTokens";
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const piresLightTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.light.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.light.default
    },
    background: baseTokens.ui.background.light.background,
    text: baseTokens.ui.background.light.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: piresTokens.light.interactive.primary.default,
            defaultText: piresTokens.light.interactive.primary.defaultText,
            hover: piresTokens.light.interactive.primary.hover,
            hoverText: piresTokens.light.interactive.primary.hoverText,
            active: piresTokens.light.interactive.primary.active,
            activeText: piresTokens.light.interactive.primary.activeText,
            disabled: piresTokens.light.interactive.primary.disabled,
            disabledText: piresTokens.light.interactive.primary.disabledText,
            focus: piresTokens.light.interactive.primary.focus,
            label: piresTokens.light.interactive.primary.label,
            border: piresTokens.light.interactive.primary.border
        },
        secondary: {
            default: piresTokens.light.interactive.secondary.default,
            hover: piresTokens.light.interactive.secondary.hover,
            active: piresTokens.light.interactive.secondary.active,
            focus: piresTokens.light.interactive.secondary.focus,
            label: piresTokens.light.interactive.secondary.label
        }
    },
    miscColors: {
        color1: piresTokens.miscColors.color1,
        color2: piresTokens.miscColors.color2,
        color3: piresTokens.miscColors.color3,
        color4: piresTokens.miscColors.color4,
        color5: piresTokens.miscColors.color5,
    }
};

export const piresDarkTheme: ITheme = {
    link: {
        default: baseTokens.interactive.link.dark.default
    },
    focus: {
        default: baseTokens.interactive.focusOutline.dark.default
    },
    background: baseTokens.ui.background.dark.background,
    text: baseTokens.ui.background.dark.bodyText,
    alphaBackground: baseTokens.ui.alphaBackground,

    interactive: {
        primary: {
            default: piresTokens.dark.interactive.primary.default,
            defaultText: piresTokens.dark.interactive.primary.defaultText,
            hover: piresTokens.dark.interactive.primary.hover,
            hoverText: piresTokens.dark.interactive.primary.hoverText,
            active: piresTokens.dark.interactive.primary.active,
            activeText: piresTokens.dark.interactive.primary.activeText,
            disabled: piresTokens.dark.interactive.primary.disabled,
            disabledText: piresTokens.dark.interactive.primary.disabledText,
            focus: piresTokens.dark.interactive.primary.focus,
            label: piresTokens.dark.interactive.primary.label,
            border: piresTokens.dark.interactive.primary.border
        },
        secondary: {
            default: piresTokens.dark.interactive.secondary.default,
            hover: piresTokens.dark.interactive.secondary.hover,
            active: piresTokens.dark.interactive.secondary.active,
            focus: piresTokens.dark.interactive.secondary.focus,
            label: piresTokens.dark.interactive.secondary.label
        }
    },
    miscColors: {
        color1: piresTokens.miscColors.color1,
        color2: piresTokens.miscColors.color2,
        color3: piresTokens.miscColors.color3,
        color4: piresTokens.miscColors.color4,
        color5: piresTokens.miscColors.color5,
    }
};

export const styled = baseStyled as ThemedStyledInterface<ITheme>;