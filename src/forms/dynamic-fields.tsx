import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useControlDispatch } from "../context/control-provider";

type User = {
  name: string;
  address: Array<{
    name: string;
  }>;
};

export function DynamicFieldsForm() {
  const dispatch = useControlDispatch();

  const { register, handleSubmit, control } = useForm<User>({
    defaultValues: {
      name: "",
      address: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
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
          <Stack border={"1px"} borderColor={"gray.200"} p={4}>
            <Input
              {...register("name", { required: true })}
              placeholder="name"
            />

            <Box pl={4}>
              <Stack>
                {fields.map((field, index) => {
                  return (
                    <Flex>
                      <Input
                        key={field.id}
                        placeholder="Address"
                        {...register(`address.${index}.name`)}
                      />
                      <CloseButton onClick={() => remove(index)} />
                    </Flex>
                  );
                })}
                <Button
                  onClick={() => {
                    append({ name: "" });
                  }}
                  rightIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Stack>

          <Button type="submit">Save</Button>
        </Stack>
      </form>
    </Container>
  );
}
