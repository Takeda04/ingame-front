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
import {createService} from "@/http/checkout-api";
import CustomTelInput from "@/components/tel-input/tel-input";
import {formatAndParseResponseError} from "@/utils/axios";
import {useTranslations} from "next-intl";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    width: "100%",
    bgcolor: "#0F0F0F",
    boxShadow: 24,
    p: 4,
};

interface IServiceLeaveRequestModal {
    open: boolean;
    onClose: () => void;
    services: string[];
    price: number;
    type: string;
}

const ServiceLeaveRequestModal: FC<IServiceLeaveRequestModal> = ({ open, onClose, services, price, type }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
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
        const { name, phoneNumber } = formData;
        if(phoneNumber.length != 12) {
            toastError(errorTranslations("invalidPhoneNumber"), theme);
            return;
        }
        try {
            await createService({
                name,
                type: type,
                phone: "+998" + phoneNumber.replaceAll(/[\s|+-]/g, ""),
                services: services,
                price: price
            });
            toastSuccess("Спасибо! Ваша заявка успешно отправлена", theme);
            onClose();
            setFormData({
                name: "",
                phoneNumber: "",
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
                            value={formData.name}
                            onChange={handleChange}
                            name="name"
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

export default ServiceLeaveRequestModal;
