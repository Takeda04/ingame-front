import {Box, Typography} from '@mui/material';
import React, {FC} from 'react';
import {News} from "@/http/news-api";
import {useLocale} from "next-intl";
import {clampText} from "@/utils/clamp-text";

interface INewsCardProps {
    item: News;
}

const NewsCard: FC<INewsCardProps> = ({ item }) => {
    const createdDate = new Date(item.created_at);
    const localActive = useLocale() as "ru" | "uz";


    function youtubeParser(url: string){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length==11)? match[7] : false;
    }

    return (
        <Box
            sx={{
                backgroundColor: theme => theme.palette.secondary.light,
                maxWidth: "386px",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    height: "280px"
                }}
            >
                <iframe rel="preconnect" width="100%" height="100%"
                        src={`https://www.youtube.com/embed/${youtubeParser(item.youtube_url)}`} title="Как взламывают
                    сайты? XSS уязвимость, SQL-injection, CSRF, Code Injection" frameBorder="0" allow="accelerometer;
                    autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen >
                </iframe>
            </Box>
            <Box
                sx={{
                    position: "relative",
                    padding: "15px"
                }}
            >
                <Typography
                    sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        borderWidth: "1px",
                        borderColor: theme => theme.palette.primaryText.main,
                        borderStyle: "solid",
                        color: theme => theme.palette.primaryText.main,
                        fontSize: 16,
                        fontWeight: 700,
                        lineHeight: "20px",
                        width: "min-content",
                        padding: "8px",
                        marginTop: "-35px"
                    }}
                >
                    {createdDate.getDate()}.{createdDate.getMonth()}.{createdDate.getFullYear()}
                </Typography>
                <Typography
                    component="h5"
                    sx={{
                        fontWeight: 600,
                        fontSize: {xs: 16, sm: 20},
                        lineHeight: "24px",
                        mt: "14px",
                        color: theme => theme.palette.primaryText.main,
                        ...clampText(1, 24),
                    }}
                >
                    {item.title[localActive]}
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        fontWeight: 500,
                        fontSize: {xs: 12, md: 14},
                        lineHeight: "20px",
                        color: theme => theme.palette.primaryText.main,
                        mt: "8px",
                        height: "40px",
                        ...clampText(2, 30),
                    }}
                >
                    {item.description[localActive]}
                </Typography>
            </Box>
        </Box>
    );
};

export default NewsCard;