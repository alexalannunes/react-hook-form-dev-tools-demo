import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";

export type City = {
  id: number;
  name: string;
};

interface Props {
  value: City;
  onChange: (city: City) => void;
}

export function SelectCity({ value, onChange }: Props) {
  const cities: City[] = [
    {
      id: 1,
      name: "Sao Paulo",
    },
    {
      id: 2,
      name: "Salvador",
    },
    {
      id: 3,
      name: "New York",
    },
    {
      id: 4,
      name: "Error city",
    },
  ];
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {value?.name && value.id ? value.name : "Select city..."}
      </MenuButton>
      <MenuList>
        {cities.map(({ id, name }) => (
          <MenuItem
            onClick={() => {
              onChange({ id, name });
            }}
            key={id}
          >
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
