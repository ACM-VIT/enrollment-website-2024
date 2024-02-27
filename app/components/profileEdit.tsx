import { Box, Button, Fade, Modal, TextField } from "@mui/material";
import { User } from "@prisma/client";
import Image from "next/image";
import closebutton from "./assets/Esc.svg";

export default function ProfileModal({
    open,
    handleClose,
    style,
    user,
}: //todo
{
    open: boolean;
    handleClose: () => void;
    style: any;
    user: User;
}) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    ...style,
                    borderRadius: "4px",
                    padding: "0px",
                    backgroundColor: "#262626",
                    color: "white",
                    overflow: "auto",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 32px",
                        backgroundColor: "#333333",
                        borderTopLeftRadius: "4px",
                        borderTopRightRadius: "4px",
                    }}
                >
                    <span
                        style={{
                            fontSize: "18px",
                        }}
                    >
                        My Profile
                    </span>
                </div>
                <Fade in={open}>
                    <div
                        style={{
                            padding: "32px",
                        }}
                    >
                        <div style={{ marginBottom: "20px" }}>
                            <div
                                style={{
                                    fontSize: "18px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Image
                                    src={closebutton}
                                    alt="close"
                                    onClick={handleClose}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            Name:
                            <input
                                type="text"
                                value={user!.name!.slice(
                                    0,
                                    user!.name!.length - 10
                                )}
                                disabled
                                style={{
                                    width: "100%",
                                    backgroundColor: "#333333",
                                    color: "white",
                                    border: "none",
                                    borderBottom: "1px solid #b3b3b3",
                                    padding: "8px",
                                    marginTop: "8px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            Registration Number:
                            <input
                                type="text"
                                value={user!.name!.slice(
                                    user!.name!.length - 9
                                )}
                                disabled
                                style={{
                                    width: "100%",
                                    backgroundColor: "#333333",
                                    color: "white",
                                    border: "none",
                                    borderBottom: "1px solid #b3b3b3",
                                    padding: "8px",
                                    marginTop: "8px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            E-mail:
                            <input
                                type="email"
                                value={user.email ?? ""}
                                disabled
                                style={{
                                    width: "100%",
                                    backgroundColor: "#333333",
                                    color: "white",
                                    border: "none",
                                    borderBottom: "1px solid #b3b3b3",
                                    padding: "8px",
                                    marginTop: "8px",
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                            Contact:
                            <input
                                type="text"
                                value={user.phone ?? ""}
                                disabled
                                style={{
                                    width: "100%",
                                    backgroundColor: "#333333",
                                    color: "white",
                                    border: "none",
                                    borderBottom: "1px solid #b3b3b3",
                                    padding: "8px",
                                    marginTop: "8px",
                                }}
                            />
                        </div>
                    </div>
                </Fade>
            </Box>
        </Modal>
    );
}
