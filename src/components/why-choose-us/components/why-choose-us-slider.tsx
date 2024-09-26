import {FC} from "react";
import withProductSlider from "@/components/product-slider/product-slider";
import WhyChooseUsItem from "@/components/why-choose-us/components/why-choose-us-item";
import {CommitFromClients} from "@/http/comments-api";

interface IWhyChooseUsSlider {
    commitsFromClients: CommitFromClients[];
}
const WhyChooseUsSlider: FC<IWhyChooseUsSlider> = ({ commitsFromClients }) => {
    const Slider = withProductSlider(
        WhyChooseUsItem
    );

    const breakpoints = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 4,
        },
        laptop: {
            breakpoint: {
                max: 1200,
                min: 850
            },
            items: 3,
        },
        tablet: {
            breakpoint: {
                max: 850,
                min: 600
            },
            items: 2,
        },
        mobile: {
            breakpoint: {
                max: 600,
                min: 0
            },
            items: 1,
        }
    }

    return (
        <Slider
            breakpoints={breakpoints}
            list={commitsFromClients}
            partialVisible={false}
            infinite={true}
            containerSx={{
                clipPath: "inset(-100vw -100vw -100vw 0)",
                "& .react-multi-carousel-list": {
                    overflow: "visible"
                },
                "& .carousel-item": {
                    marginLeft: "5px",
                    // marginRight: "32px",
                    // minWidth: "261px",
                    // maxWidth: "261px",
                },
            }}
        />
    )
}
export default WhyChooseUsSlider;