import { atom } from 'recoil';

export const likedPeopleAtom = atom({
  key: 'likedPeople',
  default: [],
});
