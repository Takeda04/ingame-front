import React, {FC} from 'react';
import {Box, Rating, Typography} from '@mui/material';
import {IProductComment} from "@/http/products-api";
import {clampText} from "@/utils/clamp-text";
import Image from "next/image";

interface IReviewCardProps {
    item: IProductComment;
}

const ReviewCard: FC<IReviewCardProps> = ({item}) => {
    return (
        <Box
            sx={{
                borderWidth: "8px",
                borderStyle: "solid",
                borderColor: theme => theme.palette.primaryText.main,
                display: "flex",
                alignItems: "center",
                padding: {xs: "21px 18px", sm: "41px 48px"},
            }}
        >

            <Box
                sx={{
                    width: "90px",
                    height: "90px",
                    position: "relative"
                }}
            >
                {item.image ? (
                    <Image
                        src={item.image}
                        alt="comment image"
                        fill
                        style={{
                            objectFit: "cover"
                        }}
                    />
                ) : null}

            </Box>
            <Box
                sx={{
                    ml: {xs: "13px", sm: "32px"},
                }}
            >
                <Typography
                    component="h4"
                    sx={{
                        fontSize: {xs: 16, sm: 20},
                        fontWeight: 700,
                        color: theme => theme.palette.primaryText.main
                    }}
                >
                    {item.user_name}
                </Typography>

                <Typography
                    component="p"
                    sx={{
                        fontWeight: 500,
                        fontSize: {xs: 10, sm: 14},
                        color: theme => theme.palette.primaryText.main,
                        ...clampText(3, 17)
                    }}
                >
                    {item.comment}
                </Typography>
                <Rating
                    readOnly
                    value={item.rating}
                    sx={{
                        "& svg": {
                            color: theme => theme.palette.primary.main
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default ReviewCard;