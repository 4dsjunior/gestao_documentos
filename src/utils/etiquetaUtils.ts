import { ContractData } from './contractTemplates';

export interface EtiquetaData {
  empregadorNome: string;
  empregadorDoc: string;
  empregadoNome: string;
  empregadoCPF: string;
  cargo: string;
  cbo: string;
  dataAdmissao: string;
  salarioBase: string;
  horasSemanais: string;
  dataEmissao: string;
}

export function formatarDataBR(dataISO: string): string {
  if (!dataISO) return '';
  const date = new Date(dataISO);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function formatarSalario(salario: string | number): string {
  if (!salario) return 'R$ 0,00';
  const valor = typeof salario === 'string' ? parseFloat(salario) : salario;
  return `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function truncarTexto(texto: string, maxLength: number): string {
  if (!texto) return '';
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength - 3) + '...';
}

export function prepararDadosEtiqueta(data: ContractData): EtiquetaData {
  const hoje = new Date();
  const dataEmissao = `${hoje.getDate().toString().padStart(2, '0')}/${(hoje.getMonth() + 1).toString().padStart(2, '0')}/${hoje.getFullYear()}`;

  return {
    empregadorNome: truncarTexto(String(data.EMPREGADOR_NOME || ''), 35),
    empregadorDoc: String(data.EMPREGADOR_CPF || ''),
    empregadoNome: truncarTexto(String(data.EMPREGADO_NOME || ''), 35),
    empregadoCPF: String(data.EMPREGADO_CPF || ''),
    cargo: truncarTexto(String(data.CARGO || ''), 30),
    cbo: String(data.CBO || ''),
    dataAdmissao: formatarDataBR(String(data.DATA_ADMISSAO || '')),
    salarioBase: formatarSalario(data.SALARIO_BASE || 0),
    horasSemanais: String(data.HORAS_SEMANAIS || '44'),
    dataEmissao
  };
}

export function validarDadosEtiqueta(data: ContractData): { valido: boolean; camposFaltando: string[] } {
  const camposObrigatorios = [
    { campo: 'EMPREGADOR_NOME', label: 'Nome do Empregador' },
    { campo: 'EMPREGADOR_CPF', label: 'CPF/CNPJ do Empregador' },
    { campo: 'EMPREGADO_NOME', label: 'Nome do Empregado' },
    { campo: 'EMPREGADO_CPF', label: 'CPF do Empregado' },
    { campo: 'CARGO', label: 'Cargo' },
    { campo: 'CBO', label: 'CBO' },
    { campo: 'DATA_ADMISSAO', label: 'Data de Admissão' },
    { campo: 'SALARIO_BASE', label: 'Salário Base' },
    { campo: 'HORAS_SEMANAIS', label: 'Horas Semanais' }
  ];

  const camposFaltando: string[] = [];

  camposObrigatorios.forEach(({ campo, label }) => {
    if (!data[campo] || String(data[campo]).trim() === '') {
      camposFaltando.push(label);
    }
  });

  return {
    valido: camposFaltando.length === 0,
    camposFaltando
  };
}
