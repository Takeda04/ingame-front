import {getRequestConfig} from 'next-intl/server';

const locales = ['uz', 'ru'];

export default getRequestConfig(async ({locale}) => {
    if (!locales.includes(locale as any)) {
        return {
            notFound: true
        }
    }

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});

