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
    <Stack direction="row" alignItems="center" gap={2}>
      <Controller
        name={`envelopes.${index}.number`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField label="Number" sx={{ flex: 1 }} {...field} />
        )}
      />
      <Controller
        name={`envelopes.${index}.cashAmount`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CurrencyInput label="Cash Amount" sx={{ flex: 1 }} {...field} />
        )}
      />
      <Controller
        name={`envelopes.${index}.chequeAmount`}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CurrencyInput label="Cheque Amount" sx={{ flex: 1 }} {...field} />
        )}
      />
      <Button color="error" variant="outlined" onClick={() => remove(index)}>
        Remove
      </Button>
    </Stack>
  );
}

export default EnvelopeField;
