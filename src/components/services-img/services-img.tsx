"use client";
import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppContainer from "@/ui/app-container/app-container";
import AppButton from '@/ui/button/button';

interface IServiceImg {
    title: string;
    text: string;
    img: React.JSX.Element;
    buttonLabel?: string;
    onClickButton?: () => void;
}

const ServicesImg: FC<IServiceImg> = ({title, text, img, buttonLabel, onClickButton}) => {
    return (
        <Box
            sx={{
                height: "567px",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#000000"
            }}
        >
            <AppContainer
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: {xs: "column", md: "row"}
                }}
            >
                <Box
                    sx={{
                        maxWidth: "527px"
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: {xs: 25, sm: 60},
                            lineHeight: {xs: "30px", sm: "73px"},
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            mt: "8px",
                            color: "#B2B2B2",
                            fontSize: {xs: 14, sm: 16},
                            fontWeight: 500
                        }}
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                    {buttonLabel && (
                        <AppButton
                            label={buttonLabel}
                            size="large"
                            variant="outlined"
                            onClick={onClickButton}
                            sx={{
                                textTransform: "math-auto",
                                mt: "20px",
                                borderWidth: "3px",
                                color: "primaryText.main",
                                fontSize: {xs: 16, sm: 25},
                                padding: {xs: "10px 22px", sm: "14px 23px"},
                                "&:hover": {
                                    borderWidth: "3px",
                                }
                            }}
                        />
                    )}
                </Box>
                <Box
                    sx={{
                        width: {xs: "256px", sm: "631px"},
                        height: {xs: "210px", sm: "400px"},
                        position: "relative",
                        order: {xs: -1, md: 1}
                    }}
                >
                    {img}
                </Box>
            </AppContainer>
        </Box>
    );
};

export default ServicesImg;