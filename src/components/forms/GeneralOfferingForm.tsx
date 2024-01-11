import { Stack } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { CashNotes, GeneralOffering } from "../../types/offering";
import CashField from "../form-elements/CashField";

function GeneralOfferingForm() {
  const { control, handleSubmit, watch } = useForm<GeneralOffering>({
    defaultValues: {
      cash: Object.values(CashNotes).reduce((a, v) => ({ ...a, [v]: 0 }), {}),
    },
  });

  const onSubmit: SubmitHandler<GeneralOffering> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2}>
        {Object.values(CashNotes).map((name) => (
          <CashField key={name} control={control} name={name} watch={watch} />
        ))}
      </Stack>
    </form>
  );
}

export default GeneralOfferingForm;
