import { Box, Button, Fade, Modal, TextField } from "@mui/material";
import { User } from "@prisma/client";

export default function ProfileModal({
  open,
  handleClose,
  style,
  user,
}: {
  open: boolean;
  handleClose: () => void;
  style: any;
  user: User;
}) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={style}
        style={{
          borderRadius: "4px",
          padding: "0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "1%",
            color: "#b3b3b3",
            backgroundColor: "#424242",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
          }}
        >
          <span
            style={{
              paddingBottom: "1%",
            }}
          >
            Profile
          </span>
        </div>
        <div
          style={{
            paddingLeft: "32px",
            paddingRight: "32px",
          }}
        >
          <Fade in={open}>
            <div>
              <div
                style={{
                  color: "grey",
                  marginTop: "20px",
                }}
              >
                <span>Your Information</span>
              </div>
              {/* <TextField
                label="Name"
                fullWidth
                margin="normal"
                value="Sai Kumar"
                disabled
                style={{
                  borderRadius: "12px",
                }}
              />
              <TextField
                label="Regn No."
                value="18BCE0000"
                margin="normal"
                fullWidth
                disabled
                style={{
                  borderRadius: "12px",
                }}
              />
              <TextField
                label="Email ID"
                placeholder="Email ID"
                value="pms@vitstudent.ac.in"
                fullWidth
                margin="normal"
                disabled
                style={{
                  borderRadius: "12px",
                }}
              />
              <TextField
                label="Phone Number"
                contentEditable
                // value="9876543210"
                fullWidth
                margin="normal"
                name="phoneNumber"
                type="tel"
                style={{
                  borderRadius: "12px",
                }}
              /> */}
                          <div>
                              Name: {user!.name!.slice(0, user!.name!.length - 10)}
                          </div>
                            <div>
                              Registration Number: {user!.name!.slice(user!.name!.length - 9)}
                          </div>
                            <div>
                              Email: {user.email}

                          </div>
                            <div>
                              Phone Number: {user.phone}
                            </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "2%",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    width: "17%",
                    backgroundColor: "#424242",
                    border: "1px solid #333",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "3px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#363636",
                      color: "white",
                      border: "1px solid #333",
                    },
                    marginTop: "12px",
                    marginRight: "3%",
                  }}
                  onClick={handleClose}
                >
                  Back
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: "17%",
                    backgroundColor: "#3279cb",
                    border: "1px solid #333",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "3px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#255a97",
                      color: "white",
                      border: "1px solid #333",
                    },
                    marginTop: "12px",
                    marginRight: "2%",
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </Fade>
        </div>
      </Box>
    </Modal>
  );
}
