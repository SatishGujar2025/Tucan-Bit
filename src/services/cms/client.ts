import { type DocumentNode, print } from 'graphql';

type QueryDoc = string | DocumentNode;

export async function cmsClient<TData>(
  doc: QueryDoc,
  variables?: Record<string, any>
): Promise<TData> {
  const endpoint = import.meta.env.VITE_CMS_GRAPHQL_URL as string;
  const token = import.meta.env.VITE_CMS_TOKEN as string | undefined;

  const query = typeof doc === 'string' ? doc : print(doc);
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e: any) => e.message).join(' | '));
  }
  return json.data as TData;
}
