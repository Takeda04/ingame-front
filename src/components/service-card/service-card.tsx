"use client";
import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {clampText} from "@/utils/clamp-text";
import {Button, Divider, Modal} from '@mui/material';
import {useTranslations} from "next-intl";
import AppButton from "@/ui/button/button";

interface IServiceCardProps {
    service: {
        name: string;
        description: string;
        image: string;
    }
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: "0px 0px 10.8px 9px #2C2C2C1A",
    maxWidth: "594px",
    width: "100%",
    padding: "0 15px"
};

const ServiceCard: FC<IServiceCardProps> = ({service}) => {
    const t = useTranslations('Buttons');
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleClose = () => {
        setIsOpenModal(false);
    }

    const handleOpen = () => {
        setIsOpenModal(true);
    }

    return (
        <>
            <Modal
                open={isOpenModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                                src={service.image}
                                alt={"service modal image"}
                                fill
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
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
                                {service.name}
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
                                {service.description}
                            </Typography>

                            <Box
                                sx={{
                                    mt: "17px",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <AppButton
                                    onClick={handleClose}
                                    label="Закрыть"
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
            <Box
                sx={{
                    boxShadow: "0px 0px 10px 7px #11111140",
                    backgroundColor: theme => theme.palette.secondary.main,
                    maxWidth: "300px",
                    width: "100%"
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        height: "177px"
                    }}
                >
                    <Image
                        src={service.image}
                        alt="image"
                        fill
                        style={{objectFit: "cover"}}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </Box>
                <Box
                    sx={{
                        padding: "20px"
                    }}
                >
                    <Typography
                        component="h5"
                        sx={{
                            height: "48px",
                            fontWeight: 600,
                            fontSize: {xs: 16, sm: 20},
                            lineHeight: "24px",
                            color: theme => theme.palette.primary.main,
                            ...clampText(2, 24)
                        }}
                    >
                        {service.name}
                    </Typography>
                    {/*<Typography*/}
                    {/*    component="p"*/}
                    {/*    sx={{*/}
                    {/*        fontWeight: 500,*/}
                    {/*        fontSize: 14,*/}
                    {/*        lineHeight: "17px",*/}
                    {/*        color: theme => theme.palette.primaryText.main,*/}
                    {/*        ...clampText(2, 17)*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    Закастомизируем ваш ПК по вашему*/}
                    {/*    любимому дизайну*/}
                    {/*</Typography>*/}

                    <Divider
                        sx={{
                            margin: "10px 0",
                            width: "100%",
                            borderColor: "#D9D9D933"
                        }}
                    />

                    <Typography
                        component="p"
                        sx={{
                            height: "68px",
                            fontWeight: 500,
                            fontSize: 14,
                            lineHeight: "17px",
                            color: theme => theme.palette.primaryText.main,
                            mb: "19px",
                            mt: "13px",
                            ...clampText(4, 17)
                        }}
                    >
                        {service.description}
                    </Typography>

                    {/*<List*/}
                    {/*    sx={{*/}
                    {/*        listStyleType: 'disc',*/}
                    {/*        listStylePosition: "inside",*/}
                    {/*        mt: "13px",*/}
                    {/*        padding: 0,*/}
                    {/*        mb: "19px"*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    {[1, 2, 3, 4].map((item, idx) => (*/}
                    {/*        <ListItem*/}
                    {/*            key={idx}*/}
                    {/*            sx={{*/}
                    {/*                display: 'list-item',*/}
                    {/*                fontWeight: 500,*/}
                    {/*                fontSize: 14,*/}
                    {/*                lineHeight: "17px",*/}
                    {/*                color: theme => theme.palette.primaryText.main,*/}
                    {/*                fontFamily: "ClashDisplay-Variable, sans-serif",*/}
                    {/*                padding: 0,*/}
                    {/*                mb: "4px"*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            описание услуги*/}
                    {/*        </ListItem>*/}
                    {/*    ))}*/}
                    {/*</List>*/}

                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            // justifyContent: "space-between"
                        }}
                    >
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleOpen}
                            sx={{
                                borderWidth: "3px",
                                borderColor: theme => theme.palette.primaryText.main,
                                fontSize: 14,
                                lineHeight: "17px",
                                color: theme => theme.palette.primaryText.main,
                                "&:hover": {
                                    borderWidth: "3px",
                                }
                            }}
                        >
                            {t("detail")}
                        </Button>
                        {/*<Button*/}
                        {/*    variant="outlined"*/}
                        {/*    sx={{*/}
                        {/*        borderWidth: "3px",*/}
                        {/*        borderColor: theme => theme.palette.primary.main,*/}
                        {/*        fontSize: 14,*/}
                        {/*        lineHeight: "17px",*/}
                        {/*        color: theme => theme.palette.primaryText.main,*/}
                        {/*        "&:hover": {*/}
                        {/*            borderWidth: "3px",*/}
                        {/*            borderColor: theme => theme.palette.primaryText.main,*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Согласен*/}
                        {/*</Button>*/}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default ServiceCard;