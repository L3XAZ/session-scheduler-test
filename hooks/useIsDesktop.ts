'use client';

import { useEffect, useState } from 'react';

export function useIsDesktop(breakpoint = 768): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsDesktop(window.innerWidth >= breakpoint);
    };

    update();
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('resize', update);
    };
  }, [breakpoint]);

  return isDesktop;
}
