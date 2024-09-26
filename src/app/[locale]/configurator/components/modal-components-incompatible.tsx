import {List, ListItem, ListItemText, Modal} from '@mui/material';
import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {IAttribute, Product} from "@/http/products-api";
import {useLocale} from "next-intl";
import AppButton from "@/ui/button/button";

interface IModalComponentsIncompatible {
    handleClose: () => void;
    open: boolean;
    incompatibilities: {
        attribute: IAttribute,
        product: Product
    }[];
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 700,
    width: "100%",
    bgcolor: 'productBackground.main',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalComponentsIncompatible: FC<IModalComponentsIncompatible> = ({
                                                                           handleClose,
                                                                           open,
                                                                           incompatibilities
                                                                       }) => {
    const localActive = useLocale() as "ru" | "uz";

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontSize: 20,
                        color: "primaryText.main"
                    }}
                >
                    Обнаружены проблемы совместимости
                </Typography>

                <Typography
                    sx={{
                        fontSize: 18,
                        mt: 3,
                        color: "secondaryText.main"
                    }}
                >
                    Следующие комплектующие несовместимы:
                </Typography>
                <List
                    sx={{
                        width: "100%",
                    }}
                >
                    {incompatibilities.map((item, idx) => (
                        <ListItem
                            key={idx}
                            sx={{
                                padding: 0,
                                position: "relative",
                                paddingLeft: "20px",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    left: "5px",
                                    bottom: "-2px",
                                    display: "block",
                                    width: "2px",
                                    height: "100%",
                                    backgroundColor: "primary.main"
                                },
                                "&:first-child::before": {
                                    top: "50%",
                                },
                                "&:last-child::before": {
                                    bottom: "50%",
                                },

                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    left: "2px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    borderRadius: "50%",
                                    height: "8px",
                                    width: "8px",
                                    backgroundColor: "primary.main",
                                    display: "block"
                                }
                            }}
                        >
                            <ListItemText
                                sx={{
                                    color: "primaryText.main",
                                    display: "inline-block"
                                }}
                                primary={`${item.product.type.toUpperCase()} | ${item.product.name[localActive]} [${item.attribute.value}]`}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: "10px"
                    }}
                >
                    <AppButton
                        size={"small"}
                        label={"Отменить"}
                        onClick={handleClose}
                    />
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalComponentsIncompatible;