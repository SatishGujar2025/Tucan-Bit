import { cmsClient } from './client';

export const fetcher = <TData, TVariables>(doc: any, variables?: TVariables) => {
  return async (): Promise<TData> => cmsClient<TData>(doc, variables as any);
};