import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Update the database');
  const db = await openDB('jate');
  const trans = db.transaction("jate",'readwrite');
  const store = trans.objectStore('jate')
  const request = store.put({content});
  
  const result = await request;
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database')
  const db = await openDB('jate');
  const trans = db.transaction("jate",'readonly');
  const store = trans.objectStore('jate')
  const request = store.getAll();

  const result = await request;
  return result;
};

initdb();
