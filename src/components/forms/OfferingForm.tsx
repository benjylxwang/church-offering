import { Button, Divider, Stack, TextField, Typography } from "@mui/material";
import {
  useForm,
  SubmitHandler,
  Controller,
  SubmitErrorHandler,
} from "react-hook-form";
import { CashNotes, Offering } from "../../types/offering";
import { CashForm } from "./CashForm";
import { ChequesForm } from "./ChequesForm";
import { ToPayInForm } from "../form-elements/ToPayInForm";
import ServiceForm from "./ServiceForm";
import dayjs from "dayjs";
import EnvelopesForm from "./EnvelopesForm";
import { WitnessForm } from "./WitnessForm";
import {
  offeringToEmailBody,
  offeringToEmailSubject,
} from "../../helpers/offering-to-email";
import copy from "copy-to-clipboard";
import { useState } from "react";
import { Check } from "@mui/icons-material";

function OfferingForm() {
  const { control, handleSubmit, watch, register, unregister, setValue } =
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
        paidInBy: "",
        witness1: "",
        witness2: "",
      },
      mode: "onBlur",
    });

  const onSubmit: SubmitHandler<Offering> = (data) => {
    const subject = offeringToEmailSubject(data);
    const body = encodeURIComponent(offeringToEmailBody(data));
    const email = `treasurer^standrewsbaptist.org.uk`.replace("^", "@");
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  const [copied, setCopied] = useState(false);
  const onSubmitCopy: SubmitHandler<Offering> = (data) => {
    setCopied(true);
    copy(offeringToEmailBody(data));
    setTimeout(() => setCopied(false), 3000);
  };

  const onInvalid: SubmitErrorHandler<Offering> = (errors) => {
    console.log("Failed to submit");
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
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
        <ToPayInForm control={control} watch={watch} />
        <WitnessForm
          label="Witness 1"
          control={control}
          name="witness1"
          watch={watch}
          setValue={setValue}
        />
        <WitnessForm
          label="Witness 2"
          control={control}
          name="witness2"
          watch={watch}
          setValue={setValue}
        />
        <Button variant="contained" type="submit">
          Send to treasurer
        </Button>
        <Divider />
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <Typography>
            Send not working? Click copy to copy the filled in offering sheet
            and paste it in an email to the treasurer
          </Typography>
          <Button
            variant="outlined"
            onClick={handleSubmit(onSubmitCopy, onInvalid)}
            disabled={copied}
            startIcon={copied ? <Check /> : undefined}
            sx={{ minWidth: "108px" }}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export default OfferingForm;
