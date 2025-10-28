# ONG Reverdecer 

---

## 📌 Sumário
- [Visão Geral](#visão-geral)
- [Estratégia de Versionamento (Git/GitHub)](#estratégia-de-versionamento-gitgithub)
  - [Fluxo GitFlow](#fluxo-gitflow)
  - [Commits Semânticos](#commits-semânticos)
  - [Releases (SemVer)](#releases-semver)
  - [Issues, PRs e Milestones](#issues-prs-e-milestones)
- [Acessibilidade — WCAG 2.1 Nível AA](#acessibilidade--wcag-21-nível-aa)
  - [O que foi implementado](#o-que-foi-implementado)
  - [Como validar rapidamente](#como-validar-rapidamente)
- [Otimização para Produção](#otimização-para-produção)
  - [Minificação e Build](#minificação-e-build)
  - [Imagens](#imagens)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Executar Localmente](#como-executar-localmente)
- [Deploy no GitHub Pages](#deploy-no-github-pages)
- [Checklists de Entrega](#checklists-de-entrega)
- [Créditos e Licença](#créditos-e-licença)

---

## Visão Geral

O projeto **ONG Reverdecer** consiste em um site institucional simples e funcional, com páginas **Início**, **Projetos** e **Cadastro**, além de uma área de **Doações** e **Contato** padronizada em todas as páginas.

Principais pontos técnicos:
- **HTML/CSS/JS** puros (sem frameworks), foco em **simplicidade** e **acessibilidade**.
- **Validação de formulário** com **consistência de dados** (e-mail, **CPF** e **CEP**), com **máscaras automáticas** (formatação dinâmica enquanto digita).
- **Persistência local** de envio do formulário via **LocalStorage** (simulação).
- Seções **Doação** (PIX, transferência, recorrente) e **Contato** (telefone, e‑mail, WhatsApp, endereço) uniformes nas 3 páginas.
- **Build de produção** em `/dist` com **CSS/JS minificados**.

> **Observação**: o código-fonte original **não foi modificado visualmente** para esta entrega; os aprimoramentos de produção e acessibilidade foram feitos **sem quebrar a interface** existente.

---

## Estratégia de Versionamento (Git/GitHub)

### Fluxo GitFlow

Ramos principais:
- `main` → produção (estável)
- `develop` → integração contínua (próxima release)

Ramos auxiliares:
- `feature/<descrição-curta>` → novas funcionalidades
- `release/<x.y.z>` → preparação de release
- `hotfix/<x.y.z>` → correções urgentes a partir da `main`

Exemplo (resumo):
```bash
# iniciar repositório
git init
git add .
git commit -m "feat: bootstrap do projeto"
git branch -M main
git checkout -b develop

# criar/encerrar uma feature
git checkout -b feature/validacao-form
# ...codifica...
git commit -m "feat(form): validação de CPF/CEP com máscaras"
git checkout develop
git merge --no-ff feature/validacao-form -m "merge: feature validação de formulário"

# preparar release
git checkout -b release/1.0.0
git commit -m "chore(release): 1.0.0"
git tag -a v1.0.0 -m "Release 1.0.0 — entrega final"
git checkout main && git merge --no-ff release/1.0.0 -m "release: v1.0.0"
git checkout develop && git merge --no-ff release/1.0.0

# correção urgente (hotfix)
git checkout -b hotfix/1.0.1 main
git commit -m "fix(mask): ajuste de formatação no CEP"
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git checkout main && git merge --no-ff hotfix/1.0.1 -m "hotfix: v1.0.1"
git checkout develop && git merge --no-ff hotfix/1.0.1
```

### Commits Semânticos

Use **Conventional Commits** para o histórico ficar limpo e avaliável:
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` documentação (README, comentários)
- `style:` formatação (espaços, vírgulas, ponto‑e‑vírgula, etc.)
- `refactor:` refatoração sem mudar comportamento
- `test:` testes
- `chore:` tarefas diversas (CI, build, dependências)

**Exemplos**:  
`feat(form): máscaras e validação de CPF/CEP`  
`fix(a11y): foco visível no menu ao usar teclado`

### Releases (SemVer)

Versões seguem **SemVer** (`MAJOR.MINOR.PATCH`):
- `MAJOR` (quebra de compatibilidade),
- `MINOR` (novas funcionalidades retrocompatíveis),
- `PATCH` (correções).

Crie tags anotadas: `git tag -a v1.0.0 -m "Release 1.0.0"`.

### Issues, PRs e Milestones

- **Issues**: abrir para cada bug/feature com passos, esperado e evidências.
- **Pull Requests**: título semântico, descrição, checklist de testes manuais.
- **Milestones**: agrupar issues por releases (`v1.0.0`, `v1.1.0`, etc.).

---

## Acessibilidade — WCAG 2.1 Nível AA

### O que foi implementado
- **Navegação por teclado**: todos os links e campos são focáveis; foco visível.
- **Estrutura semântica**: uso de `header`, `nav`, `main`, `section`, `footer` e `aria-labelledby` nas seções.
- **Contraste**: paleta com contraste alto sobre fundos escuros (≥ 4.5:1 para texto normal).
- **Leitores de tela**: rótulos associados aos inputs; botões com `aria-*` quando aplicável; mensagens de feedback claras.
- **Boas práticas gerais**: textos alternativos em imagens essenciais, títulos hierárquicos e ordem lógica do conteúdo.

> Observação: caso a banca exija **alto contraste alternável**, recomenda-se a classe `contrast-high` no `<body>` ativada por um botão ou atalho; a estrutura de CSS atual suporta isso sem quebrar a UI.

### Como validar rapidamente
1. Use **Tab/Shift+Tab** e confirme o foco visível em todos os elementos interativos.
2. Verifique níveis de contraste (≥ 4.5:1) com **WebAIM Contrast Checker**.
3. Faça uma leitura com **NVDA/VoiceOver** em trechos de navegação e no formulário.
4. Em telas pequenas, teste navegação por teclado no **menu**.

---

## Otimização para Produção

### Minificação e Build
A pasta **`/dist`** contém os arquivos **minificados** para servir em produção:
```
/dist
├─ index.html
├─ projetos.html
├─ cadastro.html
├─ css/
│  └─ style.min.css   # versão minificada
└─ js/
   └─ app.min.js      # versão minificada
```
As páginas do `/dist` já referenciam `css/style.min.css` e `js/app.min.js`.

### Imagens
Para reduzir tamanho mantendo qualidade, recomenda-se (exemplos):
- **Squoosh (CLI)**: `npx @squoosh/cli --mozjpeg "{quality:75}" img/*.jpg`
- **Imagemin** ou **TinyPNG** (web) para `.png`/`.webp`

---

## Estrutura de Pastas
```
/
├─ index.html
├─ projetos.html
├─ cadastro.html
├─ css/
│  └─ style.css
├─ js/
│  └─ app.js
└─ dist/              # build para produção (minificado)
   ├─ index.html
   ├─ projetos.html
   ├─ cadastro.html
   ├─ css/style.min.css
   └─ js/app.min.js
```

---

## Como Executar Localmente
1. Faça o download/clonagem do repositório.
2. **Abra `index.html` no navegador** (duplo clique já funciona).
3. Para avaliação do build, abra os arquivos dentro de `/dist`.

> Não há dependências nem servidor local obrigatório — é HTML/CSS/JS puros.

---

## Deploy no GitHub Pages
1. Suba o repositório como **público**.
2. Em **Settings → Pages**, publique **a pasta `/dist`** (via GitHub Pages).  
   - Alternativamente, publique a raiz do projeto e aponte manualmente para os arquivos minificados.

> Se preferir CI/CD, adicione um workflow de Actions para publicar `/dist` a cada push na `main`.

---

## Checklists de Entrega

**Git/GitHub**
- [x] GitFlow aplicado (main/develop/feature/release/hotfix)
- [x] Histórico de commits semântico
- [x] Tags de release `vX.Y.Z` (SemVer)
- [x] Issues/PRs/milestones (sugestão de uso)

**Acessibilidade (WCAG 2.1 AA)**
- [x] Teclado: foco visível e fluxo lógico
- [x] Estrutura semântica e rótulos de formulário
- [x] Contraste ≥ 4.5:1
- [x] Suporte básico a leitores de tela

**Produção**
- [x] CSS/JS/HTML minificados em `/dist`
- [x] Diretrizes de otimização de imagens

---

## Créditos e Licença
- Autor(a): **[Jonatha Santos]**
- Disciplina/Instituição: **[Desenvolvimento Front-End Para Web]**

> **URL do GitHub Pages (produção):https://jonathasantos-ht.github.io/JonathaSantos4/
