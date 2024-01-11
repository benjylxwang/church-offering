import { Stack, TextField, Typography } from "@mui/material";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { CashNotes, CashValues, GeneralOffering } from "../../types/offering";

type Props = {
  control: Control<GeneralOffering>;
  name: CashNotes;
  watch: UseFormWatch<GeneralOffering>;
  required?: boolean;
};

function CashField({ control, required, name, watch }: Props) {
  const value = watch(`cash.${name}`);
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });
  return (
    <Stack direction="row">
      <Controller
        control={control}
        name={`cash.${name}`}
        rules={{ required }}
        render={({ field }) => (
          <TextField type="number" label={name} {...field} />
        )}
      />
      <Typography>{formatter.format(value * CashValues[name])}</Typography>
    </Stack>
  );
}

export default CashField;
