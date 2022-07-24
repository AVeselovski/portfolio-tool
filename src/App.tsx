import { useState } from "react";
import { v4 as uuid } from "uuid";

import { theme, ThemeProvider, CssBaseline } from "utils/theme";
import { useLocalStorage } from "useStorage";

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

function App() {
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isAssetModalOpen, setAssetModalOpen] = useState(false);
  const [asset, setAsset] = useState<any>(null);
  const [tab, setTab] = useState(0);

  const [data, setData] = useLocalStorage("data", INIT_DATA);

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
            <AssetChart data={data} tab={tab} total={total} />
            <AssetList data={data} onEdit={setAsset} onDelete={handleDeleteAsset} total={total} />
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
          availableFunds={availableFunds}
          isOpen={!!asset || isAssetModalOpen}
          onClose={handleCloseAssetModal}
          onSubmit={handleSaveAsset}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
