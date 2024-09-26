import $host from "@/http/index";

export interface IDeliveryMethods {
    id: number;
    name: {
        uz: string;
        ru: string;
    };
    logo: string;
    estimated_delivery_time: number;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface IPaymentTypes {
    id: number;
    name: {
        uz: string;
        ru: string;
    },
    created_at: string;
    updated_at: string;
}

export const getDeliveryMethods = async () => {
    const {data} = await $host.get<{ data: IDeliveryMethods[] }>(`/delivery-methods`);
    return data;
}

export const getPaymentTypes = async () => {
    const {data} = await $host.get<{ data: IPaymentTypes[] }>("/payment-types");
    return data;
}

export const createOrder = async ({
                                      customer_name,
                                      customer_phone,
                                      address,
                                      comment,
                                      delivery_method_id,
                                      total_price,
                                      products
                                  }: {
                                      customer_name: string;
                                      customer_phone: string;
                                      address: string;
                                      comment?: string;
                                      delivery_method_id: number;
                                      total_price: number;
                                      products: {
                                          product_id?: number;
                                          quantity: number;
                                          payment_type_id: number;
                                          credit_id?: number;
                                          credit_term?: number;
                                          desktop_id?: number;
                                          edit_product?: number[]
                                      }[];
                                  }
) => {
    const requestData = {
        customer_name,
        customer_phone,
        address,
        comment,
        delivery_method_id,
        total_price,
        products,
    }
    if(!requestData.comment) {
        delete requestData.comment;
    }
    const {data} = await $host.post("/orders", requestData);
    return data;
}

export const createService = async ({
                                        name,
                                        phone,
                                        type,
                                        services,
                                        other_services,
                                        price
                                    }: {
    name: string;
    phone: string;
    type: string;
    services: string[];
    other_services?: string;
    price?: number;
}) => {
    const responseData: any = {
        name,
        phone,
        type,
        services,
    };
    if (other_services) {
        responseData.other_services = other_services;
    }
    if(price) {
        responseData.price = price;
    }
    const {data} = await $host.post("/services", responseData);
    return data;
}


export const leaveRequest = async ({
                                       name,
                                       phone
                                   }: {
    name: string,
    phone: string,
}) => {
    const {data} = await $host.post("/leave-a-request", {
        name,
        phone
    });
    return data;
}

export const createTradeIn = async ({
                                        name,
                                        phone,
                                        email,
                                        config
                                    }: {
    name: string;
    phone: string;
    email: string;
    config: string;
}) => {
    const {data} = await $host.post("/tradeIn", {
        name,
        phone,
        email,
        config,
    });
    return data;
}