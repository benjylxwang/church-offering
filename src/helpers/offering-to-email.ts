import { calculateTotalCash } from "../components/forms/CashForm";
import { calculateTotalCheques } from "../components/forms/ChequesForm";
import { calculateTotalEnvelopes } from "../components/forms/EnvelopesForm";
import { CashNotes, CashValues, Offering } from "../types/offering";
import { formatter } from "./currency-formatter";

export const offeringToEmailSubject = (offering: Offering): string => {
  let service = offering.service;
  if (offering.otherServiceName) {
    service = offering.otherServiceName;
  }

  return `${offering.date.format(`D MMM YYYY`)} ${service} Service Offering`;
};

export const offeringToEmailBody = (offering: Offering): string => {
  const totalGeneralCash = calculateTotalCash(offering.cash);
  const totalGeneralCheques = calculateTotalCheques(offering.cheques);
  const totalGeneral = totalGeneralCash + totalGeneralCheques;

  const totalCashToPayIn =
    totalGeneralCash + calculateTotalEnvelopes(offering.envelopes, "cash");
  const totalChequesToPayIn =
    totalGeneralCheques + calculateTotalEnvelopes(offering.envelopes, "cheque");

  // Convert all empty cash numbers to 0
  Object.values(CashNotes).forEach((note) => {
    if (offering.cash[note] === "") {
      offering.cash[note] = "0";
    }
  });

  return `Summary: ${offeringToEmailSubject(offering)}
  ${
    offering.specialOffering.length > 0
      ? `This is a special offering for ${offering.specialOffering}`
      : "This is not a special offering"
  }

Total General Offering: ${formatter.format(
    totalGeneral
  )} \n(Cash ${formatter.format(totalGeneralCash)} | Cheques ${formatter.format(
    totalGeneralCheques
  )})

Paid in by: ${offering.paidInBy}
To pay in: Cash ${formatter.format(
    totalCashToPayIn
  )} | Cheques ${formatter.format(totalChequesToPayIn)}

Witnessed By: ${offering.witness1} and ${offering.witness2}

Envelopes: ${
    offering.envelopes.length === 0 ? "None" : "\n"
  }${offering.envelopes
    .map(
      (envelope) =>
        `  #${envelope.number}: Cash ${formatter.format(
          Number.parseFloat(envelope.cashAmount)
        )} | Cheque ${formatter.format(
          Number.parseFloat(envelope.chequeAmount)
        )}`
    )
    .join("\n")}

Other Details: ${offering.otherDetails}

=== general offering breakdown below ===

Cash Breakdown:
${Object.values(CashNotes)
  .map(
    (note) =>
      `  ${note}: ${formatter.format(
        Number.parseFloat(offering.cash[note]) * CashValues[note]
      )} (${offering.cash[note]})`
  )
  .join("\n")}

Cheques: ${offering.cheques.length === 0 ? "None" : "\n"}${offering.cheques
    .map(
      (cheque) =>
        `  ${cheque.name} | ${formatter.format(
          Number.parseFloat(cheque.amount)
        )}`
    )
    .join("\n")}
    `;
};
