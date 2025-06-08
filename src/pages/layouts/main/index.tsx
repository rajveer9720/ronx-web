import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useToolpadRouter } from "../../../router";
import { Sidebar } from "../../../utils/sidebarUtils";
import theme from "../../../utils/theme";
import { LOGO } from "../../../utils/constants";
import {
  BackdropSpin,
  Footer,
  PageHeader,
  ToolbarActions,
  ToolbarAppTitle,
} from "../../../components";
import SignupDialog from "../../../components/SignupDialog";

const MainLayout = () => {
  const router = useToolpadRouter();

  return (
    <>
      <SignupDialog />
      <AppProvider
        navigation={Sidebar}
        router={router}
        theme={theme}
        branding={{
          logo: <img src={LOGO} alt="Logo" style={{ height: 32 }} />,
          title: "",
        }}
      >
        <BackdropSpin text="Processing your request, please wait..." />
        <DashboardLayout
          sidebarExpandedWidth={300}
          slots={{
            toolbarAccount: () => null,
            toolbarActions: () => <ToolbarActions />,
            appTitle: () => <ToolbarAppTitle />,
            sidebarFooter: ({ mini }) => <Footer role="user" mini={mini} />,
          }}
        >
          <PageContainer
            sx={{
              position: { md: "relative" },
              maxWidth: "100% !important",
              width: "100%",
              px: { xs: 2, sm: 2, md: 10 },
              py: { xs: 2, sm: 2, md: 2 },
            }}
            slots={{
              header: () => <PageHeader />,
            }}
          >
            <Outlet />
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </>
  );
};

export default MainLayout;
