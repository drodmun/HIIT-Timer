import { useRecoilState } from "recoil";
import { IconButton } from "@mui/material";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import { isPlaySoundAtom } from "@src/stores/timers";

const SoundConfig = () => {
  const [isPlaySound, setIsPlaySound] = useRecoilState(isPlaySoundAtom);
  const togglePlaySound = () => setIsPlaySound((pIsPlaySound) => !pIsPlaySound);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <IconButton aria-label="sound" onClick={togglePlaySound}>
        {isPlaySound ? <VolumeUpOutlinedIcon /> : <VolumeOffIcon />}
      </IconButton>
    </div>
  );
};

export default SoundConfig;
