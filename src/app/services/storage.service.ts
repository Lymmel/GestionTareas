import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  // Guardamos el valor
  async store(storageKey: string, value: any) {
    const encryptedValue = btoa(escape(JSON.stringify(value)));
    await Storage.set({
      key: storageKey,
      value: encryptedValue
    });
  }

  // Obtenemos el valor
  async get(storageKey: string) {
    const ret = await Storage.get({ key: storageKey });
    if (ret.value){
      return JSON.parse(unescape(atob(ret.value)));
    } else {
      return false;
    }
  }

  async removeStorageItem(storageKey: string) {
    await Storage.remove({ key: storageKey });
  }

  // Limpiamos el Storage
  async clear() {
    await Storage.clear();
  }

    
}


