'use client';

import { Button } from '@mui/material';
import { auth, provider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';

export default function GoogleLoginButton() {
  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await fetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Sign in with Google
    </Button>
  );
}
