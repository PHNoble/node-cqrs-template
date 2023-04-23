import React from 'react';
import Button from '../components/Button';
import Link from "next/link";
import Page from '../components/Page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from "@fortawesome/free-brands-svg-icons"

export default function Login() {

  return (
    <Page title="Login">
      <div className="flex-1 flex items-center justify-center">
        <div className="rounded-md bg-mantle-800 shadow-md p-10">
          <Link href="/auth/google">
            <Button secondary><FontAwesomeIcon icon={faGoogle} /> Sign in With Google</Button>
          </Link>
        </div>

      </div>
    </Page>
  )
}