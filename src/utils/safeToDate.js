// Repară timestamp-urile "corupte" și întoarce un obiect Date valid sau null
export default function safeToDate(ts) {
  if (!ts) return null;

  // 1) încercare directă
  const d1 = new Date(ts);
  if (!isNaN(d1.getTime())) return d1;

  // 2) repară secunde > 59 în format ISO (cu sau fără ms)
  const fixed = ts.replace(
    /T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?Z$/,
    (_, hh, mm, ss, ms = "000") =>
      `T${hh}:${mm}:${Math.min(Number(ss), 59)
        .toString()
        .padStart(2, "0")}.${ms.padEnd(3, "0")}Z`
  );

  const d2 = new Date(fixed);
  if (!isNaN(d2.getTime())) return d2;

  // 3) fallback: parse manual
  const d3 = new Date(Date.parse(ts));
  return isNaN(d3.getTime()) ? null : d3;
}
