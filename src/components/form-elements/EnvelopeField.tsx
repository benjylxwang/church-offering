import { Button, Stack, TextField } from "@mui/material";
import { Control, Controller, UseFieldArrayRemove } from "react-hook-form";
import { Offering } from "../../types/offering";
import { CurrencyInput } from "../atoms/CurrencyInput";

type Props = {
  control: Control<Offering>;
  index: number;
  remove: UseFieldArrayRemove;
};

function EnvelopeField({ control, index, remove }: Props) {
  return (
    <Stack direction="row" alignItems="center" gap={2} flexWrap="wrap">
      <Controller
        name={`envelopes.${index}.number`}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            label="Number"
            sx={{ flex: 1, minWidth: "120px" }}
            required
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name={`envelopes.${index}.cashAmount`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CurrencyInput
            label="Cash Amount"
            sx={{ flex: 1, minWidth: "120px" }}
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name={`envelopes.${index}.chequeAmount`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CurrencyInput
            label="Cheque Amount"
            sx={{ flex: 1, minWidth: "120px" }}
            error={!!error}
            helperText={error?.message}
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

export default EnvelopeField;
