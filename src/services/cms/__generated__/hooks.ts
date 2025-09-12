import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetcher } from "../fetcher";

export const TranslationsGetDocument = `
    query TranslationsGet($language: String!) {
  translations(
    filter: {translations: {languages_language_code: {language_code: {_eq: $language}}}}
  ) {
    translations_key
    translations(
      filter: {languages_language_code: {language_code: {_eq: $language}}}
    ) {
      content
    }
  }
}
    `;

export const useTranslationsGetQuery = <
  TData = TranslationsGetQuery,
  TError = unknown,
>(
  variables: TranslationsGetQueryVariables,
  options?: Omit<
    UseQueryOptions<TranslationsGetQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<TranslationsGetQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<TranslationsGetQuery, TError, TData>({
    queryKey: ["TranslationsGet", variables],
    queryFn: fetcher<TranslationsGetQuery, TranslationsGetQueryVariables>(
      TranslationsGetDocument,
      variables,
    ),
    ...options,
  });
};

useTranslationsGetQuery.document = TranslationsGetDocument;

useTranslationsGetQuery.getKey = (variables: TranslationsGetQueryVariables) => [
  "TranslationsGet",
  variables,
];
