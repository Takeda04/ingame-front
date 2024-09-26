import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowLeftIcon from "@/ui/icons/arrow-left";
import {Category} from "@/http/categories-api";
import {useTheme} from "@mui/material";
import {useLocale} from "next-intl";
import NavigationLink from "@/components/navigation-link/navigation-link";
import {Desktop} from "@/http/desktops-api";
import Image from "next/image";


interface IHeaderMegaMenuListProps {
    category?: Category
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: () => void;
    isChildren?: boolean;
    desktop?: Desktop;
    handleCloseMenu: () => void;
    isConfigurator?: boolean;
}

const HeaderMegaMenuItem: FC<IHeaderMegaMenuListProps> = ({
                                                              category,
                                                              onMouseLeave,
                                                              onMouseEnter,
                                                              isChildren,
                                                              desktop,
                                                              handleCloseMenu,
                                                              isConfigurator
                                                          }) => {
    const theme = useTheme();
    const localActive = useLocale() as "ru" | "uz";

    const containerStyle: { [key: string]: any } = {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "8px 15px",
        borderRadius: "10px",
    };
    if (isChildren) {
        containerStyle["&:hover"] = {
            backgroundColor: "#181818"
        }
    }


    return desktop ? (
        <NavigationLink
            href={isConfigurator ? `/configurator/${desktop.slug}` : `/products/${desktop.slug}?desktop=1`}
            onClick={handleCloseMenu}
            style={{
                display: "flex",
                gap: "8px"
            }}
        >
            <Box
                sx={{
                    background: "#2f2f2f",
                    padding: "5px",
                    width: "min-content",
                    height: "min-content"
                }}
            >
                <Box
                    sx={{
                        width: "40px",
                        height: "40px",
                        position: "relative",
                    }}
                >
                    <Image
                        src={desktop?.images?.[0]?.image_path}
                        alt="desktop image"
                        fill
                        style={{
                            objectFit: "contain",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                </Box>
            </Box>
            <Box>
                <Typography
                    color="primaryText.main"
                    sx={{
                        fontSize: 18,
                        fontWeight: 600

                    }}
                >
                    {desktop.name[localActive]}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 15,
                        color: "#B2B2B2"
                    }}
                    dangerouslySetInnerHTML={{ __html: desktop.description[localActive] }}
                />
            </Box>
        </NavigationLink>
    ) : category && (
        <NavigationLink
            onClick={handleCloseMenu}
            href={category.path || ""}
        >
            <Box
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                sx={containerStyle}
            >
                <Box>
                    <Typography
                        component="h4"
                        sx={{
                            fontSize: 16,
                            lineHeight: "19px",
                            fontWeight: 600
                        }}
                    >
                        {category.name[localActive]}
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            color: theme.palette.secondaryText.main,
                            fontSize: 12,
                            lineHeight: "19px"
                        }}
                    >
                        {category.description[localActive]}
                    </Typography>
                </Box>
                <ArrowLeftIcon
                    sx={{
                        width: "10px",
                        marginLeft: "auto"
                    }}
                />
            </Box>
        </NavigationLink>
    );
};

export default HeaderMegaMenuItem;