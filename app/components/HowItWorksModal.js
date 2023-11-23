import React, { useState } from "react";
import {
  Box,
  Text,
  Form,
  FormField,
  Grid,
  TextInput,
  Button,
  Anchor,
  Spinner,
  PageHeader,
  Heading,
} from "grommet";
import { CrashContext } from "../contexts/CrashContext";
import styled from "styled-components";
import { useContext, useEffect } from "react";
import {
  Money,
  Cube,
  Alert,
  User,
  Close,
  Atm,
  Add,
  HelpBook,
} from "grommet-icons";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css"; // This is the style, you can change it
import crypto from "crypto";

const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  overflow: auto;
`;

const HowItWorksModal = () => {
  const {
    howItWorksModalOpen,
    setHowItWorksModalOpen,
    modalOpen,
    color,
    setModalOpen,
    isDeposit,
    isWithdraw,
    setIsDeposit,
    setIsWithdraw,
    gameBalance,
    setGameBalance,
    walletBalance,
    deposit,
    accounts,
    token,
    socket,
    withdraw,
  } = useContext(CrashContext);
  const [serverSeed, setServerSeed] = useState("");
  const [nonce, setNonce] = useState("");
  const [maxMultiplier, setMaxMultiplier] = useState("");
  const [calculatedCrashPoint, setCalculatedCrashPoint] = useState(undefined);
  const [serverSeedHashCalculation, setServerSeedHashCalculation] =
    useState(undefined);
  const [calculatedHash, setCalculatedHash] = useState(undefined);

  const calculateCrashPoint = () => {
    // Hash the combined server seed and nonce
    const hash = crypto
      .createHash("sha256")
      .update(`${serverSeed}-${nonce}`)
      .digest("hex");

    // Convert the hash to a number in the range [0, 1)
    const hashFraction = parseInt(hash.slice(0, 10), 16) / 0xffffffffff;

    // Scale the hash fraction to the range [1, maxMultiplier]
    let crashPoint = 1 + hashFraction * (maxMultiplier - 1);

    setCalculatedCrashPoint(crashPoint.toFixed(2));
  };

  const calculateHash = () => {
    const hash = crypto
      .createHash("sha256")
      .update(serverSeedHashCalculation)
      .digest("hex");

    setCalculatedHash(hash);
  };

  const CodeSnippet = ({ code }) => {
    useEffect(() => {
      hljs.highlightAll();
    }, []);

    return (
      <Box
        background="#171717"
        round="xsmall"
        border={{ color: "#1B1B1B", size: "xsmall" }}
        overflow={{ horizontal: "auto" }}
      >
        <pre>
          <code>{code}</code>
        </pre>
      </Box>
    );
  };

  return (
    <>
      {howItWorksModalOpen && (
        <ModalContainer>
          <Box
            background="#171717"
            round="xsmall"
            pad="large"
            border={{ color: "#1B1B1B", size: "large" }}
            gap="medium"
            width="60%"
            height={window.innerWidth > 600 ? "80%" : "100%"}
            overflow="auto"
            responsive={true}
            wrap={true}
          >
            <Grid
              margin={{ top: "none" }}
              columns={{
                count: 1,
                size: "auto",
              }}
              gap="xsmall"
              overflow="auto"
            >
              <PageHeader
                margin={{ top: "none", bottom: "small" }}
                title={
                  <Box direction="row" gap="small">
                    <Heading>How It Works</Heading>
                    <HelpBook size="large" color="#6FFFB0" />
                  </Box>
                }
                subtitle="Provably Fair Crash Game"
                actions={
                  <Box direction="column" gap="small">
                    <Anchor
                      justify="end"
                      label="Close"
                      color="#6FFFB0"
                      onClick={() => {
                        setHowItWorksModalOpen(false);
                        setServerSeed(undefined);
                        setNonce(undefined);
                        setMaxMultiplier(undefined);
                        setCalculatedCrashPoint(undefined);
                        setServerSeedHashCalculation(undefined);
                        setCalculatedHash(undefined);
                      }}
                    />
                  </Box>
                }
                pad={{ bottom: "small" }}
              />
              <Text weight="lighter">
                Our game uses a unique formula to determine each round's crash
                point. We start with a secret number, known as the server seed,
                and combine it with a unique game counter called the nonce. To
                ensure fairness, we first hide this secret number (seed) with a
                'hash', and we make that public before each round. The seed
                always produces the same hash, so after each game, we'll get
                this same 'hash' by hashing the secret number again, proving
                that the seed and the crash point weren't changed during the
                game. The crash point is designed not to exceed a certain limit,
                the max multiplier, which we set based on our total funds and
                all players' bets. After the game, we reveal the server seed.
                You can then decode it and check both the formula and the limit.
                This process proves that the crash point was calculated fairly
                and in advance, ensuring a transparent and trustworthy game
                experience.
                <br />
                <br />
                If you scroll below, you can make sure all about this by
                providing the server seed, nonce, and max multiplier to
                calculate the crash point. You can also calculate the server
                seed hash to verify the seeds.
                <br /> Find all these necessary details at Crash History.
              </Text>
              <Heading margin={{ top: "medium", bottom: "small" }} level={3}>
                Hash Server Seed
              </Heading>
              <Grid
                columns={{
                  count: 3,
                  size: "auto",
                }}
                rows={{
                  count: 1,
                  size: "auto",
                }}
                gap="xsmall"
              >
                <TextInput
                  placeholder="server seed"
                  size="xsmall"
                  value={serverSeedHashCalculation}
                  onChange={(event) =>
                    setServerSeedHashCalculation(event.target.value)
                  }
                />

                <>
                  {calculatedHash && (
                    <TextInput value={calculatedHash} size="xsmall" />
                  )}
                  {!calculatedHash && (
                    <TextInput
                      value={"Enter server seed to hash..."}
                      size="xsmall"
                    />
                  )}
                </>

                <Button
                  primary
                  size="xsmall"
                  color="#6FFFB0"
                  label={<Text size="small">HASH!</Text>}
                  onClick={() => calculateHash()}
                />
              </Grid>
              <Heading margin={{ top: "medium", bottom: "small" }} level={3}>
                Verify Crash Point
              </Heading>
              <Grid
                columns={{
                  count: 4,
                  size: "auto",
                }}
                rows={{
                  count: 1,
                  size: "auto",
                }}
                gap="xsmall"
              >
                <TextInput
                  placeholder="server seed"
                  size="xsmall"
                  value={serverSeed}
                  onChange={(event) => setServerSeed(event.target.value)}
                />
                <TextInput
                  placeholder="nonce"
                  size="xsmall"
                  value={nonce}
                  onChange={(event) => setNonce(event.target.value)}
                />
                <TextInput
                  placeholder="max multiplier"
                  size="xsmall"
                  value={maxMultiplier}
                  onChange={(event) => setMaxMultiplier(event.target.value)}
                />
                <Button
                  primary
                  size="xsmall"
                  color="#6FFFB0"
                  label={<Text size="small">CALCULATE!</Text>}
                  onClick={() => calculateCrashPoint()}
                />
              </Grid>
              <Button
                color="#6FFFB0"
                textAlign="start"
                label={
                  <>
                    <Text size="small" textAlign="start">
                      RESULT CRASH POINT:{" "}
                    </Text>
                    <>
                      {calculatedCrashPoint && (
                        <Text
                          size="small"
                          color="#6FFFB0"
                          weight="normal"
                          textAlign="start"
                        >
                          {calculatedCrashPoint}x
                        </Text>
                      )}
                      {!calculatedCrashPoint && (
                        <Text
                          size="small"
                          color="#6FFFB0"
                          weight="normal"
                          textAlign="start"
                        >
                          Enter the round details to calculate...
                        </Text>
                      )}
                    </>
                  </>
                }
              />
              <Heading margin={{ top: "medium", bottom: "small" }} level={3}>
                Functions Used to Calculate Crash Point
              </Heading>
              <Heading level={5}>Server Seed Hashing Function</Heading>
              <CodeSnippet
                code={`function hashServerSeed(seed) {   
  return crypto.createHash("sha256").update(seed).digest("hex");
}`}
              />
              <Heading level={5}>Crash Point Calculation Function</Heading>
              <CodeSnippet
                code={`function calculateCrashPoint(serverSeed, nonce, maxMultiplier) {
  // Hash the combined server seed and nonce
  const hash = crypto
    .createHash("sha256")
    .update(serverSeed-nonce)
    .digest("hex");

  // Convert the hash to a number in the range [0, 1)
  const hashFraction = parseInt(hash.slice(0, 10), 16) / 0xffffffffff;

  // Scale the hash fraction to the range [1, maxMultiplier]
  let crashPoint = 1 + hashFraction * (maxMultiplier - 1);

  return crashPoint.toFixed(2);
}`}
              />
            </Grid>
          </Box>
        </ModalContainer>
      )}
    </>
  );
};

export default HowItWorksModal;
