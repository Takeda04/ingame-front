"use client";
import {Box} from '@mui/material';
import React from 'react';
import animation from "../../assets/loaders/loader.gif";
import Image from "next/image";

const Loading = () => {

    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10000,
                width: "100%",
                height: "100%",
                backgroundColor: "#24242466",

                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Image
                src={animation.src}
                alt="animation"
                height={60}
                width={60}
            />
        </Box>
    );
};

export default Loading;