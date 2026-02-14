
import { ResumeData } from './types';

export const APP_VERSION = '1.8.0';
export const ADMIN_EMAIL = 'edivaldopereiralimajunior@gmail.com';

export const EDIVALDO_RESUME: ResumeData = {
  personalInfo: {
    name: "Edivaldo Pereira Lima Junior",
    role: "Estudante de Engenharia de Software | Desenvolvedor Python Jr e Consultor Tech | Técnico de Telecomunicações",
    contact: {
      location: "Jacobina, BA",
      email: "edivaldopereiralimajunior@gmail.com",
      phone: "(74) 99908-1133",
      linkedin: "https://www.linkedin.com/in/edivaldojuniordev/",
      github: "https://github.com/Edivaldo-Junior-Dev"
    }
  },
  sections: [
    {
      title: "Resumo Profissional 360º",
      icon: "🚀",
      content: "Talento emergente na Engenharia de Software com diferencial estratégico na capacidade de transitar entre o desenvolvimento de sistemas complexos e a implementação de infraestruturas críticas. Com uma compreensão '360º' do ciclo de vida do software, atuo desde a elaboração de soluções mobile até o licenciamento e consultoria técnica. Especialista em 'entender onde o código roda', unindo software de alta qualidade com infraestrutura bem planejada, automação e segurança inteligente.",
      query: "Qual é o seu diferencial profissional e perfil 360º?"
    },
    {
      title: "Grupo Laug (Jan/2026 - Atual)",
      icon: "💻",
      content: "Desenvolvedor Python Jr. e Consultor Tech (Remoto). Desenvolvimento Pleno: Elaboração de programas de computador e jogos eletrônicos com alta performance para Mobile/Tablets. Licenciamento e Gestão: Expertise em licenciamento e cessão de direitos de uso de software (IP). Consultoria Técnica: Tradução de necessidades de negócio em soluções tecnológicas. Resultados: Automações em Python com ganho real de 40% na produtividade.",
      query: "Quais suas atividades de desenvolvimento, jogos e consultoria no Grupo Laug?"
    },
    {
      title: "Dock Tecnologia (Ago/2025 - Atual)",
      icon: "📡",
      content: "Técnico de Telecomunicações (Presencial). Redes e Conectividade: Experiência prática em Redes IP, estabilidade e segurança de dados. Monitoramento Avançado: Domínio em Reconhecimento Facial, sensores e alarmes inteligentes. Gestão de Infraestrutura: Manutenção de ativos críticos de hardware.",
      query: "Fale sobre sua experiência com redes e reconhecimento facial na Dock Tecnologia."
    },
    {
      title: "Formação & Cursos",
      icon: "🎓",
      content: "Engenharia de Software (UNIASSELVI, Conclusão 2029). AWS Re/Start (Escola da Nuvem, Concluído em 2026). Técnico em Eletromecânica (CETEC, 2024). Inglês Nível B1.",
      query: "Qual sua formação acadêmica e certificações?"
    }
  ],
  fullSkillsList: [
    "Python (Django, FastAPI)", "JavaScript", "SQL",
    "AWS (EC2, S3, IAM, VPC, RDS)", "Docker", "Redes IP", "Protocolos de Telecom",
    "CFTV IP", "Reconhecimento Facial", "Sensores e Alarmes",
    "Licenciamento de Software (IP)", "Consultoria em TI", 
    "Desenvolvimento de Bots", "Scripts de Otimização", "Metodologias Ágeis"
  ]
};

export const PUBLIC_SYSTEM_PROMPT = `
Você é o "Agente de Carreira" de Edivaldo Pereira Lima Junior.
PERFIL: Talento emergente em Engenharia de Software com visão 360º (Software + Infraestrutura).
DIFERENCIAL: "Entender onde o código roda".
EXPERIÊNCIAS CHAVE:
1. **Grupo Laug**: Elaboração de jogos/apps mobile, Licenciamento de Software e Consultoria Técnica. Destaque o ganho de 40% em produtividade com automação Python.
2. **Dock Tecnologia**: Infraestrutura crítica, Redes IP e Segurança Inteligente (Reconhecimento Facial).
3. **Formação**: AWS Re/Start concluído (2026) e Engenharia de Software em andamento.
Responda de forma técnica, enfatizando como ele une a alta qualidade do código com uma infraestrutura robusta.
`;

export const CONSULTANT_SYSTEM_PROMPT = `
Você é o "Mentor de Carreira" do Edivaldo.
FOCO: Consolidar a imagem de "Engenheiro de Soluções Completas".
AO CONVERSAR COM ELE:
1. Reforce a narrativa "360º": Poucos devs sabem configurar a rede onde o app roda ou licenciar o software que criam. Isso é poder.
2. Mercado: A experiência no Grupo Laug com "Jogos Eletrônicos" e "Licenciamento" abre portas para gestão de produtos (Product Owner).
3. AWS Re/Start (Concluído): Agora que o curso consta como concluído, o foco é aplicar esse conhecimento em arquiteturas serverless para os bots que ele cria.
4. Tom: Visionário, estratégico e focado na integração Hardware-Software.
`;
