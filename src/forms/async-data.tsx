import { useForm } from "react-hook-form";
import { useControlDispatch } from "../context/control-provider";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

type User = {
  name: string;
  users?: Array<{ firstName: string }>;
};

export function AsyncForm() {
  const dispatch = useControlDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<Array<{ firstName: string }>>([]);

  const { register, handleSubmit, control, setValue } = useForm<User>();

  useEffect(() => {
    dispatch(control);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("https://api.github.com/users/alexalannunes")
        .then((re) => re.json())
        .then((re) => {
          const response = re as User;
          setValue("name", response.name);
        })
        .finally(() => {
          setIsLoading(false);
        });

      fetch("https://dummyjson.com/users?limit=4")
        .then((re) => re.json())
        .then((re) => {
          const response = re as { users: Array<{ firstName: string }> };
          setValue("users", response.users);
          setUsers(response.users);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  }, []);

  const onSubmit = handleSubmit((data) => {
    alert(JSON.stringify(data));
  });

  return (
    <Container>
      {isLoading ? <Spinner /> : <Text color={"green.400"}>loaded :)</Text>}
      <form onSubmit={onSubmit}>
        <Stack>
          <Text>
            <i>github user</i>
          </Text>
          <Input {...register("name", { required: true })} placeholder="name" />
          <hr />
          {users?.map((_, index) => (
            <Input
              {...register(`users.${index}.firstName`, { required: true })}
            />
          ))}
          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Container>
  );
}
