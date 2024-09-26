"use client";
import React, {FC, useRef, useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Logo from "@/ui/icons/logo";
import AppContainer from "@/ui/app-container/app-container";
import ArrowIcon from "@/ui/icons/arrow";
import SearchIcon from "@/ui/icons/search";
import Link from "next/link";
import BasketIcon from "@/ui/icons/basket";
import Compare from "@/ui/icons/compare";
import {Category} from "@/http/categories-api";
import HeaderMegaMenu from "@/layout/header/components/header-mega-menu";
import ContactModal from "@/layout/header/components/contact-modal";
import MobileDrawer from "@/layout/header/components/mobile-drawer";
import NavigationLink from "@/components/navigation-link/navigation-link";
import CurrencyMenu from "@/layout/header/components/currency-menu";
import LanguageMenu from "@/layout/header/components/language-menu";
import SearchBar from "@/layout/header/components/search-bar";
import {useLocale, useTranslations} from "next-intl";
import uuidv4 from "@/utils/uuidv4";
import {useOutsideClick} from "@/hooks/use-outside-click";
import {getBasketProducts} from "@/utils/basket-util";
import Typography from "@mui/material/Typography";
import {useAppContext} from "@/context/app-context";

interface IHeader {
    categories: Category[];
}

const staticCategoryList = {
    id: uuidv4() as unknown as number,
    image_name: null,
    image_path: null,
    mime: "",
    name: {
        ru: "Услуги",
        uz: "Xizmatlar",
    },
    parent_id: null,
    slug: "",
    status: "active",
    description: {
        ru: "",
        uz: ""
    },
    subCategories: [
        {
            id: uuidv4() as unknown as number,
            image_name: null,
            image_path: null,
            mime: "",
            name: {
                ru: "Апгрейд компьютеров",
                uz: "Kompyuterlarni kuchaytirish",
            },
            parent_id: null,
            slug: "",
            status: "active",
            description: {
                ru: "Модернизация компьютера",
                uz: "Kompyuterni modernizatsiyalash"
            },
            subCategories: [],
            updated_at: "",
            created_at: "",
            deleted_at: "",
            path: "/services/1",
            desktops: []
        },
        {
            id: uuidv4() as unknown as number,
            image_name: null,
            image_path: null,
            mime: "",
            name: {
                ru: "Обслуживание компьютеров",
                uz: "Kompyuterlarga xizmat ko‘rsatish",
            },
            parent_id: null,
            slug: "",
            status: "active",
            description: {
                ru: "Техническое обслуживание ПК",
                uz: "Kompyuterga texnik xizmat ko‘rsatish"
            },
            subCategories: [],
            updated_at: "",
            created_at: "",
            deleted_at: "",
            path: "/services/2",
            desktops: []
        },
        {
            id: uuidv4() as unknown as number,
            image_name: null,
            image_path: null,
            mime: "",
            name: {
                ru: "Моддинг и кастомизация",
                uz: "Modding va kastomizatsiya",
            },
            parent_id: null,
            slug: "",
            status: "active",
            description: {
                ru: "Персонализация компьютера",
                uz: "Kompyuter personallashtirish"
            },
            subCategories: [],
            updated_at: "",
            created_at: "",
            deleted_at: "",
            path: "/services/4",
            desktops: []
        },
        {
            id: uuidv4() as unknown as number,
            image_name: null,
            image_path: null,
            mime: "",
            name: {
                ru: "Обмен ПК",
                uz: "Kompyuterni almashtirish",
            },
            parent_id: null,
            slug: "",
            status: "active",
            description: {
                ru: "Трейд-ин компьютера",
                uz: "Trade-in xizmati"
            },
            subCategories: [],
            updated_at: "",
            created_at: "",
            deleted_at: "",
            path: "/services/3",
            desktops: []
        }
    ],
    updated_at: "",
    created_at: "",
    deleted_at: "",
    desktops: []
};

const Header: FC<IHeader> = ({categories: categoriesList}) => {
    const categories: Category[] = [...categoriesList, staticCategoryList as unknown as Category];
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<null | Category>(null);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [openLngMenu, setOpenLngMenu] = useState(false);
    const [isOpenCurrencyMenu, setIsOpenCurrencyMenu] = useState(false);
    const t = useTranslations("Home");
    const localActive = useLocale() as "ru" | "uz";
    const containerRef = useRef<HTMLElement | null>(null);
    const {basketProducts} = useAppContext();
    const [isMenuOpened, setIsMenuOpened] = useState({
        list: false,
        children: false
    });
    const [subCategories, setSubCategories] = useState<{
        list: Category | null;
        children: Category | null;
    }>({
        list: null,
        children: null
    });

    const handleClickSearch = () => {
        setIsSearchOpen(prev => !prev);
    }

    const onClose = () => {
        setSelectedCategory(null);
    }

    useOutsideClick(containerRef, onClose);

    const closeSearchMenu = () => {
        setIsSearchOpen(false);
    }
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handlePopoverOpen = (category: Category) => {
        setSubCategories({
            list: null,
            children: null
        });
        setSelectedCategory(prev => {
            if (prev && prev.id === category.id) {
                return null;
            }
            return category;
        });
    };

    const handleMouseLeave = (type: "list" | "children") => {
        setIsMenuOpened((prev) => ({
            ...prev,
            [type]: false
        }))
    }

    const handleCloseMenu = () => {
        handleMouseLeave("list");
        handleMouseLeave("children");
        setSelectedCategory(null);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const closeContactModal = () => {
        setIsModalOpened(false);
    }

    const openContactModal = () => {
        setIsModalOpened(true);
    }

    return (
        <>
            <ContactModal
                isOpen={isModalOpened}
                handleClose={closeContactModal}
            />
            <AppBar ref={containerRef} color="secondary" position="sticky">
                <AppContainer>
                    <Toolbar
                        sx={{
                            height: 80,
                            justifyContent: "space-between"
                        }}
                        disableGutters
                    >
                        <Link href="/">
                            <Logo sx={{
                                mr: {xs: "0", lg: "30px"},
                                width: "min-content"
                            }}/>
                        </Link>

                        <Box sx={{flexGrow: 1, display: {xs: "none", lg: "flex"}, gap: "26px"}}>
                            {categories.map((category, idx) => (
                                <Box
                                    key={category.id}
                                >
                                    <Button
                                        onClick={() => handlePopoverOpen(category)}
                                        sx={{
                                            my: 2,
                                            color: "white",
                                            display: "flex",
                                            textTransform: "capitalize",
                                            fontSize: 20,
                                            lineHeight: "20px",
                                            fontWeight: 400,
                                        }}
                                    >
                                        {category.name[localActive]}
                                        <ArrowIcon
                                            sx={{
                                                width: "14px",
                                                margin: "auto",
                                                marginLeft: "5px",
                                                transition: "all 0.2s ease-in-out",
                                                transform: (selectedCategory?.id === category.id) ? "rotate(180deg)" : "rotate(0)"
                                            }}
                                        />
                                    </Button>
                                </Box>
                            ))}
                            <NavigationLink style={{display: "flex", alignItems: "center"}} href="/about">
                                <Button
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "flex",
                                        textTransform: "capitalize",
                                        fontSize: 20,
                                        lineHeight: "20px",
                                        fontWeight: 400,
                                    }}
                                >
                                    {t("aboutUs")}
                                </Button>
                            </NavigationLink>
                        </Box>

                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Button
                                onClick={openContactModal}
                                variant={"outlined"}
                                sx={{
                                    color: "#ffffff",
                                    borderColor: "#ffffff",
                                    borderRadius: 0,
                                    padding: "8px 12px",
                                    fontWeight: 400,
                                    fontSize: 20,
                                    lineHeight: "20px",
                                    textTransform: "capitalize",
                                    display: {xs: "none", lg: "inline-flex"}
                                }}
                            >
                                {t("contact")}
                            </Button>

                            <LanguageMenu
                                isOpen={openLngMenu}
                                onClose={() => setOpenLngMenu(false)}
                                onOpen={() => {
                                    setOpenLngMenu(true);
                                    setIsOpenCurrencyMenu(false);
                                }}
                            />

                            <CurrencyMenu
                                isOpen={isOpenCurrencyMenu}
                                onClose={() => {
                                    setIsOpenCurrencyMenu(false);
                                }}
                                onOpen={() => {
                                    setIsOpenCurrencyMenu(true);
                                    setOpenLngMenu(false);
                                }}
                            />

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginLeft: "5px",
                                    gap: "18px",
                                }}
                            >
                                <NavigationLink href="/compare">
                                    <Compare/>
                                </NavigationLink>
                                <IconButton
                                    onClick={handleClickSearch}
                                >
                                    <SearchIcon/>
                                </IconButton>
                                <NavigationLink
                                    href="/basket"
                                    style={{
                                        position: "relative"
                                    }}
                                >
                                    {basketProducts.length !== 0 && (
                                        <Typography
                                            sx={{
                                                width: "14px",
                                                height: "14px",
                                                backgroundColor: "primary.main",
                                                position: "absolute",
                                                borderRadius: "50%",
                                                top: "-4px",
                                                right: "-6px",
                                                color: "primaryText.main",
                                                fontSize: 12,
                                                fontWeight: 600,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >{basketProducts.length}</Typography>
                                    )}
                                    <BasketIcon/>
                                </NavigationLink>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        display: {xs: "flex", lg: "none"},
                                    }}
                                >
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleOpenNavMenu}
                                        color="inherit"
                                        sx={{
                                            padding: 0
                                        }}
                                    >
                                        <MenuIcon
                                            sx={{
                                                fontSize: 30,
                                            }}
                                        />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppContainer>

                <HeaderMegaMenu
                    categories={selectedCategory?.subCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    subCategories={subCategories}
                    setSubCategories={setSubCategories}
                    isMenuOpened={isMenuOpened}
                    setIsMenuOpened={setIsMenuOpened}
                    handleCloseMenu={handleCloseMenu}
                />

                <SearchBar
                    isOpen={isSearchOpen}
                    onClose={closeSearchMenu}
                />
            </AppBar>

            <MobileDrawer
                openContactModal={openContactModal}
                isOpen={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                categories={categories}
            />
        </>
    );
}

export default Header;