import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useControlDispatch } from "../context/control-provider";
import { useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

type User = {
  name: string;
  age: string;
  email: string;
  city: string;
};

function InputName() {
  const { register } = useFormContext<User>();
  return (
    <Stack>
      <Text>component Name</Text>
      <Input {...register("name", { required: true })} placeholder="name" />;
    </Stack>
  );
}

function InputAge() {
  const { register } = useFormContext<User>();
  return (
    <Stack>
      <Text>component Age</Text>
      <Input {...register("age")} placeholder="age" />
    </Stack>
  );
}

function InputEmail() {
  const { register } = useFormContext<User>();
  return (
    <Stack>
      <Text>component Email</Text>
      <Input {...register("email")} placeholder="email" />
    </Stack>
  );
}

function InputCity() {
  const { register } = useFormContext<User>();
  return (
    <Stack>
      <Text>component City</Text>
      <Input {...register("city")} placeholder="city" />
    </Stack>
  );
}

function OtherFields() {
  const { register } = useFormContext<User & Record<string, any>>();

  return (
    <Stack>
      <Text>Other fields components</Text>

      <Stack>
        <Input {...register("tmp1")} />
        <Input {...register("tmp2")} />
        <Input {...register("tmp3")} />
      </Stack>
    </Stack>
  );
}

export function FormContextForm() {
  const dispatch = useControlDispatch();

  const methods = useForm<User>();

  const { control, handleSubmit } = methods;

  useEffect(() => {
    dispatch(control);
  }, []);
  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Stack>
            <InputName />
            <InputAge />
            <InputEmail />
            <InputCity />
            <Divider />
            <OtherFields />
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
}
