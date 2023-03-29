import {writable} from "svelte/store";
export const hora = writable(new Date(0))
export const started = writable(false)
export const max=writable(false)