"use client";
import React, {FC, useState} from 'react';
import {Drawer, IconButton, LinearProgress, TextField, Typography, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import AppButton from '@/ui/button/button';
import {toastError, toastSuccess} from "@/utils/toast-util";
import {AxiosError} from "axios";
import {createService} from "@/http/checkout-api";
import CloseIcon from "@/ui/icons/close-icon";
import {useTranslations} from 'next-intl';
import {formatAndParseResponseError} from "@/utils/axios";
import CustomTelInput from "@/components/tel-input/tel-input";

interface IOrderAnUpgradeProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    list: {
        title: string;
        services: {
            title: string;
            list: string[];
        }[];
        hasOtherServices: boolean;
    }[];
}

const OrderAnUpgrade: FC<IOrderAnUpgradeProps> = ({isOpen, onClose, title, list}) => {
    const [activeService, setActiveService] = useState(0);
    const [choosedServices, setChoosedServices] = useState<{ [key: string]: { [key: string]: string[] } }>({});
    const theme = useTheme();
    const errorTranslations = useTranslations("Errors");
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        otherServices: ""
    });

    const t = useTranslations("OrderAnUpgrade")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        try {
            const {name, phoneNumber, otherServices} = formData;
            if(phoneNumber.length != 12) {
                toastError(errorTranslations("invalidPhoneNumber"), theme);
                return;
            }
            await createService({
                name,
                type: title,
                phone: "+998" + phoneNumber.replaceAll(/[\s|+-]/g, ""),
                other_services: otherServices,
                services: [JSON.stringify(choosedServices)]
            });
            toastSuccess("Ваша заявка отправлена", theme);
            onClose();
            setFormData({
                name: "",
                phoneNumber: "",
                otherServices: ""
            });
            setChoosedServices({});
            setActiveService(0);
        } catch (e) {
            if (e instanceof AxiosError) {
                formatAndParseResponseError(e, theme);
            }
            console.log(e);
        }
    }

    const handleChangePhone = (value: string) => {
        if (value.length >= 18) {
            return;
        }
        setFormData(prev => ({...prev, phoneNumber: value}));
    }

    const listOfServices = [...list, {title: t("steps.contacts.title"), services: [], hasOtherServices: false}];

    const handleClick = () => {
        if (activeService + 1 === listOfServices.length) {
            handleSubmit();
            return;
        }
        if ((activeService + 1) >= listOfServices.length) {
            return;
        }
        setActiveService((prev) => prev + 1);
    }

    const handleClickBack = () => {
        if (activeService === 0) {
            setActiveService(list.length);
            return;
        }
        if ((activeService + 1) == 1) {
            return;
        }
        setActiveService((prev) => prev - 1);
    }

    const handleClickService = (serviceTitle: string, serviceName: string) => {
        const currentListTitle = list[activeService].title;
        const updatedList = {...choosedServices};
        if (!updatedList[currentListTitle]) {
            updatedList[currentListTitle] = {};
        }
        if (!updatedList[currentListTitle][serviceTitle]) {
            updatedList[currentListTitle][serviceTitle] = [];
        }
        if (updatedList[currentListTitle][serviceTitle].includes(serviceName)) {
            updatedList[currentListTitle][serviceTitle] = updatedList[currentListTitle][serviceTitle].filter((name) => name !== serviceName);
        } else {
            updatedList[currentListTitle][serviceTitle].push(serviceName);
        }
        setChoosedServices(updatedList);
    }

    return (
        <Drawer
            anchor={"right"}
            open={isOpen}
            onClose={onClose}
            sx={{}}
            PaperProps={{
                sx: {
                    backgroundColor: theme => theme.palette.secondary.light,
                    maxWidth: "720px",
                    width: "100%",
                }
            }}
        >
            <Box
                sx={{
                    padding: "30px"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography
                        component="h6"
                        sx={{
                            color: theme => theme.palette.primaryText.main,
                            fontWeight: 700,
                            fontSize: 20,
                        }}
                    >
                        {title}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon
                            sx={{
                                fontSize: 16,
                                "& path": {
                                    fill: theme => theme.palette.primaryText.main

                                }
                            }}
                        />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "#1A1A1A",
                        padding: "20px",
                        mt: "20px"
                    }}
                >
                    <Box
                        sx={{
                            mb: "4px",
                            display: "flex"
                        }}
                    >
                        {listOfServices.map((item, idx) => (
                            <Typography
                                key={idx}
                                sx={{
                                    color: theme => idx <= activeService ? theme.palette.primary.main : "#B2B2B2",
                                    fontSize: {xs: 8, sm: 13},
                                    width: `${100 / listOfServices.length}%`
                                }}
                            >
                                0{idx + 1}. {item.title}
                            </Typography>
                        ))}
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={((activeService + 1) / listOfServices.length) * 100}
                    />
                </Box>
                <Box>
                    {(activeService + 1 !== listOfServices.length) && list[activeService].services.map((item, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                mt: "30px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#cccccc",
                                    fontSize: 14
                                }}
                            >
                                {item.title}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "4px",
                                    mt: "10px"
                                }}
                            >
                                {item.list.map((serviceName, idx) => (
                                    <Typography
                                        key={idx}
                                        onClick={() => handleClickService(item.title, serviceName)}
                                        sx={{
                                            padding: "6px 15px",
                                            background: "#313233",
                                            cursor: "pointer",
                                            fontSize: 12,
                                            color: theme => choosedServices[list[activeService].title]?.[item.title]?.includes(serviceName) ? theme.palette.primary.main : theme.palette.primaryText.main,
                                            borderRadius: 40,
                                            borderColor: theme => choosedServices[list[activeService].title]?.[item.title]?.includes(serviceName) ? theme.palette.primary.main : "transparent",
                                            borderWidth: "1px",
                                            borderStyle: "solid"
                                        }}
                                    >
                                        {serviceName}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                    ))}
                    {listOfServices[activeService]?.hasOtherServices && (
                        <>
                            <Typography
                                sx={{
                                    color: "#cccccc",
                                    fontSize: 14,
                                    mt: "30px"
                                }}
                            >
                                {t("steps.contacts.formFields.custom")}
                            </Typography>
                            <TextField
                                variant="standard"
                                name="otherServices"
                                value={formData.otherServices}
                                onChange={handleChange}
                                sx={{
                                    mt: "10px",
                                    "& .MuiInputBase-root:before": {
                                        borderColor: theme => theme.palette.primaryText.main
                                    }
                                }}
                                InputProps={{
                                    sx: {
                                        color: theme => theme.palette.primaryText.main
                                    }
                                }}
                            />
                        </>
                    )}
                </Box>
                {activeService + 1 === listOfServices.length && (
                    <Box>
                        <Box
                            sx={{
                                mt: "15px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme => theme.palette.primaryText.main,
                                    fontSize: 14,
                                }}
                            >
                                {t("steps.contacts.formFields.name")}
                            </Typography>
                            <TextField
                                variant="standard"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                sx={{
                                    mt: "10px",
                                    "& .MuiInputBase-root:before": {
                                        borderColor: theme => theme.palette.primaryText.main
                                    }
                                }}
                                InputProps={{
                                    sx: {
                                        color: theme => theme.palette.primaryText.main
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                mt: "15px"
                            }}
                        >
                            <Typography
                                sx={{
                                    color: theme => theme.palette.primaryText.main,
                                    fontSize: 14,
                                }}
                            >
                                {t("steps.contacts.formFields.phone")}
                            </Typography>
                            <CustomTelInput
                                value={formData.phoneNumber}
                                onChange={handleChangePhone}
                                variant="filled"
                                sx={{
                                    mt: "10px",
                                    "& .MuiInputBase-root:before": {
                                        borderColor: theme => theme.palette.primaryText.main
                                    }
                                }}
                                InputProps={{
                                    sx: {
                                        color: theme => theme.palette.primaryText.main,
                                        paddingTop: 0,
                                    },
                                    startAdornment: (
                                        <Typography
                                            sx={{
                                                mr: "8px"
                                            }}
                                        >
                                            +998
                                        </Typography>
                                    )
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    marginTop: "auto",
                    backgroundColor: theme => theme.palette.productBackground.main,
                    padding: "15px 20px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <AppButton
                    label={activeService === 0 ? t("actions.prev2") : t("actions.prev")}
                    size="small"
                    variant="text"
                    onClick={handleClickBack}
                    sx={{
                        fontSize: 15,
                        textTransform: "math-auto"
                    }}
                />
                <AppButton
                    label={(activeService + 1 !== listOfServices.length) ? t("actions.btn") : t("actions.btn2")}
                    size="small"
                    onClick={handleClick}
                />
            </Box>
        </Drawer>
    );
};

export default OrderAnUpgrade;
