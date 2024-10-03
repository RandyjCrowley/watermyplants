import { writable } from "svelte/store";
export const AuthStore = writable({
    isLoggedIn: false,
    user: null,
});
export function login(user,t) {


}
