import {Box} from '@mui/material';
import React from 'react';
import AppContainer from "@/ui/app-container/app-container";
import {ServicesQuestionItem} from "@/components/services-question-item/services-question-item";

const ServicesQuestion = () => {
    return (
        <Box>
            <AppContainer>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "41px",
                        marginTop: {xs: "40px", lg: "-107px"},
                        flexWrap: "wrap"
                    }}
                >
                    <ServicesQuestionItem trKey='1'/>
                    <ServicesQuestionItem trKey='2'/>
                    <ServicesQuestionItem trKey='3'/>
                    <ServicesQuestionItem trKey='4'/>
                </Box>
            </AppContainer>
        </Box>
    );
};

export default ServicesQuestion;