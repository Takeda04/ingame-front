import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {FC, useState} from "react";
import {FormControl, InputAdornment, TextField, useTheme} from "@mui/material";
import PhoneIcon from "@/ui/icons/phone";
import AppButton from "@/ui/button/button";
import {AxiosError} from "axios";
import {toastError, toastSuccess} from "@/utils/toast-util";
import {createTradeIn} from "@/http/checkout-api";
import CustomTelInput from "@/components/tel-input/tel-input";
import {formatAndParseResponseError} from "@/utils/axios";
import {useTranslations} from "next-intl";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
    width: "100%",
    bgcolor: "#0F0F0F",
    boxShadow: 24,
    p: 4,
};

interface ITradeInModal {
    open: boolean;
    onClose: () => void;
}

const TradeInModal: FC<ITradeInModal> = ({ open, onClose }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        config: "",
    });
    const errorTranslations = useTranslations("Errors");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { fullName, email, phoneNumber, config } = formData;
        if(phoneNumber.length != 12) {
            toastError(errorTranslations("invalidPhoneNumber"), theme);
            return;
        }
        try {
            await createTradeIn({
                name: fullName,
                phone: "+998" + phoneNumber.replaceAll(/[+|\s-]/g, ""),
                email: email,
                config: config,
            });
            toastSuccess("Спасибо! Ваша заявка успешно отправлена", theme);
            onClose();
            setFormData({
                fullName: "",
                phoneNumber: "",
                email: "",
                config: "",
            })
        } catch (e) {
            console.log(e);
            if(e instanceof AxiosError) {
                formatAndParseResponseError(e, theme);
            }
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <Typography
                    color="primaryText.main"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontSize: 30,
                        lineHeight: "40px",
                        fontWeight: 600,
                        textAlign: "center",
                    }}
                >
                    Заявка на трейд-ин
                </Typography>
                <Box
                    sx={{
                        mt: "20px"
                    }}
                    component="form"
                    onSubmit={handleSubmit}
                >
                    <FormControl fullWidth variant="standard">
                        <TextField
                            value={formData.fullName}
                            onChange={handleChange}
                            name="fullName"
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
                            marginTop: "12px"
                        }}
                        fullWidth
                        variant="standard"
                    >
                        <CustomTelInput
                            value={formData.phoneNumber}
                            placeholder="00 000 00 00"
                            onChange={(val) => setFormData((prev) => ({...prev, phoneNumber: val}))}
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
                    <FormControl
                        fullWidth
                        variant="standard"
                        sx={{
                            marginTop: "12px"
                        }}
                    >
                        <TextField
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Email"
                            type="email"
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
                        fullWidth
                        variant="standard"
                        sx={{
                            marginTop: "12px"
                        }}
                    >
                        <TextField
                            value={formData.config}
                            onChange={handleChange}
                            name="config"
                            placeholder="Укажите конфигурацию Вашего ПК"
                            multiline
                            rows={3}
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
            </Box>
        </Modal>
    );
}

export default TradeInModal;
