(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const theme = document.querySelector('.theme-toggle');
  let preferred;
  try { preferred = localStorage.getItem('oa-theme'); } catch { /* Storage may be disabled. */ }
  function applyTheme(value) {
    document.documentElement.dataset.theme = value;
    if (theme) {
      theme.setAttribute('aria-pressed', String(value === 'dark'));
      theme.setAttribute('aria-label', value === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
  }
  // The HUD identity starts dark; an explicitly saved preference takes precedence.
  applyTheme(preferred === 'light' || preferred === 'dark' ? preferred : 'dark');
  theme?.addEventListener('click', () => {
    preferred = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(preferred);
    try { localStorage.setItem('oa-theme', preferred); } catch { /* Theme still works in memory. */ }
  });

  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  function closeMenu() { nav?.classList.remove('is-open'); menu?.setAttribute('aria-expanded', 'false'); }
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach((anchor) => anchor.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  const status = document.querySelector('#action-status');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-category]')];
  filters.forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
    let count = 0;
    projects.forEach((project) => {
      project.hidden = filter !== 'todos' && !project.dataset.category.split(' ').includes(filter);
      if (!project.hidden) count++;
    });
    if (status) status.textContent = `${count} ${count === 1 ? 'projeto exibido' : 'projetos exibidos'}.`;
  }));

  // Historical p95 values, milliseconds. Source: docs/estudo-de-quadros.md.
  const measurements = { A: [529.8, 10.1], B: [359.9, 10.1], C: [300.1, 10.1], D: [80.1, 20], E: [80.1, 10.2], F: [80.1, 10.2] };
  const scenario = document.querySelector('#scenario');
  scenario?.addEventListener('change', () => {
    const values = measurements[scenario.value];
    if (!values) return;
    ['legacy', 'cached'].forEach((renderer, index) => {
      document.querySelector(`#${renderer}-bar`).style.width = `${values[index] / 550 * 100}%`;
      document.querySelector(`#${renderer}-value`).textContent = `${values[index].toLocaleString('pt-BR', {minimumFractionDigits: 1, maximumFractionDigits: 1})} ms`;
    });
    document.querySelector('#chart-note').textContent = `Escala comum de 0 a 550 ms. Comparação do cenário ${scenario.value}. Legacy: ${values[0].toLocaleString('pt-BR')} ms; cached: ${values[1].toLocaleString('pt-BR')} ms de p95.`;
  });
})();
