import { Card, Stack, TextField, Typography } from "@mui/material";
import { Offering } from "../../types/offering";
import { useMemo } from "react";
import { calculateTotalCash } from "../forms/CashForm";
import { calculateTotalCheques } from "../forms/ChequesForm";
import { formatter } from "../../helpers/currency-formatter";

type Props = {
  offering: Offering;
};

export const TotalsCard = ({ offering }: Props) => {
  const totalCash = useMemo(
    () => calculateTotalCash(offering.cash),
    [offering]
  );
  const totalGeneral = useMemo(() => {
    return totalCash + calculateTotalCheques(offering.cheques);
  }, [totalCash, offering]);

  return (
    <Card variant="outlined" sx={{ p: 4 }}>
      <Stack direction="row" flexWrap="wrap" gap={4}>
        <Stack direction="row" gap={2}>
          <Stack>
            <Typography variant="h6" noWrap>
              Cash
            </Typography>
            <Typography variant="h6">{formatter.format(totalCash)}</Typography>
          </Stack>
          <TextField
            label="Paid in by"
            helperText="Who has/will pay the cash into the church bank account (e.g. John Smith)"
          />
        </Stack>
        <Stack>
          <Typography variant="h6">
            Total General Offering
            {offering.specialOffering.length > 0
              ? ` for ${offering.specialOffering}`
              : ""}
          </Typography>
          <Typography variant="h6">{formatter.format(totalGeneral)}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};
