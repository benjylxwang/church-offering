import { Button, Stack, TextField } from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { CashNotes, Offering } from "../../types/offering";
import { CashForm } from "./CashForm";
import { ChequesForm } from "./ChequesForm";
import { TotalsCard } from "../form-elements/TotalCard";
import ServiceForm from "./ServiceForm";
import dayjs from "dayjs";
import EnvelopesForm from "./EnvelopesForm";
import { WitnessForm } from "./WitnessForm";

function OfferingForm() {
  const { control, handleSubmit, watch, register, unregister } =
    useForm<Offering>({
      defaultValues: {
        date: dayjs(),
        service: "",
        otherServiceName: "",
        specialOffering: "",
        cash: Object.values(CashNotes).reduce(
          (a, v) => ({ ...a, [v]: "" }),
          {}
        ),
        cheques: [],
        envelopes: [],
        otherDetails: "",
      },
      mode: "onBlur",
    });

  const onSubmit: SubmitHandler<Offering> = (data) => {
    console.log("Submitted");
    console.log(data);
  };

  const onInvalid: SubmitErrorHandler<Offering> = (errors) => {
    console.log("Failed to submit");
    console.log(errors);
  };

  const offering = watch();

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
      <Stack gap={2}>
        <ServiceForm
          control={control}
          watch={watch}
          register={register}
          unregister={unregister}
        />
        <Stack>
          <CashForm defaultOpen control={control} watch={watch} />
          <ChequesForm control={control} watch={watch} />
          <EnvelopesForm control={control} watch={watch} />
        </Stack>
        <Controller
          name="otherDetails"
          control={control}
          render={({ field }) => (
            <TextField
              multiline
              minRows={3}
              label="Any other details"
              helperText="Foreign currency, vouchers, gifts for special causes..."
              {...field}
            />
          )}
        />
        <TotalsCard offering={offering} />
        <WitnessForm label="Witness 1" />
        <WitnessForm label="Witness 2" />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}

export default OfferingForm;
