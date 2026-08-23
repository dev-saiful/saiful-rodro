"use client";

import { sendGTMEvent } from "@next/third-parties/google";

export function useGTMEvent() {
  const track = (eventName, data = {}) => {
    sendGTMEvent({ event: eventName, ...data });
  };

  return { track };
}
