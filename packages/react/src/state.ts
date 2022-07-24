import { proxy } from "valtio";

export const state = proxy({
	open: false,
});

export const open = () => {
	state.open = true;
};

export const close = () => {
	state.open = false;
};
