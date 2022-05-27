import React, { Component } from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export class Modal extends Component {
  state = {
    open: null,
  };
  componentDidMount() {
    const { text } = this.props;
    this.setState(
      {
        open: text,
      },
      () => {
        setTimeout(() => {
          this.setState({ open: false });
        }, 3000);
      }
    );
  }

  render() {
    const { text, type } = this.props;
    const { open } = this.state;

    return (
      <Box sx={{ width: "auto" }}>
        <Collapse in={!!open}>
          <Alert
            variant="filled"
            severity={type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  this.setState({ open: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              mt: 10,
              position: "fixed",
              zIndex: "tooltip",
              boxShadow: 1,
              transform: "translateX(-50%)",
              left: "50%",
            }}
          >
            <p>{text ? text : ""}</p>
          </Alert>
        </Collapse>
      </Box>
    );
  }
}

export default Modal;
