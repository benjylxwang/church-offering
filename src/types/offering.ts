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

export enum CashNotes {
  FIFTY = "£50",
  TWENTY = "£20",
  TEN = "£10",
  FIVE = "£5",
  TWO = "£2",
  ONE = "£1",
  FIFTY_PENCE = "50p",
  TWENTY_PENCE = "20p",
  TEN_PENCE = "10p",
  FIVE_PENCE = "5p",
  TWO_PENCE = "2p",
  ONE_PENCE = "1p",
}

export const CashValues = {
  [CashNotes.FIFTY]: 50,
  [CashNotes.TWENTY]: 20,
  [CashNotes.TEN]: 10,
  [CashNotes.FIVE]: 5,
  [CashNotes.TWO]: 2,
  [CashNotes.ONE]: 1,
  [CashNotes.FIFTY_PENCE]: 0.5,
  [CashNotes.TWENTY_PENCE]: 0.2,
  [CashNotes.TEN_PENCE]: 0.1,
  [CashNotes.FIVE_PENCE]: 0.05,
  [CashNotes.TWO_PENCE]: 0.02,
  [CashNotes.ONE_PENCE]: 0.01,
}

export type GeneralOffering = {
  cash: {
    [name in CashNotes]: number;
  };
  cheques: Cheque[];
};
