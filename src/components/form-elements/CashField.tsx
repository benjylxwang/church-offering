import { Stack, TextField, Typography } from "@mui/material";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { CashNotes, CashValues, Offering } from "../../types/offering";
import { NumericFormat } from "react-number-format";

type Props = {
  control: Control<Offering>;
  name: CashNotes;
  watch: UseFormWatch<Offering>;
  required?: boolean;
};

function CashField({ control, required, name, watch }: Props) {
  const value = watch(`cash.${name}`);
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  return (
    <Stack direction="row" alignItems="center" gap={4}>
      <Controller
        control={control}
        name={`cash.${name}`}
        rules={{ required, min: 0 }}
        render={({ field: { ref, ...field } }) => (
          <NumericFormat
            customInput={TextField}
            label={name}
            decimalScale={0}
            type="tel"
            {...field}
            inputRef={ref}
            required={required}
          />
        )}
      />
      <Typography sx={{ minWidth: 100 }}>
        {formatter.format(value * CashValues[name])}
      </Typography>
    </Stack>
  );
}

export default CashField;
