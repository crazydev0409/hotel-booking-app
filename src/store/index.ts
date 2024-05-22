import { atom } from "jotai";

export const userAtom = atom({
  _id: '',
  name: '',
  email: '',
  phoneNumber: '',
  country: '',
});

export const isLoggedInAtom = atom(false);