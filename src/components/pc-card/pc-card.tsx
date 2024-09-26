import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {
    Divider,
    Modal,
    useTheme,
} from "@mui/material";
import ButtonOutlined from "@/ui/button/button-outlined";
import CpuIcon from "@/ui/icons/cpu-icon";
import GpuIcon from "@/ui/icons/gpu-icon";
import CoolingIcon from "@/ui/icons/cooling-icon";
import MemoryIcon from "@/ui/icons/memory-icon";
import Button from "@mui/material/Button";
import Compare from "@/ui/icons/compare";
import IconButton from "@mui/material/IconButton";
import {Desktop} from "@/http/desktops-api";
import {useLocale, useTranslations} from "next-intl";
import {useAppContext} from "@/context/app-context";
import {
    addProductToBasket,
    addProductToCompare,
    deleteProductFromCompare, isProductInBasket,
    isProductInCompare
} from "@/utils/basket-util";
import {useRouter} from "next/navigation";
import AppButton from "@/ui/button/button";
import NavigationLink from "@/components/navigation-link/navigation-link";
import PcCardPerformance from '../pc-card-performance/pc-card-performance';

interface IPCCardProps {
    pc: Desktop;
}

const pcType = {
    office: "office",
    allin: "allin",
    games: "games",
    creation: "creation",
    streaming: "streaming"
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: "0px 0px 10.8px 9px #2C2C2C1A",
    maxWidth: "594px",
    width: "100%",
    padding: "0 15px",
};

const PCCard: FC<IPCCardProps> = ({pc}) => {
    const theme = useTheme();
    const localActive = useLocale() as "ru" | "uz";
    const {currency, formatPrice, refreshBasketProducts} = useAppContext();
    const [isProductInCmpr, setIsProductInCmpr] = useState(isProductInCompare(pc.id));
    const [isOpenModal, setIsOpenModal] = useState(false);
    const router = useRouter();
    const [isInBasket, setIsInBasket] = useState(isProductInBasket(pc.id, true));
    const t = useTranslations("PCCard");

    const appendProductInCompare = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isProductInCmpr) {
            deleteProductFromCompare(pc.id);
            setIsProductInCmpr(isProductInCompare(pc.id));
            return;
        }
        addProductToCompare(pc.id);
        setIsProductInCmpr(isProductInCompare(pc.id));
    }

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleOpen = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpenModal(true);
    }

    const handleClickBasket = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isInBasket) {
            router.push(`/${localActive}/basket`)
            return;
        }
        addProductToBasket(pc.id, pc.slug, null, 1, true);
        setIsInBasket(isProductInBasket(pc.id, true));
        refreshBasketProducts();
    }

    interface FpsData {
        fps: number;
        game_id: number;
        game: string;
        game_fps: string;
    }

    interface GameData {
        [game: string]: {
            [resolution: string]: number;
        };
    }


    // @ts-ignore
    const resolutions: string[] = [...new Set(pc.fps.map(item => item.game_fps))];

    const gamesData: GameData = pc.fps.reduce((acc: GameData, item: FpsData) => {
        const {game, game_fps, fps} = item;
        if (!acc[game]) {
            acc[game] = {};
        }
        acc[game][game_fps] = fps;
        return acc;
    }, {});

    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={handleClose}
                sx={{
                    overflowY: "scroll"
                }}
            >
                <Box
                    sx={style}
                >
                    <Box
                        sx={{
                            bgcolor: '#050505',
                        }}
                    >
                        <Box
                            sx={{
                                height: "333px",
                                width: "100%",
                                position: "relative"
                            }}
                        >
                            <Image
                                src={pc.images?.[0]?.image_path}
                                alt={"service modal image"}
                                fill
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain"
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                padding: {xs: "15px", sm: "24px 30px"}
                            }}
                        >
                            <Typography
                                component="h5"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: {xs: 16, sm: 18},
                                    lineHeight: "22px",
                                    color: theme => theme.palette.primary.main,
                                }}
                            >
                                {pc.name[localActive]}
                            </Typography>

                            <Typography
                                color="primaryText.main"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: 16,
                                    lineHeight: "19px",
                                    mt: "12px"
                                }}
                            >
                                {pc.description[localActive]}
                            </Typography>
                            <Box
                                sx={{
                                    mt: "15px"
                                }}
                            >
                                {pc.attributes.slice(0, 5).map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            padding: "6px 0"
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 14,
                                                lineHeight: "14px",
                                                color: "#AAA7A7"
                                            }}
                                        >
                                            {item.type[localActive]}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: theme.palette.primaryText.main,
                                                fontWeight: 500,
                                                fontSize: 16,
                                                lineHeight: "17px"
                                            }}
                                        >
                                            {item.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                            <Box
                                sx={{
                                    mt: "17px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}
                            >
                                <Box>
                                    <ButtonOutlined
                                        lineColor={"#1E1E1E"}
                                        buttonSx={{
                                            fontSize: {xs: "14px", md: "14px"},
                                            lineHeight: "22px",
                                            padding: "6px 13px",
                                        }}
                                        label={`${formatPrice(pc.price[currency], 0)}`}
                                    />
                                    <Typography
                                        color="primary"
                                        sx={{
                                            fontSize: 14,
                                            lineHeight: "17px",
                                            fontWeight: 500,
                                            textAlign: "right",
                                            mt: "8px"
                                        }}
                                    >
                                        ~ {formatPrice((pc.credits?.[0]?.[currency]), 0, true)}
                                    </Typography>
                                </Box>
                                <AppButton
                                    onClick={handleClose}
                                    label={t("toBack")}
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        color: "#000000",
                                        textTransform: "math-auto"
                                    }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <NavigationLink href={`/products/${pc.slug}?desktop=1`}>
                <Box
                    sx={{
                        maxWidth: {xs: "330px", md: "359px"},
                        width: {xs: "330px", md: "359px"},

                        backgroundColor: theme.palette.productBackground.main,
                        padding: {xs: "14px", sm: "20px"}
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            width: "100%",
                            height: {xs: "192px",},
                            zIndex: 10,
                        }}
                    >
                        <Image
                            src={pc.images?.[0]?.image_path}
                            alt="image"
                            fill
                            style={{objectFit: "contain"}}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >

                        <Typography
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primaryText.main,
                                borderRadius: "20px",
                                fontSize: 10,
                                lineHeight: "12px",
                                fontWeight: 600,
                                padding: "6px 9px"
                            }}
                        >
                            {pc.products.length} {t("completeSetting")}
                        </Typography>

                        <ButtonOutlined
                            lineColor={"#1E1E1E"}
                            buttonSx={{
                                fontSize: {xs: "14px", md: "14px"},
                                lineHeight: "22px",
                                padding: "6px 13px",
                            }}
                            label={`${formatPrice(pc.price[currency], 0)}`}
                        />
                    </Box>
                    <Typography
                        color="primary"
                        sx={{
                            fontSize: 14,
                            lineHeight: "17px",
                            fontWeight: 500,
                            textAlign: "right",
                            mt: "8px"
                        }}
                    >
                        ~ {formatPrice((pc.credits?.[0]?.[currency]) / pc.credits?.[0]?.months, 0, true)}
                    </Typography>
                    <Divider
                        sx={{
                            width: "100%",
                            backgroundColor: "#D9D9D933",
                            margin: "10px 0"
                        }}
                    />
                    <Typography
                        color="primary"
                        sx={{
                            fontSize: {xs: 16, md: 20},
                            lineHeight: "24px",
                            fontWeight: 600,
                        }}
                    >
                        {pc.name[localActive]}
                    </Typography>
                    {/*<Typography*/}
                    {/*    color="primary"*/}
                    {/*    sx={{*/}
                    {/*        fontSize: {xs: 16, md: 20},*/}
                    {/*        lineHeight: "24px",*/}
                    {/*        fontWeight: 600,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {t(pcType[pc.desktop_type?.[0]?.name])}*/}
                    {/*</Typography>*/}

                    {pc.attributes.flat().map((item, idx) => idx < 4 && (
                        <Box
                            key={item.id}
                            sx={{
                                mt: "15px",
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            {idx === 0 ? (
                                    <CpuIcon sx={{fontSize: {xs: 20, md: 25},}}/>
                                ) :
                                idx === 1 ? (
                                    <GpuIcon sx={{fontSize: {xs: 20, md: 25},}}/>

                                ) : idx === 2 ? (
                                    <CoolingIcon sx={{fontSize: {xs: 20, md: 25},}}/>

                                ) : idx === 3 ? (
                                    <MemoryIcon sx={{fontSize: {xs: 20, md: 25},}}/>

                                ) : null}
                            <Box
                                sx={{
                                    ml: "7px"
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: 12,
                                        lineHeight: "14px",
                                        color: "#AAA7A7"
                                    }}
                                >
                                    {item.type[localActive]}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: theme.palette.primaryText.main,
                                        fontWeight: 500,
                                        fontSize: 14,
                                        lineHeight: "17px"
                                    }}
                                >
                                    {item.value}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <Typography
                        color="primaryText.main"
                        sx={{
                            margin: "6px 0",
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: "17px"
                        }}
                    >
                        Performance
                    </Typography>
                    <PcCardPerformance
                        resolutions={resolutions}
                        gamesData={gamesData}
                    />
                    <Box
                        sx={{
                            mt: "13px",
                            display: "flex",
                            gap: "10px",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={handleOpen}
                            sx={{
                                borderColor: theme.palette.primaryText.main,
                                borderWidth: "3px",
                                borderRadius: "2px",
                                fontSize: 14,
                                lineHeight: "17px",
                                color: theme.palette.primaryText.main,
                                fontWeight: 500,
                                textTransform: "capitalize",
                                "&:hover": {
                                    borderWidth: "3px",
                                    borderColor: theme.palette.primary.main,
                                }
                            }}
                        >
                            {t("detail")}
                        </Button>

                        <Button
                            variant={isInBasket ? "contained" : "outlined"}
                            onClick={handleClickBasket}
                            sx={{
                                borderColor: theme.palette.primary.main,
                                borderWidth: "3px",
                                borderRadius: "2px",
                                fontSize: 14,
                                lineHeight: "17px",
                                color: theme.palette.primaryText.main,
                                fontWeight: 500,
                                textTransform: "capitalize",
                                "&:hover": {
                                    borderWidth: "3px",
                                    borderColor: theme.palette.primaryText.main,
                                }
                            }}
                        >
                            {t("addToCard")}
                        </Button>

                        <IconButton
                            onClick={appendProductInCompare}
                        >
                            <Compare
                                sx={{
                                    fontSize: 25,
                                    "& path": {
                                        fill: theme => isProductInCmpr ? theme.palette.primary.main : theme.palette.primaryText.main
                                    }
                                }}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </NavigationLink>
        </>
    );
};

export default PCCard;