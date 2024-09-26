import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Image from "next/image";
import {SxProps} from "@mui/system/styleFunctionSx";
import {Theme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import QuoteIcon from "@/ui/icons/quote-icon";
import IconButton from "@mui/material/IconButton";
import PlayIcon from "@/ui/icons/play-icon";
import WhyChooseUsItemModal from "@/components/why-choose-us/components/why-choose-us-item-modal";
import {CommitFromClients} from "@/http/comments-api";
import {useLocale} from "next-intl";

interface IWhyChooseUsItemProps {
    sxContainer?: SxProps<Theme>;
    item: CommitFromClients;
}

const WhyChooseUsItem: FC<IWhyChooseUsItemProps> = ({sxContainer, item}) => {
    const [isModelOpened, setIsModelOpened] = useState(false);
    const localActive = useLocale() as "ru" | "uz";

    const openModal = () => {
        setIsModelOpened(true);
    }

    return (
        <>
            <WhyChooseUsItemModal
                isOpen={isModelOpened}
                onClose={() => setIsModelOpened(false)}
                video={item.video}
            />
            <Box
                sx={{
                    maxWidth: "261px",
                    width: "100%",
                    position: "relative",
                    height: "512px",
                    borderRadius: "24px",
                    display: "flex",
                    ...sxContainer
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        backgroundColor: theme => theme.palette.primary.main,
                        zIndex: 1,
                        maxWidth: "260px",
                        padding: "12px 18px",
                        top: "-48px",
                        left: "-17px"
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {xs: 13, sm: 16},
                            fontWeight: 600,
                            lineHeight: "20px",
                            color: theme => theme.palette.primaryText.main
                        }}
                    >
                        {item.commit[localActive]}
                    </Typography>
                    <QuoteIcon
                        sx={{
                            position: "absolute",
                            right: "-6px",
                            bottom: "-12px"
                        }}
                    />
                </Box>
                <Image
                    src={item.image}
                    alt="image"
                    fill
                    style={{
                        objectFit: "cover",
                        borderRadius: "24px"

                    }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <Box
                    sx={{
                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 59.53%, rgba(0, 0, 0, 0.8) 100%)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        borderRadius: "24px"
                    }}
                />
                <Box
                    sx={{
                        marginTop: "auto",
                        width: "100%",
                        position: "relative",
                        zIndex: 1,
                        padding: "24px 20px",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            lineHeight: "30px",
                            fontWeight: 700,
                            color: theme => theme.palette.primaryText.main,
                        }}
                    >
                        {item.name}
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            fontSize: 16,
                            lineHeight: "24px",
                            fontWeight: 400,
                            color: theme => theme.palette.primaryText.main,
                        }}
                    >
                        {item.description[localActive]}
                    </Typography>

                    <IconButton
                        sx={{
                            backgroundColor: theme => theme.palette.primary.main,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: "4px",
                            padding: "0 11px",
                            borderRadius: 0,
                            fontSize: 16,
                            lineHeight: "30px",
                            color: theme => theme.palette.primaryText.main
                        }}
                        onClick={openModal}
                    >
                        Play
                        <PlayIcon
                            sx={{
                                fontSize: 14,
                                ml: "6px"
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
};

export default WhyChooseUsItem;