"use client";
import React, {useState} from 'react';
import Image from "next/image";
import ServicesImg from "@/components/services-img/services-img";
import TradeInModal from "@/app/[locale]/services/3/components/tradein-modal/tradein-modal";
import {useTranslations} from 'next-intl';


const ServicesHero = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }
    const tb = useTranslations("Buttons")
    const t = useTranslations("ServicePages.3")
    return (
        <>
            <TradeInModal
                open={isOpen}
                onClose={handleClose}
            />
            <ServicesImg
                title={t("title")}
                text={t('desc')}
                img={<Image
                    src="/service-hero-3-img.png"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                    alt="service img"
                    fill
                />}
                buttonLabel={tb("sendReq")}
                onClickButton={() => setIsOpen(true)}
            />
        </>
    );
};

export default ServicesHero;