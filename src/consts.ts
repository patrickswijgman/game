export const WIDTH = 640;
export const HEIGHT = (WIDTH / 16) * 9;

export const LINE_HEIGHT = 12;

export const COLOR_BG = "#1e1e1e";
export const COLOR_HEALTH = "#ff3737";
export const COLOR_STAMINA = "#5ca933";
export const COLOR_MANA = "#3f60ff";

const url = new URL(window.location.href);

export const DEBUG = !!url.searchParams.get("debug");
