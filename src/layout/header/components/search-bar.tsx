import React, {FC, useRef, useState} from 'react';
import Grow from "@mui/material/Grow";
import Box from "@mui/material/Box";
import {TextField, useTheme} from "@mui/material";
import AppContainer from "@/ui/app-container/app-container";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@/ui/icons/search";
import CloseIcon from "@/ui/icons/close-icon";
import {useRouter, useSearchParams} from "next/navigation";
import {useLocale} from "next-intl";
import {useOutsideClick} from '@/hooks/use-outside-click';

interface ISearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchBar: FC<ISearchBarProps> = ({isOpen, onClose}) => {
    const [search, setSearch] = useState("");
    const theme = useTheme();
    const router = useRouter();
    const localActive = useLocale();
    const searchParams = useSearchParams()
    const containerRef = useRef(null);

    useOutsideClick(containerRef, onClose);

    const handleClick = () => {
        const params = new URLSearchParams(searchParams?.toString())
        params.set('q', search);
        router.push(`/${localActive}/search?${params.toString()}`);
        onClose();
    }

    return (
        <Grow
            in={isOpen}
            timeout={300}
        >
            <Box
                ref={containerRef}
                sx={{
                    position: "absolute",
                    top: "100%",
                    width: "100%",
                    backgroundColor: theme.palette.primary.main,
                    zIndex: 10
                }}
            >
                <AppContainer>
                    <Box
                        sx={{
                            padding: "10px 0",
                            maxWidth: "739px",
                            display: "flex"
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: 0,
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.primaryText.main,
                                    fontSize: 12,
                                    lineHeight: "14px",
                                    padding: 0
                                }
                            }}
                            sx={{
                                padding: 0
                            }}
                        />
                        <IconButton
                            onClick={handleClick}
                        >
                            <SearchIcon
                                sx={{
                                    "& rect": {
                                        fill: theme.palette.primary.main,
                                    },
                                    "& path": {
                                        fill: theme.palette.secondary.main,
                                    }
                                }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={onClose}
                        >
                            <CloseIcon
                                sx={{
                                    fontSize: 14
                                }}
                            />
                        </IconButton>
                    </Box>
                </AppContainer>
            </Box>
        </Grow>
    );
};


export default SearchBar;