"use client";
import {Box, FormControl, InputAdornment, Modal, TextField, Typography, useTheme} from '@mui/material';
import React, {FC, useState} from 'react';
import {useTranslations} from "next-intl";
import PhoneIcon from "@/ui/icons/phone";
import AppButton from '@/ui/button/button';
import TelegramIcon from "@/ui/icons/telegram-icon";
import {leaveRequest} from "@/http/checkout-api";
import {toastError, toastSuccess} from "@/utils/toast-util";
import CustomTelInput from "@/components/tel-input/tel-input";
import {AxiosError} from "axios";
import {formatAndParseResponseError} from "@/utils/axios";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 651,
    width: "100%",
    border: '2px solid #000',
    boxShadow: 24,
    padding: "59px 58px",
};

interface IContactModalProps {
    isOpen: boolean;
    handleClose: () => void;
}

const ContactModal: FC<IContactModalProps> = ({isOpen, handleClose}) => {
    const theme = useTheme();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const t = useTranslations("ContactModal")
    const errorTranslations = useTranslations("Errors");

    const handleChangePhone = (newValue: string) => {
        setPhoneNumber(newValue);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(phoneNumber.length != 12) {
            toastError(errorTranslations("invalidPhoneNumber"), theme);
            return;
        }
        try {
            await leaveRequest({
                name: fullName,
                phone: "+998" + phoneNumber.replaceAll(/[\s|+-]/g, ""),
            });
            toastSuccess("Ваша заявка отправлена", theme);
            handleClose();
            setFullName("");
            setPhoneNumber("");
        } catch (e) {
            console.log(e);
            if (e instanceof AxiosError) {
                formatAndParseResponseError(e, theme);
            }
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    ...style,
                    backgroundColor: theme.palette.secondary.light
                }}
            >
                <Typography
                    id="modal-modal-title"
                    sx={{
                        fontWeight: 600,
                        fontSize: 30,
                        lineHeight: "40px",
                        textAlign: "center",
                        color: theme.palette.primaryText.main,

                        "& span": {
                            fontWeight: 600,
                            fontSize: 30,
                            lineHeight: "40px",
                            textAlign: "center",
                            color: "primary.main"
                        }
                    }}
                    variant="h4"
                    component="h2"
                >
                    {t("title")}
                </Typography>

                <Box
                    sx={{
                        maxWidth: "358px",
                        width: "100%",
                        marginTop: "21px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}
                >
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >
                        <FormControl fullWidth variant="standard">
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    lineHeight: "20px",
                                    fontWeight: 600,
                                    fontFamily: '"Inter", sans-serif',
                                    mb: "8px",
                                    color: theme.palette.primaryText.main
                                }}
                            >
                                {t("name")}
                            </Typography>

                            <TextField
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ф.И.О."
                                InputProps={{
                                    sx: {
                                        backgroundColor: "#FFFFFF",
                                        '&::placeholder': {
                                            color: "#979797",
                                            fontSize: 20,
                                            lineHeight: "24px"
                                        }
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                marginTop: "11px"
                            }}
                            fullWidth
                            variant="standard"
                        >
                            <Typography
                                sx={{
                                    fontSize: 20,
                                    lineHeight: "20px",
                                    fontWeight: 600,
                                    fontFamily: '"Inter", sans-serif',
                                    mb: "8px",
                                    color: theme.palette.primaryText.main
                                }}
                            >
                                {t("phone")}
                            </Typography>

                            <CustomTelInput
                                value={phoneNumber}
                                onChange={handleChangePhone}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon/>
                                            <Typography
                                                sx={{
                                                    ml: "5px"
                                                }}
                                            >
                                                +998
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        backgroundColor: "#FFFFFF",
                                        '&::placeholder': {
                                            color: "#979797",
                                            fontSize: 20,
                                            lineHeight: "24px"
                                        }
                                    }
                                }}
                            />
                        </FormControl>
                        <AppButton
                            type="submit"
                            size="large"
                            label="Отправить"
                            fullWidth
                            sx={{
                                marginTop: "17px"
                            }}
                        />
                    </Box>

                    <a
                        href="https://t.me/Ingame_support"
                        target="_blank"
                        style={{
                            marginTop: "30px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 20,
                                lineHeight: "26px",
                                textAlign: "center",
                                fontFamily: '"Inter", sans-serif',
                            }}
                            color={"primary"}
                        >
                            {t("contact")}
                        </Typography>
                        <Typography
                            sx={{
                                fontWeight: 700,
                                fontSize: 20,
                                lineHeight: "26px",
                                textAlign: "center",
                                fontFamily: '"Inter", sans-serif',
                                color: theme.palette.primaryText.main,
                                textDecoration: "underline",
                                display: "inline-flex",
                                cursor: "pointer"
                            }}
                        >
                            <TelegramIcon
                                sx={{
                                    marginRight: "5px",
                                }}
                            />
                            Telegram
                        </Typography>
                    </a>
                </Box>
            </Box>
        </Modal>
    );
};

export default ContactModal;