function normalize(value) {
  return value.trim().toLowerCase();
}

export function filterUsers(users, { q = "", title = "", skill = "" } = {}) {
  const query = normalize(q);
  const titleFilter = normalize(title);
  const skillFilter = normalize(skill);

  return users.filter((user) => {
    if (titleFilter && normalize(user.title) !== titleFilter) return false;
    if (skillFilter && !user.skills.some((item) => normalize(item) === skillFilter)) return false;
    if (!query) return true;

    const haystack = [user.name, user.headline, user.title, user.company, user.location, ...user.skills]
      .join(" ")
      .toLowerCase();
    return query.split(/\s+/).every((term) => haystack.includes(term));
  });
}

export function getUserFacets(users) {
  const titles = new Set();
  const skills = new Set();
  for (const user of users) {
    titles.add(user.title);
    user.skills.forEach((skill) => skills.add(skill));
  }
  const sort = (values) => [...values].sort((a, b) => a.localeCompare(b));
  return { titles: sort(titles), skills: sort(skills) };
}
