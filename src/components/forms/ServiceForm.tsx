import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect } from "react";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormUnregister,
  UseFormWatch,
} from "react-hook-form";
import { Offering } from "../../types/offering";

type Props = {
  control: Control<Offering>;
  watch: UseFormWatch<Offering>;
  register: UseFormRegister<Offering>;
  unregister: UseFormUnregister<Offering>;
};

function ServiceForm({ control, watch, register, unregister }: Props) {
  const typeValue = watch("service");
  const showOther = typeValue === "Other";

  useEffect(() => {
    if (showOther) {
      register("otherServiceName", { value: "" });
    } else {
      unregister("otherServiceName");
    }
  }, [showOther, register, unregister]);

  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2} justifyContent="space-between">
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              label="Date Of Service"
              slotProps={{ textField: { required: true } }}
              {...field}
            />
          )}
        />
        <Controller
          name="specialOffering"
          control={control}
          render={({ field }) => (
            <TextField label="Special Offering?" {...field} />
          )}
        />
      </Stack>
      <Stack direction="row" gap={2} flexWrap="wrap">
        <Controller
          name="service"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error} required {...field}>
              <FormLabel id="demo-radio-buttons-group-label">Service</FormLabel>
              {error?.message && (
                <FormHelperText>{error?.message}</FormHelperText>
              )}
              <RadioGroup row>
                <FormControlLabel
                  value="Morning"
                  control={<Radio />}
                  label="Morning"
                />
                <FormControlLabel
                  value="Evening"
                  control={<Radio />}
                  label="Evening"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        {showOther && (
          <Controller
            name="otherServiceName"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <TextField
                label="Service Name"
                required
                error={!!error}
                helperText={error?.message}
                {...field}
              />
            )}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default ServiceForm;
