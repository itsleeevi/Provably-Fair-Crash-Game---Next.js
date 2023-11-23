import { Box, Button, ResponsiveContext, Anchor } from "grommet";
import { Integration, Magic } from "grommet-icons";
import { React, useContext, useEffect } from "react";

import { CrashContext } from "../contexts/CrashContext";
import { switchNetwork } from "../utils/utils";

const ConnectMetaMask = () => {
  let currentAccount = null;
  const { color, metaMaskInstalled } = useContext(CrashContext);

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
      currentAccount = accounts[0];
    }
  }
  async function getAccount() {
    if (typeof window !== "undefined" && window.ethereum) {
      await switchNetwork();
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("Please connect to MetaMask.");
          } else {
            console.error(err);
          }
        });
    }
  }

  const size = useContext(ResponsiveContext);

  if (metaMaskInstalled) {
    return (
      <>
        {size === "small" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Button
                id="connectButton"
                secondary
                icon={<Integration />}
                label="CONNECT"
                onClick={() => {
                  getAccount();
                }}
                color={color}
              />
            </Box>
          </Box>
        )}
        {size === "medium" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Button
                id="connectButton"
                secondary
                icon={<Integration size="medium" />}
                label="CONNECT"
                onClick={() => {
                  getAccount();
                }}
                color={color}
              />
            </Box>
          </Box>
        )}
        {(size === "large" || size === "large") && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Button
                id="connectButton"
                secondary
                size="xlarge"
                icon={<Integration />}
                label="CONNECT"
                onClick={() => {
                  getAccount();
                }}
                color={color}
              />
            </Box>
          </Box>
        )}
      </>
    );
  } else {
    return (
      <>
        {size === "small" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Anchor
                href="https://fwd.metamask.io"
                label={
                  <Button
                    id="connectButton"
                    secondary
                    icon={<Magic />}
                    label="INSTALL METAMASK"
                    color={color}
                  />
                }
              ></Anchor>
            </Box>
          </Box>
        )}
        {size === "medium" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Anchor
                href="https://fwd.metamask.io"
                label={
                  <Button
                    id="connectButton"
                    secondary
                    icon={<Magic size="medium" />}
                    label="INSTALL METAMASK"
                    color={color}
                  />
                }
              ></Anchor>
            </Box>
          </Box>
        )}
        {(size === "large" || size === "large") && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="xsmall"
            animation="zoomOut"
            responsive={true}
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Box animation="fadeIn">
              <Anchor
                href="https://fwd.metamask.io"
                label={
                  <Button
                    id="connectButton"
                    secondary
                    size="xlarge"
                    icon={<Magic />}
                    label="INSTALL METAMASK"
                    color={color}
                  />
                }
              ></Anchor>
            </Box>
          </Box>
        )}
      </>
    );
  }
};

export default ConnectMetaMask;
