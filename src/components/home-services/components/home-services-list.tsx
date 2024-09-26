"use client";
import React from 'react';
import Box from "@mui/material/Box";
import ServiceCard from "@/components/service-card/service-card";
import {useTranslations} from 'next-intl';

const HomeServicesList = () => {
    const t = useTranslations('Services');

    return (
        <Box
            sx={{
                mt: "30px",
                display: "grid",
                placeItems: "center",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)"
                },
                gap: "24px 20px"
            }}
        >
            {new Array(17).fill(0).map((item, idx) =>
                [1, 5, 7, 8, 11, 12, 13, 17].includes(idx + 1) && (
                    <ServiceCard
                        key={idx}
                        service={{
                            name: t(`${(idx + 1).toString()}.name`),
                            description: t(`${(idx + 1).toString()}.description`),
                            image: `/images/service.${idx + 1}.png`
                        }}
                    />
                ))}
        </Box>
    );
};

export default HomeServicesList;