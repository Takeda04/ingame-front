import React from 'react';
import { Box } from '@mui/material';
import "./style.css";

const ProgressWithPoints = () => {
    return (
        <Box
            sx={{
                mt: "9px"
            }}
        >
            <ul id="progressbar">
                <li className="active">
                    6
                </li>
                <li className="active">
                    12
                </li>
            </ul>
        </Box>
    );
};

export default ProgressWithPoints;