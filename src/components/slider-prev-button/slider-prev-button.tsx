import React from 'react';
import ArrowRightIcon from "@/ui/icons/arrow-right-icon";
import IconButton from "@mui/material/IconButton";

const SliderPrevButton = (props: any) => {
    return (
        <IconButton
            sx={{
                width: {xs: "30px", sm: "60px"},
                height: {xs: "30px", sm: "60px"},
                backgroundColor: theme => theme.palette.primaryText.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                transform: "translate(0, -50%)",
                top: "50%",
                left: "0"
            }}
            onClick={props.onClick}
        >
            <ArrowRightIcon
                sx={{
                    transform: "rotate(-180deg)",
                    fontSize: {xs: 14, sm: 24}
                }}
            />
        </IconButton>
    );
};

export default SliderPrevButton;