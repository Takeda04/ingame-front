"use client";
import React from "react";
import {ThemeProvider, createTheme} from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        primaryText: {
            main: string,
            dark: string,
        };
        secondaryText: {
            main: string,
            dark: string,
        };
        productBackground: {
            main: string;
        };
    }
    interface PaletteOptions {
        primaryText?: {
            main?: string,
            dark?: string,
        };
        secondaryText?: {
            main?: string,
            dark?: string,
        };
        productBackground: {
            main: string;
        }
    }
}

interface IThemeProviderProps {
    children: React.ReactNode;
}

const theme = createTheme({
    palette: {
        primary: {
            main: "#D3176D",
        },
        secondary: {
            main: "#1A1A1A",
            dark: "#0A0A0A",
            light: "#0F0F0F"
        },
        error: {
            main: "#000000",
        },
        primaryText: {
            main: "#FFFFFF",
            dark: "#000000"
        },
        secondaryText: {
            main: "#9D9D9D"
        },
        productBackground: {
            main: "#1E1E1E"
        }
    },

    typography: {
        fontFamily: ["ClashDisplay-Variable", "sans-serif"].join(","),
    },
    components: {

    }

});

const AppThemeProvider: React.FC<IThemeProviderProps> = ({children}) => {

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;