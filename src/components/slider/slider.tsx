import React, {FC, ReactNode} from 'react';
import Box from "@mui/material/Box";
import Slider, {Settings} from "react-slick";
import SliderNextButton from "@/components/slider-next-button/slider-next-button";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const withSlider = <T extends unknown>(Component: React.ComponentType<any>) => {
    // eslint-disable-next-line react/display-name
    return (props: { list: T[] }) => {
        const settings: Settings = {
            dots: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
            nextArrow: <SliderNextButton/>
        };

        return (
            <Box
                sx={{
                    position: "relative",
                    mt: "54px",
                    "& .slick-dots": {
                        bottom: "-80px",
                        display: {xs: "none !important", sm: "block"}
                    },
                    "& .slick-list": {
                        overflow: "visible"
                    },
                    "& .slick-slide > div": {
                        display: "flex",
                        justifyContent: "center"
                    },
                    clipPath: "inset(-100vw -100vw -100vw 0)",
                }}
            >
                <Slider {...settings}>
                    {props.list.map((item, idx) => (
                        <Component
                            key={idx}
                            item={item}
                            {...props}
                        />
                    ))}
                    {props.list.map((item, idx) => (
                        <Component
                            key={idx}
                            item={item}
                            {...props}
                        />
                    ))}
                    {props.list.map((item, idx) => (
                        <Component
                            key={idx}
                            item={item}
                            {...props}
                        />
                    ))}
                </Slider>
            </Box>
        );
    };
};

export default withSlider;
