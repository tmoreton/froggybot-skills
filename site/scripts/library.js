const state = { catalog: null, tab: 'skills', category: 'All', query: '' };
const grid = document.querySelector('[data-grid]');
const status = document.querySelector('[data-status]');
const categories = document.querySelector('[data-categories]');
const search = document.querySelector('[data-search]');

const searchable = (item) => [item.name, item.description, item.category, item.author, ...(item.tags || []), ...(item.actions || [])]
  .filter(Boolean).join(' ').toLowerCase();

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const riskLabel = (risk) => ({
  interactive: 'Approval before actions',
  sandbox: 'Runs in a sandbox',
  read: 'Read-only or local',
}[risk] || 'Access reviewed before use');

function visibleCatalog(catalog) {
  const enabledTools = catalog.tools.filter((tool) => tool.enabled !== false);
  const toolIds = new Set(enabledTools.map((tool) => tool.id));
  return {
    tools: enabledTools.filter((tool) => tool.listed !== false),
    skills: catalog.skills.filter((skill) => (skill.requiredToolIds || []).every((id) => toolIds.has(id))),
  };
}

function addBadge(parent, text, featured = false) {
  parent.append(element('span', `badge${featured ? ' featured' : ''}`, text));
}

function card(item, kind) {
  const article = element('article', 'catalog-card');
  const top = element('div', 'card-top');
  top.append(element('span', `card-mark${kind === 'tool' ? ' tool' : ''}`, kind === 'skill' ? 'S' : 'T'));
  const badges = element('div', 'badges');
  if (item.featured) addBadge(badges, 'Featured', true);
  addBadge(badges, item.category || 'General');
  top.append(badges);
  article.append(top, element('h2', '', item.name), element('p', '', item.description), element('p', 'reviewed', `Reviewed · ${item.author || 'FroggyBot'}`));

  const details = element('div', 'detail-list');
  const values = kind === 'skill'
    ? ((item.requiredToolIds || []).length ? [`Uses ${item.requiredToolIds.length} ${item.requiredToolIds.length === 1 ? 'tool' : 'tools'}`] : ['Instructions only'])
    : [...(item.actions || []).slice(0, 3), riskLabel(item.risk)];
  values.forEach((value) => details.append(element('span', 'detail', value)));
  article.append(details);

  const link = element('a', 'button');
  link.href = `https://app.froggybot.com/app?${kind}=${encodeURIComponent(item.id)}`;
  link.append(element('span', '', 'Add to a FroggyBot'), element('span', '', '→'));
  article.append(link);
  return article;
}

function renderCategories(items) {
  const values = ['All', ...new Set(items.map((item) => item.category || 'General').sort())];
  if (!values.includes(state.category)) state.category = 'All';
  categories.replaceChildren(...values.map((value) => {
    const button = element('button', 'category', value);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(value === state.category));
    button.addEventListener('click', () => { state.category = value; render(); });
    return button;
  }));
}

function render() {
  if (!state.catalog) return;
  const items = state.catalog[state.tab];
  renderCategories(items);
  const query = state.query.trim().toLowerCase();
  const visible = items
    .filter((item) => state.category === 'All' || (item.category || 'General') === state.category)
    .filter((item) => !query || searchable(item).includes(query))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
  grid.replaceChildren(...(visible.length ? visible.map((item) => card(item, state.tab === 'skills' ? 'skill' : 'tool')) : [element('p', 'empty', 'No matches yet. Try another search or category.') ]));
  status.hidden = true;
}

document.querySelectorAll('[data-tab]').forEach((button) => {
  button.addEventListener('click', () => {
    state.tab = button.dataset.tab;
    state.category = 'All';
    state.query = '';
    search.value = '';
    search.placeholder = state.tab === 'skills' ? 'Search skills' : 'Search tools and actions';
    document.querySelectorAll('[data-tab]').forEach((tab) => tab.setAttribute('aria-selected', String(tab === button)));
    render();
  });
});
search.addEventListener('input', () => { state.query = search.value; render(); });

fetch('/catalog.json', { cache: 'no-cache' })
  .then((response) => {
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    return response.json();
  })
  .then((catalog) => {
    state.catalog = visibleCatalog(catalog);
    document.querySelectorAll('[data-skill-count]').forEach((node) => { node.textContent = state.catalog.skills.length; });
    document.querySelectorAll('[data-tool-count]').forEach((node) => { node.textContent = state.catalog.tools.length; });
    render();
  })
  .catch(() => { status.textContent = 'The library could not load. Please try again shortly.'; });
