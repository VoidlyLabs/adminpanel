import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface NavigateProps {
  to?: string;
}

const Navigate = ({ to = '/' }: NavigateProps) => {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return null;
};

export default Navigate;
