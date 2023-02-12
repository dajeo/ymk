import { useEffect } from "react";

function useScrollHere(data: HTMLDivElement | undefined) {
  useEffect(() => {
    if (!data) return;
    const el = document.getElementById("scrollHere");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [data]);
}

export { useScrollHere };
