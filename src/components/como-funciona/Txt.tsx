import { Fragment } from "react";

const MARK = "[CONFIRMAR]";

/** Renderiza texto destacando cada marcador [CONFIRMAR] para revisão. */
export default function Txt({ children }: { children: string }) {
  const parts = children.split(MARK);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <mark className="rounded bg-amber-400/15 px-1 font-semibold text-amber-300">
              {MARK}
            </mark>
          )}
        </Fragment>
      ))}
    </>
  );
}
