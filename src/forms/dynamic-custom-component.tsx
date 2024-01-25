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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useControlDispatch } from "../context/control-provider";
import { City, SelectCity } from "../components/custom-fields/select-city";

type User = {
  name: string;
  cities: City[];
};

export function DynamicFieldsCustomComponentForm() {
  const dispatch = useControlDispatch();

  const { register, handleSubmit, control } = useForm<User>({
    defaultValues: {
      name: "",
      cities: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cities",
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
                {fields.map((_, index) => {
                  return (
                    <Flex>
                      <Controller
                        control={control}
                        name={`cities.${index}`}
                        render={({ field }) => (
                          <SelectCity
                            value={field.value}
                            onChange={(city) => {
                              console.log(city);
                              field.onChange(city);
                            }}
                          />
                        )}
                      />
                      <CloseButton onClick={() => remove(index)} />
                    </Flex>
                  );
                })}
                <Button
                  onClick={() => {
                    append({ id: Date.now(), name: "" });
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
