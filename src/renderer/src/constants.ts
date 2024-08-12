export const LIBRARY_DIRECTORY_NAME = "abManagerLibrary";

export const isLinux = window.api.getPlatform() === "linux";
export const isWindows = window.api.getPlatform() === "win32";
export const isMac = window.api.getPlatform() === "darwin";

export const pathRegex = isWindows
   ? /^([a-zA-Z]:[/\\])([^<>:"/\\|?*]+[/\\]?)*$/
   : /./;

export const HOME_PATHS = ["/", "/library", "/settings", "/playground"];

export const AUDIO_FILES_EXTENSIONS: Electron.FileFilter["extensions"] = [
   "mp3",
   "m4b",
   "wav",
];
