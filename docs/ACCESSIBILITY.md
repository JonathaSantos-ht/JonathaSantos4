# Acessibilidade — WCAG 2.1 AA (Checklist do projeto)

## Navegação por Teclado
- [x] Todos os links, botões e inputs recebem foco (`:focus-visible`, `--ring`).
- [x] Menu hambúrguer com `aria-expanded` e `aria-controls`.
- [x] Submenus abrindo por `:focus-within`.
- [x] Modal com `role="dialog"` e `aria-hidden`.

## Estrutura Semântica
- [x] `header`, `nav[aria-label]`, `main`, `section[aria-labelledby]`, `footer`.

## Contraste
- [x] Base ≥ 4.5:1.
- [x] Toggle de alto contraste (Alt+H) + `prefers-contrast: more`.

## Leitores de Tela
- [x] `alt` em imagens, `aria-live` em toasts.

## Skip Link
- [x] Link “Pular para o conteúdo” (inserido via JS).
