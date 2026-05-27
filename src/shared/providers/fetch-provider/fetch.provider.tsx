/**
 * Copyright (c) Amir Mamedov (https://github.com/renrelio).
 */

import React, { isValidElement } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { cn } from '@/shared/lib/classnames.utils';
import Navigate from '@/shared/ui/navigate/navigate';
import Loader from '@/shared/ui/loader/loader';

type FetchProviderProps<T> = {
  queryObject: UseQueryResult<T, Error>;
  children: (data: T) => React.ReactNode; // рендер-функция
  className?: string;
  isLoading?: boolean;
  loaderClassName?: string;
  silentError?: boolean;
  errorComponent?: React.ReactNode;
  silentLoading?: boolean;
  fetchingFallback?: React.ReactNode;
  loaderSize?: number;
};

/**
 * Provider to help with @tanstack/react-query request statuses.
 *
 *
 * @param children Pass your children
 * @param className Provider classnames
 * @param loaderClassName Loader classnames
 * @param isLoading Force provider to render loading status
 * @param queryObject Your query object
 * @param errorComponent Custom error component for error statuses
 * @param silentError Prevent provider from rendering errors
 * @param silentLoading Prevent provider from rendering loader as default
 * @param fetchingFallback Fallback for query refetching, pass 'silentLoading' to make this prop work properly
 * @param loaderSize
 *
 * @returns Returns object as "response". You can receive your data by passing function into component children {response => (...)}
 *
 * @constructor
 */
const FetchProvider = <T,>({
  children,
  className,
  queryObject,
  isLoading,
  loaderClassName,
  silentError,
  errorComponent,
  silentLoading,
  fetchingFallback,
  loaderSize = 20,
}: FetchProviderProps<T>) => {
  if (
    (queryObject.isLoading && !silentLoading) ||
    (isLoading === true && !silentLoading)
  ) {
    return (
      <div
        className={cn(
          loaderClassName,
          'w-full h-full flex justify-center items-center',
        )}
      >
        <Loader size={loaderSize} />
      </div>
    );
  }

  if (queryObject.isError || queryObject.data === undefined) {
    if (queryObject.isFetching && fetchingFallback && silentLoading) {
      return (
        <div
          className={cn(
            'w-full flex justify-center items-center',
            loaderClassName,
          )}
        >
          <Loader size={loaderSize} />
        </div>
      );
    }

    if (silentError) {
      return null;
    }

    if (isValidElement(errorComponent)) {
      return errorComponent;
    }

    return <Navigate to={'/error/500'} />;
  }

  return (
    <div className={cn(className)}>
      {queryObject.isFetching && fetchingFallback && fetchingFallback}
      {children(queryObject.data)}
    </div>
  );
};
export default FetchProvider;
