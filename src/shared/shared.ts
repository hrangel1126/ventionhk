import { atom } from 'nanostores';

export const $alertstate = atom<boolean>(false);

export function alert(state:boolean){
    $alertstate.set($alertstate.get());
   console.log('seta ', $alertstate.value);
}