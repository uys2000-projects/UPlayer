import { parse as parse_ } from "iptv-playlist-parser";

export const parse = function (list: string) {
  return parse_(list);
};
