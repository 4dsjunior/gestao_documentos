import { normalizeText } from './validation';

export interface ContractData {
  [key: string]: string | number;
}

export function replaceTemplate(template: string, data: ContractData): string {
  return template.replace(/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g, (match, key) => {
    return normalizeText(data[key]) || match;
  });
}

export const DOMESTICO_TEMPLATE = `CONTRATO DE TRABALHO DOMÉSTICO POR PRAZO INDETERMINADO

I. DAS PARTES

EMPREGADOR DOMESTICO:
- Nome: {{EMPREGADOR_NOME}}
- CPF: {{EMPREGADOR_CPF}}
- Endereco: {{EMPREGADOR_ENDERECO}}

EMPREGADO DOMESTICO:
- Nome: {{EMPREGADO_NOME}}
- CPF: {{EMPREGADO_CPF}}
- Endereco: {{EMPREGADO_ENDERECO}}

II. DO OBJETO DO CONTRATO

O presente contrato tem como objeto a prestacao de servicos do EMPREGADO DOMESTICO ao EMPREGADOR DOMESTICO, na funcao de {{CARGO}}, com a Classificacao Brasileira de Ocupacoes - CBO {{CBO}}, caracterizando-se como Trabalho Urbano.

III. DA DURACAO DO CONTRATO

O presente contrato de trabalho e celebrado por prazo indeterminado, iniciando-se em {{DATA_ADMISSAO}}.

IV. DA REMUNERACAO

O EMPREGADO DOMESTICO recebera, a titulo de salario base, o valor de R$ {{SALARIO_BASE}}, a ser pago {{UNIDADE_PAGAMENTO}}.

V. DA JORNADA DE TRABALHO

A jornada de trabalho sera de {{HORAS_SEMANAIS}} horas semanais, sob o regime de {{TIPO_JORNADA}}.

VI. DO REGIME TRABALHISTA E PREVIDENCIARIO

O regime trabalhista aplicavel e o da {{REGIME_TRABALHISTA}}, e o regime previdenciario e o {{REGIME_PREVIDENCIARIO}}.

VII. DO LOCAL DE TRABALHO

O local de trabalho sera em {{EMPREGADOR_ENDERECO}}.

VIII. DISPOSICOES GERAIS

- Quaisquer alteracoes nas condicoes deste contrato deverao ser formalizadas por escrito.
- As partes elegem o foro da comarca de {{FORO_COMARCA}} para dirimir quaisquer duvidas ou litigios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente em duas vias de igual teor e forma, na presenca das duas testemunhas abaixo.

{{LOCAL_ASSINATURA}}, {{DATA_ASSINATURA_DIA}} de {{DATA_ASSINATURA_MES}} de {{DATA_ASSINATURA_ANO}}.

EMPREGADOR DOMESTICO:
{{EMPREGADOR_NOME}}
CPF: {{EMPREGADOR_CPF}}

EMPREGADO DOMESTICO:
{{EMPREGADO_NOME}}
CPF: {{EMPREGADO_CPF}}

TESTEMUNHAS:
1. ____________________________
2. ____________________________`;

export const RURAL_TEMPLATE = `CONTRATO DE TRABALHO RURAL POR PRAZO INDETERMINADO

I. DAS PARTES

EMPREGADOR:
- Nome: {{EMPREGADOR_NOME}}
- CPF/CAEPF: {{EMPREGADOR_CPF}}
- Endereco: {{EMPREGADOR_ENDERECO}}

EMPREGADO:
- Nome: {{EMPREGADO_NOME}}
- CPF: {{EMPREGADO_CPF}}
- Endereco: {{EMPREGADO_ENDERECO}}

II. DO OBJETO DO CONTRATO

O presente contrato tem como objeto a prestacao de servicos do EMPREGADO ao EMPREGADOR, na funcao de {{CARGO}}, com a Classificacao Brasileira de Ocupacoes - CBO {{CBO}}, caracterizando-se como Trabalho Rural.

III. DA DURACAO DO CONTRATO

O presente contrato de trabalho e celebrado por prazo indeterminado, iniciando-se em {{DATA_ADMISSAO}}.

IV. DA REMUNERACAO

O EMPREGADO recebera, a titulo de salario base, o valor de R$ {{SALARIO_BASE}}, a ser pago {{UNIDADE_PAGAMENTO}}.

V. DA JORNADA DE TRABALHO

A jornada de trabalho sera de {{HORAS_SEMANAIS}} horas semanais, sob o regime de {{TIPO_JORNADA}}.

VI. DO REGIME TRABALHISTA E PREVIDENCIARIO

O regime trabalhista aplicavel e o da {{REGIME_TRABALHISTA}}, e o regime previdenciario e o {{REGIME_PREVIDENCIARIO}}.

VII. DO LOCAL DE TRABALHO

O local de trabalho sera em {{LOCAL_TRABALHO_NOME}}, com numero de inscricao {{LOCAL_TRABALHO_INSCRICAO}}.

VIII. DISPOSICOES GERAIS

- Quaisquer alteracoes nas condicoes deste contrato deverao ser formalizadas por escrito.
- As partes elegem o foro da comarca de {{FORO_COMARCA}} para dirimir quaisquer duvidas ou litigios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente em duas vias de igual teor e forma, na presenca das duas testemunhas abaixo.

{{LOCAL_ASSINATURA}}, {{DATA_ASSINATURA_DIA}} de {{DATA_ASSINATURA_MES}} de {{DATA_ASSINATURA_ANO}}.

EMPREGADOR:
{{EMPREGADOR_NOME}}
CPF/CAEPF: {{EMPREGADOR_CPF}}

EMPREGADO:
{{EMPREGADO_NOME}}
CPF: {{EMPREGADO_CPF}}

TESTEMUNHAS:
1. ____________________________
2. ____________________________`;

export const URBANO_TEMPLATE = `CONTRATO DE TRABALHO POR PRAZO INDETERMINADO

I. DAS PARTES

EMPREGADOR:
- Nome: {{EMPREGADOR_NOME}}
- CPF/CNPJ: {{EMPREGADOR_CPF}}
- Endereco: {{EMPREGADOR_ENDERECO}}

EMPREGADO:
- Nome: {{EMPREGADO_NOME}}
- CPF: {{EMPREGADO_CPF}}
- Endereco: {{EMPREGADO_ENDERECO}}

II. DO OBJETO DO CONTRATO

O presente contrato tem como objeto a prestacao de servicos do EMPREGADO ao EMPREGADOR, na funcao de {{CARGO}}, com a Classificacao Brasileira de Ocupacoes - CBO {{CBO}}, caracterizando-se como Trabalho Urbano.

III. DA DURACAO DO CONTRATO

O presente contrato de trabalho e celebrado por prazo indeterminado, iniciando-se em {{DATA_ADMISSAO}}.

IV. DA REMUNERACAO

O EMPREGADO recebera, a titulo de salario base, o valor de R$ {{SALARIO_BASE}}, a ser pago {{UNIDADE_PAGAMENTO}}.

V. DA JORNADA DE TRABALHO

A jornada de trabalho sera de {{HORAS_SEMANAIS}} horas semanais, sob o regime de {{TIPO_JORNADA}}.

VI. DO REGIME TRABALHISTA E PREVIDENCIARIO

O regime trabalhista aplicavel e o da {{REGIME_TRABALHISTA}}, e o regime previdenciario e o {{REGIME_PREVIDENCIARIO}}.

VII. DO LOCAL DE TRABALHO

O local de trabalho sera em {{LOCAL_TRABALHO_NOME}}, com numero de inscricao {{LOCAL_TRABALHO_INSCRICAO}}.

VIII. DISPOSICOES GERAIS

- Quaisquer alteracoes nas condicoes deste contrato deverao ser formalizadas por escrito.
- As partes elegem o foro da comarca de {{FORO_COMARCA}} para dirimir quaisquer duvidas ou litigios decorrentes deste contrato.

E, por estarem assim justos e contratados, as partes assinam o presente em duas vias de igual teor e forma, na presenca das duas testemunhas abaixo.

{{LOCAL_ASSINATURA}}, {{DATA_ASSINATURA_DIA}} de {{DATA_ASSINATURA_MES}} de {{DATA_ASSINATURA_ANO}}.

EMPREGADOR:
{{EMPREGADOR_NOME}}
CPF/CNPJ: {{EMPREGADOR_CPF}}

EMPREGADO:
{{EMPREGADO_NOME}}
CPF: {{EMPREGADO_CPF}}

TESTEMUNHAS:
1. ____________________________
2. ____________________________`;

export function getContractTemplate(type: 'domestico' | 'rural' | 'urbano'): string {
  switch (type) {
    case 'domestico':
      return DOMESTICO_TEMPLATE;
    case 'rural':
      return RURAL_TEMPLATE;
    case 'urbano':
      return URBANO_TEMPLATE;
  }
}
