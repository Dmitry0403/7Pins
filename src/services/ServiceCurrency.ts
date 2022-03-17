import type { ICurrency } from "../store/currencySlice";

interface IServiceCurrency {
    getCurrency: (params: string) => Promise<any>;
}

class ServiceCurrency implements IServiceCurrency {
    getCurrency(params: string): Promise<ICurrency[]> {
        return fetch(params).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
        });
    }
}

export const serviceCurrency = new ServiceCurrency();
