/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlyToInterpolator } from '@deck.gl/core';
import { ScatterplotLayer, IconLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Map } from 'react-map-gl';
import Layout from '@/components/Layout';
import { ArtBackground } from '@/components/map/ArtBackground';
import { FlyTo } from '@/components/map/FlyTo';
import { BaseModal } from '@/components/modals/BaseModal';
import { Header } from '@/components/navigation/header';
import { AccountPanel } from '@/components/panels/AccountPanel';
import { BankPanel } from '@/components/panels/BankPanel';
import { CombatPanel } from '@/components/panels/CombatPanel';
import { CryptsPanel } from '@/components/panels/CryptsPanel';
import { GaPanel } from '@/components/panels/GaPanel';
import { LootPanel } from '@/components/panels/LootPanel';
/* import { LorePanel } from '@/components/panels/LorePanel'; */
import { RaidResultsPanel } from '@/components/panels/RaidResultsPanel';
import { RealmDetailsPanel } from '@/components/panels/RealmDetailsPanel';
import { RealmsPanel } from '@/components/panels/RealmsPanel';
import { TradePanel } from '@/components/panels/TradePanel';
import { BridgeRealmsSideBar } from '@/components/sidebars/BridgeRealmsSideBar';
import { CryptsSideBar } from '@/components/sidebars/CryptsSideBar';
import { GASideBar } from '@/components/sidebars/GASideBar';
import { LootSideBar } from '@/components/sidebars/LootSideBar';
import { MenuSideBar } from '@/components/sidebars/MenuSideBar';
import { MilitarySideBar } from '@/components/sidebars/MilitarySideBar';
import { RealmSideBar } from '@/components/sidebars/RealmsSideBar';
import { ResourceSwapSideBar } from '@/components/sidebars/ResourceSwapSideBar';
import { SettleRealmsSideBar } from '@/components/sidebars/SettleRealmsSideBar';
import { TransactionCartSideBar } from '@/components/sidebars/TransactionCartSideBar';
import { CryptProvider } from '@/context/CryptContext';
import { GaProvider } from '@/context/GaContext';
import { LootProvider } from '@/context/LootContext';
import { RealmProvider } from '@/context/RealmContext';
import { ResourceProvider } from '@/context/ResourcesContext';
import crypts from '@/geodata/crypts_all.json';
import ga_bags from '@/geodata/ga_bags.json';
import loot_bags from '@/geodata/loot_bags.json';
import realms from '@/geodata/realms.json';
import { useAtlasContext, AtlasProvider } from '@/hooks/useAtlasContext';

// import order_highlights from '@/geodata/order_highlights.json';
import type { RealmFeatures } from '@/types/index';

export default function AtlasPage() {
  return (
    <AtlasProvider>
      <Layout>
        <div className="relative flex h-full overflow-hidden sm:h-screen">
          <MenuSideBar />
          <div className="relative flex flex-col w-full">
            <ResourceProvider>
              <Header />

              <AtlasMain />
            </ResourceProvider>
          </div>
        </div>
      </Layout>
    </AtlasProvider>
  );
}

function AtlasMain() {
  return (
    <div className="relative w-full h-full">
      <ArtBackground />
      <AccountModule />
      <LootModule />
      <GaModule />
      <RealmsModule />
      <CryptModule />
      <BankPanel />
      <ResourceSwapSideBar />
      <TradePanel />
      <CombatPanel />
      {/* <FlyTo /> */}
      <MapModule />
      <BaseModal />
      <TransactionCartSideBar />
      <MilitarySideBar />
      <div id="sidebar-root">
        {/* Render children here using the AtlasSideBar component */}
      </div>
    </div>
  );
}

function RealmsModule() {
  const { query } = useRouter();
  const segments = query?.segment ?? [];
  const realmId = segments[1] ? Number(segments[1]) : 0;
  return (
    <RealmProvider>
      {realmId > 0 &&
        (segments[2] === 'combat' ? (
          <RaidResultsPanel defendId={realmId} tx={segments[3]} />
        ) : (
          <RealmDetailsPanel realmId={realmId} />
        ))}
      {realmId === 0 && (
        <>
          <RealmsPanel />
          {/* <LorePanel /> */}
          <RealmSideBar />
          <BridgeRealmsSideBar />
          <SettleRealmsSideBar />
        </>
      )}
    </RealmProvider>
  );
}

function GaModule() {
  return (
    <GaProvider>
      <GaPanel />
      <GASideBar />
    </GaProvider>
  );
}

function CryptModule() {
  return (
    <CryptProvider>
      <CryptsPanel />
      <CryptsSideBar />
    </CryptProvider>
  );
}

function BankModule() {
  return (
    <ResourceProvider>
      <BankPanel />
      <ResourceSwapSideBar />
    </ResourceProvider>
  );
}

function LootModule() {
  return (
    <LootProvider>
      <LootPanel />
      <LootSideBar />
    </LootProvider>
  );
}

function AccountModule() {
  return <AccountPanel />;
}

function MapModule() {
  const ItemViewLevel = 5;
  const { openDetails, selectedId, coordinates } = useAtlasContext();
  const [resource] = useState<Array<string>>([]);

  const filteredData = () => {
    return realms.features.filter((a: RealmFeatures) =>
      a.properties.resources.some((b: string) => resource.includes(b))
    );
  };

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 4,
    pitch: 55,
    bearing: 0,
    bounds: [
      [-180, -60], // Southwest coordinates
      [180, 60], // Northeast coordinates
    ],
    transitionDuration: 0,
    transitionInterpolator: new FlyToInterpolator(),
  });

  const cryptsLayer = new ScatterplotLayer({
    id: 'crypts-layer',
    data: crypts.features,
    stroked: true,
    filled: true,
    extruded: true,
    pickable: true,
    opacity: 1,
    visible: viewState.zoom < ItemViewLevel ? false : true,
    getPosition: (d: any) => d.geometry.coordinates,
    getRadius: (d: any) =>
      d.properties.tokenId === parseInt(selectedId) ? 4000 : 100,
    getElevation: 10000,
    lineWidthMinPixels: 1,
    getFillColor: [0, 0, 0, 0],
    updateTriggers: {
      getRadius: parseInt(selectedId),
      getVisible: viewState,
    },
    onClick: (info: any) => {
      openDetails('crypt', info.object.properties.tokenId);
    },
  });

  const realmsLayer = new ScatterplotLayer({
    id: 'realms-layer',
    data: (realms as any).features,
    stroked: true,
    filled: true,
    extruded: true,
    pickable: true,
    opacity: 1,
    visible: viewState.zoom < ItemViewLevel ? false : true,
    getPosition: (d: any) => d.geometry.coordinates,
    getRadius: (d: any) =>
      d.properties.realm_idx === parseInt(selectedId) ? 4000 : 1,
    getElevation: 10000,
    lineWidthMinPixels: 1,
    getFillColor: [0, 0, 0, 0],
    updateTriggers: {
      getRadius: parseInt(selectedId),
      getVisible: viewState,
    },
    onClick: (info: any) => {
      openDetails('realm', info.object.properties.realm_idx);
    },
  });

  const lootBagLayer = new ScatterplotLayer({
    id: 'loot-layer',
    data: loot_bags.features,
    stroked: true,
    filled: true,
    extruded: true,
    pickable: true,
    visible: viewState.zoom < ItemViewLevel ? false : true,
    opacity: 1,
    getPosition: (d: any) => d.geometry.coordinates,
    getRadius: 1,
    getElevation: 10000,
    lineWidthMinPixels: 1,
    getFillColor: [255, 0, 0, 0],
    updateTriggers: {
      getRadius: parseInt(selectedId),
      getVisible: viewState,
    },
    onClick: (info: any) => {
      openDetails('loot', info.object.properties.bag_id);
    },
  });

  const gaBagLayer = new ScatterplotLayer({
    id: 'ga-layer',
    data: ga_bags.features,
    stroked: true,
    filled: true,
    extruded: true,
    pickable: true,
    visible: viewState.zoom < ItemViewLevel ? false : true,
    opacity: 1,
    getPosition: (d: any) => d.geometry.coordinates,
    getRadius: 1,
    getElevation: 10000,
    lineWidthMinPixels: 1,
    getFillColor: [0, 255, 0, 0],
    updateTriggers: {
      getRadius: parseInt(selectedId),
      getVisible: viewState,
    },
    onClick: (info: any) => {
      openDetails('ga', info.object.properties.ga_id);
    },
  });

  const iconMapping = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };

  const resourceLayer = new IconLayer({
    id: 'icon-layer',
    data: filteredData(),
    pickable: false,
    iconAtlas:
      'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: iconMapping,
    getIcon: () => 'marker',
    sizeScale: 5,
    getPosition: (d: any) => d.geometry.coordinates,
    getSize: () => 5,
    getColor: () => [255, 255, 255],
  });

  useEffect(() => {
    if (!coordinates) {
      return;
    }

    setViewState({
      ...coordinates,
      zoom: 8,
      pitch: 20,
      bearing: 0,
      bounds: [
        [-180, -60], // Southwest coordinates
        [180, 60], // Northeast coordinates
      ],
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, [coordinates]);
  const [loaded, setLoaded] = useState<boolean>();

  return (
    <DeckGL
      getCursor={({ isHovering }) => {
        return isHovering ? 'pointer' : 'grabbing';
      }}
      pickingRadius={25}
      viewState={viewState}
      controller={true}
      onLoad={() => setLoaded(true)}
      onViewStateChange={(e) => setViewState(e.viewState)}
      layers={[
        realmsLayer,
        resourceLayer,
        cryptsLayer,
        lootBagLayer,
        gaBagLayer,
      ]}
    >
      {loaded ? (
        <Map
          attributionControl={false}
          mapStyle="mapbox://styles/ponderingdemocritus/ckzjumbjo000914ogvsqzcjd2/draft"
          mapboxAccessToken={
            'pk.eyJ1IjoicG9uZGVyaW5nZGVtb2NyaXR1cyIsImEiOiJja3l0eGF6aXYwYmd4Mm5yejN5c2plaWR4In0.4ZTsKDrs0T8OTkbByUIo1A'
          }
        />
      ) : (
        <div className={'w-full h-full flex justify-center'}>
          <h1 className={'self-center'}>Loading Atlas...</h1>
        </div>
      )}
    </DeckGL>
  );
}
