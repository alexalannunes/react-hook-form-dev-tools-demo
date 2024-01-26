import { Heading } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { BasicForm } from "./forms/basic";
import { Layout } from "./layout";
import { IRoute } from "./types/route";
import { BasicCustomComponentForm } from "./forms/custom-component";
import { DynamicFieldsForm } from "./forms/dynamic-fields";
import { DynamicFieldsCustomComponentForm } from "./forms/dynamic-custom-component";
import { AsyncForm } from "./forms/async-data";
import { FormContextForm } from "./forms/form-context";

interface IRouteApp extends IRoute {
  element: JSX.Element;
}

const routes: IRouteApp[] = [
  {
    label: "Basic",
    path: "/",
    element: <BasicForm />,
  },
  {
    label: "Custom component",
    path: "/custom-component",
    element: <BasicCustomComponentForm />,
  },
  {
    label: "Dynamic Fields",
    path: "/dynamic-fields",
    element: <DynamicFieldsForm />,
  },
  {
    label: "Dynamic + custom",
    path: "/dynamic-fields-custom-component",
    element: <DynamicFieldsCustomComponentForm />,
  },
  {
    label: "Async Form",
    path: "/async-form",
    element: <AsyncForm />,
  },
  {
    label: "Form Context",
    path: "/form-form",
    element: <FormContextForm />,
  },
];

export { routes };

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
      <Route path="*" element={<Heading>Not found...</Heading>} />
    </Routes>
  );
}
