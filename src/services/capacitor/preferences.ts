import { Preferences } from "@capacitor/preferences";

export const setPreference = (key: string, value: any) => {
  return Preferences.set({ key, value });
};

export const getPreference = async (key: string) => {
  return (await Preferences.get({ key })).value;
};

export const removePreference = (key: string) => {
  return Preferences.remove({ key });
};
