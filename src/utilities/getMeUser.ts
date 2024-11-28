import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { User } from "../payload-types";
import { getClientSideURL } from "./getURL";
import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
  email: z.string(),
  resetPasswordToken: z.string().optional().nullable(),
  resetPasswordExpiration: z.string().optional().nullable(),
  salt: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
  loginAttempts: z.number().optional().nullable(),
  lockUntil: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
});

export const getMeUser = async (args?: {
  nullUserRedirect?: string;
  validUserRedirect?: string;
}): Promise<{
  token: string;
  user: User;
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {};
  const cookieStore = await cookies();
  const token = cookieStore.get("payload-token")?.value;

  const meUserReq = await fetch(`${getClientSideURL()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });

  const { user } = z
    .object({
      user: userSchema,
    })
    .parse(await meUserReq.json());

  if (validUserRedirect && meUserReq.ok && user) {
    redirect(validUserRedirect);
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect(nullUserRedirect);
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user,
  };
};
