import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

/** The Buildings Model */
export type Building = {
  __typename?: 'Building';
  buildingCost: BuildingCost;
  buildingId: Scalars['Int'];
  buildingName: Scalars['String'];
  builds: Array<Scalars['String']>;
  count: Scalars['Int'];
  culture: Scalars['Int'];
  food: Scalars['Int'];
  limit?: Maybe<Scalars['Float']>;
  limitTraitId: Scalars['Int'];
  limitTraitName: Scalars['String'];
  population: Scalars['Int'];
  realmId: Scalars['Float'];
};

/** Building Cost Model */
export type BuildingCost = {
  __typename?: 'BuildingCost';
  amount: Scalars['Float'];
  buildingId: Scalars['Int'];
  buildingName: Scalars['String'];
  resources: Scalars['JSON'];
};

export type BuildingListRelationFilter = {
  every?: InputMaybe<BuildingWhereInput>;
  none?: InputMaybe<BuildingWhereInput>;
  some?: InputMaybe<BuildingWhereInput>;
};

export type BuildingWhereInput = {
  AND?: InputMaybe<Array<BuildingWhereInput>>;
  NOT?: InputMaybe<Array<BuildingWhereInput>>;
  OR?: InputMaybe<Array<BuildingWhereInput>>;
  buildingId?: InputMaybe<IntFilter>;
  builds?: InputMaybe<StringNullableListFilter>;
  eventId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  realm?: InputMaybe<RealmRelationFilter>;
  realmId?: InputMaybe<IntNullableFilter>;
};

/** The Combat History Model */
export type CombatHistory = {
  __typename?: 'CombatHistory';
  attackRealmId: Scalars['Int'];
  attackRealmOwner?: Maybe<Scalars['String']>;
  attackSquad?: Maybe<Scalars['JSON']>;
  attackType?: Maybe<Scalars['Int']>;
  defendRealmId: Scalars['Int'];
  defendRealmOwner?: Maybe<Scalars['String']>;
  defendSquad?: Maybe<Scalars['JSON']>;
  eventId: Scalars['String'];
  eventType: Scalars['String'];
  hitPoints?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  outcome?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['Timestamp']>;
  transactionHash?: Maybe<Scalars['String']>;
};

/** The CombatResult Model */
export type CombatResult = {
  __typename?: 'CombatResult';
  attackRealmId: Scalars['Int'];
  defendRealmId: Scalars['Int'];
  history?: Maybe<Array<CombatHistory>>;
  outcome?: Maybe<Scalars['Int']>;
  resourcesPillaged?: Maybe<Array<ResourceAmount>>;
  timestamp?: Maybe<Scalars['Timestamp']>;
  transactionHash: Scalars['String'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['Timestamp']>;
  gt?: InputMaybe<Scalars['Timestamp']>;
  gte?: InputMaybe<Scalars['Timestamp']>;
  in?: InputMaybe<Array<Scalars['Timestamp']>>;
  lt?: InputMaybe<Scalars['Timestamp']>;
  lte?: InputMaybe<Scalars['Timestamp']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Timestamp']>;
  gt?: InputMaybe<Scalars['Timestamp']>;
  gte?: InputMaybe<Scalars['Timestamp']>;
  in?: InputMaybe<Array<Scalars['Timestamp']>>;
  lt?: InputMaybe<Scalars['Timestamp']>;
  lte?: InputMaybe<Scalars['Timestamp']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']>>;
};

/** The Desiege Model */
export type Desiege = {
  __typename?: 'Desiege';
  attackedTokens: Scalars['Int'];
  defendedTokens: Scalars['Int'];
  endBlock: Scalars['Int'];
  eventIndexed: Scalars['Float'];
  gameId: Scalars['Int'];
  id: Scalars['ID'];
  initialHealth: Scalars['Int'];
  startBlock: Scalars['Int'];
  startedOn: Scalars['Timestamp'];
  winner: Scalars['Int'];
};

export type EnumOrderTypeNullableFilter = {
  equals?: InputMaybe<OrderType>;
  in?: InputMaybe<Array<OrderType>>;
  not?: InputMaybe<NestedEnumOrderTypeNullableFilter>;
  notIn?: InputMaybe<Array<OrderType>>;
};

export type EnumRealmTraitTypeFilter = {
  equals?: InputMaybe<RealmTraitType>;
  in?: InputMaybe<Array<RealmTraitType>>;
  not?: InputMaybe<NestedEnumRealmTraitTypeFilter>;
  notIn?: InputMaybe<Array<RealmTraitType>>;
};

/** Exchange Rate */
export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  amount: Scalars['String'];
  buyAmount: Scalars['String'];
  date: Scalars['String'];
  hour: Scalars['Int'];
  percentChange24Hr?: Maybe<Scalars['Float']>;
  sellAmount: Scalars['String'];
  tokenId: Scalars['Int'];
  tokenName: Scalars['String'];
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type JsonFilter = {
  equals?: InputMaybe<Scalars['JSON']>;
  not?: InputMaybe<Scalars['JSON']>;
};

/** Lore Entity */
export type LoreEntity = {
  __typename?: 'LoreEntity';
  id: Scalars['ID'];
  kind: Scalars['Float'];
  owner: Scalars['String'];
  revisions: Array<LoreEntityRevision>;
};

export type LoreEntityRelationFilter = {
  is?: InputMaybe<LoreEntityWhereInput>;
  isNot?: InputMaybe<LoreEntityWhereInput>;
};

/** Lore Entity Revision */
export type LoreEntityRevision = {
  __typename?: 'LoreEntityRevision';
  createdAt: Scalars['Timestamp'];
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  markdown?: Maybe<Scalars['String']>;
  pois: Array<LorePoisOnEntityRevisions>;
  props: Array<LorePropsOnEntityRevisions>;
  revisionNumber: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
};

export type LoreEntityRevisionListRelationFilter = {
  every?: InputMaybe<LoreEntityRevisionWhereInput>;
  none?: InputMaybe<LoreEntityRevisionWhereInput>;
  some?: InputMaybe<LoreEntityRevisionWhereInput>;
};

export type LoreEntityRevisionRelationFilter = {
  is?: InputMaybe<LoreEntityRevisionWhereInput>;
  isNot?: InputMaybe<LoreEntityRevisionWhereInput>;
};

export type LoreEntityRevisionWhereInput = {
  AND?: InputMaybe<Array<LoreEntityRevisionWhereInput>>;
  NOT?: InputMaybe<Array<LoreEntityRevisionWhereInput>>;
  OR?: InputMaybe<Array<LoreEntityRevisionWhereInput>>;
  arweaveId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  entity?: InputMaybe<LoreEntityRelationFilter>;
  entityId?: InputMaybe<IntFilter>;
  eventIndexed?: InputMaybe<StringNullableFilter>;
  excerpt?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  markdown?: InputMaybe<StringNullableFilter>;
  media_url?: InputMaybe<StringNullableFilter>;
  pois?: InputMaybe<LorePoisOnEntityRevisionsListRelationFilter>;
  props?: InputMaybe<LorePropsOnEntityRevisionsListRelationFilter>;
  revisionNumber?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringNullableFilter>;
};

export type LoreEntityWhereInput = {
  AND?: InputMaybe<Array<LoreEntityWhereInput>>;
  NOT?: InputMaybe<Array<LoreEntityWhereInput>>;
  OR?: InputMaybe<Array<LoreEntityWhereInput>>;
  eventIndexed?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  kind?: InputMaybe<IntFilter>;
  owner?: InputMaybe<StringNullableFilter>;
  revisions?: InputMaybe<LoreEntityRevisionListRelationFilter>;
};

export type LorePoiRelationFilter = {
  is?: InputMaybe<LorePoiWhereInput>;
  isNot?: InputMaybe<LorePoiWhereInput>;
};

export type LorePoiWhereInput = {
  AND?: InputMaybe<Array<LorePoiWhereInput>>;
  NOT?: InputMaybe<Array<LorePoiWhereInput>>;
  OR?: InputMaybe<Array<LorePoiWhereInput>>;
  assetType?: InputMaybe<StringNullableFilter>;
  entities?: InputMaybe<LorePoisOnEntityRevisionsListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

/** Lore POI */
export type LorePoi = {
  __typename?: 'LorePoi';
  assetType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Lore Entity Revision */
export type LorePoisOnEntityRevisions = {
  __typename?: 'LorePoisOnEntityRevisions';
  assetId?: Maybe<Scalars['String']>;
  entityRevisionId: Scalars['ID'];
  poiId: Scalars['ID'];
};

export type LorePoisOnEntityRevisionsListRelationFilter = {
  every?: InputMaybe<LorePoisOnEntityRevisionsWhereInput>;
  none?: InputMaybe<LorePoisOnEntityRevisionsWhereInput>;
  some?: InputMaybe<LorePoisOnEntityRevisionsWhereInput>;
};

export type LorePoisOnEntityRevisionsWhereInput = {
  AND?: InputMaybe<Array<LorePoisOnEntityRevisionsWhereInput>>;
  NOT?: InputMaybe<Array<LorePoisOnEntityRevisionsWhereInput>>;
  OR?: InputMaybe<Array<LorePoisOnEntityRevisionsWhereInput>>;
  assetId?: InputMaybe<StringNullableFilter>;
  entityRevision?: InputMaybe<LoreEntityRevisionRelationFilter>;
  entityRevisionId?: InputMaybe<IntFilter>;
  poi?: InputMaybe<LorePoiRelationFilter>;
  poiId?: InputMaybe<IntFilter>;
};

export type LorePropRelationFilter = {
  is?: InputMaybe<LorePropWhereInput>;
  isNot?: InputMaybe<LorePropWhereInput>;
};

export type LorePropWhereInput = {
  AND?: InputMaybe<Array<LorePropWhereInput>>;
  NOT?: InputMaybe<Array<LorePropWhereInput>>;
  OR?: InputMaybe<Array<LorePropWhereInput>>;
  entities?: InputMaybe<LorePropsOnEntityRevisionsListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
};

/** Lore Entity Revision */
export type LorePropsOnEntityRevisions = {
  __typename?: 'LorePropsOnEntityRevisions';
  entityRevisionId: Scalars['ID'];
  propId: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
};

export type LorePropsOnEntityRevisionsListRelationFilter = {
  every?: InputMaybe<LorePropsOnEntityRevisionsWhereInput>;
  none?: InputMaybe<LorePropsOnEntityRevisionsWhereInput>;
  some?: InputMaybe<LorePropsOnEntityRevisionsWhereInput>;
};

export type LorePropsOnEntityRevisionsWhereInput = {
  AND?: InputMaybe<Array<LorePropsOnEntityRevisionsWhereInput>>;
  NOT?: InputMaybe<Array<LorePropsOnEntityRevisionsWhereInput>>;
  OR?: InputMaybe<Array<LorePropsOnEntityRevisionsWhereInput>>;
  entityRevision?: InputMaybe<LoreEntityRevisionRelationFilter>;
  entityRevisionId?: InputMaybe<IntFilter>;
  prop?: InputMaybe<LorePropRelationFilter>;
  propId?: InputMaybe<IntFilter>;
  value?: InputMaybe<StringNullableFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrUpdateResources: Resource;
  reindexDesiege: Scalars['Boolean'];
};

export type MutationCreateOrUpdateResourcesArgs = {
  data: ResourceInput;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['Timestamp']>;
  gt?: InputMaybe<Scalars['Timestamp']>;
  gte?: InputMaybe<Scalars['Timestamp']>;
  in?: InputMaybe<Array<Scalars['Timestamp']>>;
  lt?: InputMaybe<Scalars['Timestamp']>;
  lte?: InputMaybe<Scalars['Timestamp']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['Timestamp']>;
  gt?: InputMaybe<Scalars['Timestamp']>;
  gte?: InputMaybe<Scalars['Timestamp']>;
  in?: InputMaybe<Array<Scalars['Timestamp']>>;
  lt?: InputMaybe<Scalars['Timestamp']>;
  lte?: InputMaybe<Scalars['Timestamp']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Timestamp']>>;
};

export type NestedEnumOrderTypeNullableFilter = {
  equals?: InputMaybe<OrderType>;
  in?: InputMaybe<Array<OrderType>>;
  not?: InputMaybe<NestedEnumOrderTypeNullableFilter>;
  notIn?: InputMaybe<Array<OrderType>>;
};

export type NestedEnumRealmTraitTypeFilter = {
  equals?: InputMaybe<RealmTraitType>;
  in?: InputMaybe<Array<RealmTraitType>>;
  not?: InputMaybe<NestedEnumRealmTraitTypeFilter>;
  notIn?: InputMaybe<Array<RealmTraitType>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

/** Order By Direction */
export enum OrderByDirectionInput {
  Asc = 'asc',
  Desc = 'desc',
}

export enum OrderType {
  Anger = 'Anger',
  Brilliance = 'Brilliance',
  Detection = 'Detection',
  Enlightenment = 'Enlightenment',
  Fury = 'Fury',
  Giants = 'Giants',
  Perfection = 'Perfection',
  Power = 'Power',
  Protection = 'Protection',
  Rage = 'Rage',
  Reflection = 'Reflection',
  Skill = 'Skill',
  Titans = 'Titans',
  Vitriol = 'Vitriol',
  TheFox = 'the_Fox',
  TheTwins = 'the_Twins',
}

export type Query = {
  __typename?: 'Query';
  getBuildingCostById: BuildingCost;
  getBuildingCosts: Array<BuildingCost>;
  getBuildingsByRealmId: Array<Building>;
  getDesiege: Desiege;
  getDesiegeCurrent: Desiege;
  getDesiegeGames: Array<Desiege>;
  getExchangeRates: Array<ExchangeRate>;
  getLoreEntities: Array<LoreEntity>;
  getLoreEntity: LoreEntity;
  getLorePois: Array<LorePoi>;
  getRealm: Realm;
  getRealmCombatResult: CombatResult;
  getRealmHistory: Array<RealmHistory>;
  getRealms: Array<Realm>;
  getResource: Resource;
  getResources: Array<Resource>;
  getResourcesByAddress: Array<Resource>;
  getTroopStats: Array<TroopStats>;
  getWallet: Wallet;
  realmHistory: Array<RealmHistory>;
  realmsCount: Scalars['Int'];
};

export type QueryGetBuildingsByRealmIdArgs = {
  id: Scalars['Float'];
};

export type QueryGetDesiegeArgs = {
  id: Scalars['Float'];
};

export type QueryGetLoreEntitiesArgs = {
  filter?: InputMaybe<LoreEntityWhereInput>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryGetLoreEntityArgs = {
  entityId: Scalars['Float'];
};

export type QueryGetLorePoisArgs = {
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryGetRealmArgs = {
  realmId: Scalars['Float'];
};

export type QueryGetRealmCombatResultArgs = {
  defendRealmId: Scalars['Float'];
  transactionHash: Scalars['String'];
};

export type QueryGetRealmHistoryArgs = {
  filter?: InputMaybe<RealmHistoryWhereInput>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryGetRealmsArgs = {
  filter?: InputMaybe<RealmWhereInput>;
  orderBy?: InputMaybe<RealmOrderByInput>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryGetResourceArgs = {
  id: Scalars['Float'];
};

export type QueryGetResourcesByAddressArgs = {
  address: Scalars['String'];
};

export type QueryGetWalletArgs = {
  address: Scalars['String'];
};

export type QueryRealmHistoryArgs = {
  filter?: InputMaybe<RealmHistoryWhereInput>;
  skip?: InputMaybe<Scalars['Float']>;
  take?: InputMaybe<Scalars['Float']>;
};

export type QueryRealmsCountArgs = {
  filter?: InputMaybe<RealmWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive',
}

/** The Realm Model */
export type Realm = {
  __typename?: 'Realm';
  bridgedOwner?: Maybe<Scalars['String']>;
  buildings?: Maybe<Array<Building>>;
  defendTroopIds: Array<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  lastAttacked?: Maybe<Scalars['Timestamp']>;
  name?: Maybe<Scalars['String']>;
  orderType: Scalars['String'];
  owner?: Maybe<Scalars['String']>;
  ownerL2?: Maybe<Scalars['String']>;
  rarityRank: Scalars['Int'];
  rarityScore: Scalars['Float'];
  realmId: Scalars['Int'];
  resources?: Maybe<Array<Resource>>;
  settledOwner?: Maybe<Scalars['String']>;
  squad: Array<Troop>;
  traits?: Maybe<Array<RealmTrait>>;
  wallet?: Maybe<Wallet>;
  wonder?: Maybe<Scalars['String']>;
};

/** The Realm History Model */
export type RealmHistory = {
  __typename?: 'RealmHistory';
  data?: Maybe<Scalars['JSON']>;
  eventId?: Maybe<Scalars['String']>;
  eventType?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  realm?: Maybe<Realm>;
  realmId: Scalars['Int'];
  realmName?: Maybe<Scalars['String']>;
  realmOrder?: Maybe<Scalars['String']>;
  realmOwner?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['Timestamp']>;
  transactionHash?: Maybe<Scalars['String']>;
};

export type RealmHistoryWhereInput = {
  AND?: InputMaybe<Array<RealmHistoryWhereInput>>;
  NOT?: InputMaybe<Array<RealmHistoryWhereInput>>;
  OR?: InputMaybe<Array<RealmHistoryWhereInput>>;
  data?: InputMaybe<JsonFilter>;
  eventId?: InputMaybe<StringFilter>;
  eventType?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  realmId?: InputMaybe<IntFilter>;
  realmName?: InputMaybe<StringFilter>;
  realmOrder?: InputMaybe<EnumOrderTypeNullableFilter>;
  realmOwner?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  transactionHash?: InputMaybe<StringFilter>;
};

export type RealmListRelationFilter = {
  every?: InputMaybe<RealmWhereInput>;
  none?: InputMaybe<RealmWhereInput>;
  some?: InputMaybe<RealmWhereInput>;
};

export type RealmOrderByInput = {
  rarityRank?: InputMaybe<OrderByDirectionInput>;
  rarityScore?: InputMaybe<OrderByDirectionInput>;
  realmId?: InputMaybe<OrderByDirectionInput>;
};

export type RealmRelationFilter = {
  is?: InputMaybe<RealmWhereInput>;
  isNot?: InputMaybe<RealmWhereInput>;
};

/** Realm Trait Model */
export type RealmTrait = {
  __typename?: 'RealmTrait';
  id: Scalars['ID'];
  qty: Scalars['Float'];
  realm?: Maybe<Realm>;
  realmId: Scalars['Float'];
  type: Scalars['String'];
};

export type RealmTraitListRelationFilter = {
  every?: InputMaybe<RealmTraitWhereInput>;
  none?: InputMaybe<RealmTraitWhereInput>;
  some?: InputMaybe<RealmTraitWhereInput>;
};

export enum RealmTraitType {
  City = 'City',
  Harbor = 'Harbor',
  Region = 'Region',
  River = 'River',
}

export type RealmTraitWhereInput = {
  AND?: InputMaybe<Array<RealmTraitWhereInput>>;
  NOT?: InputMaybe<Array<RealmTraitWhereInput>>;
  OR?: InputMaybe<Array<RealmTraitWhereInput>>;
  qty?: InputMaybe<IntFilter>;
  realm?: InputMaybe<RealmRelationFilter>;
  realmId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumRealmTraitTypeFilter>;
};

export type RealmWhereInput = {
  AND?: InputMaybe<Array<RealmWhereInput>>;
  NOT?: InputMaybe<Array<RealmWhereInput>>;
  OR?: InputMaybe<Array<RealmWhereInput>>;
  bridgedOwner?: InputMaybe<StringNullableFilter>;
  buildings?: InputMaybe<BuildingListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  imageUrl?: InputMaybe<StringFilter>;
  lastAttacked?: InputMaybe<DateTimeNullableFilter>;
  name?: InputMaybe<StringNullableFilter>;
  orderType?: InputMaybe<EnumOrderTypeNullableFilter>;
  owner?: InputMaybe<StringNullableFilter>;
  ownerL2?: InputMaybe<StringNullableFilter>;
  rarityRank?: InputMaybe<IntFilter>;
  rarityScore?: InputMaybe<FloatFilter>;
  realmId?: InputMaybe<IntFilter>;
  resources?: InputMaybe<ResourceListRelationFilter>;
  settledOwner?: InputMaybe<StringNullableFilter>;
  squad?: InputMaybe<TroopListRelationFilter>;
  traits?: InputMaybe<RealmTraitListRelationFilter>;
  wallet?: InputMaybe<WalletRelationFilter>;
  wonder?: InputMaybe<StringNullableFilter>;
};

/** The Resource Model */
export type Resource = {
  __typename?: 'Resource';
  id: Scalars['ID'];
  level: Scalars['Int'];
  realm: Realm;
  realmId?: Maybe<Scalars['Float']>;
  resourceId: Scalars['Int'];
  resourceName: Scalars['String'];
  upgrades: Array<Scalars['String']>;
};

/** The Token Amount Model */
export type ResourceAmount = {
  __typename?: 'ResourceAmount';
  amount: Scalars['String'];
  resourceId: Scalars['Int'];
  resourceName: Scalars['String'];
};

export type ResourceInput = {
  id?: InputMaybe<Scalars['ID']>;
  realmId: Scalars['Float'];
  resourceId: Scalars['Int'];
};

export type ResourceListRelationFilter = {
  every?: InputMaybe<ResourceWhereInput>;
  none?: InputMaybe<ResourceWhereInput>;
  some?: InputMaybe<ResourceWhereInput>;
};

export type ResourceTokenListRelationFilter = {
  every?: InputMaybe<ResourceTokenWhereInput>;
  none?: InputMaybe<ResourceTokenWhereInput>;
  some?: InputMaybe<ResourceTokenWhereInput>;
};

export type ResourceTokenWhereInput = {
  AND?: InputMaybe<Array<ResourceTokenWhereInput>>;
  NOT?: InputMaybe<Array<ResourceTokenWhereInput>>;
  OR?: InputMaybe<Array<ResourceTokenWhereInput>>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  qty?: InputMaybe<IntFilter>;
  resourceId?: InputMaybe<IntFilter>;
  wallet?: InputMaybe<WalletRelationFilter>;
};

export type ResourceWhereInput = {
  AND?: InputMaybe<Array<ResourceWhereInput>>;
  NOT?: InputMaybe<Array<ResourceWhereInput>>;
  OR?: InputMaybe<Array<ResourceWhereInput>>;
  id?: InputMaybe<IntFilter>;
  level?: InputMaybe<IntFilter>;
  realm?: InputMaybe<RealmRelationFilter>;
  realmId?: InputMaybe<IntNullableFilter>;
  resourceId?: InputMaybe<IntFilter>;
  upgrades?: InputMaybe<StringNullableListFilter>;
};

export type SRealmListRelationFilter = {
  every?: InputMaybe<SRealmWhereInput>;
  none?: InputMaybe<SRealmWhereInput>;
  some?: InputMaybe<SRealmWhereInput>;
};

export type SRealmWhereInput = {
  AND?: InputMaybe<Array<SRealmWhereInput>>;
  NOT?: InputMaybe<Array<SRealmWhereInput>>;
  OR?: InputMaybe<Array<SRealmWhereInput>>;
  id?: InputMaybe<IntFilter>;
  owner?: InputMaybe<StringNullableFilter>;
  realmId?: InputMaybe<IntFilter>;
  wallet?: InputMaybe<WalletRelationFilter>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

/** Troop */
export type Troop = {
  __typename?: 'Troop';
  agility: Scalars['Int'];
  attack: Scalars['Int'];
  defense: Scalars['Int'];
  index: Scalars['Int'];
  realmId: Scalars['Int'];
  squadSlot: Scalars['Int'];
  tier: Scalars['Int'];
  troopCost?: Maybe<TroopCost>;
  troopId: Scalars['Int'];
  troopName: Scalars['String'];
  type: Scalars['Int'];
  vitality: Scalars['Int'];
  wisdom: Scalars['Int'];
};

/** Troop Cost Model */
export type TroopCost = {
  __typename?: 'TroopCost';
  amount: Scalars['Float'];
  resources: Scalars['JSON'];
  troopId: Scalars['Int'];
  troopName: Scalars['String'];
};

export type TroopListRelationFilter = {
  every?: InputMaybe<TroopWhereInput>;
  none?: InputMaybe<TroopWhereInput>;
  some?: InputMaybe<TroopWhereInput>;
};

/** TroopStats */
export type TroopStats = {
  __typename?: 'TroopStats';
  agility: Scalars['Int'];
  attack: Scalars['Int'];
  defense: Scalars['Int'];
  tier: Scalars['Int'];
  troopCost?: Maybe<TroopCost>;
  troopId: Scalars['Int'];
  troopName: Scalars['String'];
  type: Scalars['Int'];
  vitality: Scalars['Int'];
  wisdom: Scalars['Int'];
};

export type TroopWhereInput = {
  AND?: InputMaybe<Array<TroopWhereInput>>;
  NOT?: InputMaybe<Array<TroopWhereInput>>;
  OR?: InputMaybe<Array<TroopWhereInput>>;
  Realm?: InputMaybe<RealmRelationFilter>;
  agility?: InputMaybe<IntFilter>;
  attack?: InputMaybe<IntFilter>;
  defense?: InputMaybe<IntFilter>;
  index?: InputMaybe<IntFilter>;
  realmId?: InputMaybe<IntFilter>;
  squadSlot?: InputMaybe<IntFilter>;
  tier?: InputMaybe<IntFilter>;
  troopId?: InputMaybe<IntFilter>;
  type?: InputMaybe<IntFilter>;
  vitality?: InputMaybe<IntFilter>;
  wisdom?: InputMaybe<IntFilter>;
};

/** The Wallet Model */
export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['String'];
  realmsBridgedHeld: Scalars['Int'];
  realmsL1Held: Scalars['Int'];
  realmsL2Held: Scalars['Int'];
  realmsSettledHeld: Scalars['Int'];
};

export type WalletRelationFilter = {
  is?: InputMaybe<WalletWhereInput>;
  isNot?: InputMaybe<WalletWhereInput>;
};

export type WalletWhereInput = {
  AND?: InputMaybe<Array<WalletWhereInput>>;
  NOT?: InputMaybe<Array<WalletWhereInput>>;
  OR?: InputMaybe<Array<WalletWhereInput>>;
  address?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  realms?: InputMaybe<RealmListRelationFilter>;
  sRealms?: InputMaybe<SRealmListRelationFilter>;
  tokens?: InputMaybe<ResourceTokenListRelationFilter>;
};

export type DesiegeFragmentFragment = {
  __typename?: 'Desiege';
  id: string;
  gameId: number;
  winner: number;
  attackedTokens: number;
  defendedTokens: number;
  eventIndexed: number;
  initialHealth: number;
  startedOn: any;
};

export type GetDesiegeQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetDesiegeQuery = {
  __typename?: 'Query';
  getDesiege: {
    __typename?: 'Desiege';
    id: string;
    gameId: number;
    winner: number;
    attackedTokens: number;
    defendedTokens: number;
    eventIndexed: number;
    initialHealth: number;
    startedOn: any;
  };
};

export type GetExchangeRatesQueryVariables = Exact<{ [key: string]: never }>;

export type GetExchangeRatesQuery = {
  __typename?: 'Query';
  getExchangeRates: Array<{
    __typename?: 'ExchangeRate';
    tokenId: number;
    tokenName: string;
    amount: string;
    buyAmount: string;
    sellAmount: string;
    percentChange24Hr?: number | null;
  }>;
};

export type GetLoreEntitiesQueryVariables = Exact<{
  filter?: InputMaybe<LoreEntityWhereInput>;
  take?: InputMaybe<Scalars['Float']>;
  skip?: InputMaybe<Scalars['Float']>;
}>;

export type GetLoreEntitiesQuery = {
  __typename?: 'Query';
  getLoreEntities: Array<{
    __typename?: 'LoreEntity';
    id: string;
    owner: string;
    kind: number;
    revisions: Array<{
      __typename?: 'LoreEntityRevision';
      revisionNumber: number;
      title?: string | null;
      excerpt?: string | null;
      createdAt: any;
    }>;
  }>;
};

export type GetLoreEntityQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetLoreEntityQuery = {
  __typename?: 'Query';
  getLoreEntity: {
    __typename?: 'LoreEntity';
    id: string;
    owner: string;
    kind: number;
    revisions: Array<{
      __typename?: 'LoreEntityRevision';
      markdown?: string | null;
      revisionNumber: number;
      title?: string | null;
      excerpt?: string | null;
      createdAt: any;
    }>;
  };
};

export type GetLorePoisQueryVariables = Exact<{
  take?: InputMaybe<Scalars['Float']>;
  skip?: InputMaybe<Scalars['Float']>;
}>;

export type GetLorePoisQuery = {
  __typename?: 'Query';
  getLorePois: Array<{
    __typename?: 'LorePoi';
    id: string;
    name: string;
    assetType?: string | null;
  }>;
};

export type LoreEntityFragmentFragment = {
  __typename?: 'LoreEntity';
  id: string;
  owner: string;
  kind: number;
  revisions: Array<{
    __typename?: 'LoreEntityRevision';
    revisionNumber: number;
    title?: string | null;
    excerpt?: string | null;
    createdAt: any;
  }>;
};

export type LorePoiFragmentFragment = {
  __typename?: 'LorePoi';
  id: string;
  name: string;
  assetType?: string | null;
};

export type GetAccountQueryVariables = Exact<{
  account: Scalars['String'];
}>;

export type GetAccountQuery = {
  __typename?: 'Query';
  ownedRealmsCount: number;
  settledRealmsCount: number;
  accountHistory: Array<{
    __typename?: 'RealmHistory';
    id: number;
    eventType?: string | null;
    realmId: number;
    realmOwner?: string | null;
    realmName?: string | null;
    realmOrder?: string | null;
    data?: any | null;
    timestamp?: any | null;
  }>;
};

export type GetRealmQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetRealmQuery = {
  __typename?: 'Query';
  getRealm: {
    __typename?: 'Realm';
    realmId: number;
    owner?: string | null;
    bridgedOwner?: string | null;
    ownerL2?: string | null;
    settledOwner?: string | null;
    name?: string | null;
    rarityRank: number;
    rarityScore: number;
    orderType: string;
    wonder?: string | null;
    lastAttacked?: any | null;
    resources?: Array<{
      __typename?: 'Resource';
      resourceId: number;
      resourceName: string;
      level: number;
      upgrades: Array<string>;
    }> | null;
    traits?: Array<{
      __typename?: 'RealmTrait';
      type: string;
      qty: number;
    }> | null;
    buildings?: Array<{
      __typename?: 'Building';
      buildingId: number;
      buildingName: string;
      count: number;
      population: number;
      culture: number;
      food: number;
      limitTraitId: number;
      limitTraitName: string;
    }> | null;
    squad: Array<{
      __typename?: 'Troop';
      realmId: number;
      troopId: number;
      troopName: string;
      index: number;
      type: number;
      tier: number;
      agility: number;
      attack: number;
      defense: number;
      vitality: number;
      wisdom: number;
      squadSlot: number;
    }>;
  };
};

export type GetBuildingsByRealmIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;

export type GetBuildingsByRealmIdQuery = {
  __typename?: 'Query';
  getBuildingsByRealmId: Array<{
    __typename?: 'Building';
    realmId: number;
    buildingId: number;
    buildingName: string;
    limit?: number | null;
    limitTraitId: number;
    limitTraitName: string;
    count: number;
    population: number;
    food: number;
    culture: number;
    buildingCost: {
      __typename?: 'BuildingCost';
      amount: number;
      resources: any;
    };
  }>;
};

export type GetRealmHistoryQueryVariables = Exact<{
  filter?: InputMaybe<RealmHistoryWhereInput>;
  take?: InputMaybe<Scalars['Float']>;
  skip?: InputMaybe<Scalars['Float']>;
}>;

export type GetRealmHistoryQuery = {
  __typename?: 'Query';
  getRealmHistory: Array<{
    __typename?: 'RealmHistory';
    id: number;
    eventType?: string | null;
    realmId: number;
    realmOwner?: string | null;
    data?: any | null;
    timestamp?: any | null;
    transactionHash?: string | null;
  }>;
};

export type GetRealmCombatResultQueryVariables = Exact<{
  defendRealmId: Scalars['Float'];
  transactionHash: Scalars['String'];
}>;

export type GetRealmCombatResultQuery = {
  __typename?: 'Query';
  getRealmCombatResult: {
    __typename?: 'CombatResult';
    defendRealmId: number;
    attackRealmId: number;
    transactionHash: string;
    outcome?: number | null;
    timestamp?: any | null;
    history?: Array<{
      __typename?: 'CombatHistory';
      eventType: string;
      attackSquad?: any | null;
      defendSquad?: any | null;
      outcome?: number | null;
      attackType?: number | null;
      hitPoints?: number | null;
      timestamp?: any | null;
    }> | null;
    resourcesPillaged?: Array<{
      __typename?: 'ResourceAmount';
      resourceId: number;
      resourceName: string;
      amount: string;
    }> | null;
  };
};

export type GetRealmsQueryVariables = Exact<{
  filter?: InputMaybe<RealmWhereInput>;
  orderBy?: InputMaybe<RealmOrderByInput>;
  take?: InputMaybe<Scalars['Float']>;
  skip?: InputMaybe<Scalars['Float']>;
}>;

export type GetRealmsQuery = {
  __typename?: 'Query';
  getRealms: Array<{
    __typename?: 'Realm';
    realmId: number;
    owner?: string | null;
    bridgedOwner?: string | null;
    ownerL2?: string | null;
    settledOwner?: string | null;
    name?: string | null;
    rarityRank: number;
    rarityScore: number;
    orderType: string;
    wonder?: string | null;
    lastAttacked?: any | null;
    resources?: Array<{
      __typename?: 'Resource';
      resourceId: number;
      resourceName: string;
      level: number;
      upgrades: Array<string>;
    }> | null;
    traits?: Array<{
      __typename?: 'RealmTrait';
      type: string;
      qty: number;
    }> | null;
    buildings?: Array<{
      __typename?: 'Building';
      buildingId: number;
      buildingName: string;
      count: number;
      population: number;
      culture: number;
      food: number;
      limitTraitId: number;
      limitTraitName: string;
    }> | null;
    squad: Array<{
      __typename?: 'Troop';
      realmId: number;
      troopId: number;
      troopName: string;
      index: number;
      type: number;
      tier: number;
      agility: number;
      attack: number;
      defense: number;
      vitality: number;
      wisdom: number;
      squadSlot: number;
    }>;
  }>;
};

export type GetTroopStatsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTroopStatsQuery = {
  __typename?: 'Query';
  getTroopStats: Array<{
    __typename?: 'TroopStats';
    troopId: number;
    troopName: string;
    type: number;
    tier: number;
    agility: number;
    attack: number;
    defense: number;
    vitality: number;
    wisdom: number;
    troopCost?: {
      __typename?: 'TroopCost';
      amount: number;
      resources: any;
    } | null;
  }>;
};

export type RealmFragmentFragment = {
  __typename?: 'Realm';
  realmId: number;
  owner?: string | null;
  bridgedOwner?: string | null;
  ownerL2?: string | null;
  settledOwner?: string | null;
  name?: string | null;
  rarityRank: number;
  rarityScore: number;
  orderType: string;
  wonder?: string | null;
  lastAttacked?: any | null;
  resources?: Array<{
    __typename?: 'Resource';
    resourceId: number;
    resourceName: string;
    level: number;
    upgrades: Array<string>;
  }> | null;
  traits?: Array<{
    __typename?: 'RealmTrait';
    type: string;
    qty: number;
  }> | null;
  buildings?: Array<{
    __typename?: 'Building';
    buildingId: number;
    buildingName: string;
    count: number;
    population: number;
    culture: number;
    food: number;
    limitTraitId: number;
    limitTraitName: string;
  }> | null;
  squad: Array<{
    __typename?: 'Troop';
    realmId: number;
    troopId: number;
    troopName: string;
    index: number;
    type: number;
    tier: number;
    agility: number;
    attack: number;
    defense: number;
    vitality: number;
    wisdom: number;
    squadSlot: number;
  }>;
};

export type ResourceFragmentFragment = {
  __typename?: 'Resource';
  id: string;
  resourceId: number;
  resourceName: string;
  realmId?: number | null;
};

export type GetWalletQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type GetWalletQuery = {
  __typename?: 'Query';
  getWallet: {
    __typename?: 'Wallet';
    address: string;
    realmsL1Held: number;
    realmsL2Held: number;
    realmsSettledHeld: number;
    realmsBridgedHeld: number;
  };
};

export const DesiegeFragmentFragmentDoc = gql`
  fragment DesiegeFragment on Desiege {
    id
    gameId
    winner
    attackedTokens
    defendedTokens
    eventIndexed
    initialHealth
    startedOn
  }
`;
export const LoreEntityFragmentFragmentDoc = gql`
  fragment LoreEntityFragment on LoreEntity {
    id
    owner
    kind
    revisions {
      revisionNumber
      title
      excerpt
      createdAt
    }
  }
`;
export const LorePoiFragmentFragmentDoc = gql`
  fragment LorePoiFragment on LorePoi {
    id
    name
    assetType
  }
`;
export const RealmFragmentFragmentDoc = gql`
  fragment RealmFragment on Realm {
    realmId
    owner
    bridgedOwner
    ownerL2
    settledOwner
    name
    rarityRank
    rarityScore
    orderType
    wonder
    lastAttacked
    resources {
      resourceId
      resourceName
      level
      upgrades
    }
    traits {
      type
      qty
    }
    buildings {
      buildingId
      buildingName
      count
      buildingName
      population
      culture
      food
      limitTraitId
      limitTraitName
    }
    squad {
      realmId
      troopId
      troopName
      index
      type
      tier
      agility
      attack
      defense
      vitality
      wisdom
      squadSlot
    }
  }
`;
export const ResourceFragmentFragmentDoc = gql`
  fragment ResourceFragment on Resource {
    id
    resourceId
    resourceName
    realmId
  }
`;
export const GetDesiegeDocument = gql`
  query getDesiege($id: Float!) @api(name: starkIndexer) {
    getDesiege(id: $id) {
      ...DesiegeFragment
    }
  }
  ${DesiegeFragmentFragmentDoc}
`;

/**
 * __useGetDesiegeQuery__
 *
 * To run a query within a React component, call `useGetDesiegeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDesiegeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDesiegeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetDesiegeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDesiegeQuery,
    GetDesiegeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDesiegeQuery, GetDesiegeQueryVariables>(
    GetDesiegeDocument,
    options
  );
}
export function useGetDesiegeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDesiegeQuery,
    GetDesiegeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDesiegeQuery, GetDesiegeQueryVariables>(
    GetDesiegeDocument,
    options
  );
}
export type GetDesiegeQueryHookResult = ReturnType<typeof useGetDesiegeQuery>;
export type GetDesiegeLazyQueryHookResult = ReturnType<
  typeof useGetDesiegeLazyQuery
>;
export type GetDesiegeQueryResult = Apollo.QueryResult<
  GetDesiegeQuery,
  GetDesiegeQueryVariables
>;
export const GetExchangeRatesDocument = gql`
  query getExchangeRates @api(name: starkIndexer) {
    getExchangeRates {
      tokenId
      tokenName
      amount
      buyAmount
      sellAmount
      percentChange24Hr
    }
  }
`;

/**
 * __useGetExchangeRatesQuery__
 *
 * To run a query within a React component, call `useGetExchangeRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExchangeRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExchangeRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetExchangeRatesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetExchangeRatesQuery,
    GetExchangeRatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetExchangeRatesQuery, GetExchangeRatesQueryVariables>(
    GetExchangeRatesDocument,
    options
  );
}
export function useGetExchangeRatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetExchangeRatesQuery,
    GetExchangeRatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetExchangeRatesQuery,
    GetExchangeRatesQueryVariables
  >(GetExchangeRatesDocument, options);
}
export type GetExchangeRatesQueryHookResult = ReturnType<
  typeof useGetExchangeRatesQuery
>;
export type GetExchangeRatesLazyQueryHookResult = ReturnType<
  typeof useGetExchangeRatesLazyQuery
>;
export type GetExchangeRatesQueryResult = Apollo.QueryResult<
  GetExchangeRatesQuery,
  GetExchangeRatesQueryVariables
>;
export const GetLoreEntitiesDocument = gql`
  query getLoreEntities(
    $filter: LoreEntityWhereInput
    $take: Float
    $skip: Float
  ) @api(name: starkIndexer) {
    getLoreEntities(filter: $filter, take: $take, skip: $skip) {
      ...LoreEntityFragment
    }
  }
  ${LoreEntityFragmentFragmentDoc}
`;

/**
 * __useGetLoreEntitiesQuery__
 *
 * To run a query within a React component, call `useGetLoreEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoreEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoreEntitiesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetLoreEntitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLoreEntitiesQuery,
    GetLoreEntitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLoreEntitiesQuery, GetLoreEntitiesQueryVariables>(
    GetLoreEntitiesDocument,
    options
  );
}
export function useGetLoreEntitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLoreEntitiesQuery,
    GetLoreEntitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLoreEntitiesQuery,
    GetLoreEntitiesQueryVariables
  >(GetLoreEntitiesDocument, options);
}
export type GetLoreEntitiesQueryHookResult = ReturnType<
  typeof useGetLoreEntitiesQuery
>;
export type GetLoreEntitiesLazyQueryHookResult = ReturnType<
  typeof useGetLoreEntitiesLazyQuery
>;
export type GetLoreEntitiesQueryResult = Apollo.QueryResult<
  GetLoreEntitiesQuery,
  GetLoreEntitiesQueryVariables
>;
export const GetLoreEntityDocument = gql`
  query getLoreEntity($id: Float!) @api(name: starkIndexer) {
    getLoreEntity(entityId: $id) {
      ...LoreEntityFragment
      revisions {
        markdown
      }
    }
  }
  ${LoreEntityFragmentFragmentDoc}
`;

/**
 * __useGetLoreEntityQuery__
 *
 * To run a query within a React component, call `useGetLoreEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoreEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoreEntityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLoreEntityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLoreEntityQuery,
    GetLoreEntityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLoreEntityQuery, GetLoreEntityQueryVariables>(
    GetLoreEntityDocument,
    options
  );
}
export function useGetLoreEntityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLoreEntityQuery,
    GetLoreEntityQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLoreEntityQuery, GetLoreEntityQueryVariables>(
    GetLoreEntityDocument,
    options
  );
}
export type GetLoreEntityQueryHookResult = ReturnType<
  typeof useGetLoreEntityQuery
>;
export type GetLoreEntityLazyQueryHookResult = ReturnType<
  typeof useGetLoreEntityLazyQuery
>;
export type GetLoreEntityQueryResult = Apollo.QueryResult<
  GetLoreEntityQuery,
  GetLoreEntityQueryVariables
>;
export const GetLorePoisDocument = gql`
  query getLorePois($take: Float, $skip: Float) @api(name: starkIndexer) {
    getLorePois(take: $take, skip: $skip) {
      ...LorePoiFragment
    }
  }
  ${LorePoiFragmentFragmentDoc}
`;

/**
 * __useGetLorePoisQuery__
 *
 * To run a query within a React component, call `useGetLorePoisQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLorePoisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLorePoisQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetLorePoisQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLorePoisQuery,
    GetLorePoisQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetLorePoisQuery, GetLorePoisQueryVariables>(
    GetLorePoisDocument,
    options
  );
}
export function useGetLorePoisLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLorePoisQuery,
    GetLorePoisQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetLorePoisQuery, GetLorePoisQueryVariables>(
    GetLorePoisDocument,
    options
  );
}
export type GetLorePoisQueryHookResult = ReturnType<typeof useGetLorePoisQuery>;
export type GetLorePoisLazyQueryHookResult = ReturnType<
  typeof useGetLorePoisLazyQuery
>;
export type GetLorePoisQueryResult = Apollo.QueryResult<
  GetLorePoisQuery,
  GetLorePoisQueryVariables
>;
export const GetAccountDocument = gql`
  query getAccount($account: String!) @api(name: starkIndexer) {
    ownedRealmsCount: realmsCount(filter: { ownerL2: { equals: $account } })
    settledRealmsCount: realmsCount(
      filter: { settledOwner: { equals: $account } }
    )
    accountHistory: getRealmHistory(
      filter: { realmOwner: { equals: $account } }
    ) {
      id
      eventType
      realmId
      realmOwner
      realmName
      realmOrder
      data
      timestamp
    }
  }
`;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useGetAccountQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    options
  );
}
export function useGetAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    options
  );
}
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<
  typeof useGetAccountLazyQuery
>;
export type GetAccountQueryResult = Apollo.QueryResult<
  GetAccountQuery,
  GetAccountQueryVariables
>;
export const GetRealmDocument = gql`
  query getRealm($id: Float!) @api(name: starkIndexer) {
    getRealm(realmId: $id) {
      ...RealmFragment
    }
  }
  ${RealmFragmentFragmentDoc}
`;

/**
 * __useGetRealmQuery__
 *
 * To run a query within a React component, call `useGetRealmQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealmQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRealmQuery(
  baseOptions: Apollo.QueryHookOptions<GetRealmQuery, GetRealmQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRealmQuery, GetRealmQueryVariables>(
    GetRealmDocument,
    options
  );
}
export function useGetRealmLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRealmQuery,
    GetRealmQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRealmQuery, GetRealmQueryVariables>(
    GetRealmDocument,
    options
  );
}
export type GetRealmQueryHookResult = ReturnType<typeof useGetRealmQuery>;
export type GetRealmLazyQueryHookResult = ReturnType<
  typeof useGetRealmLazyQuery
>;
export type GetRealmQueryResult = Apollo.QueryResult<
  GetRealmQuery,
  GetRealmQueryVariables
>;
export const GetBuildingsByRealmIdDocument = gql`
  query getBuildingsByRealmId($id: Float!) @api(name: starkIndexer) {
    getBuildingsByRealmId(id: $id) {
      realmId
      buildingId
      buildingName
      limit
      limitTraitId
      limitTraitName
      count
      population
      food
      culture
      buildingCost {
        amount
        resources
      }
    }
  }
`;

/**
 * __useGetBuildingsByRealmIdQuery__
 *
 * To run a query within a React component, call `useGetBuildingsByRealmIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuildingsByRealmIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuildingsByRealmIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBuildingsByRealmIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBuildingsByRealmIdQuery,
    GetBuildingsByRealmIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBuildingsByRealmIdQuery,
    GetBuildingsByRealmIdQueryVariables
  >(GetBuildingsByRealmIdDocument, options);
}
export function useGetBuildingsByRealmIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBuildingsByRealmIdQuery,
    GetBuildingsByRealmIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBuildingsByRealmIdQuery,
    GetBuildingsByRealmIdQueryVariables
  >(GetBuildingsByRealmIdDocument, options);
}
export type GetBuildingsByRealmIdQueryHookResult = ReturnType<
  typeof useGetBuildingsByRealmIdQuery
>;
export type GetBuildingsByRealmIdLazyQueryHookResult = ReturnType<
  typeof useGetBuildingsByRealmIdLazyQuery
>;
export type GetBuildingsByRealmIdQueryResult = Apollo.QueryResult<
  GetBuildingsByRealmIdQuery,
  GetBuildingsByRealmIdQueryVariables
>;
export const GetRealmHistoryDocument = gql`
  query getRealmHistory(
    $filter: RealmHistoryWhereInput
    $take: Float
    $skip: Float
  ) @api(name: starkIndexer) {
    getRealmHistory(filter: $filter, take: $take, skip: $skip) {
      id
      eventType
      realmId
      realmOwner
      data
      timestamp
      transactionHash
    }
  }
`;

/**
 * __useGetRealmHistoryQuery__
 *
 * To run a query within a React component, call `useGetRealmHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealmHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealmHistoryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetRealmHistoryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRealmHistoryQuery,
    GetRealmHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRealmHistoryQuery, GetRealmHistoryQueryVariables>(
    GetRealmHistoryDocument,
    options
  );
}
export function useGetRealmHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRealmHistoryQuery,
    GetRealmHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRealmHistoryQuery,
    GetRealmHistoryQueryVariables
  >(GetRealmHistoryDocument, options);
}
export type GetRealmHistoryQueryHookResult = ReturnType<
  typeof useGetRealmHistoryQuery
>;
export type GetRealmHistoryLazyQueryHookResult = ReturnType<
  typeof useGetRealmHistoryLazyQuery
>;
export type GetRealmHistoryQueryResult = Apollo.QueryResult<
  GetRealmHistoryQuery,
  GetRealmHistoryQueryVariables
>;
export const GetRealmCombatResultDocument = gql`
  query getRealmCombatResult($defendRealmId: Float!, $transactionHash: String!)
  @api(name: starkIndexer) {
    getRealmCombatResult(
      defendRealmId: $defendRealmId
      transactionHash: $transactionHash
    ) {
      defendRealmId
      attackRealmId
      transactionHash
      history {
        eventType
        attackSquad
        defendSquad
        outcome
        attackType
        hitPoints
        timestamp
      }
      resourcesPillaged {
        resourceId
        resourceName
        amount
      }
      outcome
      timestamp
    }
  }
`;

/**
 * __useGetRealmCombatResultQuery__
 *
 * To run a query within a React component, call `useGetRealmCombatResultQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealmCombatResultQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealmCombatResultQuery({
 *   variables: {
 *      defendRealmId: // value for 'defendRealmId'
 *      transactionHash: // value for 'transactionHash'
 *   },
 * });
 */
export function useGetRealmCombatResultQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRealmCombatResultQuery,
    GetRealmCombatResultQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRealmCombatResultQuery,
    GetRealmCombatResultQueryVariables
  >(GetRealmCombatResultDocument, options);
}
export function useGetRealmCombatResultLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRealmCombatResultQuery,
    GetRealmCombatResultQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRealmCombatResultQuery,
    GetRealmCombatResultQueryVariables
  >(GetRealmCombatResultDocument, options);
}
export type GetRealmCombatResultQueryHookResult = ReturnType<
  typeof useGetRealmCombatResultQuery
>;
export type GetRealmCombatResultLazyQueryHookResult = ReturnType<
  typeof useGetRealmCombatResultLazyQuery
>;
export type GetRealmCombatResultQueryResult = Apollo.QueryResult<
  GetRealmCombatResultQuery,
  GetRealmCombatResultQueryVariables
>;
export const GetRealmsDocument = gql`
  query getRealms(
    $filter: RealmWhereInput
    $orderBy: RealmOrderByInput
    $take: Float
    $skip: Float
  ) @api(name: starkIndexer) {
    getRealms(filter: $filter, orderBy: $orderBy, take: $take, skip: $skip) {
      ...RealmFragment
    }
  }
  ${RealmFragmentFragmentDoc}
`;

/**
 * __useGetRealmsQuery__
 *
 * To run a query within a React component, call `useGetRealmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRealmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRealmsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      orderBy: // value for 'orderBy'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetRealmsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetRealmsQuery, GetRealmsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRealmsQuery, GetRealmsQueryVariables>(
    GetRealmsDocument,
    options
  );
}
export function useGetRealmsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRealmsQuery,
    GetRealmsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRealmsQuery, GetRealmsQueryVariables>(
    GetRealmsDocument,
    options
  );
}
export type GetRealmsQueryHookResult = ReturnType<typeof useGetRealmsQuery>;
export type GetRealmsLazyQueryHookResult = ReturnType<
  typeof useGetRealmsLazyQuery
>;
export type GetRealmsQueryResult = Apollo.QueryResult<
  GetRealmsQuery,
  GetRealmsQueryVariables
>;
export const GetTroopStatsDocument = gql`
  query getTroopStats @api(name: starkIndexer) {
    getTroopStats {
      troopId
      troopName
      type
      tier
      agility
      attack
      defense
      vitality
      wisdom
      troopCost {
        amount
        resources
      }
    }
  }
`;

/**
 * __useGetTroopStatsQuery__
 *
 * To run a query within a React component, call `useGetTroopStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTroopStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTroopStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTroopStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTroopStatsQuery,
    GetTroopStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTroopStatsQuery, GetTroopStatsQueryVariables>(
    GetTroopStatsDocument,
    options
  );
}
export function useGetTroopStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTroopStatsQuery,
    GetTroopStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTroopStatsQuery, GetTroopStatsQueryVariables>(
    GetTroopStatsDocument,
    options
  );
}
export type GetTroopStatsQueryHookResult = ReturnType<
  typeof useGetTroopStatsQuery
>;
export type GetTroopStatsLazyQueryHookResult = ReturnType<
  typeof useGetTroopStatsLazyQuery
>;
export type GetTroopStatsQueryResult = Apollo.QueryResult<
  GetTroopStatsQuery,
  GetTroopStatsQueryVariables
>;
export const GetWalletDocument = gql`
  query getWallet($address: String!) @api(name: starkIndexer) {
    getWallet(address: $address) {
      address
      realmsL1Held
      realmsL2Held
      realmsSettledHeld
      realmsBridgedHeld
    }
  }
`;

/**
 * __useGetWalletQuery__
 *
 * To run a query within a React component, call `useGetWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetWalletQuery(
  baseOptions: Apollo.QueryHookOptions<GetWalletQuery, GetWalletQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWalletQuery, GetWalletQueryVariables>(
    GetWalletDocument,
    options
  );
}
export function useGetWalletLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWalletQuery,
    GetWalletQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetWalletQuery, GetWalletQueryVariables>(
    GetWalletDocument,
    options
  );
}
export type GetWalletQueryHookResult = ReturnType<typeof useGetWalletQuery>;
export type GetWalletLazyQueryHookResult = ReturnType<
  typeof useGetWalletLazyQuery
>;
export type GetWalletQueryResult = Apollo.QueryResult<
  GetWalletQuery,
  GetWalletQueryVariables
>;
