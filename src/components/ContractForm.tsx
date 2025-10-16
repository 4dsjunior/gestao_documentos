import { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, Upload } from 'lucide-react';
import { isValidCPF, isValidCNPJ, formatCPF, formatCNPJ } from '../utils/validation';
import { ContractData } from '../utils/contractTemplates';
import { parseCSV } from '../utils/exportUtils';

interface ContractFormProps {
  type: 'domestico' | 'rural' | 'urbano';
  onBack: () => void;
  onSubmit: (data: ContractData) => void;
  initialData?: ContractData;
}

export default function ContractForm({ type, onBack, onSubmit, initialData }: ContractFormProps) {
  const [formData, setFormData] = useState<ContractData>(initialData || {
    EMPREGADOR_NOME: '',
    EMPREGADOR_CPF: '',
    EMPREGADOR_ENDERECO: '',
    EMPREGADO_NOME: '',
    EMPREGADO_CPF: '',
    EMPREGADO_ENDERECO: '',
    CARGO: '',
    CBO: '',
    DATA_ADMISSAO: '',
    SALARIO_BASE: '',
    UNIDADE_PAGAMENTO: 'Por Mes',
    HORAS_SEMANAIS: '44',
    TIPO_JORNADA: 'Tipo 1 - Jornada com horario diario e folga fixa',
    REGIME_TRABALHISTA: 'CLT - Consolidacao das Leis de Trabalho e legislacoes trabalhistas especificas',
    REGIME_PREVIDENCIARIO: 'Regime Geral de Previdencia Social - RGPS',
    NATUREZA_ATIVIDADE: type === 'domestico' ? 'Trabalho Urbano' : type === 'rural' ? 'Trabalho Rural' : 'Trabalho Urbano',
    LOCAL_TRABALHO_NOME: '',
    LOCAL_TRABALHO_INSCRICAO: '',
    LOCAL_ASSINATURA: '',
    DATA_ASSINATURA_DIA: '',
    DATA_ASSINATURA_MES: '',
    DATA_ASSINATURA_ANO: '',
    FORO_COMARCA: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'EMPREGADOR_CPF' || field === 'EMPREGADO_CPF') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 11) {
        if (!isValidCPF(cleaned)) {
          setErrors(prev => ({ ...prev, [field]: 'CPF invalido' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      } else if (cleaned.length > 0 && cleaned.length < 11) {
        setErrors(prev => ({ ...prev, [field]: 'CPF incompleto' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }

    if (field === 'EMPREGADOR_CPF' && type === 'urbano') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 14) {
        if (!isValidCNPJ(cleaned)) {
          setErrors(prev => ({ ...prev, [field]: 'CNPJ invalido' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      } else if (cleaned.length === 11) {
        if (!isValidCPF(cleaned)) {
          setErrors(prev => ({ ...prev, [field]: 'CPF invalido' }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      }
    }

    if (field === 'FORO_COMARCA') {
      setFormData(prev => ({ ...prev, LOCAL_ASSINATURA: value }));
    }

    if (field === 'DATA_ADMISSAO' && value) {
      const date = new Date(value);
      const day = date.getDate().toString().padStart(2, '0');
      const monthNames = ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear().toString();

      setFormData(prev => ({
        ...prev,
        DATA_ASSINATURA_DIA: day,
        DATA_ASSINATURA_MES: month,
        DATA_ASSINATURA_ANO: year
      }));
    }
  };

  const handleCPFBlur = (field: string) => {
    const value = formData[field] as string;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) {
      setFormData(prev => ({ ...prev, [field]: formatCPF(cleaned) }));
    }
  };

  const handleCNPJBlur = (field: string) => {
    const value = formData[field] as string;
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 14) {
      setFormData(prev => ({ ...prev, [field]: formatCNPJ(cleaned) }));
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const importedData = parseCSV(content);
      if (importedData) {
        setFormData(prev => ({ ...prev, ...importedData }));
      } else {
        alert('Erro ao importar CSV. Verifique o formato do arquivo.');
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getContractTitle = () => {
    switch (type) {
      case 'domestico':
        return 'Contrato Domestico';
      case 'rural':
        return 'Contrato Rural';
      case 'urbano':
        return 'Contrato Urbano';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getContractTitle()}</h1>
            <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
              <Upload className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">Importar CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Dados do Empregador
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADOR_NOME}
                  onChange={(e) => handleInputChange('EMPREGADOR_NOME', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {type === 'urbano' ? 'CPF ou CNPJ' : 'CPF/CAEPF'}
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADOR_CPF}
                  onChange={(e) => handleInputChange('EMPREGADOR_CPF', e.target.value)}
                  onBlur={() => {
                    const cleaned = (formData.EMPREGADOR_CPF as string).replace(/\D/g, '');
                    if (cleaned.length === 11) handleCPFBlur('EMPREGADOR_CPF');
                    else if (cleaned.length === 14) handleCNPJBlur('EMPREGADOR_CPF');
                  }}
                  placeholder={type === 'urbano' ? '000.000.000-00 ou 00.000.000/0000-00' : '000.000.000-00'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
                {errors.EMPREGADOR_CPF && (
                  <div className="flex items-center gap-2 mt-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.EMPREGADOR_CPF}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereco Completo
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADOR_ENDERECO}
                  onChange={(e) => handleInputChange('EMPREGADOR_ENDERECO', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Dados do Empregado
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADO_NOME}
                  onChange={(e) => handleInputChange('EMPREGADO_NOME', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADO_CPF}
                  onChange={(e) => handleInputChange('EMPREGADO_CPF', e.target.value)}
                  onBlur={() => handleCPFBlur('EMPREGADO_CPF')}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
                {errors.EMPREGADO_CPF && (
                  <div className="flex items-center gap-2 mt-2 text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{errors.EMPREGADO_CPF}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereco Completo
                </label>
                <input
                  type="text"
                  value={formData.EMPREGADO_ENDERECO}
                  onChange={(e) => handleInputChange('EMPREGADO_ENDERECO', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Dados do Contrato
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo
                  </label>
                  <input
                    type="text"
                    value={formData.CARGO}
                    onChange={(e) => handleInputChange('CARGO', e.target.value)}
                    placeholder={type === 'domestico' ? 'Empregado domestico nos servicos gerais' : type === 'rural' ? 'Operario Rural' : 'Cargo do empregado'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CBO
                  </label>
                  <input
                    type="text"
                    value={formData.CBO}
                    onChange={(e) => handleInputChange('CBO', e.target.value)}
                    placeholder="512105"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Admissao
                  </label>
                  <input
                    type="date"
                    value={formData.DATA_ADMISSAO}
                    onChange={(e) => handleInputChange('DATA_ADMISSAO', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salario Base (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.SALARIO_BASE}
                    onChange={(e) => handleInputChange('SALARIO_BASE', e.target.value)}
                    placeholder="1518.00"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unidade de Pagamento
                  </label>
                  <select
                    value={formData.UNIDADE_PAGAMENTO}
                    onChange={(e) => handleInputChange('UNIDADE_PAGAMENTO', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  >
                    <option value="Por Mes">Por Mes</option>
                    <option value="Por Hora">Por Hora</option>
                    <option value="Por Dia">Por Dia</option>
                    <option value="Por Semana">Por Semana</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horas Semanais
                  </label>
                  <input
                    type="number"
                    value={formData.HORAS_SEMANAIS}
                    onChange={(e) => handleInputChange('HORAS_SEMANAIS', e.target.value)}
                    placeholder="44"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Jornada
                </label>
                <select
                  value={formData.TIPO_JORNADA}
                  onChange={(e) => handleInputChange('TIPO_JORNADA', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                >
                  <option value="Tipo 1 - Jornada com horario diario e folga fixa">Tipo 1 - Jornada com horario diario e folga fixa</option>
                  <option value="Tipo 2 - Jornada 12x36">Tipo 2 - Jornada 12x36</option>
                  <option value="Tipo 3 - Jornada com horario diario fixo e folga variavel">Tipo 3 - Jornada com horario diario fixo e folga variavel</option>
                  <option value="Tipo 5 - Jornada com horario diario fixo e folga fixa (exceto no domingo)">Tipo 5 - Jornada com horario diario fixo e folga fixa (exceto no domingo)</option>
                  <option value="Tipo 7 - Turno ininterrupto de revezamento">Tipo 7 - Turno ininterrupto de revezamento</option>
                  <option value="Tipo 9 - Demais tipos de jornada">Tipo 9 - Demais tipos de jornada</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do Local de Trabalho
                  </label>
                  <input
                    type="text"
                    value={formData.LOCAL_TRABALHO_NOME}
                    onChange={(e) => handleInputChange('LOCAL_TRABALHO_NOME', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inscricao do Local
                  </label>
                  <input
                    type="text"
                    value={formData.LOCAL_TRABALHO_INSCRICAO}
                    onChange={(e) => handleInputChange('LOCAL_TRABALHO_INSCRICAO', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">
                Dados de Assinatura
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Foro/Comarca (Local de Assinatura)
                </label>
                <input
                  type="text"
                  value={formData.FORO_COMARCA}
                  onChange={(e) => handleInputChange('FORO_COMARCA', e.target.value)}
                  placeholder="Cidade/Estado"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Este valor sera usado como local de assinatura e comarca</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Nota:</strong> A data de assinatura sera automaticamente preenchida com a data de admissao
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Gerar Pre-visualizacao
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
