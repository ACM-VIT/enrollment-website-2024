'use client';

import {
    Box,
    Grid,
    IconButton,
    Link,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import React, {useContext} from "react";
import {links} from "../pages/links";
import Image from 'next/image';

export default function Page() {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{minHeight: `calc(100vh - 20px - 33px)`}}
        >
            <Grid item xs={3}>
                <Stack direction={{xs: "column", sm: "row-reverse"}} spacing={2}>
                    <Box display="flex" sx={{justifyContent: "center"}}>
                        <Image src='/AcmLogo.png' width={150} height={150} alt="logo" />
                    </Box>
                    <Box>
                        <Grid
                            display="flex"
                            justifyContent={{xs: "center", sm: "flex-start"}}
                        >
                            <Typography variant="h3">Association Of Computing Machinery</Typography>
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
        </Grid>
    );
}
