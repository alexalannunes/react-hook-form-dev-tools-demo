import { Container, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { MenuList } from "./components/menu";

export function Layout() {
  return (
    <Flex minH="100vh">
      <MenuList />
      <Flex direction="column" flex={1}>
        <Container maxW={"container.lg"} pt={4}>
          <Outlet />
        </Container>
      </Flex>
    </Flex>
  );
}
