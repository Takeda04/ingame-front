"use client";
import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import AppContainer from "@/ui/app-container/app-container";
import TitleSection from "@/ui/title-section/title-section";
import {FormControlLabel, styled, Switch, SwitchProps, Typography, useTheme} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CustomTab from "@/components/home-select-pc/components/CustomTab";
import ButtonOutlined from "@/ui/button/button-outlined";
import Button from "@mui/material/Button";
import {Desktop, getDesktopsByFilter, DesktopNames} from "@/http/desktops-api";
import PcCard from "@/components/pc-card/pc-card";
import {getConversion, IConversion} from "@/http/conversion-api";
import {useLocale, useTranslations} from "next-intl";
import {useAppContext} from "@/context/app-context";
import {Game, getAllGames} from "@/http/game-api";
import Image from "next/image";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 66,
    height: 32,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(34px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 28,
        height: 28,
    },
    '& .MuiSwitch-track': {
        borderRadius: 30 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
    // [theme.breakpoints.up("md")]: {
    //     width: 66,
    //     height: 32,
    //     '& .MuiSwitch-thumb': {
    //         boxSizing: 'border-box',
    //         width: 28,
    //         height: 28,
    //     },
    //     '& .MuiSwitch-switchBase': {
    //         margin: 2,
    //         '&.Mui-checked': {
    //             transform: 'translateX(34px)',
    //         },
    //     },
    //     '& .MuiSwitch-track': {
    //         borderRadius: 30 / 2,
    //     },
    // }
}));

const pcType = {
    office: "office",
    allin: "allin",
    games: "games",
    creation: "creation",
    streaming: "streaming"
}


interface IFilter {
    min_price: number | null;
    desktop_type: DesktopNames[];
    attributes: string | null;
    cpu_attribute: string | null;
    activeGame: Game | null;
}

type FilterValue<T extends keyof IFilter> = T extends keyof IFilter ? IFilter[T] : never;

const videoCardAttributes = [
    "RX 580",
    "1660 Super",
    "2060 Super",
    "3050",
    "3060",
    "4060 Twin",
    "4070 Twin",
    "4070 Twin Super",
    "4080 Super",
    "4080 Twin",
    "GEFORCE RTX 4060",
    "GEFORCE RTX 4070",
    "GEFORCE RTX 4080",
    "GEFORCE RTX 4090"
]

const cpuAttributes = [
    "AMD Ryzen 5",
    "AMD Ryzen 7",
    "AMD Ryzen 9",
    "Intel Core i3",
    "Intel Core i5",
    "Intel Core i7",
    "Intel Core i9"
]

const HomeSelectPc = () => {
    const theme = useTheme();
    const {currency, formatPrice} = useAppContext();
    const [value, setValue] = React.useState('1');
    const [desktops, setDesktops] = useState<Desktop[]>([]);
    const [loading, setLoading] = useState(true);
    const [conversion, setConversion] = useState<IConversion | null>(null);
    const [games, setGames] = useState<Game[]>([]);
    const [isGamesOpened, setIsGamesOpened] = useState(false);
    const [filter, setFilter] = useState<IFilter>({
        min_price: 0,
        desktop_type: [],
        attributes: null,
        cpu_attribute: null,
        activeGame: null,
    });
    const localActive = useLocale() as "ru" | "uz";
    const t = useTranslations("selectPc");
    const pcTranslation = useTranslations("PCCard");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleFilterChange = <T extends keyof IFilter>(type: T, value: FilterValue<T>) => {
        setFilter((prev) => ({...prev, [type]: value}));
    }

    const fetchData = async () => {
        try {
            const {min_price, desktop_type, attributes, cpu_attribute, activeGame} = filter;
            const desktopFilter: {
                min_price?: string;
                max_price?: string;
                type?: DesktopNames[];
                attribute?: string,
                cpu_attribute?: string,
                game?: Game,
            } = {
                type: desktop_type
            }
            if(min_price === 4500000) {
                desktopFilter.min_price = "0";
                desktopFilter.max_price = formatUsdPrice(6500000).toFixed(0);
            }
            if (min_price && min_price !== 4500000) {
                desktopFilter.min_price = formatUsdPrice(min_price).toFixed(0);
            }
            if (attributes) {
                desktopFilter.attribute = attributes;
            }
            if (cpu_attribute) {
                desktopFilter.cpu_attribute = cpu_attribute;
            }
            if (activeGame) {
                desktopFilter.game = activeGame;
            }
            const desktops = await getDesktopsByFilter(desktopFilter);
            setDesktops(desktops.data);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }

    const fetchDataBefore = async () => {
        const conversion = await getConversion();
        const games = await getAllGames();
        setGames(games);
        setConversion(conversion);
    }

    const handleChangeCheckbox = (key: DesktopNames) => {
        handleFilterChange("desktop_type", filter.desktop_type?.includes(key) ? filter.desktop_type.filter(item => item !== key) : [...filter.desktop_type, key])
    }

    const formatUsdPrice = (uzs: number) => {
        return (uzs / +(conversion?.conversions || 0));
    }

    const formatBtnPrice = (price: number) => {
        const from = t("from");
        if (localActive == "uz") {
            return `${formatPrice(price, 0, false)} ${from}`;
        }
        return `${from} ${formatPrice(price, 0, false)}`;
    }

    useEffect(() => {
        fetchDataBefore();
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.light,
                padding: "50px 0"
            }}
        >
            <AppContainer
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <TitleSection
                    label={t("title")}
                />

                <Box sx={{width: '100%', typography: 'body1', mt: "24px"}}>
                    <TabContext value={value}>
                        <Box
                            sx={{
                                borderBottom: 1,
                                borderColor: 'divider',
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <TabList
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons={false}
                            >
                                <CustomTab label={t("atPrice")} value="1"/>
                                <CustomTab label={t("byVideoCard")} value="2"/>
                                <CustomTab label={t("byProcessor")} value="3"/>
                            </TabList>
                        </Box>
                        <TabPanel
                            value="1"
                            sx={{
                                padding: 0,
                                mt: '35px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: {xs: "12px 10px", md: "28px 36px"},
                                    margin: "0 auto"
                                }}
                            >
                                {[
                                    {
                                        price: {
                                            uzs: 4500000,
                                            usd: formatUsdPrice(4500000)
                                        },
                                    },
                                    {
                                        price: {
                                            uzs: 6500000,
                                            usd: formatUsdPrice(6500000)
                                        }
                                    },
                                    {
                                        price: {
                                            uzs: 10000000,
                                            usd: formatUsdPrice(10000000)
                                        }
                                    },
                                    {
                                        price: {
                                            uzs: 13000000,
                                            usd: formatUsdPrice(13000000)
                                        }
                                    },
                                    {
                                        price: {
                                            uzs: 15000000,
                                            usd: formatUsdPrice(15000000),
                                        }
                                    },
                                    {
                                        price: {
                                            uzs: 20000000,
                                            usd: formatUsdPrice(20000000)
                                        }
                                    },
                                    {
                                        price: {
                                            uzs: 30000000,
                                            usd: formatUsdPrice(30000000)
                                        }
                                    }
                                ].map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <ButtonOutlined
                                            onClick={() => handleFilterChange("min_price", filter.min_price === item.price.uzs ? null : item.price.uzs)}
                                            lineColor={theme.palette.secondary.light}
                                            buttonSx={{
                                                fontSize: {xs: "14px", md: "16px"},
                                                lineHeight: "22px",
                                                padding: "6px 13px",
                                                backgroundColor: theme => filter.min_price == item.price.uzs ? theme.palette.primary.main : theme.palette.secondary.light,
                                                textTransform: "math-auto"
                                            }}
                                            label={formatBtnPrice(item.price[currency])}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: {xs: "12px 10px", md: "28px 36px"},
                                    margin: "0 auto"
                                }}
                            >
                                {videoCardAttributes.map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <ButtonOutlined
                                            onClick={() => handleFilterChange("attributes", filter.attributes === item ? null : item)}
                                            lineColor={theme.palette.secondary.light}
                                            buttonSx={{
                                                fontSize: {xs: "14px", md: "16px"},
                                                lineHeight: "22px",
                                                padding: "6px 13px",
                                                backgroundColor: theme => item === filter.attributes ? theme.palette.primary.main : theme.palette.secondary.light
                                            }}
                                            label={item}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </TabPanel>
                        <TabPanel value="3">
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: {xs: "12px 10px", md: "28px 36px"},
                                    margin: "0 auto"
                                }}
                            >
                                {cpuAttributes.map((item, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <ButtonOutlined
                                            onClick={() => handleFilterChange("cpu_attribute", item === filter.cpu_attribute ? null : item)}
                                            lineColor={theme.palette.secondary.light}
                                            buttonSx={{
                                                fontSize: {xs: "14px", md: "16px"},
                                                lineHeight: "22px",
                                                padding: "6px 13px",
                                                backgroundColor: theme => item === filter.cpu_attribute ? theme.palette.primary.main : theme.palette.secondary.light
                                            }}
                                            label={item}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </TabPanel>
                    </TabContext>
                    <Box
                        sx={{
                            display: "flex",
                            mt: {xs: "12px", md: "50px"},
                            justifyContent: "center",
                            gap: "36px",
                            flexWrap: "wrap"
                        }}
                    >
                        {Object.keys(pcType).map((key, idx) => (
                            <FormControlLabel
                                key={idx}
                                control={<IOSSwitch/>}
                                onChange={() => handleChangeCheckbox(key as DesktopNames)}
                                checked={filter.desktop_type?.includes((key as DesktopNames))}
                                label={pcTranslation(pcType[key as DesktopNames])}
                                sx={{
                                    margin: 0,
                                }}
                                componentsProps={{
                                    typography: {
                                        ml: {xs: "4px", md: "12px"},
                                        color: theme.palette.primaryText.main,
                                        fontWeight: 500,
                                        lineHeight: "27px",
                                        fontSize: {xs: 13, md: 22}
                                    }
                                }}
                            />
                        ))}
                        <FormControlLabel
                            control={<IOSSwitch/>}
                            label={t("byGame")}
                            onChange={() => setIsGamesOpened(prev => !prev)}
                            checked={isGamesOpened}
                            sx={{
                                margin: 0,
                            }}
                            componentsProps={{
                                typography: {
                                    ml: {xs: "4px", md: "12px"},
                                    color: theme.palette.primaryText.main,
                                    fontWeight: 500,
                                    lineHeight: "27px",
                                    fontSize: {xs: 13, md: 22}
                                }
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: {xs: "16px", md: "40px"}
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: 0,
                                fontWeight: 600,
                                fontSize: {xs: 16, md: 20},
                                lineHeight: "24px",
                                padding: "14px 85px"
                            }}
                            onClick={fetchData}
                        >
                            {t("ready")}
                        </Button>
                    </Box>
                    {isGamesOpened && (
                        <Box
                            sx={{
                                mt: "32px"
                            }}
                        >
                            <Typography
                                color="primaryText.main"
                                sx={{
                                    fontSize: 20,
                                    fontWeight: 600,
                                    lineHeight: "25px"
                                }}
                            >
                                Выберите игры
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    mt: "22px",
                                    gap: "30px 14px",
                                    maxWidth: "1266px",
                                    flexWrap: "wrap",
                                    justifyContent: "center"
                                }}
                            >
                                {games.map((game) => (
                                    <Box
                                        onClick={() => handleFilterChange("activeGame", game.id === filter.activeGame?.id ? null : game)}
                                        key={game.id}
                                        sx={{
                                            maxWidth: "294px",
                                            minWidth: "294px",
                                            width: "100%",
                                            height: "110px",
                                            position: "relative",
                                            borderWidth: "1px",
                                            borderColor: game.id === filter.activeGame?.id ? "primary.main" : "transparent",
                                            borderStyle: "solid",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Image
                                            src={game.image}
                                            alt="game image"
                                            fill
                                            style={{
                                                objectFit: "contain"
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}

                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "20px",
                            justifyContent: "center",
                            mt: "40px"
                        }}
                    >
                        {desktops.slice(0, 6).map((item) => (
                            <PcCard key={item.id} pc={item}/>
                        ))}
                    </Box>
                </Box>

            </AppContainer>
        </Box>
    );
};

export default HomeSelectPc;
