import { useForm } from "react-hook-form";
import { useControlDispatch } from "../context/control-provider";
import { useEffect } from "react";
import { Button, Container, Input, Stack } from "@chakra-ui/react";

type User = {
  name: string;
  age: string;
  email: string;
  city: string;
};

export function BasicForm() {
  const dispatch = useControlDispatch();

  const { register, handleSubmit, control } = useForm<User>();

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

          <Input {...register("age")} placeholder="age" />
          <Input {...register("email")} placeholder="email" />
          <Input {...register("city")} placeholder="city" />

          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Container>
  );
}
