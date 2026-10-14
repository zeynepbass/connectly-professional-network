export function NavCount({ count, label }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1 left-1/2 ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] leading-none font-semibold text-white">
      {count > 9 ? "9+" : count}
      <span className="sr-only"> {label}</span>
    </span>
  );
}
