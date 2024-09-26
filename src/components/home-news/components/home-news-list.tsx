import React, {FC} from 'react';
import NewsCard from "@/components/news-card/news-card";
import { Box } from '@mui/material';
import {News} from "@/http/news-api";

interface IHomeNewsProps {
    news: News[];
}
const HomeNewsList: FC<IHomeNewsProps> = ({ news }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                },
                placeItems: "center",
                mt: "30px",
                gap: "40px"
            }}
        >
            {news.map((item, idx) => (
                <NewsCard
                    key={idx}
                    item={item}
                />
            ))}
        </Box>
    );
};

export default HomeNewsList;