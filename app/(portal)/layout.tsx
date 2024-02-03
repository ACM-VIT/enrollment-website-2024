import React from "react";
import { SessionProvider } from "next-auth/react";
import App from "@/app/layout/App";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prisma = new PrismaClient();

  const authUser = await auth();

  const user = await prisma.user.findUnique({
    where: {
      email: authUser?.user?.email ?? "",
    },
  });

  if (!user) {
    return redirect("/landing");
  }

  const registrations = await prisma.registration.findMany({
    where: {
      userId: user.id,
    },
  });
  return (
    <SessionProvider>
      <App registrations={registrations} user={user}>{children}</App>
    </SessionProvider>
  );
}
