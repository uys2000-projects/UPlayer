import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const readFile = async (path: string) => {
  const contents = await Filesystem.readFile({
    path: path,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  return contents.data as string;
};

export const writeFile = async (path: string, data: string) => {
  await Filesystem.writeFile({
    path: path,
    data: data,
    directory: Directory.Documents,
    encoding: Encoding.UTF8,
  });
  return true;
};
export const deleteFile = async (path: string) => {
  await Filesystem.deleteFile({
    path: path,
    directory: Directory.Documents,
  });
  return true;
};

export const readDir = async (path: string) => {
  const contents = await Filesystem.readdir({
    path: path,
    directory: Directory.Documents,
  });
  return contents.files;
};

const readFilePath = async () => {
  // Here's an example of reading a file with a full file path. Use this to
  // read binary data (base64 encoded) from plugins that return File URIs, such as
  // the Camera.
  const contents = await Filesystem.readFile({
    path: "file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt",
  });

  console.log("data:", contents);
};
