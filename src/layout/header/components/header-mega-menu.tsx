import React, {FC, useRef} from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import Grow from "@mui/material/Grow";
import {Divider, useTheme} from "@mui/material";
import {Category} from "@/http/categories-api";
import HeaderMegaMenuItem from "@/layout/header/components/header-mega-menu-item";

interface ISubCategories {
    list: Category | null;
    children: Category | null;
};

interface IHeaderMegaMenuProps {
    categories: Category[] | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<null | Category>>;
    subCategories: ISubCategories;
    setSubCategories: React.Dispatch<React.SetStateAction<ISubCategories>>;
    selectedCategory: Category | null;
    isMenuOpened: {
        list: boolean;
        children: boolean;
    };
    setIsMenuOpened: React.Dispatch<React.SetStateAction<{
        list: boolean;
        children: boolean;
    }>>;
    handleCloseMenu: () => void;
}

const HeaderMegaMenu: FC<IHeaderMegaMenuProps> = ({
                                                      categories,
                                                      setSelectedCategory,
                                                      subCategories,
                                                      setSubCategories,
                                                      isMenuOpened,
                                                      setIsMenuOpened,
                                                      handleCloseMenu,
                                                      selectedCategory
                                                  }) => {
    const theme = useTheme();
    const containerRef = useRef();

    const handleMouseEnter = (category: Category, type: "list" | "children") => {
        setSubCategories((prev) => ({
            ...prev,
            [type]: category
        }));
        setIsMenuOpened((prev) => ({
            ...prev,
            [type]: true
        }));
    }

    const handleMouseLeave = (type: "list" | "children") => {
        setIsMenuOpened((prev) => ({
            ...prev,
            [type]: false
        }));
    }

    return (
        <Grow
            in={categories && categories?.length > 0}
            timeout={300}
        >
            <Box
                ref={containerRef}
                sx={{
                    position: "absolute",
                    top: "100%",
                    width: "100%",
                    backgroundColor: theme.palette.secondary.dark,
                    padding: "36px",
                    zIndex: 10,


                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: "325px",
                                width: "100%",
                                gap: "20px"
                            }}
                        >
                            {categories?.map((category) => (
                                <HeaderMegaMenuItem
                                    key={category.id}
                                    category={category}
                                    onMouseLeave={() => handleMouseLeave("children")}
                                    onMouseEnter={() => handleMouseEnter(category, "list")}
                                    handleCloseMenu={handleCloseMenu}
                                />
                            ))}
                        </Box>
                        {isMenuOpened.list && (
                            <Box>
                                <Divider
                                    orientation="vertical"
                                    sx={{
                                        borderColor: "#2D2D2D",
                                        margin: "0 30px"
                                    }}
                                />
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: "295px",
                                width: "100%",
                                gap: "20px"
                            }}
                        >
                            {isMenuOpened.list && (subCategories.list?.desktops && subCategories.list?.desktops.length > 0 ? subCategories.list.desktops.map((item) => (
                                <HeaderMegaMenuItem
                                    key={item.id}
                                    desktop={item}
                                    handleCloseMenu={handleCloseMenu}
                                    isConfigurator={selectedCategory?.id === 2}
                                />
                            )) : subCategories.list?.subCategories.map((category) => (
                                <HeaderMegaMenuItem
                                    key={category.id}
                                    category={category}
                                    onMouseLeave={() => undefined}
                                    onMouseEnter={() => handleMouseEnter(category, "children")}
                                    handleCloseMenu={handleCloseMenu}
                                />
                            )))}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxWidth: "295px",
                                width: "100%",
                                gap: "20px",
                                marginLeft: "28px"
                            }}
                        >
                            {isMenuOpened.children && subCategories.children?.subCategories.map((category) => (
                                <HeaderMegaMenuItem
                                    key={category.id}
                                    category={category}
                                    isChildren={true}
                                    onMouseLeave={() => undefined}
                                    onMouseEnter={() => undefined}
                                    handleCloseMenu={handleCloseMenu}
                                />
                            ))}
                        </Box>
                    </Box>
                </AppContainer>
            </Box>
        </Grow>
    );
};

export default HeaderMegaMenu;