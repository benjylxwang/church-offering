import { Button, Stack, TextField } from "@mui/material";
import { Control, Controller, UseFieldArrayRemove } from "react-hook-form";
import { Offering } from "../../types/offering";
import { CurrencyInput } from "../atoms/CurrencyInput";

type Props = {
  control: Control<Offering>;
  index: number;
  remove: UseFieldArrayRemove;
};

function ChequeField({ control, index, remove }: Props) {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Controller
        name={`cheques.${index}.name`}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Name"
            sx={{ flex: 1, minWidth: "120px" }}
            required
            error={!!error}
            {...field}
          />
        )}
      />
      <Controller
        name={`cheques.${index}.amount`}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <CurrencyInput
            label="Amount"
            sx={{ flex: 1, minWidth: "120px" }}
            required
            error={!!error}
            {...field}
          />
        )}
      />
      <Button color="error" variant="outlined" onClick={() => remove(index)}>
        Remove
      </Button>
    </Stack>
  );
}

export default ChequeField;
