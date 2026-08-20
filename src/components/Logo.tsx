export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2 text-xl font-black tracking-tight">
      <span className="font-light text-slate-400">GRUPO</span>
      <span className="text-white">RAM</span>
      <span className="flex flex-col gap-0.5">
        <span className="block h-1.5 w-1.5 rounded-[1px] bg-emerald-500" />
        <span className="block h-1.5 w-1.5 rounded-[1px] bg-amber-400" />
      </span>
    </span>
  );
}
