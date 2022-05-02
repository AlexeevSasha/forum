import { DefaultTheme } from 'styled-components'
export const theme: DefaultTheme = {
    colors: {
        darkGrey: "#303030",
        grey: "#707070",
        lightGrey: "#D1D1D1",
        lightestGrey: "#F8F8F8",
        lightestGrey1: "#EDEDED",
        purple: "#5348C7",
        red: "#E4163A"
    },
    media: {
        _480: "(max-width: 480px)",
        _768: "(max-width: 768px)",
        _980: "(max-width: 980px)",
        _1440: "(max-width: 1440px)",
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            darkGrey: string;
            grey: string;
            lightGrey: string;
            lightestGrey: string;
            lightestGrey1: string,
            purple: string;
            red:string;
        },  media: {
            _480: "(max-width: 480px)",
            _768: "(max-width: 768px)",
            _980: "(max-width: 980px)",
            _1440: "(max-width: 1440px)",
        }
    }
}
