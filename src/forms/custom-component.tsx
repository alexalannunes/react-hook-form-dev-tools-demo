import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { City, SelectCity } from "../components/custom-fields/select-city";
import { useControlDispatch } from "../context/control-provider";
import flamengo from "../../public/flamengo.png";
import corinthians from "../../public/corinthians.svg";
import saopaulo from "../../public/saopaulo.svg";

type User = {
  name: string;
  city: City;
  team: string;
};

interface Props {
  value: string;
  onChange: (v: string) => void;
}
function BestSoccerTeam({ value, onChange }: Props) {
  const flag = [flamengo, corinthians, saopaulo];
  return (
    <Stack>
      <Text>Melhor time do Brasil</Text>
      <HStack>
        {["flamengo", "corinthians", "São Paulo"].map((team, index) => (
          <Flex
            key={team}
            rounded={"md"}
            h="20"
            w={"20"}
            p={4}
            alignItems={"center"}
            justifyContent={"center"}
            border={"1px"}
            borderColor={"gray.400"}
            cursor={"pointer"}
            bg={value === team ? "cyan.100" : "white"}
            onClick={() => {
              onChange(team);
            }}
            _hover={{
              borderColor: "red.400",
            }}
          >
            <Image src={flag[index]} alt={team} />
          </Flex>
        ))}
      </HStack>
    </Stack>
  );
}

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

          <Controller
            name="team"
            control={control}
            render={({ field }) => {
              return (
                <BestSoccerTeam
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
