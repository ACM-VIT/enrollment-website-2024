"use client";

import {
  Grid,
} from "@mui/material";
import React from "react";
import Image from "next/image";

export default function Page() {
    return (
        // new changed
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems= "center"
            // justifyContent="center"
            sx={{minHeight: `calc(100vh - 20px - 33px)`}}
        >
            <Grid item xs={3} >
                <Stack direction={{xs: "column", sm: "row-reverse"}} spacing={2} >
                    <Box display="flex" sx={{justifyContent: "center"}}>
                        <Image src='/AcmLogo.png' width={120} height={120} alt="logo" />
                    </Box>
                    <Box>
                        <Grid
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-start"}}
                        >
                            <Typography variant="h4">Association Of Computing Machinery</Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-start"}}
                        >
                            <Typography variant="subtitle1" gutterBottom>
                                Welcome to ACM-VIT
                                {/* Better an{' '}
                <Box fontWeight="fontWeightMedium" display="inline">
                  oops
                </Box>{' '}
                than a{' '}
                <Box fontWeight="fontWeightMedium" display="inline">
                  what if
                </Box> */}
                            </Typography>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-start"}}
                        >
                            <Stack direction="row" spacing={0.4}>
                                {links.map((link) => (
                                    <Tooltip key={link.index} title={link.title} arrow>
                                        <Link
                                            target="_blank"
                                            href={link.href}
                                            underline="none"
                                            color="inherit"
                                        >
                                            <IconButton color="inherit">{link.icon}</IconButton>
                                        </Link>
                                    </Tooltip>
                                ))}
                            </Stack>
                        </Grid>
                    </Box>
                </Stack>
            </Grid>
            <Grid padding={20} paddingTop={10}>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={25} display={'flex'} >
                ACM Enrollment Website - User Guide
                </Typography>
                <Typography>
                    👋 Welcome to the ACM Enrollment Website, designed with a familiar interface similar to VSCode. Let's get you started with some simple navigation tips.
                </Typography>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={21}> <br/>
                    📂 File Navigation - MD Files
                </Typography>
                <Typography lineHeight={2.5}>
                    Find the file explorer panel on the left. Here, you&apos;ll find two dropdowns labeled “domains” and “extras”.
                </Typography>
                <Typography>
                    Clicking on the "domains" dropdown allows you to access files containing information about ACM's different domains, while "extras" offers events, FAQs, and organizational details.
                </Typography>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={21}> <br/>
                    💻 Integrated Terminal - Quick Access
                </Typography>
                <Typography lineHeight={2.5}>
                    The Terminal Button can be spotted at the bottom left. Click it, and a command-line interface will pop up.
                </Typography>
                <Typography lineHeight={2.5}>
                    Type in &apos;help&apos; to see the list of available commands. These are the commands that you will use to operate the terminal.
                </Typography>
                <Typography>
                    ┝ help: Shows all commands available.
                </Typography>
                <Typography>
                    ┝ clear: Wipes the terminal screen. Your filled or submitted forms stay as they are.
                </Typography>
                <Typography>
                    ┝ register &lt;domain&gt;: Sign up for a domain.
                </Typography>
                <Typography paddingLeft={5}>
                    Example: To register for app, type: &apos;register app&apos;
                </Typography>
                <Typography>
                    ┝ formsubmit &lt;domain&gt;: submits a form for a domain (you cannot edit the form once submitted)
                </Typography>
                <Typography paddingLeft={5}>
                    Example: To submit the form for management, type: &apos;formsubmit management&apos;
                </Typography>
                <Typography>
                    ┝ exit: Closes the terminal.
                </Typography>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={21}> <br/>
                    FORMS
                </Typography>
                <Typography>
                    After registering for a domain via the terminal, fill out the information using the following instructions.
                </Typography>
                <Typography>
                    _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
                </Typography>
                <Typography>
                    Now submit the form using the terminal command. You can register and submit forms for as many domains as you&apos;re interested in.
                </Typography>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={21}> <br/>
                    🎨 Theme & Profile Customization
                </Typography>
                <Typography>
                    Located above the terminal button, the theme button lets you switch between Dark 🌙 and Light ☀️ themes.
                </Typography>
                <Typography>
                    Using the profile button you can either edit your profile details or sign out.
                </Typography>
                <Typography fontFamily={'monospace'} fontWeight={900} fontSize={21}> <br/>
                    📱 Social Media Links
                </Typography>
                <Typography>
                    On the far-left side, there&apos;s a collection of icons representing various ACM social media platforms.
                </Typography>
                <Typography>
                    That concludes our guide! You're now equipped to navigate the ACM Enrollment Website with ease and efficiency. Enjoy your experience! 🚀
                </Typography>
            </Grid>
        </Grid>
    );
}

