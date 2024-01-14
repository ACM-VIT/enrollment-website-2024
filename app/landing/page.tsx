// 'use client';
import React from "react";
import { auth } from "@/lib/auth";
import Landing from "./Landing";
import Onboarding from "./onboarding";

async function Page() {
  return <>{(await auth())?.user ? <Onboarding/> : <Landing />}</>;
}

export default Page;
