import { Button, Stack, TextField } from "@mui/material";
import {
  Control,
  Controller,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Offering } from "../../types/offering";

type Props = {
  label: string;
  name: "witness1" | "witness2";
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
  setValue: UseFormSetValue<Offering>;
};

export const WitnessForm = ({
  label,
  control,
  name,
  watch,
  setValue,
}: Props) => {
  const value = watch(name);
  return (
    <Stack direction="row" gap={2}>
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            required
            label={label}
            sx={{ flex: 1 }}
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />
      <Button
        disabled={value === ""}
        onClick={() => value !== "" && setValue("paidInBy", value)}
      >
        Paid in?
      </Button>
    </Stack>
  );
};
