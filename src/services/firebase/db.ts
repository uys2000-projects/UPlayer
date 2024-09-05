import type { Playlist, PlaylistItem } from "iptv-playlist-parser";
import { app } from "./app";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";

export const db = getFirestore(app);

//if (import.meta.env.DEV) connectFirestoreEmulator(db, "127.0.0.1", 8080);

export const getUser = async function (id: string) {
  const docRef = doc(db, "user", id);
  const referance = await getDoc(docRef);
  if (!referance.exists()) return null;
  const result = { ...referance.data(), id: referance.id };
  return result as UDocument<UUser>;
};

export const addUser = async function (data: UDocument<UUser>) {
  const colRef = collection(db, "user");
  const referance = await addDoc(colRef, data);
  const result = { ...data, id: referance.id };
  return result as UDocument<UUser>;
};

export const updateUser = async function (data: UDocument<UUser>) {
  const docRef = doc(db, "user", data.id);
  data.utimestamp = Date.now();
  await setDoc(docRef, data);
  return data as UDocument<UUser>;
};

const fakePromise = (wait: number = 10) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), wait);
  });
export const addChannels = async function (
  checkCancel: () => boolean,
  user: UDocument<UUser>,
  data: Playlist,
  callback: (index: number) => void,
  wait: boolean | null = false
) {
  for (let i = 0; i < data.items.length; i++) {
    if (checkCancel()) return;
    const item = data.items[i];
    const docRef = doc(db, "user", user.id, "channel", i.toString());
    const channel: UDocument<PlaylistItem> = {
      id: i.toString(),
      data: item,
      timestamp: Date.now(),
      utimestamp: Date.now(),
    };
    if (wait == null) {
      setDoc.pLogger(docRef, channel, {});
    } else if (wait == false) {
      setDoc.pLogger(docRef, channel, {});
      await fakePromise(0);
    } else await setDoc.pLogger(docRef, channel, {});
    callback(i);
  }
  return;
};

export const addGroups = async function (
  checkCancel: () => boolean,
  user: UDocument<UUser>,
  data: string[],
  callback: (index: number) => void,
  wait: boolean | null = false
) {
  for (let i = 0; i < data.length; i++) {
    if (checkCancel()) return;
    const item = data[i];
    const docRef = doc(db, "user", user.id, "group", i.toString());
    const group: UDocument<string> = {
      id: i.toString(),
      data: item,
      timestamp: Date.now(),
      utimestamp: Date.now(),
    };
    if (wait == null) {
      setDoc.pLogger(docRef, group, {});
    } else if (wait == false) {
      setDoc.pLogger(docRef, group, {});
      await fakePromise(0);
    } else await setDoc.pLogger(docRef, group, {});
    callback(i);
  }
  return;
};

export const getGroups = async function (user: UDocument<UUser>) {
  const colRef = collection(db, "user", user.id, "group");
  return (await getDocs(colRef)).docs.map(
    (doc) => doc.data() as UDocument<string>
  );
};

export const getGroup = async function (
  user: UDocument<UUser>,
  groudId: string
) {
  const docRef = doc(db, "user", user.id, "group", groudId);

  return (await getDoc(docRef)).data() as UDocument<string>;
};

export const getChannel = async function (user: UDocument<UUser>, id: string) {
  const docRef = doc(db, "user", user.id, "channel", id);
  return (await getDoc(docRef)).data() as UDocument<PlaylistItem>;
};

export const getChannels = async function (
  user: UDocument<UUser>,
  groudTitle: string
) {
  const colRef = collection(db, "user", user.id, "channel");
  const queryRef = query(colRef, where("data.group.title", "==", groudTitle));
  return (await getDocs(queryRef)).docs.map(
    (doc) => doc.data() as UDocument<PlaylistItem>
  );
};
