export default function ensureIds(list) {
  const makeId =
    crypto && crypto.randomUUID
      ? () => crypto.randomUUID()
      : () => `rid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  return list.map((r) => ({
    ...r,
    id: r.id ?? makeId(),
  }));
}
