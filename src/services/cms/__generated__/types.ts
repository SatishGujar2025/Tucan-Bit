import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Date: { input: any; output: any };
  GraphQLBigInt: { input: any; output: any };
  GraphQLStringOrFloat: { input: any; output: any };
  Hash: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type EventEnum = "create" | "delete" | "update";

export type Game = {
  __typename?: "Game";
  currencies?: Maybe<Array<Maybe<Game_Currencies>>>;
  currencies_func?: Maybe<Count_Functions>;
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  default_image?: Maybe<Directus_Files>;
  default_rtp?: Maybe<Scalars["String"]["output"]>;
  game_id?: Maybe<Scalars["String"]["output"]>;
  game_type?: Maybe<Scalars["String"]["output"]>;
  groove_category?: Maybe<Scalars["String"]["output"]>;
  hit_frequency?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  internal_name?: Maybe<Scalars["String"]["output"]>;
  jackpot_type?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  languages?: Maybe<Array<Maybe<Game_Languages>>>;
  languages_func?: Maybe<Count_Functions>;
  max_bet?: Maybe<Scalars["String"]["output"]>;
  max_exposure?: Maybe<Scalars["String"]["output"]>;
  min_bet?: Maybe<Scalars["String"]["output"]>;
  payouts?: Maybe<Scalars["String"]["output"]>;
  payouts_type?: Maybe<Scalars["String"]["output"]>;
  platforms?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  provider?: Maybe<Game_Provider>;
  restricted_countries?: Maybe<Array<Maybe<Game_Countries>>>;
  restricted_countries_func?: Maybe<Count_Functions>;
  slug?: Maybe<Scalars["String"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  support_frb?: Maybe<Scalars["Boolean"]["output"]>;
  support_jackpot?: Maybe<Scalars["Boolean"]["output"]>;
  supported_regulations?: Maybe<Array<Maybe<Game_Regulations>>>;
  supported_regulations_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
  volatility?: Maybe<Scalars["String"]["output"]>;
};

export type GameCurrenciesArgs = {
  filter?: InputMaybe<Game_Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameDefault_ImageArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameLanguagesArgs = {
  filter?: InputMaybe<Game_Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameProviderArgs = {
  filter?: InputMaybe<Game_Provider_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameRestricted_CountriesArgs = {
  filter?: InputMaybe<Game_Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameSupported_RegulationsArgs = {
  filter?: InputMaybe<Game_Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type GameUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Category = {
  __typename?: "Game_Category";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars["ID"]["output"];
  internal_name?: Maybe<Scalars["String"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};

export type Game_CategoryUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_CategoryUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Category_Aggregated = {
  __typename?: "Game_Category_aggregated";
  avg?: Maybe<Game_Category_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Category_Aggregated_Fields>;
  count?: Maybe<Game_Category_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Category_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Category_Aggregated_Fields>;
  min?: Maybe<Game_Category_Aggregated_Fields>;
  sum?: Maybe<Game_Category_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Category_Aggregated_Fields>;
};

export type Game_Category_Aggregated_Count = {
  __typename?: "Game_Category_aggregated_count";
  date_created?: Maybe<Scalars["Int"]["output"]>;
  date_updated?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  internal_name?: Maybe<Scalars["Int"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  user_created?: Maybe<Scalars["Int"]["output"]>;
  user_updated?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Category_Aggregated_Fields = {
  __typename?: "Game_Category_aggregated_fields";
  id?: Maybe<Scalars["Float"]["output"]>;
  sort?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Category_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Category_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Category_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  internal_name?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Game_Category_Mutated = {
  __typename?: "Game_Category_mutated";
  data?: Maybe<Game_Category>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Provider = {
  __typename?: "Game_Provider";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
  provider_key: Scalars["ID"]["output"];
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  translations?: Maybe<Array<Maybe<Game_Provider_Translations>>>;
  translations_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};

export type Game_ProviderTranslationsArgs = {
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_ProviderUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_ProviderUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Provider_Aggregated = {
  __typename?: "Game_Provider_aggregated";
  avg?: Maybe<Game_Provider_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Provider_Aggregated_Fields>;
  count?: Maybe<Game_Provider_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Provider_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Provider_Aggregated_Fields>;
  min?: Maybe<Game_Provider_Aggregated_Fields>;
  sum?: Maybe<Game_Provider_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Provider_Aggregated_Fields>;
};

export type Game_Provider_Aggregated_Count = {
  __typename?: "Game_Provider_aggregated_count";
  date_created?: Maybe<Scalars["Int"]["output"]>;
  date_updated?: Maybe<Scalars["Int"]["output"]>;
  internal_name?: Maybe<Scalars["Int"]["output"]>;
  provider_key?: Maybe<Scalars["Int"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  translations?: Maybe<Scalars["Int"]["output"]>;
  user_created?: Maybe<Scalars["Int"]["output"]>;
  user_updated?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Provider_Aggregated_Fields = {
  __typename?: "Game_Provider_aggregated_fields";
  sort?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Provider_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Provider_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Provider_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  internal_name?: InputMaybe<String_Filter_Operators>;
  provider_key?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  translations?: InputMaybe<Game_Provider_Translations_Quantifier_Filter>;
  translations_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Game_Provider_Mutated = {
  __typename?: "Game_Provider_mutated";
  data?: Maybe<Game_Provider>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Provider_Translations = {
  __typename?: "Game_Provider_translations";
  Game_Provider_provider_key?: Maybe<Game_Provider>;
  display_name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  languages_language_code?: Maybe<Languages>;
};

export type Game_Provider_TranslationsGame_Provider_Provider_KeyArgs = {
  filter?: InputMaybe<Game_Provider_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Provider_TranslationsLanguages_Language_CodeArgs = {
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Provider_Translations_Aggregated = {
  __typename?: "Game_Provider_translations_aggregated";
  avg?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
  count?: Maybe<Game_Provider_Translations_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Provider_Translations_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
  min?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
  sum?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Provider_Translations_Aggregated_Fields>;
};

export type Game_Provider_Translations_Aggregated_Count = {
  __typename?: "Game_Provider_translations_aggregated_count";
  Game_Provider_provider_key?: Maybe<Scalars["Int"]["output"]>;
  display_name?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  languages_language_code?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Provider_Translations_Aggregated_Fields = {
  __typename?: "Game_Provider_translations_aggregated_fields";
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Provider_Translations_Filter = {
  Game_Provider_provider_key?: InputMaybe<Game_Provider_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Provider_Translations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Provider_Translations_Filter>>>;
  display_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
};

export type Game_Provider_Translations_Mutated = {
  __typename?: "Game_Provider_translations_mutated";
  data?: Maybe<Game_Provider_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Provider_Translations_Quantifier_Filter = {
  Game_Provider_provider_key?: InputMaybe<Game_Provider_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Provider_Translations_Filter>>>;
  _none?: InputMaybe<Game_Provider_Translations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Game_Provider_Translations_Filter>>>;
  _some?: InputMaybe<Game_Provider_Translations_Filter>;
  display_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
};

export type Game_Aggregated = {
  __typename?: "Game_aggregated";
  avg?: Maybe<Game_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Aggregated_Fields>;
  count?: Maybe<Game_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Aggregated_Fields>;
  min?: Maybe<Game_Aggregated_Fields>;
  sum?: Maybe<Game_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Aggregated_Fields>;
};

export type Game_Aggregated_Count = {
  __typename?: "Game_aggregated_count";
  currencies?: Maybe<Scalars["Int"]["output"]>;
  date_created?: Maybe<Scalars["Int"]["output"]>;
  date_updated?: Maybe<Scalars["Int"]["output"]>;
  default_image?: Maybe<Scalars["Int"]["output"]>;
  default_rtp?: Maybe<Scalars["Int"]["output"]>;
  game_id?: Maybe<Scalars["Int"]["output"]>;
  game_type?: Maybe<Scalars["Int"]["output"]>;
  groove_category?: Maybe<Scalars["Int"]["output"]>;
  hit_frequency?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  internal_name?: Maybe<Scalars["Int"]["output"]>;
  jackpot_type?: Maybe<Scalars["Int"]["output"]>;
  languages?: Maybe<Scalars["Int"]["output"]>;
  max_bet?: Maybe<Scalars["Int"]["output"]>;
  max_exposure?: Maybe<Scalars["Int"]["output"]>;
  min_bet?: Maybe<Scalars["Int"]["output"]>;
  payouts?: Maybe<Scalars["Int"]["output"]>;
  payouts_type?: Maybe<Scalars["Int"]["output"]>;
  platforms?: Maybe<Scalars["Int"]["output"]>;
  provider?: Maybe<Scalars["Int"]["output"]>;
  restricted_countries?: Maybe<Scalars["Int"]["output"]>;
  slug?: Maybe<Scalars["Int"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["Int"]["output"]>;
  support_frb?: Maybe<Scalars["Int"]["output"]>;
  support_jackpot?: Maybe<Scalars["Int"]["output"]>;
  supported_regulations?: Maybe<Scalars["Int"]["output"]>;
  user_created?: Maybe<Scalars["Int"]["output"]>;
  user_updated?: Maybe<Scalars["Int"]["output"]>;
  volatility?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Aggregated_Fields = {
  __typename?: "Game_aggregated_fields";
  id?: Maybe<Scalars["Float"]["output"]>;
  sort?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Countries = {
  __typename?: "Game_countries";
  Game_id?: Maybe<Game>;
  countries_country_code?: Maybe<Countries>;
  id: Scalars["ID"]["output"];
};

export type Game_CountriesGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_CountriesCountries_Country_CodeArgs = {
  filter?: InputMaybe<Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Countries_Aggregated = {
  __typename?: "Game_countries_aggregated";
  avg?: Maybe<Game_Countries_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Countries_Aggregated_Fields>;
  count?: Maybe<Game_Countries_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Countries_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Countries_Aggregated_Fields>;
  min?: Maybe<Game_Countries_Aggregated_Fields>;
  sum?: Maybe<Game_Countries_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Countries_Aggregated_Fields>;
};

export type Game_Countries_Aggregated_Count = {
  __typename?: "Game_countries_aggregated_count";
  Game_id?: Maybe<Scalars["Int"]["output"]>;
  countries_country_code?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Countries_Aggregated_Fields = {
  __typename?: "Game_countries_aggregated_fields";
  Game_id?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Countries_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Countries_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Countries_Filter>>>;
  countries_country_code?: InputMaybe<Countries_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Game_Countries_Mutated = {
  __typename?: "Game_countries_mutated";
  data?: Maybe<Game_Countries>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Countries_Quantifier_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Countries_Filter>>>;
  _none?: InputMaybe<Game_Countries_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Game_Countries_Filter>>>;
  _some?: InputMaybe<Game_Countries_Filter>;
  countries_country_code?: InputMaybe<Countries_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Game_Currencies = {
  __typename?: "Game_currencies";
  Game_id?: Maybe<Game>;
  currencies_currency_code?: Maybe<Currencies>;
  id: Scalars["ID"]["output"];
};

export type Game_CurrenciesGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_CurrenciesCurrencies_Currency_CodeArgs = {
  filter?: InputMaybe<Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Currencies_Aggregated = {
  __typename?: "Game_currencies_aggregated";
  avg?: Maybe<Game_Currencies_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Currencies_Aggregated_Fields>;
  count?: Maybe<Game_Currencies_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Currencies_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Currencies_Aggregated_Fields>;
  min?: Maybe<Game_Currencies_Aggregated_Fields>;
  sum?: Maybe<Game_Currencies_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Currencies_Aggregated_Fields>;
};

export type Game_Currencies_Aggregated_Count = {
  __typename?: "Game_currencies_aggregated_count";
  Game_id?: Maybe<Scalars["Int"]["output"]>;
  currencies_currency_code?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Currencies_Aggregated_Fields = {
  __typename?: "Game_currencies_aggregated_fields";
  Game_id?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Currencies_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Currencies_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Currencies_Filter>>>;
  currencies_currency_code?: InputMaybe<Currencies_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Game_Currencies_Mutated = {
  __typename?: "Game_currencies_mutated";
  data?: Maybe<Game_Currencies>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Currencies_Quantifier_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Currencies_Filter>>>;
  _none?: InputMaybe<Game_Currencies_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Game_Currencies_Filter>>>;
  _some?: InputMaybe<Game_Currencies_Filter>;
  currencies_currency_code?: InputMaybe<Currencies_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
};

export type Game_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Filter>>>;
  currencies?: InputMaybe<Game_Currencies_Quantifier_Filter>;
  currencies_func?: InputMaybe<Count_Function_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  default_image?: InputMaybe<Directus_Files_Filter>;
  default_rtp?: InputMaybe<String_Filter_Operators>;
  game_id?: InputMaybe<String_Filter_Operators>;
  game_type?: InputMaybe<String_Filter_Operators>;
  groove_category?: InputMaybe<String_Filter_Operators>;
  hit_frequency?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  internal_name?: InputMaybe<String_Filter_Operators>;
  jackpot_type?: InputMaybe<String_Filter_Operators>;
  languages?: InputMaybe<Game_Languages_Quantifier_Filter>;
  languages_func?: InputMaybe<Count_Function_Filter_Operators>;
  max_bet?: InputMaybe<String_Filter_Operators>;
  max_exposure?: InputMaybe<String_Filter_Operators>;
  min_bet?: InputMaybe<String_Filter_Operators>;
  payouts?: InputMaybe<String_Filter_Operators>;
  payouts_type?: InputMaybe<String_Filter_Operators>;
  platforms?: InputMaybe<String_Filter_Operators>;
  provider?: InputMaybe<Game_Provider_Filter>;
  restricted_countries?: InputMaybe<Game_Countries_Quantifier_Filter>;
  restricted_countries_func?: InputMaybe<Count_Function_Filter_Operators>;
  slug?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  support_frb?: InputMaybe<Boolean_Filter_Operators>;
  support_jackpot?: InputMaybe<Boolean_Filter_Operators>;
  supported_regulations?: InputMaybe<Game_Regulations_Quantifier_Filter>;
  supported_regulations_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
  volatility?: InputMaybe<String_Filter_Operators>;
};

export type Game_Languages = {
  __typename?: "Game_languages";
  Game_id?: Maybe<Game>;
  id: Scalars["ID"]["output"];
  languages_language_code?: Maybe<Languages>;
};

export type Game_LanguagesGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_LanguagesLanguages_Language_CodeArgs = {
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Languages_Aggregated = {
  __typename?: "Game_languages_aggregated";
  avg?: Maybe<Game_Languages_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Languages_Aggregated_Fields>;
  count?: Maybe<Game_Languages_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Languages_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Languages_Aggregated_Fields>;
  min?: Maybe<Game_Languages_Aggregated_Fields>;
  sum?: Maybe<Game_Languages_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Languages_Aggregated_Fields>;
};

export type Game_Languages_Aggregated_Count = {
  __typename?: "Game_languages_aggregated_count";
  Game_id?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  languages_language_code?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Languages_Aggregated_Fields = {
  __typename?: "Game_languages_aggregated_fields";
  Game_id?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Languages_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Languages_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Languages_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
};

export type Game_Languages_Mutated = {
  __typename?: "Game_languages_mutated";
  data?: Maybe<Game_Languages>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Languages_Quantifier_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Languages_Filter>>>;
  _none?: InputMaybe<Game_Languages_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Game_Languages_Filter>>>;
  _some?: InputMaybe<Game_Languages_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
};

export type Game_Mutated = {
  __typename?: "Game_mutated";
  data?: Maybe<Game>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Regulations = {
  __typename?: "Game_regulations";
  Game_id?: Maybe<Game>;
  id: Scalars["ID"]["output"];
  regulations_internal_name?: Maybe<Regulations>;
};

export type Game_RegulationsGame_IdArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_RegulationsRegulations_Internal_NameArgs = {
  filter?: InputMaybe<Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Game_Regulations_Aggregated = {
  __typename?: "Game_regulations_aggregated";
  avg?: Maybe<Game_Regulations_Aggregated_Fields>;
  avgDistinct?: Maybe<Game_Regulations_Aggregated_Fields>;
  count?: Maybe<Game_Regulations_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Game_Regulations_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Game_Regulations_Aggregated_Fields>;
  min?: Maybe<Game_Regulations_Aggregated_Fields>;
  sum?: Maybe<Game_Regulations_Aggregated_Fields>;
  sumDistinct?: Maybe<Game_Regulations_Aggregated_Fields>;
};

export type Game_Regulations_Aggregated_Count = {
  __typename?: "Game_regulations_aggregated_count";
  Game_id?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  regulations_internal_name?: Maybe<Scalars["Int"]["output"]>;
};

export type Game_Regulations_Aggregated_Fields = {
  __typename?: "Game_regulations_aggregated_fields";
  Game_id?: Maybe<Scalars["Float"]["output"]>;
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Game_Regulations_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Regulations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Game_Regulations_Filter>>>;
  id?: InputMaybe<Number_Filter_Operators>;
  regulations_internal_name?: InputMaybe<Regulations_Filter>;
};

export type Game_Regulations_Mutated = {
  __typename?: "Game_regulations_mutated";
  data?: Maybe<Game_Regulations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Game_Regulations_Quantifier_Filter = {
  Game_id?: InputMaybe<Game_Filter>;
  _and?: InputMaybe<Array<InputMaybe<Game_Regulations_Filter>>>;
  _none?: InputMaybe<Game_Regulations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Game_Regulations_Filter>>>;
  _some?: InputMaybe<Game_Regulations_Filter>;
  id?: InputMaybe<Number_Filter_Operators>;
  regulations_internal_name?: InputMaybe<Regulations_Filter>;
};

export type Mutation = {
  __typename?: "Mutation";
  create_Game_Category_item?: Maybe<Game_Category>;
  create_Game_Category_items: Array<Game_Category>;
  create_Game_Provider_item?: Maybe<Game_Provider>;
  create_Game_Provider_items: Array<Game_Provider>;
  create_Game_Provider_translations_item?: Maybe<Game_Provider_Translations>;
  create_Game_Provider_translations_items: Array<Game_Provider_Translations>;
  create_Game_countries_item?: Maybe<Game_Countries>;
  create_Game_countries_items: Array<Game_Countries>;
  create_Game_currencies_item?: Maybe<Game_Currencies>;
  create_Game_currencies_items: Array<Game_Currencies>;
  create_Game_item?: Maybe<Game>;
  create_Game_items: Array<Game>;
  create_Game_languages_item?: Maybe<Game_Languages>;
  create_Game_languages_items: Array<Game_Languages>;
  create_Game_regulations_item?: Maybe<Game_Regulations>;
  create_Game_regulations_items: Array<Game_Regulations>;
  create_countries_item?: Maybe<Countries>;
  create_countries_items: Array<Countries>;
  create_currencies_item?: Maybe<Currencies>;
  create_currencies_items: Array<Currencies>;
  create_languages_item?: Maybe<Languages>;
  create_languages_items: Array<Languages>;
  create_regulations_item?: Maybe<Regulations>;
  create_regulations_items: Array<Regulations>;
  create_translations_item?: Maybe<Translations>;
  create_translations_items: Array<Translations>;
  create_translations_translations_item?: Maybe<Translations_Translations>;
  create_translations_translations_items: Array<Translations_Translations>;
  delete_Game_Category_item?: Maybe<Delete_One>;
  delete_Game_Category_items?: Maybe<Delete_Many>;
  delete_Game_Provider_item?: Maybe<Delete_One>;
  delete_Game_Provider_items?: Maybe<Delete_Many>;
  delete_Game_Provider_translations_item?: Maybe<Delete_One>;
  delete_Game_Provider_translations_items?: Maybe<Delete_Many>;
  delete_Game_countries_item?: Maybe<Delete_One>;
  delete_Game_countries_items?: Maybe<Delete_Many>;
  delete_Game_currencies_item?: Maybe<Delete_One>;
  delete_Game_currencies_items?: Maybe<Delete_Many>;
  delete_Game_item?: Maybe<Delete_One>;
  delete_Game_items?: Maybe<Delete_Many>;
  delete_Game_languages_item?: Maybe<Delete_One>;
  delete_Game_languages_items?: Maybe<Delete_Many>;
  delete_Game_regulations_item?: Maybe<Delete_One>;
  delete_Game_regulations_items?: Maybe<Delete_Many>;
  delete_countries_item?: Maybe<Delete_One>;
  delete_countries_items?: Maybe<Delete_Many>;
  delete_currencies_item?: Maybe<Delete_One>;
  delete_currencies_items?: Maybe<Delete_Many>;
  delete_languages_item?: Maybe<Delete_One>;
  delete_languages_items?: Maybe<Delete_Many>;
  delete_regulations_item?: Maybe<Delete_One>;
  delete_regulations_items?: Maybe<Delete_Many>;
  delete_translations_item?: Maybe<Delete_One>;
  delete_translations_items?: Maybe<Delete_Many>;
  delete_translations_translations_item?: Maybe<Delete_One>;
  delete_translations_translations_items?: Maybe<Delete_Many>;
  update_Game_Category_batch: Array<Game_Category>;
  update_Game_Category_item?: Maybe<Game_Category>;
  update_Game_Category_items: Array<Game_Category>;
  update_Game_Provider_batch: Array<Game_Provider>;
  update_Game_Provider_item?: Maybe<Game_Provider>;
  update_Game_Provider_items: Array<Game_Provider>;
  update_Game_Provider_translations_batch: Array<Game_Provider_Translations>;
  update_Game_Provider_translations_item?: Maybe<Game_Provider_Translations>;
  update_Game_Provider_translations_items: Array<Game_Provider_Translations>;
  update_Game_batch: Array<Game>;
  update_Game_countries_batch: Array<Game_Countries>;
  update_Game_countries_item?: Maybe<Game_Countries>;
  update_Game_countries_items: Array<Game_Countries>;
  update_Game_currencies_batch: Array<Game_Currencies>;
  update_Game_currencies_item?: Maybe<Game_Currencies>;
  update_Game_currencies_items: Array<Game_Currencies>;
  update_Game_item?: Maybe<Game>;
  update_Game_items: Array<Game>;
  update_Game_languages_batch: Array<Game_Languages>;
  update_Game_languages_item?: Maybe<Game_Languages>;
  update_Game_languages_items: Array<Game_Languages>;
  update_Game_regulations_batch: Array<Game_Regulations>;
  update_Game_regulations_item?: Maybe<Game_Regulations>;
  update_Game_regulations_items: Array<Game_Regulations>;
  update_countries_batch: Array<Countries>;
  update_countries_item?: Maybe<Countries>;
  update_countries_items: Array<Countries>;
  update_currencies_batch: Array<Currencies>;
  update_currencies_item?: Maybe<Currencies>;
  update_currencies_items: Array<Currencies>;
  update_languages_batch: Array<Languages>;
  update_languages_item?: Maybe<Languages>;
  update_languages_items: Array<Languages>;
  update_regulations_batch: Array<Regulations>;
  update_regulations_item?: Maybe<Regulations>;
  update_regulations_items: Array<Regulations>;
  update_translations_batch: Array<Translations>;
  update_translations_item?: Maybe<Translations>;
  update_translations_items: Array<Translations>;
  update_translations_translations_batch: Array<Translations_Translations>;
  update_translations_translations_item?: Maybe<Translations_Translations>;
  update_translations_translations_items: Array<Translations_Translations>;
};

export type MutationCreate_Game_Category_ItemArgs = {
  data: Create_Game_Category_Input;
};

export type MutationCreate_Game_Category_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Category_Input>>;
  filter?: InputMaybe<Game_Category_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Provider_ItemArgs = {
  data: Create_Game_Provider_Input;
};

export type MutationCreate_Game_Provider_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Provider_Input>>;
  filter?: InputMaybe<Game_Provider_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Provider_Translations_ItemArgs = {
  data: Create_Game_Provider_Translations_Input;
};

export type MutationCreate_Game_Provider_Translations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Provider_Translations_Input>>;
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Countries_ItemArgs = {
  data: Create_Game_Countries_Input;
};

export type MutationCreate_Game_Countries_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Countries_Input>>;
  filter?: InputMaybe<Game_Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Currencies_ItemArgs = {
  data: Create_Game_Currencies_Input;
};

export type MutationCreate_Game_Currencies_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Currencies_Input>>;
  filter?: InputMaybe<Game_Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_ItemArgs = {
  data: Create_Game_Input;
};

export type MutationCreate_Game_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Input>>;
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Languages_ItemArgs = {
  data: Create_Game_Languages_Input;
};

export type MutationCreate_Game_Languages_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Languages_Input>>;
  filter?: InputMaybe<Game_Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Game_Regulations_ItemArgs = {
  data: Create_Game_Regulations_Input;
};

export type MutationCreate_Game_Regulations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Game_Regulations_Input>>;
  filter?: InputMaybe<Game_Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Countries_ItemArgs = {
  data: Create_Countries_Input;
};

export type MutationCreate_Countries_ItemsArgs = {
  data?: InputMaybe<Array<Create_Countries_Input>>;
  filter?: InputMaybe<Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Currencies_ItemArgs = {
  data: Create_Currencies_Input;
};

export type MutationCreate_Currencies_ItemsArgs = {
  data?: InputMaybe<Array<Create_Currencies_Input>>;
  filter?: InputMaybe<Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Languages_ItemArgs = {
  data: Create_Languages_Input;
};

export type MutationCreate_Languages_ItemsArgs = {
  data?: InputMaybe<Array<Create_Languages_Input>>;
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Regulations_ItemArgs = {
  data: Create_Regulations_Input;
};

export type MutationCreate_Regulations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Regulations_Input>>;
  filter?: InputMaybe<Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Translations_ItemArgs = {
  data: Create_Translations_Input;
};

export type MutationCreate_Translations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Translations_Input>>;
  filter?: InputMaybe<Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationCreate_Translations_Translations_ItemArgs = {
  data: Create_Translations_Translations_Input;
};

export type MutationCreate_Translations_Translations_ItemsArgs = {
  data?: InputMaybe<Array<Create_Translations_Translations_Input>>;
  filter?: InputMaybe<Translations_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationDelete_Game_Category_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Category_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Provider_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Provider_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Provider_Translations_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Provider_Translations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Countries_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Countries_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Currencies_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Currencies_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Languages_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Languages_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Game_Regulations_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Game_Regulations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Countries_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Countries_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Currencies_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Currencies_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Languages_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Languages_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Regulations_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Regulations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Translations_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Translations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationDelete_Translations_Translations_ItemArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDelete_Translations_Translations_ItemsArgs = {
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
};

export type MutationUpdate_Game_Category_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Category_Input>>;
  filter?: InputMaybe<Game_Category_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Category_ItemArgs = {
  data: Update_Game_Category_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Category_ItemsArgs = {
  data: Update_Game_Category_Input;
  filter?: InputMaybe<Game_Category_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Provider_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Provider_Input>>;
  filter?: InputMaybe<Game_Provider_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Provider_ItemArgs = {
  data: Update_Game_Provider_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Provider_ItemsArgs = {
  data: Update_Game_Provider_Input;
  filter?: InputMaybe<Game_Provider_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Provider_Translations_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Provider_Translations_Input>>;
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Provider_Translations_ItemArgs = {
  data: Update_Game_Provider_Translations_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Provider_Translations_ItemsArgs = {
  data: Update_Game_Provider_Translations_Input;
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Input>>;
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Countries_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Countries_Input>>;
  filter?: InputMaybe<Game_Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Countries_ItemArgs = {
  data: Update_Game_Countries_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Countries_ItemsArgs = {
  data: Update_Game_Countries_Input;
  filter?: InputMaybe<Game_Countries_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Currencies_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Currencies_Input>>;
  filter?: InputMaybe<Game_Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Currencies_ItemArgs = {
  data: Update_Game_Currencies_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Currencies_ItemsArgs = {
  data: Update_Game_Currencies_Input;
  filter?: InputMaybe<Game_Currencies_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_ItemArgs = {
  data: Update_Game_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_ItemsArgs = {
  data: Update_Game_Input;
  filter?: InputMaybe<Game_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Languages_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Languages_Input>>;
  filter?: InputMaybe<Game_Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Languages_ItemArgs = {
  data: Update_Game_Languages_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Languages_ItemsArgs = {
  data: Update_Game_Languages_Input;
  filter?: InputMaybe<Game_Languages_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Regulations_BatchArgs = {
  data?: InputMaybe<Array<Update_Game_Regulations_Input>>;
  filter?: InputMaybe<Game_Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Game_Regulations_ItemArgs = {
  data: Update_Game_Regulations_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Game_Regulations_ItemsArgs = {
  data: Update_Game_Regulations_Input;
  filter?: InputMaybe<Game_Regulations_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Countries_BatchArgs = {
  data?: InputMaybe<Array<Update_Countries_Input>>;
  filter?: InputMaybe<Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Countries_ItemArgs = {
  data: Update_Countries_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Countries_ItemsArgs = {
  data: Update_Countries_Input;
  filter?: InputMaybe<Countries_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Currencies_BatchArgs = {
  data?: InputMaybe<Array<Update_Currencies_Input>>;
  filter?: InputMaybe<Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Currencies_ItemArgs = {
  data: Update_Currencies_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Currencies_ItemsArgs = {
  data: Update_Currencies_Input;
  filter?: InputMaybe<Currencies_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Languages_BatchArgs = {
  data?: InputMaybe<Array<Update_Languages_Input>>;
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Languages_ItemArgs = {
  data: Update_Languages_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Languages_ItemsArgs = {
  data: Update_Languages_Input;
  filter?: InputMaybe<Languages_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Regulations_BatchArgs = {
  data?: InputMaybe<Array<Update_Regulations_Input>>;
  filter?: InputMaybe<Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Regulations_ItemArgs = {
  data: Update_Regulations_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Regulations_ItemsArgs = {
  data: Update_Regulations_Input;
  filter?: InputMaybe<Regulations_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Translations_BatchArgs = {
  data?: InputMaybe<Array<Update_Translations_Input>>;
  filter?: InputMaybe<Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Translations_ItemArgs = {
  data: Update_Translations_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Translations_ItemsArgs = {
  data: Update_Translations_Input;
  filter?: InputMaybe<Translations_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Translations_Translations_BatchArgs = {
  data?: InputMaybe<Array<Update_Translations_Translations_Input>>;
  filter?: InputMaybe<Translations_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MutationUpdate_Translations_Translations_ItemArgs = {
  data: Update_Translations_Translations_Input;
  id: Scalars["ID"]["input"];
};

export type MutationUpdate_Translations_Translations_ItemsArgs = {
  data: Update_Translations_Translations_Input;
  filter?: InputMaybe<Translations_Translations_Filter>;
  ids: Array<InputMaybe<Scalars["ID"]["input"]>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Query = {
  __typename?: "Query";
  Game: Array<Game>;
  Game_Category: Array<Game_Category>;
  Game_Category_aggregated: Array<Game_Category_Aggregated>;
  Game_Category_by_id?: Maybe<Game_Category>;
  Game_Category_by_version?: Maybe<Version_Game_Category>;
  Game_Provider: Array<Game_Provider>;
  Game_Provider_aggregated: Array<Game_Provider_Aggregated>;
  Game_Provider_by_id?: Maybe<Game_Provider>;
  Game_Provider_by_version?: Maybe<Version_Game_Provider>;
  Game_Provider_translations: Array<Game_Provider_Translations>;
  Game_Provider_translations_aggregated: Array<Game_Provider_Translations_Aggregated>;
  Game_Provider_translations_by_id?: Maybe<Game_Provider_Translations>;
  Game_Provider_translations_by_version?: Maybe<Version_Game_Provider_Translations>;
  Game_aggregated: Array<Game_Aggregated>;
  Game_by_id?: Maybe<Game>;
  Game_by_version?: Maybe<Version_Game>;
  Game_countries: Array<Game_Countries>;
  Game_countries_aggregated: Array<Game_Countries_Aggregated>;
  Game_countries_by_id?: Maybe<Game_Countries>;
  Game_countries_by_version?: Maybe<Version_Game_Countries>;
  Game_currencies: Array<Game_Currencies>;
  Game_currencies_aggregated: Array<Game_Currencies_Aggregated>;
  Game_currencies_by_id?: Maybe<Game_Currencies>;
  Game_currencies_by_version?: Maybe<Version_Game_Currencies>;
  Game_languages: Array<Game_Languages>;
  Game_languages_aggregated: Array<Game_Languages_Aggregated>;
  Game_languages_by_id?: Maybe<Game_Languages>;
  Game_languages_by_version?: Maybe<Version_Game_Languages>;
  Game_regulations: Array<Game_Regulations>;
  Game_regulations_aggregated: Array<Game_Regulations_Aggregated>;
  Game_regulations_by_id?: Maybe<Game_Regulations>;
  Game_regulations_by_version?: Maybe<Version_Game_Regulations>;
  countries: Array<Countries>;
  countries_aggregated: Array<Countries_Aggregated>;
  countries_by_id?: Maybe<Countries>;
  countries_by_version?: Maybe<Version_Countries>;
  currencies: Array<Currencies>;
  currencies_aggregated: Array<Currencies_Aggregated>;
  currencies_by_id?: Maybe<Currencies>;
  currencies_by_version?: Maybe<Version_Currencies>;
  languages: Array<Languages>;
  languages_aggregated: Array<Languages_Aggregated>;
  languages_by_id?: Maybe<Languages>;
  languages_by_version?: Maybe<Version_Languages>;
  regulations: Array<Regulations>;
  regulations_aggregated: Array<Regulations_Aggregated>;
  regulations_by_id?: Maybe<Regulations>;
  regulations_by_version?: Maybe<Version_Regulations>;
  translations: Array<Translations>;
  translations_aggregated: Array<Translations_Aggregated>;
  translations_by_id?: Maybe<Translations>;
  translations_by_version?: Maybe<Version_Translations>;
  translations_translations: Array<Translations_Translations>;
  translations_translations_aggregated: Array<Translations_Translations_Aggregated>;
  translations_translations_by_id?: Maybe<Translations_Translations>;
  translations_translations_by_version?: Maybe<Version_Translations_Translations>;
};

export type QueryGameArgs = {
  filter?: InputMaybe<Game_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_CategoryArgs = {
  filter?: InputMaybe<Game_Category_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Category_AggregatedArgs = {
  filter?: InputMaybe<Game_Category_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Category_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Category_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_ProviderArgs = {
  filter?: InputMaybe<Game_Provider_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Provider_AggregatedArgs = {
  filter?: InputMaybe<Game_Provider_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Provider_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Provider_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_Provider_TranslationsArgs = {
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Provider_Translations_AggregatedArgs = {
  filter?: InputMaybe<Game_Provider_Translations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Provider_Translations_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Provider_Translations_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_AggregatedArgs = {
  filter?: InputMaybe<Game_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_CountriesArgs = {
  filter?: InputMaybe<Game_Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Countries_AggregatedArgs = {
  filter?: InputMaybe<Game_Countries_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Countries_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Countries_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_CurrenciesArgs = {
  filter?: InputMaybe<Game_Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Currencies_AggregatedArgs = {
  filter?: InputMaybe<Game_Currencies_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Currencies_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Currencies_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_LanguagesArgs = {
  filter?: InputMaybe<Game_Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Languages_AggregatedArgs = {
  filter?: InputMaybe<Game_Languages_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Languages_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Languages_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryGame_RegulationsArgs = {
  filter?: InputMaybe<Game_Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Regulations_AggregatedArgs = {
  filter?: InputMaybe<Game_Regulations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryGame_Regulations_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryGame_Regulations_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryCountriesArgs = {
  filter?: InputMaybe<Countries_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCountries_AggregatedArgs = {
  filter?: InputMaybe<Countries_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCountries_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCountries_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryCurrenciesArgs = {
  filter?: InputMaybe<Currencies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCurrencies_AggregatedArgs = {
  filter?: InputMaybe<Currencies_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryCurrencies_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryCurrencies_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryLanguagesArgs = {
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryLanguages_AggregatedArgs = {
  filter?: InputMaybe<Languages_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryLanguages_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryLanguages_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryRegulationsArgs = {
  filter?: InputMaybe<Regulations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryRegulations_AggregatedArgs = {
  filter?: InputMaybe<Regulations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryRegulations_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryRegulations_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryTranslationsArgs = {
  filter?: InputMaybe<Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTranslations_AggregatedArgs = {
  filter?: InputMaybe<Translations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTranslations_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTranslations_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type QueryTranslations_TranslationsArgs = {
  filter?: InputMaybe<Translations_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTranslations_Translations_AggregatedArgs = {
  filter?: InputMaybe<Translations_Translations_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type QueryTranslations_Translations_By_IdArgs = {
  id: Scalars["ID"]["input"];
  version?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryTranslations_Translations_By_VersionArgs = {
  id: Scalars["ID"]["input"];
  version: Scalars["String"]["input"];
};

export type Subscription = {
  __typename?: "Subscription";
  Game_Category_mutated?: Maybe<Game_Category_Mutated>;
  Game_Provider_mutated?: Maybe<Game_Provider_Mutated>;
  Game_Provider_translations_mutated?: Maybe<Game_Provider_Translations_Mutated>;
  Game_countries_mutated?: Maybe<Game_Countries_Mutated>;
  Game_currencies_mutated?: Maybe<Game_Currencies_Mutated>;
  Game_languages_mutated?: Maybe<Game_Languages_Mutated>;
  Game_mutated?: Maybe<Game_Mutated>;
  Game_regulations_mutated?: Maybe<Game_Regulations_Mutated>;
  countries_mutated?: Maybe<Countries_Mutated>;
  currencies_mutated?: Maybe<Currencies_Mutated>;
  directus_access_mutated?: Maybe<Directus_Access_Mutated>;
  directus_activity_mutated?: Maybe<Directus_Activity_Mutated>;
  directus_comments_mutated?: Maybe<Directus_Comments_Mutated>;
  directus_dashboards_mutated?: Maybe<Directus_Dashboards_Mutated>;
  directus_files_mutated?: Maybe<Directus_Files_Mutated>;
  directus_flows_mutated?: Maybe<Directus_Flows_Mutated>;
  directus_folders_mutated?: Maybe<Directus_Folders_Mutated>;
  directus_notifications_mutated?: Maybe<Directus_Notifications_Mutated>;
  directus_operations_mutated?: Maybe<Directus_Operations_Mutated>;
  directus_panels_mutated?: Maybe<Directus_Panels_Mutated>;
  directus_permissions_mutated?: Maybe<Directus_Permissions_Mutated>;
  directus_policies_mutated?: Maybe<Directus_Policies_Mutated>;
  directus_presets_mutated?: Maybe<Directus_Presets_Mutated>;
  directus_revisions_mutated?: Maybe<Directus_Revisions_Mutated>;
  directus_roles_mutated?: Maybe<Directus_Roles_Mutated>;
  directus_settings_mutated?: Maybe<Directus_Settings_Mutated>;
  directus_shares_mutated?: Maybe<Directus_Shares_Mutated>;
  directus_translations_mutated?: Maybe<Directus_Translations_Mutated>;
  directus_users_mutated?: Maybe<Directus_Users_Mutated>;
  directus_versions_mutated?: Maybe<Directus_Versions_Mutated>;
  directus_webhooks_mutated?: Maybe<Directus_Webhooks_Mutated>;
  languages_mutated?: Maybe<Languages_Mutated>;
  regulations_mutated?: Maybe<Regulations_Mutated>;
  translations_mutated?: Maybe<Translations_Mutated>;
  translations_translations_mutated?: Maybe<Translations_Translations_Mutated>;
};

export type SubscriptionGame_Category_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Provider_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Provider_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Countries_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Currencies_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Languages_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionGame_Regulations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionCountries_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionCurrencies_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Access_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Activity_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Comments_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Dashboards_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Files_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Flows_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Folders_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Notifications_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Operations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Panels_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Permissions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Policies_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Presets_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Revisions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Roles_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Settings_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Shares_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Users_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Versions_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionDirectus_Webhooks_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionLanguages_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionRegulations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionTranslations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type SubscriptionTranslations_Translations_MutatedArgs = {
  event?: InputMaybe<EventEnum>;
};

export type Big_Int_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars["GraphQLBigInt"]["input"]>>>;
  _eq?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _gt?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _gte?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _in?: InputMaybe<Array<InputMaybe<Scalars["GraphQLBigInt"]["input"]>>>;
  _lt?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _lte?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars["GraphQLBigInt"]["input"]>>>;
  _neq?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars["GraphQLBigInt"]["input"]>>>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  _neq?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: "count_functions";
  count?: Maybe<Scalars["Int"]["output"]>;
};

export type Countries = {
  __typename?: "countries";
  country_code: Scalars["ID"]["output"];
  internal_name?: Maybe<Scalars["String"]["output"]>;
};

export type Countries_Aggregated = {
  __typename?: "countries_aggregated";
  count?: Maybe<Countries_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Countries_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
};

export type Countries_Aggregated_Count = {
  __typename?: "countries_aggregated_count";
  country_code?: Maybe<Scalars["Int"]["output"]>;
  internal_name?: Maybe<Scalars["Int"]["output"]>;
};

export type Countries_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Countries_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Countries_Filter>>>;
  country_code?: InputMaybe<String_Filter_Operators>;
  internal_name?: InputMaybe<String_Filter_Operators>;
};

export type Countries_Mutated = {
  __typename?: "countries_mutated";
  data?: Maybe<Countries>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Create_Game_Category_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Game_Provider_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  provider_key: Scalars["ID"]["input"];
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  translations?: InputMaybe<
    Array<InputMaybe<Create_Game_Provider_Translations_Input>>
  >;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Game_Provider_Translations_Input = {
  Game_Provider_provider_key?: InputMaybe<Create_Game_Provider_Input>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Create_Languages_Input>;
};

export type Create_Game_Countries_Input = {
  Game_id?: InputMaybe<Create_Game_Input>;
  countries_country_code?: InputMaybe<Create_Countries_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Create_Game_Currencies_Input = {
  Game_id?: InputMaybe<Create_Game_Input>;
  currencies_currency_code?: InputMaybe<Create_Currencies_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Create_Game_Input = {
  currencies?: InputMaybe<Array<InputMaybe<Create_Game_Currencies_Input>>>;
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  default_image?: InputMaybe<Create_Directus_Files_Input>;
  default_rtp?: InputMaybe<Scalars["String"]["input"]>;
  game_id?: InputMaybe<Scalars["String"]["input"]>;
  game_type?: InputMaybe<Scalars["String"]["input"]>;
  groove_category?: InputMaybe<Scalars["String"]["input"]>;
  hit_frequency?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  jackpot_type?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  languages?: InputMaybe<Array<InputMaybe<Create_Game_Languages_Input>>>;
  max_bet?: InputMaybe<Scalars["String"]["input"]>;
  max_exposure?: InputMaybe<Scalars["String"]["input"]>;
  min_bet?: InputMaybe<Scalars["String"]["input"]>;
  payouts?: InputMaybe<Scalars["String"]["input"]>;
  payouts_type?: InputMaybe<Scalars["String"]["input"]>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  provider?: InputMaybe<Create_Game_Provider_Input>;
  restricted_countries?: InputMaybe<
    Array<InputMaybe<Create_Game_Countries_Input>>
  >;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  support_frb?: InputMaybe<Scalars["Boolean"]["input"]>;
  support_jackpot?: InputMaybe<Scalars["Boolean"]["input"]>;
  supported_regulations?: InputMaybe<
    Array<InputMaybe<Create_Game_Regulations_Input>>
  >;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
  volatility?: InputMaybe<Scalars["String"]["input"]>;
};

export type Create_Game_Languages_Input = {
  Game_id?: InputMaybe<Create_Game_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Create_Languages_Input>;
};

export type Create_Game_Regulations_Input = {
  Game_id?: InputMaybe<Create_Game_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  regulations_internal_name?: InputMaybe<Create_Regulations_Input>;
};

export type Create_Countries_Input = {
  country_code: Scalars["ID"]["input"];
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Create_Currencies_Input = {
  currency_code: Scalars["ID"]["input"];
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Create_Directus_Access_Input = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  user?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Directus_Files_Input = {
  charset?: InputMaybe<Scalars["String"]["input"]>;
  created_on?: InputMaybe<Scalars["Date"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  embed?: InputMaybe<Scalars["String"]["input"]>;
  filename_disk?: InputMaybe<Scalars["String"]["input"]>;
  filename_download: Scalars["String"]["input"];
  filesize?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  focal_point_x?: InputMaybe<Scalars["Int"]["input"]>;
  focal_point_y?: InputMaybe<Scalars["Int"]["input"]>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars["Date"]["input"]>;
  storage: Scalars["String"]["input"];
  tags?: InputMaybe<Scalars["JSON"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  tus_data?: InputMaybe<Scalars["JSON"]["input"]>;
  tus_id?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars["Date"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Permissions_Input = {
  action: Scalars["String"]["input"];
  collection: Scalars["String"]["input"];
  fields?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  permissions?: InputMaybe<Scalars["JSON"]["input"]>;
  policy?: InputMaybe<Create_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars["JSON"]["input"]>;
  validation?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Create_Directus_Policies_Input = {
  admin_access: Scalars["Boolean"]["input"];
  app_access: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars["Boolean"]["input"];
  icon?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name: Scalars["String"]["input"];
  permissions?: InputMaybe<
    Array<InputMaybe<Create_Directus_Permissions_Input>>
  >;
  roles?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
};

export type Create_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Create_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  icon?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name: Scalars["String"]["input"];
  parent?: InputMaybe<Create_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars["String"]["input"]>;
  auth_data?: InputMaybe<Scalars["JSON"]["input"]>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  email_notifications?: InputMaybe<Scalars["Boolean"]["input"]>;
  external_identifier?: InputMaybe<Scalars["String"]["input"]>;
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  last_access?: InputMaybe<Scalars["Date"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
  last_page?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["Hash"]["input"]>;
  policies?: InputMaybe<Array<InputMaybe<Create_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Scalars["JSON"]["input"]>;
  text_direction?: InputMaybe<Scalars["String"]["input"]>;
  tfa_secret?: InputMaybe<Scalars["Hash"]["input"]>;
  theme_dark?: InputMaybe<Scalars["String"]["input"]>;
  theme_dark_overrides?: InputMaybe<Scalars["JSON"]["input"]>;
  theme_light?: InputMaybe<Scalars["String"]["input"]>;
  theme_light_overrides?: InputMaybe<Scalars["JSON"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  token?: InputMaybe<Scalars["Hash"]["input"]>;
};

export type Create_Languages_Input = {
  direction?: InputMaybe<Scalars["String"]["input"]>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  language_code: Scalars["ID"]["input"];
  sort?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Create_Regulations_Input = {
  internal_name: Scalars["ID"]["input"];
};

export type Create_Translations_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<
    Array<InputMaybe<Create_Translations_Translations_Input>>
  >;
  translations_key?: InputMaybe<Scalars["String"]["input"]>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Create_Translations_Translations_Input = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Create_Languages_Input>;
  translations_id?: InputMaybe<Create_Translations_Input>;
};

export type Currencies = {
  __typename?: "currencies";
  currency_code: Scalars["ID"]["output"];
  internal_name?: Maybe<Scalars["String"]["output"]>;
};

export type Currencies_Aggregated = {
  __typename?: "currencies_aggregated";
  count?: Maybe<Currencies_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Currencies_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
};

export type Currencies_Aggregated_Count = {
  __typename?: "currencies_aggregated_count";
  currency_code?: Maybe<Scalars["Int"]["output"]>;
  internal_name?: Maybe<Scalars["Int"]["output"]>;
};

export type Currencies_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Currencies_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Currencies_Filter>>>;
  currency_code?: InputMaybe<String_Filter_Operators>;
  internal_name?: InputMaybe<String_Filter_Operators>;
};

export type Currencies_Mutated = {
  __typename?: "currencies_mutated";
  data?: Maybe<Currencies>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<
    Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>
  >;
  _eq?: InputMaybe<Scalars["String"]["input"]>;
  _gt?: InputMaybe<Scalars["String"]["input"]>;
  _gte?: InputMaybe<Scalars["String"]["input"]>;
  _in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  _lt?: InputMaybe<Scalars["String"]["input"]>;
  _lte?: InputMaybe<Scalars["String"]["input"]>;
  _nbetween?: InputMaybe<
    Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>
  >;
  _neq?: InputMaybe<Scalars["String"]["input"]>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: "datetime_functions";
  day?: Maybe<Scalars["Int"]["output"]>;
  hour?: Maybe<Scalars["Int"]["output"]>;
  minute?: Maybe<Scalars["Int"]["output"]>;
  month?: Maybe<Scalars["Int"]["output"]>;
  second?: Maybe<Scalars["Int"]["output"]>;
  week?: Maybe<Scalars["Int"]["output"]>;
  weekday?: Maybe<Scalars["Int"]["output"]>;
  year?: Maybe<Scalars["Int"]["output"]>;
};

export type Delete_Many = {
  __typename?: "delete_many";
  ids: Array<Maybe<Scalars["ID"]["output"]>>;
};

export type Delete_One = {
  __typename?: "delete_one";
  id: Scalars["ID"]["output"];
};

export type Directus_Access = {
  __typename?: "directus_access";
  id: Scalars["ID"]["output"];
  policy?: Maybe<Directus_Policies>;
  role?: Maybe<Directus_Roles>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  user?: Maybe<Directus_Users>;
};

export type Directus_AccessPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_AccessRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_AccessUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Access_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  id?: InputMaybe<Id_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  role?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Access_Mutated = {
  __typename?: "directus_access_mutated";
  data?: Maybe<Directus_Access>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Access_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _none?: InputMaybe<Directus_Access_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Access_Filter>>>;
  _some?: InputMaybe<Directus_Access_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  role?: InputMaybe<Directus_Roles_Filter>;
  sort?: InputMaybe<Number_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Activity = {
  __typename?: "directus_activity";
  action: Scalars["String"]["output"];
  collection: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  ip?: Maybe<Scalars["String"]["output"]>;
  item: Scalars["String"]["output"];
  origin?: Maybe<Scalars["String"]["output"]>;
  revisions?: Maybe<Array<Maybe<Directus_Revisions>>>;
  revisions_func?: Maybe<Count_Functions>;
  timestamp?: Maybe<Scalars["Date"]["output"]>;
  timestamp_func?: Maybe<Datetime_Functions>;
  user?: Maybe<Directus_Users>;
  user_agent?: Maybe<Scalars["String"]["output"]>;
};

export type Directus_ActivityRevisionsArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_ActivityUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Activity_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Activity_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  ip?: InputMaybe<String_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  origin?: InputMaybe<String_Filter_Operators>;
  revisions?: InputMaybe<Directus_Revisions_Quantifier_Filter>;
  revisions_func?: InputMaybe<Count_Function_Filter_Operators>;
  timestamp?: InputMaybe<Date_Filter_Operators>;
  timestamp_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  user?: InputMaybe<Directus_Users_Filter>;
  user_agent?: InputMaybe<String_Filter_Operators>;
};

export type Directus_Activity_Mutated = {
  __typename?: "directus_activity_mutated";
  data?: Maybe<Directus_Activity>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Comments = {
  __typename?: "directus_comments";
  collection: Scalars["String"]["output"];
  comment: Scalars["String"]["output"];
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars["ID"]["output"];
  item: Scalars["String"]["output"];
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};

export type Directus_CommentsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_CommentsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Comments_Mutated = {
  __typename?: "directus_comments_mutated";
  data?: Maybe<Directus_Comments>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Dashboards = {
  __typename?: "directus_dashboards";
  color?: Maybe<Scalars["String"]["output"]>;
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  note?: Maybe<Scalars["String"]["output"]>;
  panels?: Maybe<Array<Maybe<Directus_Panels>>>;
  panels_func?: Maybe<Count_Functions>;
  user_created?: Maybe<Directus_Users>;
};

export type Directus_DashboardsPanelsArgs = {
  filter?: InputMaybe<Directus_Panels_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_DashboardsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Dashboards_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Dashboards_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  panels?: InputMaybe<Directus_Panels_Quantifier_Filter>;
  panels_func?: InputMaybe<Count_Function_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Dashboards_Mutated = {
  __typename?: "directus_dashboards_mutated";
  data?: Maybe<Directus_Dashboards>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Files = {
  __typename?: "directus_files";
  charset?: Maybe<Scalars["String"]["output"]>;
  created_on?: Maybe<Scalars["Date"]["output"]>;
  created_on_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars["String"]["output"]>;
  duration?: Maybe<Scalars["Int"]["output"]>;
  embed?: Maybe<Scalars["String"]["output"]>;
  filename_disk?: Maybe<Scalars["String"]["output"]>;
  filename_download: Scalars["String"]["output"];
  filesize?: Maybe<Scalars["GraphQLBigInt"]["output"]>;
  focal_point_x?: Maybe<Scalars["Int"]["output"]>;
  focal_point_y?: Maybe<Scalars["Int"]["output"]>;
  folder?: Maybe<Directus_Folders>;
  height?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["ID"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  metadata?: Maybe<Scalars["JSON"]["output"]>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars["Date"]["output"]>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars["String"]["output"];
  tags?: Maybe<Scalars["JSON"]["output"]>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars["String"]["output"]>;
  tus_data?: Maybe<Scalars["JSON"]["output"]>;
  tus_data_func?: Maybe<Count_Functions>;
  tus_id?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars["Date"]["output"]>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars["Int"]["output"]>;
};

export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  created_on?: InputMaybe<Date_Filter_Operators>;
  created_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Big_Int_Filter_Operators>;
  focal_point_x?: InputMaybe<Number_Filter_Operators>;
  focal_point_y?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  tus_data?: InputMaybe<String_Filter_Operators>;
  tus_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  tus_id?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Files_Mutated = {
  __typename?: "directus_files_mutated";
  data?: Maybe<Directus_Files>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Flows = {
  __typename?: "directus_flows";
  accountability?: Maybe<Scalars["String"]["output"]>;
  color?: Maybe<Scalars["String"]["output"]>;
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars["String"]["output"]>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  operation?: Maybe<Directus_Operations>;
  operations?: Maybe<Array<Maybe<Directus_Operations>>>;
  operations_func?: Maybe<Count_Functions>;
  options?: Maybe<Scalars["JSON"]["output"]>;
  options_func?: Maybe<Count_Functions>;
  status?: Maybe<Scalars["String"]["output"]>;
  trigger?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Directus_Users>;
};

export type Directus_FlowsOperationArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_FlowsOperationsArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_FlowsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Flows_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Flows_Filter>>>;
  accountability?: InputMaybe<String_Filter_Operators>;
  color?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  operation?: InputMaybe<Directus_Operations_Filter>;
  operations?: InputMaybe<Directus_Operations_Quantifier_Filter>;
  operations_func?: InputMaybe<Count_Function_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  trigger?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Flows_Mutated = {
  __typename?: "directus_flows_mutated";
  data?: Maybe<Directus_Flows>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Folders = {
  __typename?: "directus_folders";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  parent?: Maybe<Directus_Folders>;
};

export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Folders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
};

export type Directus_Folders_Mutated = {
  __typename?: "directus_folders_mutated";
  data?: Maybe<Directus_Folders>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Notifications = {
  __typename?: "directus_notifications";
  collection?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  item?: Maybe<Scalars["String"]["output"]>;
  message?: Maybe<Scalars["String"]["output"]>;
  recipient?: Maybe<Directus_Users>;
  sender?: Maybe<Directus_Users>;
  status?: Maybe<Scalars["String"]["output"]>;
  subject: Scalars["String"]["output"];
  timestamp?: Maybe<Scalars["Date"]["output"]>;
  timestamp_func?: Maybe<Datetime_Functions>;
};

export type Directus_NotificationsRecipientArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_NotificationsSenderArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Notifications_Mutated = {
  __typename?: "directus_notifications_mutated";
  data?: Maybe<Directus_Notifications>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Operations = {
  __typename?: "directus_operations";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  flow?: Maybe<Directus_Flows>;
  id: Scalars["ID"]["output"];
  key: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  options?: Maybe<Scalars["JSON"]["output"]>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars["Int"]["output"];
  position_y: Scalars["Int"]["output"];
  reject?: Maybe<Directus_Operations>;
  resolve?: Maybe<Directus_Operations>;
  type: Scalars["String"]["output"];
  user_created?: Maybe<Directus_Users>;
};

export type Directus_OperationsFlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_OperationsRejectArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_OperationsResolveArgs = {
  filter?: InputMaybe<Directus_Operations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_OperationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Operations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Operations_Mutated = {
  __typename?: "directus_operations_mutated";
  data?: Maybe<Directus_Operations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Operations_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _none?: InputMaybe<Directus_Operations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Operations_Filter>>>;
  _some?: InputMaybe<Directus_Operations_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  flow?: InputMaybe<Directus_Flows_Filter>;
  id?: InputMaybe<Id_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  reject?: InputMaybe<Directus_Operations_Filter>;
  resolve?: InputMaybe<Directus_Operations_Filter>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Panels = {
  __typename?: "directus_panels";
  color?: Maybe<Scalars["String"]["output"]>;
  dashboard?: Maybe<Directus_Dashboards>;
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  height: Scalars["Int"]["output"];
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  note?: Maybe<Scalars["String"]["output"]>;
  options?: Maybe<Scalars["JSON"]["output"]>;
  options_func?: Maybe<Count_Functions>;
  position_x: Scalars["Int"]["output"];
  position_y: Scalars["Int"]["output"];
  show_header: Scalars["Boolean"]["output"];
  type: Scalars["String"]["output"];
  user_created?: Maybe<Directus_Users>;
  width: Scalars["Int"]["output"];
};

export type Directus_PanelsDashboardArgs = {
  filter?: InputMaybe<Directus_Dashboards_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_PanelsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Panels_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Panels_Mutated = {
  __typename?: "directus_panels_mutated";
  data?: Maybe<Directus_Panels>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Panels_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _none?: InputMaybe<Directus_Panels_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Panels_Filter>>>;
  _some?: InputMaybe<Directus_Panels_Filter>;
  color?: InputMaybe<String_Filter_Operators>;
  dashboard?: InputMaybe<Directus_Dashboards_Filter>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  height?: InputMaybe<Number_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  note?: InputMaybe<String_Filter_Operators>;
  options?: InputMaybe<String_Filter_Operators>;
  options_func?: InputMaybe<Count_Function_Filter_Operators>;
  position_x?: InputMaybe<Number_Filter_Operators>;
  position_y?: InputMaybe<Number_Filter_Operators>;
  show_header?: InputMaybe<Boolean_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Permissions = {
  __typename?: "directus_permissions";
  action: Scalars["String"]["output"];
  collection: Scalars["String"]["output"];
  fields?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  id?: Maybe<Scalars["ID"]["output"]>;
  permissions?: Maybe<Scalars["JSON"]["output"]>;
  permissions_func?: Maybe<Count_Functions>;
  policy?: Maybe<Directus_Policies>;
  presets?: Maybe<Scalars["JSON"]["output"]>;
  presets_func?: Maybe<Count_Functions>;
  validation?: Maybe<Scalars["JSON"]["output"]>;
  validation_func?: Maybe<Count_Functions>;
};

export type Directus_PermissionsPolicyArgs = {
  filter?: InputMaybe<Directus_Policies_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Permissions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Permissions_Mutated = {
  __typename?: "directus_permissions_mutated";
  data?: Maybe<Directus_Permissions>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Permissions_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _none?: InputMaybe<Directus_Permissions_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Permissions_Filter>>>;
  _some?: InputMaybe<Directus_Permissions_Filter>;
  action?: InputMaybe<String_Filter_Operators>;
  collection?: InputMaybe<String_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  permissions?: InputMaybe<String_Filter_Operators>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  policy?: InputMaybe<Directus_Policies_Filter>;
  presets?: InputMaybe<String_Filter_Operators>;
  presets_func?: InputMaybe<Count_Function_Filter_Operators>;
  validation?: InputMaybe<String_Filter_Operators>;
  validation_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Policies = {
  __typename?: "directus_policies";
  admin_access: Scalars["Boolean"]["output"];
  app_access: Scalars["Boolean"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa: Scalars["Boolean"]["output"];
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  ip_access?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  name: Scalars["String"]["output"];
  permissions?: Maybe<Array<Maybe<Directus_Permissions>>>;
  permissions_func?: Maybe<Count_Functions>;
  roles?: Maybe<Array<Maybe<Directus_Access>>>;
  roles_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Access>>>;
  users_func?: Maybe<Count_Functions>;
};

export type Directus_PoliciesPermissionsArgs = {
  filter?: InputMaybe<Directus_Permissions_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_PoliciesRolesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_PoliciesUsersArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Policies_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Policies_Filter>>>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  permissions?: InputMaybe<Directus_Permissions_Quantifier_Filter>;
  permissions_func?: InputMaybe<Count_Function_Filter_Operators>;
  roles?: InputMaybe<Directus_Access_Quantifier_Filter>;
  roles_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Access_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Policies_Mutated = {
  __typename?: "directus_policies_mutated";
  data?: Maybe<Directus_Policies>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Presets = {
  __typename?: "directus_presets";
  bookmark?: Maybe<Scalars["String"]["output"]>;
  collection?: Maybe<Scalars["String"]["output"]>;
  color?: Maybe<Scalars["String"]["output"]>;
  filter?: Maybe<Scalars["JSON"]["output"]>;
  filter_func?: Maybe<Count_Functions>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  layout?: Maybe<Scalars["String"]["output"]>;
  layout_options?: Maybe<Scalars["JSON"]["output"]>;
  layout_options_func?: Maybe<Count_Functions>;
  layout_query?: Maybe<Scalars["JSON"]["output"]>;
  layout_query_func?: Maybe<Count_Functions>;
  refresh_interval?: Maybe<Scalars["Int"]["output"]>;
  role?: Maybe<Directus_Roles>;
  search?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<Directus_Users>;
};

export type Directus_PresetsRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_PresetsUserArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Presets_Mutated = {
  __typename?: "directus_presets_mutated";
  data?: Maybe<Directus_Presets>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Revisions = {
  __typename?: "directus_revisions";
  activity?: Maybe<Directus_Activity>;
  collection: Scalars["String"]["output"];
  data?: Maybe<Scalars["JSON"]["output"]>;
  data_func?: Maybe<Count_Functions>;
  delta?: Maybe<Scalars["JSON"]["output"]>;
  delta_func?: Maybe<Count_Functions>;
  id: Scalars["ID"]["output"];
  item: Scalars["String"]["output"];
  parent?: Maybe<Directus_Revisions>;
  version?: Maybe<Directus_Versions>;
};

export type Directus_RevisionsActivityArgs = {
  filter?: InputMaybe<Directus_Activity_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_RevisionsParentArgs = {
  filter?: InputMaybe<Directus_Revisions_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_RevisionsVersionArgs = {
  filter?: InputMaybe<Directus_Versions_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Revisions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  version?: InputMaybe<Directus_Versions_Filter>;
};

export type Directus_Revisions_Mutated = {
  __typename?: "directus_revisions_mutated";
  data?: Maybe<Directus_Revisions>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Revisions_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _none?: InputMaybe<Directus_Revisions_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Revisions_Filter>>>;
  _some?: InputMaybe<Directus_Revisions_Filter>;
  activity?: InputMaybe<Directus_Activity_Filter>;
  collection?: InputMaybe<String_Filter_Operators>;
  data?: InputMaybe<String_Filter_Operators>;
  data_func?: InputMaybe<Count_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Revisions_Filter>;
  version?: InputMaybe<Directus_Versions_Filter>;
};

export type Directus_Roles = {
  __typename?: "directus_roles";
  children?: Maybe<Array<Maybe<Directus_Roles>>>;
  children_func?: Maybe<Count_Functions>;
  description?: Maybe<Scalars["String"]["output"]>;
  icon?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
  parent?: Maybe<Directus_Roles>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};

export type Directus_RolesChildrenArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_RolesParentArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_RolesPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Roles_Mutated = {
  __typename?: "directus_roles_mutated";
  data?: Maybe<Directus_Roles>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Roles_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _none?: InputMaybe<Directus_Roles_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _some?: InputMaybe<Directus_Roles_Filter>;
  children?: InputMaybe<Directus_Roles_Quantifier_Filter>;
  children_func?: InputMaybe<Count_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Roles_Filter>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Quantifier_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Settings = {
  __typename?: "directus_settings";
  accepted_terms?: Maybe<Scalars["Boolean"]["output"]>;
  auth_login_attempts?: Maybe<Scalars["Int"]["output"]>;
  auth_password_policy?: Maybe<Scalars["String"]["output"]>;
  basemaps?: Maybe<Scalars["JSON"]["output"]>;
  basemaps_func?: Maybe<Count_Functions>;
  custom_aspect_ratios?: Maybe<Scalars["JSON"]["output"]>;
  custom_aspect_ratios_func?: Maybe<Count_Functions>;
  custom_css?: Maybe<Scalars["String"]["output"]>;
  default_appearance?: Maybe<Scalars["String"]["output"]>;
  default_language?: Maybe<Scalars["String"]["output"]>;
  default_theme_dark?: Maybe<Scalars["String"]["output"]>;
  default_theme_light?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  mapbox_key?: Maybe<Scalars["String"]["output"]>;
  module_bar?: Maybe<Scalars["JSON"]["output"]>;
  module_bar_func?: Maybe<Count_Functions>;
  /** $t:field_options.directus_settings.project_color_note */
  project_color?: Maybe<Scalars["String"]["output"]>;
  project_descriptor?: Maybe<Scalars["String"]["output"]>;
  project_id?: Maybe<Scalars["ID"]["output"]>;
  project_logo?: Maybe<Directus_Files>;
  project_name?: Maybe<Scalars["String"]["output"]>;
  project_url?: Maybe<Scalars["String"]["output"]>;
  public_background?: Maybe<Directus_Files>;
  public_favicon?: Maybe<Directus_Files>;
  public_foreground?: Maybe<Directus_Files>;
  public_note?: Maybe<Scalars["String"]["output"]>;
  /** $t:fields.directus_settings.public_registration_note */
  public_registration: Scalars["Boolean"]["output"];
  /** $t:fields.directus_settings.public_registration_email_filter_note */
  public_registration_email_filter?: Maybe<Scalars["JSON"]["output"]>;
  public_registration_email_filter_func?: Maybe<Count_Functions>;
  public_registration_role?: Maybe<Directus_Roles>;
  /** $t:fields.directus_settings.public_registration_verify_email_note */
  public_registration_verify_email?: Maybe<Scalars["Boolean"]["output"]>;
  report_bug_url?: Maybe<Scalars["String"]["output"]>;
  report_error_url?: Maybe<Scalars["String"]["output"]>;
  report_feature_url?: Maybe<Scalars["String"]["output"]>;
  storage_asset_presets?: Maybe<Scalars["JSON"]["output"]>;
  storage_asset_presets_func?: Maybe<Count_Functions>;
  storage_asset_transform?: Maybe<Scalars["String"]["output"]>;
  storage_default_folder?: Maybe<Directus_Folders>;
  theme_dark_overrides?: Maybe<Scalars["JSON"]["output"]>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light_overrides?: Maybe<Scalars["JSON"]["output"]>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  visual_editor_urls?: Maybe<Scalars["JSON"]["output"]>;
  visual_editor_urls_func?: Maybe<Count_Functions>;
};

export type Directus_SettingsProject_LogoArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SettingsPublic_BackgroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SettingsPublic_FaviconArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SettingsPublic_ForegroundArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SettingsPublic_Registration_RoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SettingsStorage_Default_FolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Settings_Mutated = {
  __typename?: "directus_settings_mutated";
  data?: Maybe<Directus_Settings>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Shares = {
  __typename?: "directus_shares";
  collection: Scalars["String"]["output"];
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_end?: Maybe<Scalars["Date"]["output"]>;
  date_end_func?: Maybe<Datetime_Functions>;
  /** $t:shared_leave_blank_for_unlimited */
  date_start?: Maybe<Scalars["Date"]["output"]>;
  date_start_func?: Maybe<Datetime_Functions>;
  id: Scalars["ID"]["output"];
  item: Scalars["String"]["output"];
  /** $t:shared_leave_blank_for_unlimited */
  max_uses?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  /** $t:shared_leave_blank_for_passwordless_access */
  password?: Maybe<Scalars["Hash"]["output"]>;
  role?: Maybe<Directus_Roles>;
  times_used?: Maybe<Scalars["Int"]["output"]>;
  user_created?: Maybe<Directus_Users>;
};

export type Directus_SharesRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_SharesUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Shares_Mutated = {
  __typename?: "directus_shares_mutated";
  data?: Maybe<Directus_Shares>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Translations = {
  __typename?: "directus_translations";
  id: Scalars["ID"]["output"];
  key: Scalars["String"]["output"];
  language: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type Directus_Translations_Mutated = {
  __typename?: "directus_translations_mutated";
  data?: Maybe<Directus_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Users = {
  __typename?: "directus_users";
  appearance?: Maybe<Scalars["String"]["output"]>;
  auth_data?: Maybe<Scalars["JSON"]["output"]>;
  auth_data_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  description?: Maybe<Scalars["String"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  email_notifications?: Maybe<Scalars["Boolean"]["output"]>;
  external_identifier?: Maybe<Scalars["String"]["output"]>;
  first_name?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  language?: Maybe<Scalars["String"]["output"]>;
  last_access?: Maybe<Scalars["Date"]["output"]>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_name?: Maybe<Scalars["String"]["output"]>;
  last_page?: Maybe<Scalars["String"]["output"]>;
  location?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<Scalars["Hash"]["output"]>;
  policies?: Maybe<Array<Maybe<Directus_Access>>>;
  policies_func?: Maybe<Count_Functions>;
  provider?: Maybe<Scalars["String"]["output"]>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars["String"]["output"]>;
  tags?: Maybe<Scalars["JSON"]["output"]>;
  tags_func?: Maybe<Count_Functions>;
  text_direction?: Maybe<Scalars["String"]["output"]>;
  tfa_secret?: Maybe<Scalars["Hash"]["output"]>;
  theme_dark?: Maybe<Scalars["String"]["output"]>;
  theme_dark_overrides?: Maybe<Scalars["JSON"]["output"]>;
  theme_dark_overrides_func?: Maybe<Count_Functions>;
  theme_light?: Maybe<Scalars["String"]["output"]>;
  theme_light_overrides?: Maybe<Scalars["JSON"]["output"]>;
  theme_light_overrides_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars["String"]["output"]>;
  token?: Maybe<Scalars["Hash"]["output"]>;
};

export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_UsersPoliciesArgs = {
  filter?: InputMaybe<Directus_Access_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  appearance?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  text_direction?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Users_Mutated = {
  __typename?: "directus_users_mutated";
  data?: Maybe<Directus_Users>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Users_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _none?: InputMaybe<Directus_Users_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _some?: InputMaybe<Directus_Users_Filter>;
  appearance?: InputMaybe<String_Filter_Operators>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  policies?: InputMaybe<Directus_Access_Quantifier_Filter>;
  policies_func?: InputMaybe<Count_Function_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  text_direction?: InputMaybe<String_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme_dark?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides?: InputMaybe<String_Filter_Operators>;
  theme_dark_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  theme_light?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides?: InputMaybe<String_Filter_Operators>;
  theme_light_overrides_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Directus_Versions = {
  __typename?: "directus_versions";
  collection: Scalars["String"]["output"];
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  delta?: Maybe<Scalars["JSON"]["output"]>;
  delta_func?: Maybe<Count_Functions>;
  hash?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  item: Scalars["String"]["output"];
  key: Scalars["String"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};

export type Directus_VersionsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_VersionsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Versions_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Versions_Filter>>>;
  collection?: InputMaybe<String_Filter_Operators>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  delta?: InputMaybe<String_Filter_Operators>;
  delta_func?: InputMaybe<Count_Function_Filter_Operators>;
  hash?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Id_Filter_Operators>;
  item?: InputMaybe<String_Filter_Operators>;
  key?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Directus_Versions_Mutated = {
  __typename?: "directus_versions_mutated";
  data?: Maybe<Directus_Versions>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Directus_Webhooks = {
  __typename?: "directus_webhooks";
  actions: Array<Maybe<Scalars["String"]["output"]>>;
  collections: Array<Maybe<Scalars["String"]["output"]>>;
  data?: Maybe<Scalars["Boolean"]["output"]>;
  headers?: Maybe<Scalars["JSON"]["output"]>;
  headers_func?: Maybe<Count_Functions>;
  id: Scalars["ID"]["output"];
  method?: Maybe<Scalars["String"]["output"]>;
  migrated_flow?: Maybe<Directus_Flows>;
  name: Scalars["String"]["output"];
  status?: Maybe<Scalars["String"]["output"]>;
  url: Scalars["String"]["output"];
  was_active_before_deprecation: Scalars["Boolean"]["output"];
};

export type Directus_WebhooksMigrated_FlowArgs = {
  filter?: InputMaybe<Directus_Flows_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Directus_Webhooks_Mutated = {
  __typename?: "directus_webhooks_mutated";
  data?: Maybe<Directus_Webhooks>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nempty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Id_Filter_Operators = {
  _contains?: InputMaybe<Scalars["ID"]["input"]>;
  _empty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _ends_with?: InputMaybe<Scalars["ID"]["input"]>;
  _eq?: InputMaybe<Scalars["ID"]["input"]>;
  _icontains?: InputMaybe<Scalars["ID"]["input"]>;
  _iends_with?: InputMaybe<Scalars["ID"]["input"]>;
  _in?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  _istarts_with?: InputMaybe<Scalars["ID"]["input"]>;
  _ncontains?: InputMaybe<Scalars["ID"]["input"]>;
  _nempty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nends_with?: InputMaybe<Scalars["ID"]["input"]>;
  _neq?: InputMaybe<Scalars["ID"]["input"]>;
  _niends_with?: InputMaybe<Scalars["ID"]["input"]>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars["ID"]["input"]>>>;
  _nistarts_with?: InputMaybe<Scalars["ID"]["input"]>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nstarts_with?: InputMaybe<Scalars["ID"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
  _starts_with?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Languages = {
  __typename?: "languages";
  direction?: Maybe<Scalars["String"]["output"]>;
  display_name?: Maybe<Scalars["String"]["output"]>;
  language_code: Scalars["ID"]["output"];
  sort?: Maybe<Scalars["Int"]["output"]>;
};

export type Languages_Aggregated = {
  __typename?: "languages_aggregated";
  avg?: Maybe<Languages_Aggregated_Fields>;
  avgDistinct?: Maybe<Languages_Aggregated_Fields>;
  count?: Maybe<Languages_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Languages_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Languages_Aggregated_Fields>;
  min?: Maybe<Languages_Aggregated_Fields>;
  sum?: Maybe<Languages_Aggregated_Fields>;
  sumDistinct?: Maybe<Languages_Aggregated_Fields>;
};

export type Languages_Aggregated_Count = {
  __typename?: "languages_aggregated_count";
  direction?: Maybe<Scalars["Int"]["output"]>;
  display_name?: Maybe<Scalars["Int"]["output"]>;
  language_code?: Maybe<Scalars["Int"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
};

export type Languages_Aggregated_Fields = {
  __typename?: "languages_aggregated_fields";
  sort?: Maybe<Scalars["Float"]["output"]>;
};

export type Languages_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Languages_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Languages_Filter>>>;
  direction?: InputMaybe<String_Filter_Operators>;
  display_name?: InputMaybe<String_Filter_Operators>;
  language_code?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
};

export type Languages_Mutated = {
  __typename?: "languages_mutated";
  data?: Maybe<Languages>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<
    Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>
  >;
  _eq?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _gt?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _gte?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _in?: InputMaybe<Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>>;
  _lt?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _lte?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _nbetween?: InputMaybe<
    Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>
  >;
  _neq?: InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>;
  _nin?: InputMaybe<
    Array<InputMaybe<Scalars["GraphQLStringOrFloat"]["input"]>>
  >;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Regulations = {
  __typename?: "regulations";
  internal_name: Scalars["ID"]["output"];
};

export type Regulations_Aggregated = {
  __typename?: "regulations_aggregated";
  count?: Maybe<Regulations_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Regulations_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
};

export type Regulations_Aggregated_Count = {
  __typename?: "regulations_aggregated_count";
  internal_name?: Maybe<Scalars["Int"]["output"]>;
};

export type Regulations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Regulations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Regulations_Filter>>>;
  internal_name?: InputMaybe<String_Filter_Operators>;
};

export type Regulations_Mutated = {
  __typename?: "regulations_mutated";
  data?: Maybe<Regulations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars["String"]["input"]>;
  _empty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _ends_with?: InputMaybe<Scalars["String"]["input"]>;
  _eq?: InputMaybe<Scalars["String"]["input"]>;
  _icontains?: InputMaybe<Scalars["String"]["input"]>;
  _iends_with?: InputMaybe<Scalars["String"]["input"]>;
  _in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  _istarts_with?: InputMaybe<Scalars["String"]["input"]>;
  _ncontains?: InputMaybe<Scalars["String"]["input"]>;
  _nempty?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nends_with?: InputMaybe<Scalars["String"]["input"]>;
  _neq?: InputMaybe<Scalars["String"]["input"]>;
  _niends_with?: InputMaybe<Scalars["String"]["input"]>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  _nistarts_with?: InputMaybe<Scalars["String"]["input"]>;
  _nnull?: InputMaybe<Scalars["Boolean"]["input"]>;
  _nstarts_with?: InputMaybe<Scalars["String"]["input"]>;
  _null?: InputMaybe<Scalars["Boolean"]["input"]>;
  _starts_with?: InputMaybe<Scalars["String"]["input"]>;
};

export type Translations = {
  __typename?: "translations";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars["ID"]["output"];
  translations?: Maybe<Array<Maybe<Translations_Translations>>>;
  translations_func?: Maybe<Count_Functions>;
  translations_key?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};

export type TranslationsTranslationsArgs = {
  filter?: InputMaybe<Translations_Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type TranslationsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type TranslationsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Translations_Aggregated = {
  __typename?: "translations_aggregated";
  avg?: Maybe<Translations_Aggregated_Fields>;
  avgDistinct?: Maybe<Translations_Aggregated_Fields>;
  count?: Maybe<Translations_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Translations_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Translations_Aggregated_Fields>;
  min?: Maybe<Translations_Aggregated_Fields>;
  sum?: Maybe<Translations_Aggregated_Fields>;
  sumDistinct?: Maybe<Translations_Aggregated_Fields>;
};

export type Translations_Aggregated_Count = {
  __typename?: "translations_aggregated_count";
  date_created?: Maybe<Scalars["Int"]["output"]>;
  date_updated?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  translations?: Maybe<Scalars["Int"]["output"]>;
  translations_key?: Maybe<Scalars["Int"]["output"]>;
  user_created?: Maybe<Scalars["Int"]["output"]>;
  user_updated?: Maybe<Scalars["Int"]["output"]>;
};

export type Translations_Aggregated_Fields = {
  __typename?: "translations_aggregated_fields";
  id?: Maybe<Scalars["Float"]["output"]>;
};

export type Translations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Translations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Translations_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  translations?: InputMaybe<Translations_Translations_Quantifier_Filter>;
  translations_func?: InputMaybe<Count_Function_Filter_Operators>;
  translations_key?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Translations_Mutated = {
  __typename?: "translations_mutated";
  data?: Maybe<Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Translations_Translations = {
  __typename?: "translations_translations";
  content?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  languages_language_code?: Maybe<Languages>;
  translations_id?: Maybe<Translations>;
};

export type Translations_TranslationsLanguages_Language_CodeArgs = {
  filter?: InputMaybe<Languages_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Translations_TranslationsTranslations_IdArgs = {
  filter?: InputMaybe<Translations_Filter>;
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
  page?: InputMaybe<Scalars["Int"]["input"]>;
  search?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type Translations_Translations_Aggregated = {
  __typename?: "translations_translations_aggregated";
  avg?: Maybe<Translations_Translations_Aggregated_Fields>;
  avgDistinct?: Maybe<Translations_Translations_Aggregated_Fields>;
  count?: Maybe<Translations_Translations_Aggregated_Count>;
  countAll?: Maybe<Scalars["Int"]["output"]>;
  countDistinct?: Maybe<Translations_Translations_Aggregated_Count>;
  group?: Maybe<Scalars["JSON"]["output"]>;
  max?: Maybe<Translations_Translations_Aggregated_Fields>;
  min?: Maybe<Translations_Translations_Aggregated_Fields>;
  sum?: Maybe<Translations_Translations_Aggregated_Fields>;
  sumDistinct?: Maybe<Translations_Translations_Aggregated_Fields>;
};

export type Translations_Translations_Aggregated_Count = {
  __typename?: "translations_translations_aggregated_count";
  content?: Maybe<Scalars["Int"]["output"]>;
  id?: Maybe<Scalars["Int"]["output"]>;
  languages_language_code?: Maybe<Scalars["Int"]["output"]>;
  translations_id?: Maybe<Scalars["Int"]["output"]>;
};

export type Translations_Translations_Aggregated_Fields = {
  __typename?: "translations_translations_aggregated_fields";
  id?: Maybe<Scalars["Float"]["output"]>;
  translations_id?: Maybe<Scalars["Float"]["output"]>;
};

export type Translations_Translations_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Translations_Translations_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Translations_Translations_Filter>>>;
  content?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
  translations_id?: InputMaybe<Translations_Filter>;
};

export type Translations_Translations_Mutated = {
  __typename?: "translations_translations_mutated";
  data?: Maybe<Translations_Translations>;
  event?: Maybe<EventEnum>;
  key: Scalars["ID"]["output"];
};

export type Translations_Translations_Quantifier_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Translations_Translations_Filter>>>;
  _none?: InputMaybe<Translations_Translations_Filter>;
  _or?: InputMaybe<Array<InputMaybe<Translations_Translations_Filter>>>;
  _some?: InputMaybe<Translations_Translations_Filter>;
  content?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<Number_Filter_Operators>;
  languages_language_code?: InputMaybe<Languages_Filter>;
  translations_id?: InputMaybe<Translations_Filter>;
};

export type Update_Game_Category_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Game_Provider_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  provider_key?: InputMaybe<Scalars["ID"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  translations?: InputMaybe<
    Array<InputMaybe<Update_Game_Provider_Translations_Input>>
  >;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Game_Provider_Translations_Input = {
  Game_Provider_provider_key?: InputMaybe<Update_Game_Provider_Input>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Update_Languages_Input>;
};

export type Update_Game_Countries_Input = {
  Game_id?: InputMaybe<Update_Game_Input>;
  countries_country_code?: InputMaybe<Update_Countries_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Update_Game_Currencies_Input = {
  Game_id?: InputMaybe<Update_Game_Input>;
  currencies_currency_code?: InputMaybe<Update_Currencies_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Update_Game_Input = {
  currencies?: InputMaybe<Array<InputMaybe<Update_Game_Currencies_Input>>>;
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  default_image?: InputMaybe<Update_Directus_Files_Input>;
  default_rtp?: InputMaybe<Scalars["String"]["input"]>;
  game_id?: InputMaybe<Scalars["String"]["input"]>;
  game_type?: InputMaybe<Scalars["String"]["input"]>;
  groove_category?: InputMaybe<Scalars["String"]["input"]>;
  hit_frequency?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
  jackpot_type?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  languages?: InputMaybe<Array<InputMaybe<Update_Game_Languages_Input>>>;
  max_bet?: InputMaybe<Scalars["String"]["input"]>;
  max_exposure?: InputMaybe<Scalars["String"]["input"]>;
  min_bet?: InputMaybe<Scalars["String"]["input"]>;
  payouts?: InputMaybe<Scalars["String"]["input"]>;
  payouts_type?: InputMaybe<Scalars["String"]["input"]>;
  platforms?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  provider?: InputMaybe<Update_Game_Provider_Input>;
  restricted_countries?: InputMaybe<
    Array<InputMaybe<Update_Game_Countries_Input>>
  >;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  support_frb?: InputMaybe<Scalars["Boolean"]["input"]>;
  support_jackpot?: InputMaybe<Scalars["Boolean"]["input"]>;
  supported_regulations?: InputMaybe<
    Array<InputMaybe<Update_Game_Regulations_Input>>
  >;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
  volatility?: InputMaybe<Scalars["String"]["input"]>;
};

export type Update_Game_Languages_Input = {
  Game_id?: InputMaybe<Update_Game_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Update_Languages_Input>;
};

export type Update_Game_Regulations_Input = {
  Game_id?: InputMaybe<Update_Game_Input>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  regulations_internal_name?: InputMaybe<Update_Regulations_Input>;
};

export type Update_Countries_Input = {
  country_code?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Update_Currencies_Input = {
  currency_code?: InputMaybe<Scalars["ID"]["input"]>;
  internal_name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Update_Directus_Access_Input = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
  user?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Directus_Files_Input = {
  charset?: InputMaybe<Scalars["String"]["input"]>;
  created_on?: InputMaybe<Scalars["Date"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  duration?: InputMaybe<Scalars["Int"]["input"]>;
  embed?: InputMaybe<Scalars["String"]["input"]>;
  filename_disk?: InputMaybe<Scalars["String"]["input"]>;
  filename_download?: InputMaybe<Scalars["String"]["input"]>;
  filesize?: InputMaybe<Scalars["GraphQLBigInt"]["input"]>;
  focal_point_x?: InputMaybe<Scalars["Int"]["input"]>;
  focal_point_y?: InputMaybe<Scalars["Int"]["input"]>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  metadata?: InputMaybe<Scalars["JSON"]["input"]>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars["Date"]["input"]>;
  storage?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Scalars["JSON"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  tus_data?: InputMaybe<Scalars["JSON"]["input"]>;
  tus_id?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars["Date"]["input"]>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Permissions_Input = {
  action?: InputMaybe<Scalars["String"]["input"]>;
  collection?: InputMaybe<Scalars["String"]["input"]>;
  fields?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  permissions?: InputMaybe<Scalars["JSON"]["input"]>;
  policy?: InputMaybe<Update_Directus_Policies_Input>;
  presets?: InputMaybe<Scalars["JSON"]["input"]>;
  validation?: InputMaybe<Scalars["JSON"]["input"]>;
};

export type Update_Directus_Policies_Input = {
  admin_access?: InputMaybe<Scalars["Boolean"]["input"]>;
  app_access?: InputMaybe<Scalars["Boolean"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  /** $t:field_options.directus_policies.enforce_tfa */
  enforce_tfa?: InputMaybe<Scalars["Boolean"]["input"]>;
  icon?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  permissions?: InputMaybe<
    Array<InputMaybe<Update_Directus_Permissions_Input>>
  >;
  roles?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
};

export type Update_Directus_Roles_Input = {
  children?: InputMaybe<Array<InputMaybe<Update_Directus_Roles_Input>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  icon?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  parent?: InputMaybe<Update_Directus_Roles_Input>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Directus_Users_Input = {
  appearance?: InputMaybe<Scalars["String"]["input"]>;
  auth_data?: InputMaybe<Scalars["JSON"]["input"]>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  email_notifications?: InputMaybe<Scalars["Boolean"]["input"]>;
  external_identifier?: InputMaybe<Scalars["String"]["input"]>;
  first_name?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  language?: InputMaybe<Scalars["String"]["input"]>;
  last_access?: InputMaybe<Scalars["Date"]["input"]>;
  last_name?: InputMaybe<Scalars["String"]["input"]>;
  last_page?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["Hash"]["input"]>;
  policies?: InputMaybe<Array<InputMaybe<Update_Directus_Access_Input>>>;
  provider?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Scalars["JSON"]["input"]>;
  text_direction?: InputMaybe<Scalars["String"]["input"]>;
  tfa_secret?: InputMaybe<Scalars["Hash"]["input"]>;
  theme_dark?: InputMaybe<Scalars["String"]["input"]>;
  theme_dark_overrides?: InputMaybe<Scalars["JSON"]["input"]>;
  theme_light?: InputMaybe<Scalars["String"]["input"]>;
  theme_light_overrides?: InputMaybe<Scalars["JSON"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  token?: InputMaybe<Scalars["Hash"]["input"]>;
};

export type Update_Languages_Input = {
  direction?: InputMaybe<Scalars["String"]["input"]>;
  display_name?: InputMaybe<Scalars["String"]["input"]>;
  language_code?: InputMaybe<Scalars["ID"]["input"]>;
  sort?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Update_Regulations_Input = {
  internal_name?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Update_Translations_Input = {
  date_created?: InputMaybe<Scalars["Date"]["input"]>;
  date_updated?: InputMaybe<Scalars["Date"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  translations?: InputMaybe<
    Array<InputMaybe<Update_Translations_Translations_Input>>
  >;
  translations_key?: InputMaybe<Scalars["String"]["input"]>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Translations_Translations_Input = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
  languages_language_code?: InputMaybe<Update_Languages_Input>;
  translations_id?: InputMaybe<Update_Translations_Input>;
};

export type Version_Game = {
  __typename?: "version_Game";
  currencies?: Maybe<Scalars["JSON"]["output"]>;
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  default_image?: Maybe<Scalars["JSON"]["output"]>;
  default_rtp?: Maybe<Scalars["String"]["output"]>;
  game_id?: Maybe<Scalars["String"]["output"]>;
  game_type?: Maybe<Scalars["String"]["output"]>;
  groove_category?: Maybe<Scalars["String"]["output"]>;
  hit_frequency?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
  jackpot_type?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  languages?: Maybe<Scalars["JSON"]["output"]>;
  max_bet?: Maybe<Scalars["String"]["output"]>;
  max_exposure?: Maybe<Scalars["String"]["output"]>;
  min_bet?: Maybe<Scalars["String"]["output"]>;
  payouts?: Maybe<Scalars["String"]["output"]>;
  payouts_type?: Maybe<Scalars["String"]["output"]>;
  platforms?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
  provider?: Maybe<Scalars["JSON"]["output"]>;
  restricted_countries?: Maybe<Scalars["JSON"]["output"]>;
  slug?: Maybe<Scalars["String"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  support_frb?: Maybe<Scalars["Boolean"]["output"]>;
  support_jackpot?: Maybe<Scalars["Boolean"]["output"]>;
  supported_regulations?: Maybe<Scalars["JSON"]["output"]>;
  user_created?: Maybe<Scalars["JSON"]["output"]>;
  user_updated?: Maybe<Scalars["JSON"]["output"]>;
  volatility?: Maybe<Scalars["String"]["output"]>;
};

export type Version_Game_Category = {
  __typename?: "version_Game_Category";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Scalars["JSON"]["output"]>;
  user_updated?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Game_Provider = {
  __typename?: "version_Game_Provider";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
  provider_key?: Maybe<Scalars["ID"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  translations?: Maybe<Scalars["JSON"]["output"]>;
  user_created?: Maybe<Scalars["JSON"]["output"]>;
  user_updated?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Game_Provider_Translations = {
  __typename?: "version_Game_Provider_translations";
  Game_Provider_provider_key?: Maybe<Scalars["JSON"]["output"]>;
  display_name?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  languages_language_code?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Game_Countries = {
  __typename?: "version_Game_countries";
  Game_id?: Maybe<Scalars["JSON"]["output"]>;
  countries_country_code?: Maybe<Scalars["JSON"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type Version_Game_Currencies = {
  __typename?: "version_Game_currencies";
  Game_id?: Maybe<Scalars["JSON"]["output"]>;
  currencies_currency_code?: Maybe<Scalars["JSON"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
};

export type Version_Game_Languages = {
  __typename?: "version_Game_languages";
  Game_id?: Maybe<Scalars["JSON"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  languages_language_code?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Game_Regulations = {
  __typename?: "version_Game_regulations";
  Game_id?: Maybe<Scalars["JSON"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  regulations_internal_name?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Countries = {
  __typename?: "version_countries";
  country_code?: Maybe<Scalars["ID"]["output"]>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
};

export type Version_Currencies = {
  __typename?: "version_currencies";
  currency_code?: Maybe<Scalars["ID"]["output"]>;
  internal_name?: Maybe<Scalars["String"]["output"]>;
};

export type Version_Languages = {
  __typename?: "version_languages";
  direction?: Maybe<Scalars["String"]["output"]>;
  display_name?: Maybe<Scalars["String"]["output"]>;
  language_code?: Maybe<Scalars["ID"]["output"]>;
  sort?: Maybe<Scalars["Int"]["output"]>;
};

export type Version_Regulations = {
  __typename?: "version_regulations";
  internal_name?: Maybe<Scalars["ID"]["output"]>;
};

export type Version_Translations = {
  __typename?: "version_translations";
  date_created?: Maybe<Scalars["Date"]["output"]>;
  date_updated?: Maybe<Scalars["Date"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  translations?: Maybe<Scalars["JSON"]["output"]>;
  translations_key?: Maybe<Scalars["String"]["output"]>;
  user_created?: Maybe<Scalars["JSON"]["output"]>;
  user_updated?: Maybe<Scalars["JSON"]["output"]>;
};

export type Version_Translations_Translations = {
  __typename?: "version_translations_translations";
  content?: Maybe<Scalars["String"]["output"]>;
  id?: Maybe<Scalars["ID"]["output"]>;
  languages_language_code?: Maybe<Scalars["JSON"]["output"]>;
  translations_id?: Maybe<Scalars["JSON"]["output"]>;
};

export type TranslationsGetQueryVariables = Exact<{
  language: Scalars["String"]["input"];
}>;

export type TranslationsGetQuery = {
  __typename?: "Query";
  translations: Array<{
    __typename?: "translations";
    translations_key?: string | null;
    translations?: Array<{
      __typename?: "translations_translations";
      content?: string | null;
    } | null> | null;
  }>;
};

export const TranslationsGetDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TranslationsGet" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "language" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "filter" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "translations" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "languages_language_code",
                            },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "language_code",
                                  },
                                  value: {
                                    kind: "ObjectValue",
                                    fields: [
                                      {
                                        kind: "ObjectField",
                                        name: { kind: "Name", value: "_eq" },
                                        value: {
                                          kind: "Variable",
                                          name: {
                                            kind: "Name",
                                            value: "language",
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations_key" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "filter" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "languages_language_code",
                            },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "language_code",
                                  },
                                  value: {
                                    kind: "ObjectValue",
                                    fields: [
                                      {
                                        kind: "ObjectField",
                                        name: { kind: "Name", value: "_eq" },
                                        value: {
                                          kind: "Variable",
                                          name: {
                                            kind: "Name",
                                            value: "language",
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TranslationsGetQuery,
  TranslationsGetQueryVariables
>;
