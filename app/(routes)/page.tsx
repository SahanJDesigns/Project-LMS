'use client';
import { Session } from "inspector/promises";
import { useSession, signIn, signOut } from "next-auth/react";
import SessionProviderWrapper from "./SessionProviderWrapper";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(session?.user?._id);
  return (
    <div>
      {!session ? (
        <div>
          <p>You are not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      ) : (
        <div>
          <p>Welcome, {session.user?._id}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
}