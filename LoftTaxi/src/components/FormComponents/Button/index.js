import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ColorButton = styled(Button)(({}) => ({
  color: "#212121",
  backgroundColor: "#ffd128",
  fontFamily: "sans-serif",
  "&:hover": {
    backgroundColor: "#ffc107",
  },
}));

export default ColorButton;
