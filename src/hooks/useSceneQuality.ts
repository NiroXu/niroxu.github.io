import { useEffect, useState } from "react";
import { sceneQualityPresets, type SceneQualityConfig } from "../data/siteContent";

type MediaState = {
  isMobile: boolean;
  prefersReducedMotion: boolean;
};

const mobileQuery = "(max-width: 767px)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function readMediaState(): MediaState {
  if (typeof window === "undefined") {
    return { isMobile: false, prefersReducedMotion: false };
  }

  return {
    isMobile: window.matchMedia(mobileQuery).matches,
    prefersReducedMotion: window.matchMedia(reducedMotionQuery).matches,
  };
}

export function useSceneQuality(): SceneQualityConfig {
  const [mediaState, setMediaState] = useState<MediaState>(readMediaState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mobileMedia = window.matchMedia(mobileQuery);
    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);
    const syncMediaState = () => setMediaState(readMediaState());

    syncMediaState();
    mobileMedia.addEventListener("change", syncMediaState);
    reducedMotionMedia.addEventListener("change", syncMediaState);

    return () => {
      mobileMedia.removeEventListener("change", syncMediaState);
      reducedMotionMedia.removeEventListener("change", syncMediaState);
    };
  }, []);

  if (mediaState.prefersReducedMotion) {
    return sceneQualityPresets.reducedMotion;
  }

  return mediaState.isMobile ? sceneQualityPresets.mobile : sceneQualityPresets.desktop;
}
