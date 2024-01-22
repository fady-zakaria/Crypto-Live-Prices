export interface Crypto {
  id: string;
  name: string;
  price: number;
}

export interface CryptoProfile {
  name: string;
  symbol: string;
  profile: {
    general: {
      overview: {
        tagline: string;
        project_details: string;
      };
      background: {
        background_details: string;
      };
    };
  };
}

export interface CryptoMarketData {
  market_data: {
    price_usd: number;
    percent_change_usd_last_1_hour: number;
    percent_change_usd_last_24_hours: number;
  };
}

export const CryptoProfileInit: CryptoProfile = {
  name: '',
  symbol: '',
  profile: {
    general: {
      overview: {
        tagline: '',
        project_details: '',
      },
      background: {
        background_details: '',
      },
    },
  },
};

export const CryptoMarketDataInit: CryptoMarketData = {
  market_data: {
    price_usd: 0,
    percent_change_usd_last_1_hour: 0,
    percent_change_usd_last_24_hours: 0,
  },
};

export interface processenv {
  [key: string]: string | undefined;
}
