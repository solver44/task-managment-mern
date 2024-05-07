export default function areEqual(prevProps, nextProps, cb) {
  if (cb) cb(prevProps, nextProps);
  return (
    JSON.stringify(prevProps, censorJSON()) ===
    JSON.stringify(nextProps, censorJSON())
  );
}

export function censorJSON() {
  var seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}