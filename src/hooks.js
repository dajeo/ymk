import { useEffect } from "react";

function useScrollHere(data) {
  useEffect(() => {
    if (!data) return;
    const el = document.getElementById("scrollHere");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [data]);
}

export { useScrollHere };
