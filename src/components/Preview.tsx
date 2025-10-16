import { useState } from 'react';
import { ArrowLeft, Edit, FileDown, Save, Tag, X } from 'lucide-react';
import { ContractData, getContractTemplate, replaceTemplate } from '../utils/contractTemplates';
import { exportToCSV, exportToPDF } from '../utils/exportUtils';
import { validarDadosEtiqueta } from '../utils/etiquetaUtils';
import EtiquetaCTPS from './EtiquetaCTPS';

interface PreviewProps {
  type: 'domestico' | 'rural' | 'urbano';
  data: ContractData;
  onBack: () => void;
  onEdit: () => void;
}

export default function Preview({ type, data, onBack, onEdit }: PreviewProps) {
  const [showEtiqueta, setShowEtiqueta] = useState(false);
  const template = getContractTemplate(type);
  const contractText = replaceTemplate(template, data);

  const handleExportPDF = () => {
    exportToPDF(contractText, type);
  };

  const handleExportCSV = () => {
    exportToCSV(data, type);
  };

  const handleImprimirEtiqueta = () => {
    const validacao = validarDadosEtiqueta(data);

    if (!validacao.valido) {
      alert(`Nao e possivel imprimir a etiqueta. Campos faltando:\n\n${validacao.camposFaltando.join('\n')}`);
      return;
    }

    setShowEtiqueta(true);
  };

  const handlePrintEtiqueta = () => {
    window.print();
  };

  const handleCloseEtiqueta = () => {
    setShowEtiqueta(false);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-pale-sky hover:text-oxford-blue mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar ao Inicio
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-big-stone text-white px-8 py-6">
            <h1 className="text-2xl font-bold">Pre-visualizacao do Contrato</h1>
            <p className="text-cadet-blue mt-1">Revise os dados antes de exportar</p>
          </div>

          <div className="p-8">
            <div className="bg-white border-2 border-cadet-blue rounded-lg p-8 mb-6 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {contractText}
            </div>

            <div className="flex flex-wrap gap-4 justify-end">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-cadet-blue text-pale-sky rounded-lg hover:bg-white-ice transition-colors font-medium"
              >
                <Edit className="w-5 h-5" />
                Editar Dados
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-cadet-blue text-pale-sky rounded-lg hover:bg-white-ice transition-colors font-medium"
              >
                <Save className="w-5 h-5" />
                Salvar CSV
              </button>

              <button
                onClick={handleImprimirEtiqueta}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-cadet-blue text-pale-sky rounded-lg hover:bg-white-ice transition-colors font-medium"
              >
                <Tag className="w-5 h-5" />
                Etiqueta CTPS
              </button>

              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-6 py-3 bg-big-stone text-white rounded-lg hover:bg-cello transition-colors font-medium"
              >
                <FileDown className="w-5 h-5" />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-water-leaf border border-pelorous rounded-lg p-4">
          <h3 className="font-semibold text-cello mb-2">Informacoes importantes:</h3>
          <ul className="text-sm text-cello space-y-1 list-disc list-inside">
            <li>O PDF sera gerado em formato A4, preto e branco</li>
            <li>Todos os dados foram normalizados (caixa alta, sem acentos)</li>
            <li>O arquivo CSV pode ser importado futuramente para preencher o formulario</li>
            <li>CPF e CNPJ aparecem apenas com numeros no arquivo exportado</li>
            <li>A etiqueta CTPS tem dimensoes 7,5cm x 7,5cm para impressao em carteira de trabalho</li>
          </ul>
        </div>
      </div>

      {showEtiqueta && (
        <div className="fixed inset-0 bg-oxford-blue bg-opacity-75 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="bg-big-stone text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-xl font-bold">Etiqueta CTPS - Preview</h2>
              <button
                onClick={handleCloseEtiqueta}
                className="text-white hover:text-cadet-blue transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <EtiquetaCTPS data={data} />

              <div className="mt-6 flex gap-4 justify-center">
                <button
                  onClick={handleCloseEtiqueta}
                  className="px-6 py-3 bg-white border-2 border-cadet-blue text-pale-sky rounded-lg hover:bg-white-ice transition-colors font-medium"
                >
                  Fechar
                </button>
                <button
                  onClick={handlePrintEtiqueta}
                  className="px-6 py-3 bg-big-stone text-white rounded-lg hover:bg-cello transition-colors font-medium"
                >
                  Imprimir
                </button>
              </div>

              <div className="mt-4 bg-water-leaf border border-pelorous rounded-lg p-4">
                <h4 className="font-semibold text-cello mb-2">Dicas de Impressao:</h4>
                <ul className="text-sm text-cello space-y-1 list-disc list-inside">
                  <li>Configure a impressora para tamanho de papel A4</li>
                  <li>Desative margens ou use margens minimas</li>
                  <li>Use papel adesivo 7,5cm x 7,5cm ou recorte apos impressao</li>
                  <li>Verifique o preview de impressao antes de imprimir</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
