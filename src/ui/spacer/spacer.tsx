import React, {FC} from 'react';
import Box from "@mui/material/Box";

interface ISpacer {
    space: number;
}

const Spacer: FC<ISpacer> = ({ space }) => {
    return (
        <Box
            sx={{
                marginTop: `${space}px`
            }}
        />
    );
};

export default Spacer;