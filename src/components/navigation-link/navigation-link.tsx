import React, {CSSProperties, FC} from 'react';
import Link from "next/link";
import {useLocale} from "next-intl";

interface INavigationLink {
    href: string;
    children: React.ReactNode;
    style?: CSSProperties;
    onClick?: () => void;
}
const NavigationLink: FC<INavigationLink> = ({ href, children, style, onClick }) => {
    const localActive = useLocale();

    return (
        <Link style={style} onClick={onClick} href={`/${localActive}${href}`}>
            {children}
        </Link>
    );
};

export default NavigationLink;