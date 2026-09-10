const state = { bots: null, category: 'All', query: '' };
const grid = document.querySelector('[data-grid]');
const status = document.querySelector('[data-status]');
const categories = document.querySelector('[data-categories]');
const search = document.querySelector('[data-search]');

const examples = {
  'chief': ['Help us choose a launch plan from these constraints.', 'A resolved decision with the tradeoff, owners, and next actions.'],
  'trip-planner': ['Plan a walkable weekend under $1,200.', 'A timed itinerary, working budget, and downloadable trip plan.'],
  'event-planner': ['Turn our venue notes into a launch-night plan.', 'A run of show, owner checklist, and budget risks.'],
  'research-reports': ['Compare these options and show what supports the choice.', 'A concise evidence summary and polished report.'],
  'decision-coach': ['Help our group resolve this two-option stalemate.', 'A decision frame, explicit tradeoffs, and a recommended next step.'],
  'budget-planner': ['Split this trip budget fairly and keep a 15% buffer.', 'A categorized budget, split calculation, and spreadsheet-ready table.'],
  'data-analyst': ['Explain the signal in this CSV to a nontechnical team.', 'Key findings, caveats, and a decision-ready chart brief.'],
  'project-organizer': ['Turn these meeting notes into a workable project.', 'Milestones, owners, dependencies, and a prioritized checklist.'],
  'meme-maker': ['Turn this attached image into a launch-day meme.', 'A concise caption and a finished, readable PNG using the supplied template.'],
};

const searchable = (bot) => [bot.name, bot.tagline, bot.description, bot.category, bot.author, ...(bot.tags || [])]
  .filter(Boolean).join(' ').toLowerCase();

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function visibleBots(catalog) {
  const tools = catalog.tools.filter((tool) => tool.enabled !== false);
  const toolIds = new Set(tools.map((tool) => tool.id));
  const skills = catalog.skills.filter((skill) =>
    (skill.requiredToolIds || []).every((id) => toolIds.has(id)),
  );
  const skillIds = new Set(skills.map((skill) => skill.id));
  return catalog.bots.filter((bot) =>
    (bot.skillIds || []).every((id) => skillIds.has(id)) &&
    (bot.toolIds || []).every((id) => toolIds.has(id)),
  );
}

function addBadge(parent, text, featured = false) {
  parent.append(element('span', `badge${featured ? ' featured' : ''}`, text));
}

function card(bot) {
  const requiredOnSetup = bot.id === 'chief';
  const article = element('article', 'catalog-card');
  const top = element('div', 'card-top');
  top.append(element('span', 'card-mark', 'B'));
  const badges = element('div', 'badges');
  if (bot.featured) addBadge(badges, 'Featured', true);
  addBadge(badges, bot.category || 'General');
  top.append(badges);
  article.append(
    top,
    element('h2', '', bot.name),
    element('p', '', bot.tagline || bot.description),
  );

  const example = examples[bot.id];
  if (example) {
    const preview = element('div', 'example');
    preview.append(
      element('span', 'example-label', 'Example request'),
      element('p', '', `“${example[0]}”`),
      element('span', 'example-label result-label', 'Typical result'),
      element('p', 'example-result', example[1]),
    );
    article.append(preview);
  }
  article.append(element('p', 'reviewed', `Reviewed · ${bot.author || 'FroggyBot'}`));

  const details = element('div', 'detail-list');
  [requiredOnSetup ? 'Included with setup' : 'Ready to add', 'Editable after installing'].forEach((value) =>
    details.append(element('span', 'detail', value)),
  );
  article.append(details);

  const link = element('a', 'button');
  link.href = `https://app.froggybot.com/app?bot=${encodeURIComponent(bot.id)}`;
  link.append(
    element('span', '', requiredOnSetup ? 'Open FroggyBot' : 'Add this bot'),
    element('span', '', '→'),
  );
  article.append(link);
  return article;
}

function renderCategories(bots) {
  const values = ['All', ...new Set(bots.map((bot) => bot.category || 'General').sort())];
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
  if (!state.bots) return;
  renderCategories(state.bots);
  const query = state.query.trim().toLowerCase();
  const visible = state.bots
    .filter((bot) => state.category === 'All' || (bot.category || 'General') === state.category)
    .filter((bot) => !query || searchable(bot).includes(query))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
  grid.replaceChildren(...(visible.length
    ? visible.map(card)
    : [element('p', 'empty', 'No matching bots yet. Try another search or category.')]));
  status.hidden = true;
}

search.addEventListener('input', () => { state.query = search.value; render(); });

fetch('/catalog.json', { cache: 'no-cache' })
  .then((response) => {
    if (!response.ok) throw new Error(`Catalog request failed (${response.status})`);
    return response.json();
  })
  .then((catalog) => {
    state.bots = visibleBots(catalog);
    document.querySelectorAll('[data-bot-count]').forEach((node) => { node.textContent = state.bots.length; });
    render();
  })
  .catch(() => { status.textContent = 'The bots could not load. Please try again shortly.'; });
