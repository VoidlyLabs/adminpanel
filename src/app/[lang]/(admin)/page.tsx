'use client';

import React from 'react';
import GridShape from '@/components/common/GridShape';
import { useT } from '@/shared/hooks/use-t/use-t.hook';

export default function Home() {
  const t = useT();

  return (
    <>
      <div className="relative flex flex-col items-center justify-center p-6 h-[80dvh] overflow-hidden z-1">
        <GridShape />
        <div className={'flex justify-center h-full w-full'}>
          <div
            className={
              'text-center w-full flex flex-col items-center justify-center gap-3'
            }
          >
            <h1 className={'text-2xl sm:text-3xl font-bold'}>
              {t('home.headline')}
            </h1>
            <h3 className={'text-zinc-400 text-sm sm:text-2xl'}>
              {t('home.description')}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
