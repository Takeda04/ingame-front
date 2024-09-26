import React from 'react';
import {useTranslations} from "next-intl";
import Faq from "@/components/faq/faq";

const HomeFaq = () => {
    const t = useTranslations('FAQ');

    return (
        <Faq
            title={t("title")}
            list={new Array(11).fill(1).map((_, idx) => ({
                question: t(`${(idx + 1).toString()}.question`),
                answer: t(`${(idx + 1).toString()}.answer`)
            }))}
        />
    );
};

export default HomeFaq;