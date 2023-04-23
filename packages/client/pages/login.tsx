import React from 'react';
import Button from '../components/Button';
import Link from "next/link";

export default function Login() {

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="rounded-md bg-mantle-800 shadow-md p-10">
        <Link href="/auth/google">
          <Button secondary>Sign in With Google</Button>
        </Link>
      </div>

    </div>
  )
}