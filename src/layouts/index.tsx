import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { useToolpadRouter } from "../router";
import theme from "../theme/theme";
import { LOGO } from "../utils/constants";
import { Footer } from "../components";
import { Sidebar } from "../utils/sidebarUtils";

const UserLayout = () => {
  const router = useToolpadRouter();

  return (
    <AppProvider
      navigation={Sidebar}
      router={router}
      theme={theme}
      branding={{
        logo: <img src={LOGO} alt="Logo" width="150" />,
        title: "",
      }}
    >
      <DashboardLayout
        sidebarExpandedWidth={250}
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: ({ mini }) => <Footer role="user" mini={mini} />,
        }}
      >
        <PageContainer
          sx={{
            maxWidth: "100% !important",
            width: "100%",
            px: { xs: 2, sm: 2, md: 2 },
          }}
          slots={{
            header: () => <></>,
          }}
        >
          <Outlet />
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default UserLayout;
