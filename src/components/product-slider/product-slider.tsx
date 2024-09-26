import React from 'react';
import Box from "@mui/material/Box";
import Carousel, {CarouselProps, ResponsiveType} from "react-multi-carousel";
import SliderNextButton from "@/components/slider-next-button/slider-next-button";
import SliderPrevButton from "@/components/slider-prev-button/slider-prev-button";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import "react-multi-carousel/lib/styles.css";

interface IProps<T> {
    containerSx?: SxProps<Theme>;
    breakpoints?: ResponsiveType;
    list: T[];
    carouselProps?: CarouselProps;
    partialVisible?: boolean;
    infinite?: boolean;
}

// eslint-disable-next-line react/display-name
const withProductSlider = <T extends unknown>(Component: React.ComponentType<any>) => (props: IProps<T>) => {
    const {list} = props;

    return (
        <Box
            sx={{
                position: "relative",
                "& .carousel-item": {
                    // marginRight: "20px",
                },
                "& .react-multi-carousel-dot-list": {
                    bottom: "-50px"
                },
                "& .react-multi-carousel-dot button": {
                    width: "11px",
                    height: "11px",
                    borderRadius: 0,
                    borderWidth: 0,
                    backgroundColor: "#D9D9D9",
                    m: 0
                },
                "& .react-multi-carousel-dot:not(:last-child) button": {
                    mr: "22px"
                },
                "& .react-multi-carousel-dot--active button": {
                    backgroundColor: theme => theme.palette.primary.main
                },
                ...props.containerSx,
                paddingBottom: "50px"
            }}
        >
            <Carousel
                swipeable
                showDots={true}
                ssr={true}
                keyBoardControl={true}
                slidesToSlide={1}
                customLeftArrow={<SliderPrevButton/>}
                customRightArrow={<SliderNextButton/>}
                partialVisible={props.partialVisible}
                itemClass={"carousel-item"}
                infinite={props.infinite}
                responsive={
                    !props.breakpoints ? {
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                        },
                        mobile: {
                            breakpoint: {
                                max: 630,
                                min: 0
                            },
                            items: 1,
                        },
                        smallTablet: {
                            breakpoint: {
                                max: 950,
                                min: 630
                            },
                            items: 2,
                        },
                        tablet: {
                            breakpoint: {
                                max: 1200,
                                min: 950
                            },
                            items: 3,
                        },
                    } : props.breakpoints
                }
                {...props.carouselProps}
            >
                {list.map((item, idx) => (
                    <Box
                        key={idx}
                        sx={{}}
                    >
                        <Component
                            item={item}
                            {...props}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default withProductSlider;
