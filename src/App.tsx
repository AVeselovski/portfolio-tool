import { useState } from "react";
import { v4 as uuid } from "uuid";

import { theme, ThemeProvider, CssBaseline } from "utils/theme";
import { useLocalStorage } from "useStorage";
import {
  TYPES as TYPES_ARR,
  SECTORS as SECTORS_ARR,
  REGIONS as REGIONS_ARR,
} from "utils/constants";

import { Box } from "components/common";
import Layout from "components/Layout";
import Header from "components/Header";
import AssetChart from "components/AssetChart";
import AssetList from "components/AssetList";
import AssetModal from "components/AssetModal";
import DepositModal from "components/DepositModal";

const INIT_DATA = [
  { id: uuid(), name: "EURO", type: 0, sector: 0, region: 0, color: "#BDBDBD", value: 30000 },
];

const TYPES = TYPES_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const SECTORS = SECTORS_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const REGIONS = REGIONS_ARR.reduce(
  (obj: any, item: any) => Object.assign(obj, { [item.key]: item.value }),
  {}
);

const SORT: { [key: number]: string } = {
  0: "type",
  1: "sector",
  2: "region",
};

const SORT_NAMES: any = {
  type: TYPES,
  sector: SECTORS,
  region: REGIONS,
};

const getName = (key: string, value: number) => {
  return SORT_NAMES[key][value];
};

const formatData = (data: any, sortedBy: number) => {
  const sorter = SORT[sortedBy];
  const byName = data.sort((a: any, b: any) => a.name.localeCompare(b.name));
  const sorted = byName.sort((a: any, b: any) => a[sorter] - b[sorter]);

  const grouped = sorted
    .reduce((reduced: any[], current: any, index: number) => {
      const dataObjName = getName(sorter, current[sorter]);
      const dataObj = { ...current, name: dataObjName, value: current.value };

      if (index > 0 && current[sorter] === reduced[index - 1][sorter]) {
        dataObj.value = current.value + reduced[index - 1].value;
        reduced[index - 1] = null;
      }

      return [...reduced, dataObj];
    }, [])
    .filter(Boolean);

  return [sorted, grouped];
};

function App() {
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [asset, setAsset] = useState<any>(null);
  const [tab, setTab] = useState(0);

  const [data, setData] = useLocalStorage("data", INIT_DATA);
  const [sortedData, groupedData] = formatData(data, tab);

  const total = data.reduce((total: 0, item: any) => (total += item.value), 0);
  const availableFunds = data.find((asset: any) => asset.type === 0)?.value || 0;

  const handleCloseAssetModal = () => {
    setAsset(null);
    setAssetModalOpen(false);
  };

  const handleSaveAsset = (newAsset: any) => {
    if (newAsset.id) {
      updateAsset(newAsset);
    } else {
      addNewAsset(newAsset);
    }

    handleCloseAssetModal();
  };

  const handleSetFunds = (value: number) => {
    const cash = data.find((_asset: any) => _asset.type === 0);
    const updatedCash = { ...cash, value };
    const updatedData = data.map((_asset: any) => {
      if (_asset.type === 0) return updatedCash;
      return _asset;
    });

    setData(updatedData);
    setDepositModalOpen(false);
  };

  const addNewAsset = (newAsset: any) => {
    const cash = data.find((_asset: any) => _asset.type === 0);
    const updatedCash = { ...cash, value: cash.value - newAsset.value };
    const updatedData = data.map((_asset: any) => {
      if (_asset.type === 0) return updatedCash;
      return _asset;
    });
    const withNewData = [...updatedData, { id: uuid(), ...newAsset }];

    setData(withNewData);
  };

  const updateAsset = (updatedAsset: any) => {
    const oldAsset = data.find((_asset: any) => _asset.id === updatedAsset.id);
    const diff = oldAsset.value - updatedAsset.value;
    const cash = data.find((_asset: any) => _asset.type === 0);
    const updatedCash = { ...cash, value: cash.value + diff };
    const updatedData = data.map((_asset: any) => {
      if (_asset.type === 0) return updatedCash;
      if (_asset.id === updatedAsset.id) return updatedAsset;
      return _asset;
    });

    setData(updatedData);
  };

  const handleDeleteAsset = (removedAsset: any) => {
    const cash: any = data.find((_asset: any) => _asset.type === 0);
    const diff = cash.value + removedAsset.value;
    const updatedCash = { ...cash, value: diff };
    const updatedData = data
      .map((_asset: any) => {
        if (_asset.type === 0) return updatedCash;
        if (_asset.id === removedAsset.id) return null;
        return _asset;
      })
      .filter(Boolean);

    setData(updatedData);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <div className="App">
        <Layout>
          <Header
            onOpenDepositModal={setDepositModalOpen}
            onOpenAssetModal={setAssetModalOpen}
            onSetTab={setTab}
            tab={tab}
            total={total}
          />

          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: ["1fr", "3fr 2fr"] }}>
            <AssetChart
              data={{ sorted: sortedData, grouped: groupedData }}
              tab={tab}
              total={total}
            />
            <AssetList
              data={sortedData}
              onEdit={setAsset}
              onDelete={handleDeleteAsset}
              total={total}
            />
          </Box>
        </Layout>

        <DepositModal
          isOpen={isDepositModalOpen}
          onClose={() => setDepositModalOpen(false)}
          onSubmit={handleSetFunds}
          totalFunds={availableFunds}
        />

        <AssetModal
          asset={asset}
          availableFunds={asset ? asset.value + availableFunds : availableFunds}
          isOpen={!!asset || isAssetModalOpen}
          onClose={handleCloseAssetModal}
          onSubmit={handleSaveAsset}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
