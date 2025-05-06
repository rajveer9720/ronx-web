import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useToolpadRouter } from "../router";
import theme from "../theme/theme";
import { LOGO } from "../utils/constants";
import {
  BackdropSpin,
  Footer,
  PageHeader,
  ToolbarActions,
  ToolbarAppTitle,
} from "../components";
import { Sidebar } from "../utils/sidebarUtils";
import { useLoader } from "../context/LoaderContext";

const UserLayout = () => {
  const router = useToolpadRouter();
  const { loading } = useLoader();

  return (
    <AppProvider
      navigation={Sidebar}
      router={router}
      theme={theme}
      branding={{
        logo: <img src={LOGO} alt="Logo" style={{ height: 32 }} />,
        title: "",
      }}
    >
      <BackdropSpin
        loading={loading}
        text="Processing your request, please wait..."
      />
      <DashboardLayout
        sidebarExpandedWidth={250}
        slots={{
          toolbarAccount: () => null,
          toolbarActions: () => <ToolbarActions />,
          appTitle: () => <ToolbarAppTitle />,
          sidebarFooter: ({ mini }) => <Footer role="user" mini={mini} />,
        }}
      >
        <PageContainer
          sx={{
            maxWidth: "100% !important",
            width: "100%",
            px: { xs: 2, sm: 2, md: 5 },
            py: { xs: 2, sm: 2, md: 5 },
          }}
          slots={{
            header: () => <PageHeader />,
          }}
        >
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default UserLayout;
