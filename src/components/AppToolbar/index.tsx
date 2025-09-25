import { Box, Button, IconButton } from "@mui/material";
import { LOGO } from "../../utils/constants";
import { Search } from "@mui/icons-material";
import SearchField from "../SearchField";
import { showSnackbar } from "../SnackbarUtils";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { truncateAddress } from "../../utils/userUtils";
import { useEffect, useState, useRef } from "react";
import { useGetUserQuery, useLoginMutation } from "../../store/apis/userApi";
import { IUserAuth } from "../../interfaces/auth";
import { useAppDispatch } from "../../store/hooks/hook";
import { logout, setCredentials } from "../../store/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../../interfaces/user";
import SearchDialog from "../SearchDialog";
import { setSearchTerm } from "../../store/slices/searchSlice";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../utils/routes";

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
  const { refetch: refetchUser } = useGetUserQuery(params);
  const previousAddress = useRef<string | undefined>(address);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

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

  const fetchUser = async () => {
    if (params.id || params.wallet_address) {
      refetchUser()
        .then((result) => {
          const data = result.data;
          if (data && data.id) {
            dispatch(setSearchTerm(data.id.toString()));
          } else {
            showSnackbar({
              message: "No user found for the provided wallet address or ID.",
              severity: "warning",
            });
          }
        })
        .catch(() => {
          showSnackbar({
            message: "An error occurred while searching for the user.",
            severity: "error",
          });
        });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [params]);

  useEffect(() => {
    if (isConnected && address) {
      handleLogin();
    }
    if (isDisconnected) {
      dispatch(logout());
    }
  }, [isConnected, address, isDisconnected]);

  useEffect(() => {
    if (address && !isInitialized) {
      previousAddress.current = address;
      setIsInitialized(true);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentWalletAddress', address);
      }
    }
  }, [address, isInitialized]);

  useEffect(() => {
    if (!isInitialized || !address) return;
    const currentAddress = address;
    if (previousAddress.current && 
        previousAddress.current !== currentAddress && 
        previousAddress.current !== 'undefined') { 
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentWalletAddress', currentAddress);
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }    
    previousAddress.current = currentAddress;
  }, [address, isInitialized]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        dispatch(logout());
      } else if (accounts[0] && previousAddress.current && 
                 accounts[0].toLowerCase() !== previousAddress.current.toLowerCase()) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('currentWalletAddress', accounts[0]);
        }
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    const handleChainChanged = () => {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    };

    if (window.ethereum.on) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentWalletAddress' && e.newValue && e.newValue !== address) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [address]);

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
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="space-between"
      pl={guest ? 2 : 0}
    >
      <img
        src={LOGO}
        alt="Logo"
        style={{ height: 30, cursor: "pointer" }}
        onClick={() => {
          navigate(RoutePaths.BASE);
        }}
      />
    </Box>
  );
};
