(async () => {
  try {
    const response = await fetch('/catalog.json', { cache: 'no-cache' });
    if (!response.ok) return;
    const catalog = await response.json();
    const tools = catalog.tools.filter((tool) => tool.enabled !== false);
    const toolIds = new Set(tools.map((tool) => tool.id));
    const skills = catalog.skills.filter((skill) =>
      (skill.requiredToolIds || []).every((id) => toolIds.has(id)),
    );
    const skillIds = new Set(skills.map((skill) => skill.id));
    const bots = catalog.bots.filter((bot) =>
      (bot.skillIds || []).every((id) => skillIds.has(id)) &&
      (bot.toolIds || []).every((id) => toolIds.has(id)),
    );
    document.querySelectorAll('[data-bot-count]').forEach((node) => { node.textContent = bots.length; });
  } catch {
    // Counts are progressive enhancement; the page remains complete without them.
  }
})();
