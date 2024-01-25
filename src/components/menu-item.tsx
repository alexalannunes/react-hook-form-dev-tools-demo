import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { IRoute } from "../types/route";
import { useControlDispatch } from "../context/control-provider";

interface Props {
  item: IRoute;
}
export function MenuItem({ item }: Props) {
  const navigate = useNavigate();
  const dispatch = useControlDispatch();

  const { pathname } = useLocation();

  const isActive = item.path === pathname;

  const goToDemo = (route: IRoute) => {
    dispatch(null);
    navigate(route.path);
  };

  return (
    <Button
      isActive={isActive}
      justifyContent="flex-start"
      onClick={() => goToDemo(item)}
      variant="ghost"
    >
      {item.label}
    </Button>
  );
}
