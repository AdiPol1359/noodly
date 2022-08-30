import path from 'node:path';
import xss from 'xss';

import { mkdir, unlink, writeFile, readFile } from 'node:fs/promises';

const PATH_NAME = path.join(process.cwd(), 'posts');

export const initPosts = async () => {
  await mkdir(PATH_NAME, { recursive: true });
};

export const createOrUpdatePost = async (uuid: string, content: string) => {
  await writeFile(path.join(PATH_NAME, `${uuid}.html`), xss(content), 'utf-8');
};

export const getPostByUuid = async (uuid: string) => {
  return (await readFile(path.join(PATH_NAME, `${uuid}.html`))).toString();
};

export const deletePostByUuid = async (uuid: string) => {
  await unlink(path.join(PATH_NAME, `${uuid}.html`));
};
