import React, {FC, useState} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    useTheme
} from "@mui/material";
import {Category} from "@/http/categories-api";
import ArrowBottom from "@/ui/icons/arrow-bottom";
import ArrowLeftIcon from "@/ui/icons/arrow-left";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";
import NavigationLink from '@/components/navigation-link/navigation-link';
import {useLocale, useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {clampText} from "@/utils/clamp-text";

interface IMobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    openContactModal: () => void;
}


const ListItemTextContent = ({title, description, level}: { title: string, description?: string, level: number }) => {
    const theme = useTheme();

    return (
        <>
            <Typography
                sx={{
                    fontSize: 14 - level,
                    lineHeight: `${20 - level}px`,
                    fontFamily: '"Inter", sans-serif',
                    color: theme.palette.primaryText.main,
                    fontWeight: level >= 2 ? 600 : 400
                }}
            >
                {title}
            </Typography>
            {level >= 2 && (
                <Typography
                    sx={{
                        fontSize: 10,
                        lineHeight: `12px`,
                        color: theme.palette.secondaryText.main
                    }}
                >
                    {description}
                </Typography>
            )}
        </>
    );
}

const CategoryItem: FC<{
    category: Category,
    level: number,
    toggleSubList: (id: number) => void,
    openSubLists: Record<string, boolean>;
    onClose: () => void;
}> = ({category, level, toggleSubList, openSubLists, onClose}) => {
    const theme = useTheme();
    const hasSubCategories = category.subCategories && category.subCategories.length > 0;
    const localActive = useLocale() as "ru" | "uz";

    const handleClickLink = () => {
        onClose();
    }

    return (
        <React.Fragment>
            <ListItem sx={{paddingLeft: theme.spacing(level), paddingRight: 0, paddingTop: 0, paddingBottom: 0}}>
                <ListItemButton
                    sx={{
                        padding: "8px 0 10px 0"
                    }}
                    onClick={() => toggleSubList(category.id)}
                >
                    <ListItemText
                        sx={{
                            margin: 0
                        }}
                        primary={
                            <ListItemTextContent
                                title={category.name[localActive]}
                                description={category.description[localActive]}
                                level={level}
                            />
                        }
                    />

                    {(hasSubCategories || (category.desktops && category.desktops.length > 0)) &&
                        (level === 0 ? (
                            <ArrowBottom
                                sx={{
                                    transition: "all .1s ease-out",
                                    transform: openSubLists[category.id] ? "rotate(-90deg)" : "rotate(0)"
                                }}
                            />
                        ) : (
                            <ArrowLeftIcon
                                sx={{
                                    width: "7px",
                                    transition: "all .1s ease-out",
                                    transform: openSubLists[category.id] ? "rotate(0)" : "rotate(90deg)"
                                }}
                            />
                        ))
                    }
                </ListItemButton>
            </ListItem>
            {level === 0 ? (
                <Divider sx={{borderColor: "#252525", width: "100%"}}/>
            ) : null}
            {
                <List
                    disablePadding
                >
                    {(hasSubCategories && openSubLists[category.id]) ? category.subCategories.map((subCategory) =>
                        <CategoryItem
                            key={subCategory.id}
                            category={subCategory}
                            level={level + 2}
                            toggleSubList={toggleSubList}
                            openSubLists={openSubLists}
                            onClose={onClose}
                        />
                    ) : (category.desktops && category.desktops.length > 0 && openSubLists[category.id]) && category.desktops.map(desktop => (
                        <NavigationLink
                            key={desktop.id}
                            onClick={handleClickLink}
                            href={`/products/${desktop.slug}?desktop=1`}
                            style={{
                                paddingLeft: theme.spacing(level + 2),
                                display: "block",
                                paddingTop: "8px",
                                paddingBottom: "8px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14 - level,
                                    lineHeight: `${20 - level}px`,
                                    fontFamily: '"Inter", sans-serif',
                                    color: theme.palette.primaryText.main,
                                    fontWeight: 400,
                                    ...clampText(1, 20 - level),
                                }}
                            >
                                {desktop.name[localActive]}
                            </Typography>
                        </NavigationLink>
                    ))}
                </List>
            }
        </React.Fragment>
    );
};

const MobileDrawer: FC<IMobileDrawerProps> = ({isOpen, onClose, categories, openContactModal}) => {
    const [openSubLists, setOpenSubLists] = useState<Record<string, boolean>>({});
    const theme = useTheme();
    const t = useTranslations("Home");
    const localActive = useLocale();
    const router = useRouter();

    const handleChangeLanguage = (lang: string) => {
        const path = window.location.href;
        const url = new URL(path);
        const result = url.pathname.slice(3, url.pathname.length) + url.search;
        router.replace(`/${lang}${result}`, {scroll: true});
        onClose();
    }

    const toggleSubList = (categoryId: number) => {
        setOpenSubLists(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="right"
            PaperProps={{sx: {backgroundColor: theme.palette.secondary.light}}}
        >
            <Box sx={{width: 220, padding: "20px"}} role="presentation">
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
                    <CloseIcon
                        onClick={onClose}
                        sx={{
                            color: "#8C8888",
                            marginLeft: "auto",
                            marginBottom: "39px",
                            cursor: "pointer"
                        }}
                    />
                </Box>
                <List disablePadding>
                    {categories.map((category) => (
                        <CategoryItem
                            key={category.id}
                            category={category}
                            level={0}
                            toggleSubList={toggleSubList}
                            openSubLists={openSubLists}
                            onClose={onClose}
                        />
                    ))}
                    <NavigationLink
                        onClick={onClose}
                        href="/about"
                    >
                        <ListItem
                            sx={{paddingLeft: theme.spacing(0), paddingRight: 0, paddingTop: 0, paddingBottom: 0}}>
                            <ListItemButton
                                sx={{
                                    padding: "8px 0 10px 0"
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        margin: 0
                                    }}
                                    primary={
                                        <ListItemTextContent
                                            title={t("aboutUs")}
                                            description={""}
                                            level={0}
                                        />
                                    }
                                />
                            </ListItemButton>
                        </ListItem>
                    </NavigationLink>
                    <Divider sx={{borderColor: "#252525", width: "100%"}}/>

                </List>

                <Box
                    sx={{
                        mt: '15px',
                        display: "flex",
                        gap: "12px"
                    }}
                >
                    <Button
                        onClick={() => handleChangeLanguage("ru")}
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primaryText.main,
                            borderRadius: 0,
                            color: theme.palette.primaryText.main,
                            backgroundColor: localActive === "ru" ? theme.palette.primary.main : "transparent"
                        }}
                    >
                        Ru
                    </Button>
                    <Button
                        onClick={() => handleChangeLanguage("uz")}
                        variant="outlined"
                        sx={{
                            borderColor: theme.palette.primaryText.main,
                            borderRadius: 0,
                            color: theme.palette.primaryText.main,
                            backgroundColor: localActive === "uz" ? theme.palette.primary.main : "transparent"
                        }}
                    >
                        Uz
                    </Button>
                </Box>

                <Typography
                    onClick={openContactModal}
                    sx={{
                        color: theme.palette.primaryText.main,
                        fontSize: 14,
                        lineHeight: "20px",
                        fontWeight: 400,
                        textDecoration: "underline",
                        mt: "8px",
                        cursor: "pointer"
                    }}
                >
                    {t("contact")}
                </Typography>
            </Box>
        </Drawer>
    );
};

export default MobileDrawer;