import { Button, Container, Input, Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { City, SelectCity } from "../components/custom-fields/select-city";
import { useControlDispatch } from "../context/control-provider";

type User = {
  name: string;
  city: City;
};

export function BasicCustomComponentForm() {
  const dispatch = useControlDispatch();

  const { register, handleSubmit, control } = useForm<User>({
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(control);
  }, []);

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Stack>
          <Input {...register("name", { required: true })} placeholder="name" />

          <Controller
            name="city"
            control={control}
            rules={{
              validate: (value) => value?.id !== 4,
            }}
            render={({ field }) => {
              return (
                <SelectCity
                  value={field.value}
                  onChange={(city) => {
                    field.onChange(city);
                  }}
                />
              );
            }}
          />

          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Container>
  );
}
