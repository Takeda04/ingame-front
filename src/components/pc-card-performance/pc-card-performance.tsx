import React, {FC} from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface GameData {
    [game: string]: {
        [resolution: string]: number;
    };
}
interface IPcCardPerformanceProps {
    resolutions: string[];
    gamesData: GameData;
}

const PcCardPerformance: FC<IPcCardPerformanceProps> = ({ resolutions, gamesData }) => {
    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: 'transparent',
                color: '#fff',
                borderRadius: 0
            }}
        >
            <Table aria-label="performance table" sx={{
                borderColor: theme => theme.palette.primaryText.main,
                borderWidth: "1px",
                borderStyle: "solid"
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{
                            color: theme => theme.palette.primaryText.main,
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: "17px",
                            padding: "7px 8px"
                        }}>Игра/FPS</TableCell>
                        {resolutions.map(resolution => (
                            <TableCell key={resolution} align="left" sx={{
                                color: theme => theme.palette.primaryText.main,
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px",
                                padding: "7px 8px"
                            }}>
                                {resolution}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(gamesData).map(([game, fpsInfo]) => (
                        <TableRow key={game}>
                            <TableCell component="th" scope="row" sx={{
                                borderBottom: '1px solid #fff',
                                padding: "7px 8px",
                                color: theme => theme.palette.primaryText.main,
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: "17px"
                            }}>
                                {game}
                            </TableCell>
                            {resolutions.map(resolution => (
                                <TableCell key={resolution} align="left" sx={{
                                    borderBottom: '1px solid #fff',
                                    padding: "7px 8px",
                                    color: theme => theme.palette.primaryText.main,
                                    fontWeight: 500,
                                    fontSize: 14,
                                    lineHeight: "17px"
                                }}>
                                    {fpsInfo[resolution] || '-'}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PcCardPerformance;