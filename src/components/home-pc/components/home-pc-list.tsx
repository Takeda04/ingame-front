import {Box} from '@mui/material';
import React, {FC} from 'react';
import PCCard from "@/components/pc-card/pc-card";
import {Desktop} from "@/http/desktops-api";

interface IHomePCListProps {
    desktops: Desktop[];
}

const HomePCList: FC<IHomePCListProps> = ({desktops}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                },
                width: "100%",
                placeItems: "center",
                mt: "30px",
                gap: "40px"
            }}
        >
            {desktops.map((item) => (
                <PCCard key={item.id} pc={item}/>
            ))}
        </Box>
    );
};

export default HomePCList;