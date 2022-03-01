import React, { useEffect } from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query/types/core/types';
import { GetRatingsResponse } from '../pages/Home/types';

type IntersectionObserverProps = {
  enabled: boolean | undefined;
  onIntersect: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<GetRatingsResponse, unknown>>;
  root?: Element | Document | any;
  rootMargin?: string;
  target: React.MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
};

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = '0px',
  target,
  threshold = 1.0,
}: IntersectionObserverProps) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target.current, enabled]);
}
