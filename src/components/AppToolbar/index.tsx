import { Box, Button, IconButton } from "@mui/material";
import { LOGO } from "../../utils/constants";
import { Search } from "@mui/icons-material";
import SearchField from "../SearchField";
import { showSnackbar } from "../SnackbarUtils";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { truncateAddress } from "../../utils/userUtils";
import { useEffect, useState } from "react";
import { useGetUserQuery, useLoginMutation } from "../../store/apis/userApi";
import { IUserAuth } from "../../interfaces/auth";
import { useAppDispatch } from "../../store/hooks/hook";
import { logout, setCredentials } from "../../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../interfaces/user";
import SearchDialog from "../SearchDialog";
import { setSearchTerm } from "../../store/slices/searchSlice";

interface AppToolbarProps {
  guest?: boolean;
}

export const ToolbarActions = (props: AppToolbarProps) => {
  const { guest } = props;
  const { isConnected, isDisconnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [showSearchDialog, setShowSearchDialog] = useState<boolean>(false);
  const [params, setParams] = useState<any>({});
  const { data: user, refetch } = useGetUserQuery(params);

  const handleWalletConnect = () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      } else {
        openAccountModal?.();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      showSnackbar({
        message: "Error connecting wallet. Please try again.",
        severity: "error",
      });
    }
  };

  const handleLogin = async () => {
    try {
      const payload: IUserAuth = { wallet_address: address as string };
      const access_token: string = await login(payload).unwrap();
      if (access_token) {
        const user = jwtDecode(access_token) as IUser;
        dispatch(setCredentials({ token: access_token, user }));
      }
    } catch (error) {}
  };

  const handleSearch = async (value: string) => {
    const type = /^\d+$/.test(value) ? "number" : "string";
    if (type === "number") {
      setParams({ id: Number(value) });
    } else {
      setParams({ wallet_address: value });
    }
  };

  useEffect(() => {
    if (params.id || params.wallet_address) {
      refetch();
      dispatch(setSearchTerm(user?.id.toString() || ""));
    }
  }, [params, user]);

  useEffect(() => {
    if (isConnected && address) {
      handleLogin();
    }
    if (isDisconnected) {
      dispatch(logout());
    }
  }, [isConnected, address, isDisconnected]);

  return (
    <>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
        gap={0.5}
        pr={2}
      >
        {!guest && (
          <>
            <Box
              sx={{ display: { xs: "block", sm: "block", md: "none" }, mr: 1 }}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => {
                  setShowSearchDialog(true);
                }}
              >
                <Search />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              <SearchField
                placeholder="Search by wallet address or ID"
                styles={{ width: "25vw" }}
                onSearch={handleSearch}
              />
            </Box>
          </>
        )}

        <Button
          variant="outlined"
          color="inherit"
          onClick={handleWalletConnect}
        >
          {isConnected ? (
            <span>{truncateAddress(String(address))}</span>
          ) : (
            <span>Connect Wallet</span>
          )}
        </Button>
      </Box>

      <SearchDialog
        open={showSearchDialog}
        handleClose={() => {
          setShowSearchDialog(false);
        }}
        onSearch={handleSearch}
      />
    </>
  );
};

export const ToolbarAppTitle = (props: AppToolbarProps) => {
  const { guest } = props;
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
      pl={guest ? 2 : 0}
    >
      <img src={LOGO} alt="Logo" style={{ height: 30 }} />
    </Box>
  );
};
