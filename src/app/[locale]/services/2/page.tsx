import SecondService from '@/views/service-2/service-2';
import React from 'react';
import {getServicePrice} from "@/http/service-api";

const Page = async () => {
    const servicePrices = await getServicePrice();

    return <SecondService servicePrices={servicePrices.data}/>;
};

export default Page;