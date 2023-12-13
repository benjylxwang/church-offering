export type Offering = {
  date: Date;
  service: "Morning" | "Evening" | string;
  specialOffering: string;
  generalOffering: GeneralOffering;
  envelopes: Envelope[];
};

export type Envelope = {
  number: string;
  cashAmount: number;
  chequeAmount: number;
};

export type Cheque = {
  name: string;
  amount: number;
};

export type GeneralOffering = {
  cash: {
    "50": number;
    "20": number;
    "10": number;
    "5": number;
    "2": number;
    "1": number;
    "50p": number;
    "20p": number;
    "10p": number;
    "5p": number;
    "2p": number;
    "1p": number;
  };
  cheques: Cheque[];
};
