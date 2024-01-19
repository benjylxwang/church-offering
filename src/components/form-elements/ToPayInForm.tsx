import { Card, Stack, TextField, Typography } from "@mui/material";
import { Offering } from "../../types/offering";
import { useMemo } from "react";
import { calculateTotalCash } from "../forms/CashForm";
import { calculateTotalCheques } from "../forms/ChequesForm";
import { formatter } from "../../helpers/currency-formatter";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { calculateTotalEnvelopes } from "../forms/EnvelopesForm";

type Props = {
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
};

export const ToPayInForm = ({ control, watch }: Props) => {
  const offering = watch();

  const cashToPayIn = useMemo(
    () =>
      calculateTotalCash(offering.cash) +
      calculateTotalEnvelopes(offering.envelopes, "cash"),
    [offering]
  );
  const chequesToPayIn = useMemo(
    () =>
      calculateTotalCheques(offering.cheques) +
      calculateTotalEnvelopes(offering.envelopes, "cheque"),
    [offering]
  );

  return (
    <Card variant="outlined" sx={{ p: 4 }}>
      <Stack gap={2}>
        <Typography variant="h6" noWrap>
          To Pay In
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="h6">
            Cash: {formatter.format(cashToPayIn)}
          </Typography>
          <Typography variant="h6">
            Cheques: {formatter.format(chequesToPayIn)}
          </Typography>
          <Controller
            name="paidInBy"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Paid in by"
                helperText="Who has/will pay the cash into the church bank account (e.g. John Smith)"
                required
                error={!!error}
                {...field}
              />
            )}
          />
        </Stack>
      </Stack>
    </Card>
  );
};
