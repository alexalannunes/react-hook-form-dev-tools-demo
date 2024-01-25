import { Box, Stack } from "@chakra-ui/react";
import { MenuItem } from "./menu-item";
import { routes } from "../routes";

export function MenuList() {
  return (
    <Box w="260px" borderRight="1px" borderRightColor="gray.100">
      <Stack p={4}>
        {routes.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </Stack>
    </Box>
  );
}
