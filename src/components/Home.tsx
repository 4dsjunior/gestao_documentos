import { Home as HomeIcon, Briefcase, Wheat } from 'lucide-react';

interface HomeProps {
  onSelectType: (type: 'domestico' | 'rural' | 'urbano') => void;
}

export default function Home({ onSelectType }: HomeProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Gerador de Contratos de Trabalho
          </h1>
          <p className="text-lg text-gray-600">
            Escolha o tipo de contrato e insira as informacoes necessarias
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() => onSelectType('domestico')}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <HomeIcon className="w-8 h-8 text-gray-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contrato Domestico
              </h2>
              <p className="text-sm text-gray-600">
                Para empregados domesticos em servicos gerais
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectType('rural')}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Wheat className="w-8 h-8 text-gray-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contrato Rural
              </h2>
              <p className="text-sm text-gray-600">
                Para trabalhadores rurais e atividades agropecuarias
              </p>
            </div>
          </button>

          <button
            onClick={() => onSelectType('urbano')}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border-2 border-transparent hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-8 h-8 text-gray-700" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Contrato Urbano
              </h2>
              <p className="text-sm text-gray-600">
                Para trabalhadores urbanos em atividades comerciais
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
