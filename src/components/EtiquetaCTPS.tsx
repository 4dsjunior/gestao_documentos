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
          *, *::before, *::after {
            box-sizing: border-box;
          }

          html, body {
            width: 100%;
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            visibility: visible;
          }

          body * {
            visibility: hidden;
          }
          .etiqueta-container, .etiqueta-container * {
            visibility: visible;
          }

          .etiqueta-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .etiqueta-ctps {
            width: 7.5cm;
            height: 7.5cm;
            padding: 3mm;
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
