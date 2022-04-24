import { useState } from "react";
import { RecoilRoot } from "recoil";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { tsParticles } from "tsparticles-engine";
import {
  Button,
  Dialog,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
  DialogTitle,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import particlesConfig from "@config/tsParticlesConfig";
import TimersManager from "@components/TimersManager/TimersManager";
import SoundConfig from "@components/SoundConfig/SoundConfig";
import SetsConfigurator from "@components/SetsConfigurator/SetsConfigurator";

const Index = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [openSetsConfigurator, setOpenSetsConfigurator] = useState(false);
  const toggleSetsConfigurator = () => setOpenSetsConfigurator((pOpenSetsConfigurator) => !pOpenSetsConfigurator);

  const particlesInit = async () =>
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(tsParticles);

  return (
    <RecoilRoot>
      {!fullScreen && <Particles init={particlesInit} options={particlesConfig} />}

      <Grid
        container
        spacing={0}
        alignItems="center"
        justifyContent="center"
        style={{
          display: "flex",
          height: "100%",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Grid item xs={12} md={6}>
          <Paper
            elevation={!fullScreen ? 24 : 0}
            style={{
              padding: 32,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <SoundConfig />

            <TimersManager />

            <Button variant="outlined" onClick={toggleSetsConfigurator}>
              Need a set?
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
        open={openSetsConfigurator}
        onClose={toggleSetsConfigurator}
      >
        <DialogTitle>
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="span" color="primary">
              {!fullScreen && "Configure ROUNDS/SETS"}
            </Typography>
            <IconButton aria-label="close" color="secondary" onClick={toggleSetsConfigurator}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>

        <SetsConfigurator onFinish={toggleSetsConfigurator} />
      </Dialog>
    </RecoilRoot>
  );
};

export default Index;
