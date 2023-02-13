import React, { memo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";

interface Props {
  title: string | undefined
}

export const Shortcut = memo(function Shortcut({ title }: Props) {
  const location = useLocation();
  const [isInShortcut, setIsInShortcut] = useState(false);

  useEffect(() => {
    const shortcut = window.localStorage.quickShortcut;
    if (shortcut) {
      const json = JSON.parse(shortcut);
      if (json.url === location.pathname) setIsInShortcut(true);
    }
  });

  function addToShortcut() {
    if (isInShortcut) {
      window.localStorage.removeItem("quickShortcut");
    } else {
      window.localStorage.quickShortcut = JSON.stringify({
        name: title,
        url: location.pathname
      });
    }

    window.dispatchEvent(new Event("storage"));
    setIsInShortcut(!isInShortcut);
  }

  return (
    <IconButton onClick={addToShortcut}>
      <FavoriteRoundedIcon sx={isInShortcut ? { color: "red" } : {}} />
    </IconButton>
  );
});
