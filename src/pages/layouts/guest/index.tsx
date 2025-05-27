import { AppProvider } from "@toolpad/core/AppProvider";
import theme from "../../../utils/theme";
import { LOGO } from "../../../utils/constants";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import {
  BackdropSpin,
  ToolbarActions,
  ToolbarAppTitle,
} from "../../../components";
import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <AppProvider theme={theme}>
      <BackdropSpin text="Processing your request, please wait..." />
      <DashboardLayout
        hideNavigation
        slots={{
          toolbarAccount: () => null,
          toolbarActions: () => <ToolbarActions guest />,
          appTitle: () => <ToolbarAppTitle guest />,
        }}
      >
        <PageContainer
          sx={{
            maxWidth: "100% !important",
            width: "100%",
            px: { xs: 2, sm: 2, md: 10 },
            py: { xs: 2, sm: 2, md: 2 },
          }}
        >
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default GuestLayout;
