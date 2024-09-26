import ArrowRightIcon from '@/ui/icons/arrow-right-icon';
import React from 'react';
import IconButton from '@mui/material/IconButton';


const SliderNextButton = (props: any) => {
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
                right: "0",

                "&:hover": {
                    backgroundColor: theme => theme.palette.primaryText.main,
                }
            }}
            onClick={props.onClick}
        >
            <ArrowRightIcon
                sx={{
                    fontSize: {xs: 14, sm: 24}
                }}
            />
        </IconButton>
    );
};

export default SliderNextButton;