// Repară timestamp-urile "corupte" și întoarce un obiect Date valid sau null
export default function safeToDate(ts) {
  if (!ts) return null;

  // 1) încercare directă
  const d1 = new Date(ts);
  if (!isNaN(d1)) return d1;

  // 2) repară secunde > 59 în ISO de forma 2025-03-29T16:06:66.190Z
  const fixed = ts.replace(
    /T(\d{2}):(\d{2}):(\d{2})\.(\d{3})Z$/,
    (_, hh, mm, ss, ms) =>
      `T${hh}:${mm}:${Math.min(Number(ss), 59)
        .toString()
        .padStart(2, "0")}.${ms}Z`
  );
  const d2 = new Date(fixed);
  if (!isNaN(d2)) return d2;

  // 3) ultim fallback
  const d3 = new Date(Date.parse(ts));
  return isNaN(d3) ? null : d3;
}
