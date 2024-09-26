import {useAppContext} from '@/context/app-context';
import AppButton from '@/ui/button/button';
import {
    Card,
    CardActions,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box
} from '@mui/material';
import React, {FC, useState} from 'react';
import ServiceLeaveRequestModal from "@/components/service-leave-request-modal/service-leave-request-modal";
import { useTranslations } from 'next-intl';

interface IServiceCardProps {
    title: string;
    description: string;
    services: {
        label: string;
        icon: React.JSX.Element;
    }[];
    price: {
        uzs: number;
        usd: number;
    };
    isFullDescription?: boolean;
}

const ServiceCard: FC<IServiceCardProps> = ({title, description, services, price, isFullDescription}) => {
    const {currency, formatPrice} = useAppContext();
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(true);
    }
    const t = useTranslations("Buttons");
    const tb = useTranslations("ServicePages.2.Plans")
    return (
        <>
            <ServiceLeaveRequestModal
                onClose={handleClose}
                open={isOpen}
                price={price[currency]}
                services={services.map((service) => service.label)}
                type={title}
            />
            <Card
                sx={{
                    maxWidth: "375px",
                    width: "100%",
                    backgroundColor: "productBackground.main",
                    borderRadius: 0,
                    height: "611px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "20px 24px",
                }}

            >
                <CardContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: 0
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            lineHeight: "20px",
                            fontWeight: 600,
                            maxWidth: isFullDescription ? "100%" : "184px",
                            textAlign: "center",
                            fontFamily: "Orbitron, sans-serif"
                        }}
                        color="primaryText.main"
                        gutterBottom
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 13,
                            lineHeight: "15px",
                            fontWeight: 500,
                            mt: "8px",
                            textAlign: "center",
                            maxWidth: isFullDescription ? "100%" : "228px"
                        }}
                        color="primaryText.main"
                    >
                        {description}
                    </Typography>

                    <List
                        sx={{
                            width: "100%",
                            padding: 0,
                            mt: "6px"
                        }}
                    >
                        {services.map((item, idx) => (
                            <ListItem
                                key={idx}
                                sx={{
                                    padding: "4px"
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: "16px",
                                        height: "16px"
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        sx: {
                                            fontSize: 13,
                                            fontWeight: 500,
                                            lineHeight: "16px",
                                        }
                                    }}
                                    sx={{
                                        width: "100%",
                                        color: "primaryText.main",
                                        marginLeft: "10px"
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>

                </CardContent>
                <CardActions
                    sx={{
                        mt: "auto",
                        padding: 0
                    }}
                >
                    <Box>

                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            alignItems: "center"
                        }}
                    >
                        <Typography
                            color="primaryText.main"
                            sx={{
                                fontSize: 13,
                                lineHeight: "16px",
                                fontWeight: 500
                            }}
                        >
                           {tb("pricing", {price:formatPrice(price[currency]) })} 
                        </Typography>

                        <AppButton
                            label={t(`order`)}
                            size="small"
                            variant="outlined"
                            onClick={handleOpen}
                            sx={{
                                color: "primaryText.main",
                                textTransform: "math-auto"
                            }}
                        />
                    </Box>
                </CardActions>
            </Card>
        </>
    );
};

export default ServiceCard;