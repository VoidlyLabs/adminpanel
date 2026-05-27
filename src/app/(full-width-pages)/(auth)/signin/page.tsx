import SignInForm from '@/components/auth/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VoidlyAdmin | Auth',
};

export default function SignIn() {
  return <SignInForm />;
}
