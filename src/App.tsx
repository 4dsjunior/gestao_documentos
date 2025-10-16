import { useState } from 'react';
import Home from './components/Home';
import ContractForm from './components/ContractForm';
import Preview from './components/Preview';
import { ContractData } from './utils/contractTemplates';

type Screen = 'home' | 'form' | 'preview';
type ContractType = 'domestico' | 'rural' | 'urbano';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [contractType, setContractType] = useState<ContractType>('domestico');
  const [contractData, setContractData] = useState<ContractData>({});

  const handleSelectType = (type: ContractType) => {
    setContractType(type);
    setCurrentScreen('form');
  };

  const handleFormSubmit = (data: ContractData) => {
    setContractData(data);
    setCurrentScreen('preview');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setContractData({});
  };

  const handleEdit = () => {
    setCurrentScreen('form');
  };

  return (
    <>
      {currentScreen === 'home' && (
        <Home onSelectType={handleSelectType} />
      )}

      {currentScreen === 'form' && (
        <ContractForm
          type={contractType}
          onBack={handleBackToHome}
          onSubmit={handleFormSubmit}
          initialData={Object.keys(contractData).length > 0 ? contractData : undefined}
        />
      )}

      {currentScreen === 'preview' && (
        <Preview
          type={contractType}
          data={contractData}
          onBack={handleBackToHome}
          onEdit={handleEdit}
        />
      )}
    </>
  );
}

export default App;
