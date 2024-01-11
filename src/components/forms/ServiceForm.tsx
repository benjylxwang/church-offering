import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export interface ServiceFormInput {
  date: Dayjs;
  type: string;
  otherType?: string;
}

function ServiceForm() {
  const { control, handleSubmit, watch, register, unregister } =
    useForm<ServiceFormInput>({
      defaultValues: {
        date: dayjs(),
        type: "",
      },
    });
  const typeValue = watch("type");
  const showOther = typeValue === "Other";

  const onSubmit: SubmitHandler<ServiceFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (showOther) {
      register("otherType");
    } else {
      unregister("otherType");
    }
  }, [showOther, register, unregister]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker label="Date Of Service" {...field} />
          )}
        />
        <Stack direction="row" gap={2} flexWrap="wrap">
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl {...field}>
                <FormLabel id="demo-radio-buttons-group-label">
                  Service
                </FormLabel>
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
              name="otherType"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField label="Service Name" {...field} />
              )}
            />
          )}
        </Stack>
      </Stack>
    </form>
  );
}

export default ServiceForm;
