import { ContractData } from '../utils/contractTemplates';
import { prepararDadosEtiqueta } from '../utils/etiquetaUtils';

interface EtiquetaCTPSProps {
  data: ContractData;
}

export default function EtiquetaCTPS({ data }: EtiquetaCTPSProps) {
  const etiqueta = prepararDadosEtiqueta(data);

  return (
    <div className="etiqueta-container">
      <style>{`
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @page {
            size: 7.5cm 7.5cm;
            margin: 0;
          }

          html, body {
            width: 7.5cm;
            height: 7.5cm;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }

          body * {
            visibility: hidden;
          }

          .etiqueta-container {
            visibility: visible;
            position: fixed;
            left: 0;
            top: 0;
            width: 7.5cm;
            height: 7.5cm;
            margin: 0;
            padding: 0;
          }

          .etiqueta-container * {
            visibility: visible;
          }

          .etiqueta-ctps {
            width: 7.5cm !important;
            height: 7.5cm !important;
            max-width: 7.5cm;
            max-height: 7.5cm;
            padding: 3mm;
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.2;
            overflow: hidden;
            box-sizing: border-box;
            border: 1px solid #000;
            background: white;
            color: black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-after: avoid;
            page-break-inside: avoid;
          }

          .etiqueta-ctps-header {
            text-align: center;
            font-weight: bold;
            font-size: 10pt;
            margin-bottom: 2mm;
            padding-bottom: 1mm;
            border-bottom: 1px solid #000;
          }

          .etiqueta-ctps-secao {
            margin-bottom: 2mm;
          }

          .etiqueta-ctps-label {
            font-weight: bold;
            font-size: 8pt;
            margin-bottom: 0.5mm;
          }

          .etiqueta-ctps-valor {
            font-size: 8.5pt;
            margin-bottom: 1mm;
            word-wrap: break-word;
          }

          .etiqueta-ctps-rodape {
            text-align: center;
            font-size: 7pt;
            margin-top: auto;
            padding-top: 1mm;
            border-top: 1px solid #000;
          }

          .etiqueta-ctps-info-linha {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1mm;
            font-size: 8pt;
          }

          .etiqueta-ctps-info-item {
            flex: 1;
          }
        }

        @media screen {
          .etiqueta-container {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: #f5f5f5;
          }

          .etiqueta-ctps {
            width: 7.5cm;
            height: 7.5cm;
            padding: 3mm;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 9pt;
            line-height: 1.2;
            border: 2px solid #000;
            box-sizing: border-box;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .etiqueta-ctps-header {
            text-align: center;
            font-weight: bold;
            font-size: 10pt;
            margin-bottom: 2mm;
            padding-bottom: 1mm;
            border-bottom: 1px solid #000;
          }

          .etiqueta-ctps-secao {
            margin-bottom: 2mm;
          }

          .etiqueta-ctps-label {
            font-weight: bold;
            font-size: 8pt;
            margin-bottom: 0.5mm;
            color: #333;
          }

          .etiqueta-ctps-valor {
            font-size: 8.5pt;
            margin-bottom: 1mm;
            word-wrap: break-word;
          }

          .etiqueta-ctps-rodape {
            text-align: center;
            font-size: 7pt;
            margin-top: auto;
            padding-top: 1mm;
            border-top: 1px solid #000;
            color: #666;
          }

          .etiqueta-ctps-info-linha {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1mm;
            font-size: 8pt;
          }

          .etiqueta-ctps-info-item {
            flex: 1;
          }
        }
      `}</style>

      <div className="etiqueta-ctps">
        <div className="etiqueta-ctps-header">
          CONTRATO DE TRABALHO
        </div>

        <div className="etiqueta-ctps-content">
          <div className="etiqueta-ctps-secao">
            <div className="etiqueta-ctps-label">EMPREGADOR:</div>
            <div className="etiqueta-ctps-valor">{etiqueta.empregadorNome}</div>
            <div className="etiqueta-ctps-valor" style={{ fontSize: '7.5pt' }}>
              CPF/CNPJ: {etiqueta.empregadorDoc}
            </div>
          </div>

          <div className="etiqueta-ctps-secao">
            <div className="etiqueta-ctps-label">EMPREGADO:</div>
            <div className="etiqueta-ctps-valor">{etiqueta.empregadoNome}</div>
            <div className="etiqueta-ctps-valor" style={{ fontSize: '7.5pt' }}>
              CPF: {etiqueta.empregadoCPF}
            </div>
          </div>

          <div className="etiqueta-ctps-secao">
            <div className="etiqueta-ctps-label">FUNCAO:</div>
            <div className="etiqueta-ctps-valor">{etiqueta.cargo}</div>
            <div className="etiqueta-ctps-info-linha">
              <div className="etiqueta-ctps-info-item">
                <strong>CBO:</strong> {etiqueta.cbo}
              </div>
            </div>
          </div>

          <div className="etiqueta-ctps-secao">
            <div className="etiqueta-ctps-info-linha">
              <div className="etiqueta-ctps-info-item">
                <strong>ADMISSAO:</strong><br />{etiqueta.dataAdmissao}
              </div>
              <div className="etiqueta-ctps-info-item" style={{ textAlign: 'right' }}>
                <strong>JORNADA:</strong><br />{etiqueta.horasSemanais}h/sem
              </div>
            </div>
            <div className="etiqueta-ctps-info-linha">
              <div className="etiqueta-ctps-info-item">
                <strong>SALARIO:</strong> {etiqueta.salarioBase}
              </div>
            </div>
          </div>
        </div>

        <div className="etiqueta-ctps-rodape">
          
        </div>
      </div>
    </div>
  );
}