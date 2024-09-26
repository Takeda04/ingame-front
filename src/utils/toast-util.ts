import toast from "react-hot-toast";
import {Theme} from "@mui/material/styles";

export const toastSuccess = (message: string, theme: Theme) => {
    toast.success(message, {
        iconTheme: {
            primary: theme.palette.primary.main,
            secondary: '#ffffff',
        },
    });
}

export const toastError = (message: string, theme: Theme) => {
    toast.error(message, {
        iconTheme: {
            primary: theme.palette.primary.main,
            secondary: '#ffffff',
        },
    });
}