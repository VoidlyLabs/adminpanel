'use client';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import React, { useState } from 'react';
import { useSignIn } from '@/shared/api/services/auth/auth.queries';
import { useT } from '@/shared/hooks/use-t/use-t.hook';

export default function SignInForm() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const signIn = useSignIn();
  const t = useT();

  const handleSignIn = () => {
    signIn.mutate({ password, username });
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t('auth.signIn.title')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('auth.signIn.subtitle')}
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.stopPropagation();
                e.preventDefault();

                handleSignIn();
              }}
            >
              <div className="space-y-6">
                <div>
                  <Label>
                    {t('auth.signIn.email')}{' '}
                    <span className="text-error-500">*</span>{' '}
                  </Label>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t('auth.signIn.usernamePlaceholder')}
                    type="text"
                  />
                </div>
                <div>
                  <Label>
                    {t('auth.signIn.password')}{' '}
                    <span className="text-error-500">*</span>{' '}
                  </Label>
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('auth.signIn.passwordPlaceholder')}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                {/*<div className="flex items-center justify-between">*/}
                {/*  <div className="flex items-center gap-3">*/}
                {/*    <Checkbox checked={isChecked} onChange={setIsChecked} />*/}
                {/*    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">*/}
                {/*      Keep me logged in*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*  <Link*/}
                {/*    href="/reset-password"*/}
                {/*    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"*/}
                {/*  >*/}
                {/*    Forgot password?*/}
                {/*  </Link>*/}
                {/*</div>*/}
                <div>
                  <Button className="w-full" size="sm">
                    {t('auth.signIn.submit')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
