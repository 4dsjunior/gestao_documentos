import { ContractData } from './contractTemplates';
import { normalizeText, cleanDocumentNumber } from './validation';

export function exportToCSV(data: ContractData, type: 'domestico' | 'rural' | 'urbano'): void {
  const csvHeader = 'EMPREGADOR_NOME,EMPREGADOR_CPF,EMPREGADOR_ENDERECO,EMPREGADO_NOME,EMPREGADO_CPF,EMPREGADO_ENDERECO,CARGO,CBO,DATA_ADMISSAO,SALARIO_BASE,UNIDADE_PAGAMENTO,HORAS_SEMANAIS,TIPO_JORNADA,REGIME_TRABALHISTA,REGIME_PREVIDENCIARIO,NATUREZA_ATIVIDADE,LOCAL_TRABALHO_NOME,LOCAL_TRABALHO_INSCRICAO,LOCAL_ASSINATURA,DATA_ASSINATURA_DIA,DATA_ASSINATURA_MES,DATA_ASSINATURA_ANO,FORO_COMARCA';

  const normalizedData: ContractData = {};
  Object.keys(data).forEach(key => {
    if (key.includes('CPF') || key.includes('CNPJ')) {
      normalizedData[key] = cleanDocumentNumber(String(data[key]));
    } else {
      normalizedData[key] = normalizeText(data[key]);
    }
  });

  const csvRow = [
    normalizedData.EMPREGADOR_NOME || '',
    normalizedData.EMPREGADOR_CPF || '',
    normalizedData.EMPREGADOR_ENDERECO || '',
    normalizedData.EMPREGADO_NOME || '',
    normalizedData.EMPREGADO_CPF || '',
    normalizedData.EMPREGADO_ENDERECO || '',
    normalizedData.CARGO || '',
    normalizedData.CBO || '',
    normalizedData.DATA_ADMISSAO || '',
    normalizedData.SALARIO_BASE || '',
    normalizedData.UNIDADE_PAGAMENTO || '',
    normalizedData.HORAS_SEMANAIS || '',
    normalizedData.TIPO_JORNADA || '',
    normalizedData.REGIME_TRABALHISTA || '',
    normalizedData.REGIME_PREVIDENCIARIO || '',
    normalizedData.NATUREZA_ATIVIDADE || '',
    normalizedData.LOCAL_TRABALHO_NOME || '',
    normalizedData.LOCAL_TRABALHO_INSCRICAO || '',
    normalizedData.LOCAL_ASSINATURA || '',
    normalizedData.DATA_ASSINATURA_DIA || '',
    normalizedData.DATA_ASSINATURA_MES || '',
    normalizedData.DATA_ASSINATURA_ANO || '',
    normalizedData.FORO_COMARCA || ''
  ].map(value => `"${String(value).replace(/"/g, '""')}"`).join(',');

  const csvContent = `${csvHeader}\n${csvRow}`;
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `contrato_${type}_${Date.now()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportToPDF(contractText: string, type: 'domestico' | 'rural' | 'urbano'): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Por favor, permita pop-ups para exportar o PDF');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Contrato de Trabalho ${type.charAt(0).toUpperCase() + type.slice(1)}</title>
        <style>
          @page {
            size: A4;
            margin: 2.5cm;
          }
          body {
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #000;
            background: #fff;
            margin: 0;
            padding: 20px;
          }
          h1 {
            font-size: 14pt;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 12pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 10px;
          }
          p {
            margin: 8px 0;
            text-align: justify;
          }
          .contract-content {
            white-space: pre-wrap;
          }
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="contract-content">${contractText.replace(/\n/g, '<br>')}</div>
        <script>
          window.onload = function() {
            window.focus();
            window.print();
            
            // Fecha a janela após imprimir/cancelar
            setTimeout(function() {
              window.close();
            }, 100);
            
            // Fallback para navegadores diferentes
            window.onafterprint = function() {
              window.close();
            };
            
            // Detecta cancelamento da impressão (ESC)
            var printInProgress = true;
            window.matchMedia('print').addListener(function(mql) {
              if (!mql.matches && printInProgress) {
                printInProgress = false;
                window.close();
              }
            });
          };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function parseCSV(csvContent: string): ContractData | null {
  try {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) return null;

    const headers = lines[0].split(',').map(h => h.trim());
    
    // This regex handles quoted fields, including commas inside them
    const values = lines[1].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
      ?.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"')) || [];

    if (headers.length !== values.length) {
      console.error('CSV header and value count mismatch.');
      return null;
    }

    const data: ContractData = {};
    headers.forEach((header, index) => {
      data[header] = values[index] || '';
    });

    return data;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return null;
  }
}
