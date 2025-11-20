import { ResumeData } from './types';

export const APP_VERSION = '1.0.0';
export const ADMIN_EMAIL = 'edivaldopereiralimajunior@gmail.com';

// Data extracted from the provided PDF/OCR
export const EDIVALDO_RESUME: ResumeData = {
  personalInfo: {
    name: "Edivaldo.Junior",
    role: "Desenvolvedor de Software Python / Consultor Tech",
    contact: {
      location: "Jacobina-BA (Disponibilidade 100% Remoto)",
      email: "edivaldopereiralimajunior@gmail.com",
      phone: "(74) 9 9908-1133",
      linkedin: "https://www.linkedin.com/in/edivaldojuniordev/",
      github: "https://github.com/Edivaldo-Junior-Dev"
    }
  },
  sections: [
    {
      title: "Sobre",
      icon: "ℹ️",
      content: [
        "Engenheiro de Software em formação com a missão de construir a ponte entre o código e o mundo físico através da Robótica e da Inteligência Artificial. Minha paixão é desenvolver sistemas que não apenas processam dados, mas também percebem, decidem e atuam no ambiente real.",
        "Atualmente, estou consolidando minha base acadêmica na faculdade de Engenharia de Software e, ao mesmo tempo, aprofundando minhas competências práticas no programa Fundamentos em Nuvem AWS + IA da Escola da Nuvem, focando em Machine Learning e infraestrutura escalável — pilares para a robótica moderna.",
        "Destaque de Projeto: Sistema 'CEC - Grupo LAUG'. Liderei a transformação de uma simples planilha em uma aplicação desktop completa para análise de desempenho, gerenciando todo o ciclo de vida do desenvolvimento: Arquitetura da Solução, Desenvolvimento Backend (Python), Frontend (PySide6/Qt) e Entrega Profissional (Instalador).",
        "Direcionamento de Carreira: Meu objetivo é atuar como Engenheiro de Robótica / Automação, aplicando habilidades em: Visão Computacional (OpenCV), Sistemas de Controle e Navegação (ROS, SLAM), Machine Learning aplicado a sistemas autônomos e Integração de Hardware e Software.",
        "Se sua equipe está construindo o futuro com sistemas inteligentes e autônomos, estou pronto para aplicar minha energia e base sólida em Python."
      ],
      query: "Fale sobre sua missão na Robótica, estudos em AWS e visão de carreira."
    },
    {
      title: "Lifelong Learning & PDI",
      icon: "📈",
      content: [
        "Análise de Momento de Carreira (SWOT Técnico):",
        "• Pontos Fortes: Aprendizado Contínuo (capacidade de absorver Cloud/IAM rapidamente), Troubleshooting (diagnóstico de erros complexos), Documentação Clara e Curiosidade Técnica ('Por que' vs 'Como').",
        "• Pontos de Desenvolvimento: Aprofundar em IaC (Terraform/CloudFormation), Gestão de Múltiplos Ambientes (Dev/Test/Prod), Otimização de Custos (FinOps/CloudWatch) e Scripting (Bash/Python).",
        "Metas SMART (Plano de Ação Curto Prazo):",
        "1. Metodologias Ágeis: Obter certificação PSM I ou CSM em 3 meses para solidificar conhecimento teórico.",
        "2. Análise de Dados: Dominar Amazon QuickSight ou Power BI e criar 2 dashboards completos em 4 meses.",
        "3. Gestão de Tempo: Aplicar Matriz de Eisenhower e Trello diariamente por 3 meses.",
        "4. Negociação: Ler 'Como Chegar ao Sim' e aplicar técnicas em projetos de grupo.",
        "Visão de Médio Prazo:",
        "Foco em aprimorar a gestão de stakeholders, métricas de projeto (KPIs/Sprint) e priorização de tarefas críticas para atuar como um Analista de Projetos/Desenvolvedor completo."
      ],
      query: "Quais são suas metas de aprendizado (PDI) e pontos de melhoria?"
    },
    {
      title: "Objetivo",
      icon: "🎯",
      content: "Busco a oportunidade de atuar como Desenvolvedor aplicando minha paixão por tecnologia e meus conhecimentos em Python, Django e JavaScript para colaborar com a equipe, aprender continuamente e contribuir para o desenvolvimento de soluções digitais inovadoras em um ambiente colaborativo e 100% remoto.",
      query: "Qual é o seu objetivo profissional?"
    },
    {
      title: "Resumo Profissional",
      icon: "💼",
      content: "Desenvolvedor de Software focado em Python, com uma jornada de carreira marcada pela evolução contínua e pela paixão em transformar desafios em soluções tecnológicas. Minha experiência prática abrange desde a criação de aplicações desktop com PySide6 até o desenvolvimento de sistemas web escaláveis com o framework Django. Sou um profissional proativo, organizado e com rápida capacidade de aprendizado, buscando ativamente minha primeira oportunidade formal para aplicar minhas habilidades em um ambiente inovador e colaborativo.",
      query: "Poderia fazer um resumo profissional da sua carreira?"
    },
    {
      title: "Hard Skills",
      icon: "🛠️",
      content: [
        "Python (Avançado)",
        "JavaScript (Básico)",
        "SQL",
        "Django Framework",
        "PySide6 (Qt)",
        "Git / GitHub",
        "Programação Orientada a Objetos (POO)",
        "Estrutura de Dados",
        "API Rest",
        "Metodologias Ágeis (Scrum, Kanban)",
        "Agentes de IA: Conhecimento no uso de SDKs ou frameworks de agentes, como Strands Agents SDK"
      ],
      query: "Quais são suas principais Hard Skills?"
    },
    {
      title: "Projetos de Desenvolvimento",
      icon: "🚀",
      content: [
        "Gerenciador de Projetos Web: Aplicação completa para gestão de clientes e projetos utilizando Python e Django. Responsável pela arquitetura, ORM e lógica de negócios.",
        "Sistema de Análise de Desempenho (CEC_Grupo LAUG): Aplicação Desktop (PySide6) transformando planilhas complexas em dashboard interativo. Desenvolvimento Full End-to-End."
      ],
      query: "Quais projetos de desenvolvimento você já realizou?"
    },
    {
      title: "Formação Acadêmica",
      icon: "🎓",
      content: [
        "Análise e Desenvolvimento de Sistemas - UNIASSELVI (Cursando 3º Semestre, Previsão: 2025)",
        "Técnico em Eletromecânica - CETEC (Concluído 2024)"
      ],
      query: "Qual é a sua formação acadêmica?"
    },
    {
      title: "Experiência Profissional",
      icon: "🏢",
      content: [
        "Grupo Laug (Mar/2025 - Atual): Desenvolvedor Python e Consultor Tech. Desenvolvimento de ferramentas internas e otimização de processos.",
        "INSS (Jan/2012 - Jan/2014): Estagiário de Tecnologia. Facilitador de inclusão digital e suporte técnico à equipe interna."
      ],
      query: "Conte sobre sua experiência profissional."
    },
    {
      title: "Liderança e Vida Militar (APVO)",
      icon: "🎖️",
      content: [
        "Diretor de Comunicações na APVO (Desde Dez/2024): Lidero a comunicação estratégica da Associação de Praças e Veteranos. Esta função não é apenas administrativa; é um exercício diário de 'Gestão de Stakeholders' e 'Comunicação Corporativa'. Aprendi a alinhar expectativas entre diferentes patentes (níveis hierárquicos), similar a alinhar devs, POs e stakeholders em um projeto de TI.",
        "Certificação de Excelência (Soldado Edivaldo - Diploma DAM-R2): Condecorado em 01/12/2024. Este diploma é a prova cabal de RESILIÊNCIA e ÉTICA. No mundo militar, você não ganha certificados por participar; você ganha por superar limites sob pressão extrema. Isso prova que sou o desenvolvedor que não 'quebra' quando o servidor cai na sexta-feira à noite.",
        "Tradução de Valores Militares para Tech (O Diferencial Competitivo):",
        "1. Missão Dada é Missão Cumprida (Deadline Compliance): No exército, falhar no prazo não é opção. Em TI, isso significa que se eu me comprometo com uma entrega na Sprint, farei o impossível para entregar.",
        "2. Disciplina Operacional (Quality Assurance): Um soldado cuida do seu equipamento obsessivamente. Um desenvolvedor 'soldado' cuida do seu código. Escrevo código limpo não porque 'é bonito', mas porque a disciplina exige que o próximo a ler meu código entenda o que fiz.",
        "3. Espírito de Corpo (Teamwork & Agile): Ninguém vence uma guerra sozinho. Eu trago para a Squad a mentalidade de que o sucesso do Time está acima do ego individual. Code Review para mim não é crítica, é proteção do colega e do produto."
      ],
      query: "Como sua experiência militar na APVO te faz um programador melhor?"
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      content: [
        "Comunicação Clara e Objetiva",
        "Proatividade e Aprendizado Contínuo",
        "Resolução de Problemas",
        "Trabalho em Equipe",
        "Pensamento Crítico"
      ],
      query: "Quais são suas Soft Skills?"
    }
  ]
};

export const SYSTEM_PROMPT = `
Você é o "Agente de Carreira Autônomo" de Edivaldo.Junior.
Sua missão é representar Edivaldo.Junior profissionalmente, responder perguntas sobre sua experiência, habilidades e projetos.

DADOS DO PERFIL (MEMÓRIA):
${JSON.stringify(EDIVALDO_RESUME, null, 2)}

DIRETRIZES DE PERSONALIDADE:
1. Profissional, confiante e educado.
2. Focado em destacar Hard Skills (Python, Django, SQL) e a paixão por Robótica/IA.
3. AO FALAR DE LIDERANÇA (APVO): Venda isso ativamente! Não apenas liste os fatos.
   - Explique que Edivaldo tem "Casca Grossa" (Resiliência) e "Foco na Missão" (Resultados).
   - Quando falar do Diploma DAM-R2, diga que isso atesta integridade e capacidade de execução sob pressão.
   - Use analogias: "O Exército ensinou disciplina; a Engenharia ensinou lógica. Juntos, formam um desenvolvedor imparável."
4. Se perguntado sobre algo que não está no currículo, seja honesto, mas mencione a rápida capacidade de aprendizado (exemplificada no PDI e estudo de AWS).
5. Use formatação Markdown para deixar as respostas legíveis.
6. Refira-se ao candidato sempre como "Edivaldo.Junior".

Se o usuário perguntar sobre contato, forneça o LinkedIn e Email formatados.
`;