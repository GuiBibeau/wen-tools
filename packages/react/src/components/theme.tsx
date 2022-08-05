export type ThemeComponentNames =
	| "header"
	| "text"
	| "button"
	| "connectedPill"
	| "notConnectedPill"
	| "loadingPill"
	| "connectPill"
	| "modal";
export type ThemeComponents = Record<ThemeComponentNames, string>;

const createThemeMap = <T extends { [name: string]: ThemeComponents }>(
	map: T,
): T => map;

export const themeMap = createThemeMap({
	base: {
		header: "text-2xl font-medium text-gray-900",
		text: "mt-1 text-sm text-gray-500 truncate mb-4",
		button:
			"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700",
		connectedPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800",
		notConnectedPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-stone-200 text-stone-900",
		loadingPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-600 text-white",
		connectPill:
			"inline-flex items-center shadow px-2.5 py-0.5 text-sm leading-5 font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700",
		modal:
			"mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8",
	},
	dark: {
		header: "text-2xl font-medium text-white",
		text: "mt-1 text-sm text-slate-200 truncate mb-4",
		button:
			"inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-white bg-black hover:border-white border-slate-400 border ",
		connectedPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm font-medium text-blue-600 border-blue-600 border",
		loadingPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm font-medium text-white border border-slate-400",

		connectPill:
			"inline-flex items-center px-3 py-0.5 border text-sm font-medium rounded shadow-sm text-white bg-black hover:border-white border-slate-400 border ",
		notConnectedPill: "",
		modal:
			"mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8 bg-black",
	},
	w3fs: {
		header:
			"text-2xl font-medium bg-clip-text text-transparent Pastel bg-gradient-to-tr from-pink-500 to-orange-300",
		text: "mt-1 text-sm text-slate-200 truncate mb-4",
		button:
			"inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md shadow-sm text-white Pastel bg-gradient-to-tr from-pink-500 to-orange-300 border ",
		connectedPill:
			"inline-flex items-center px-3 py-0.5 rounded bg-clip-text text-transparent Pastel bg-gradient-to-tr from-pink-500 to-orange-300 border border-pink-200",
		loadingPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm bg-clip-text text-transparent Pastel bg-gradient-to-tr from-pink-500 to-orange-300 border border-pink-200",

		connectPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm font-medium rounded-md shadow-sm text-white Pastel bg-gradient-to-tr from-pink-500 to-orange-300 border",
		notConnectedPill:
			"inline-flex items-center px-3 py-0.5 rounded bg-clip-text text-transparent Pastel bg-gradient-to-tr from-pink-500 to-orange-300 border border-pink-200",
		modal:
			"mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8 bg-zinc-900",
	},
	midnight: {
		header: "text-2xl font-medium text-sky-100",
		text: "mt-1 text-sm text-sky-500 truncate mb-4",
		button:
			"inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-900 hover:bg-slate-800",
		connectedPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-sky-700 text-sky-100",
		notConnectedPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-sky-700 text-sky-100",
		loadingPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-sky-700 text-sky-100",

		connectPill:
			"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-sky-700 text-sky-100",
		modal:
			"mx-auto max-w-2xl transform divide-y divide-sky-900 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8 bg-slate-900",
	},
	elegant: {
		header: "text-2xl font-medium text-zinc-100",
		text: "mt-1 text-sm text-zinc-300 truncate mb-4",
		button:
			"inline-flex items-center px-4 py-2	 text-sm font-medium rounded-md shadow-sm text-zinc-900 Pastel bg-gradient-to-tr from-yellow-300 to-yellow-600 hover:bg-gradient-to-tr hover:from-yellow-200 hover:to-yellow-500",
		connectedPill:
			"inline-flex items-center px-3 py-0.5 rounded bg-clip-text text-transparent Pastel bg-gradient-to-tr bg-gradient-to-tr from-yellow-300 to-yellow-600 border border-yellow-600",
		loadingPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm bg-clip-text text-transparent Pastel bg-gradient-to-tr bg-gradient-to-tr from-yellow-300 to-yellow-600 border border-yellow-600",

		connectPill:
			"inline-flex items-center px-3 py-0.5 rounded text-sm font-medium rounded-md shadow-sm text-zinc-900 Pastel bg-gradient-to-tr bg-gradient-to-tr from-yellow-300 to-yellow-600",
		notConnectedPill:
			"inline-flex items-center px-3 py-0.5 rounded bg-clip-text text-yellow-600 Pastel bg-gradient-to-tr rom-yellow-300 to-yellow-600 border border-yellow-600",
		modal:
			"mx-auto max-w-2xl transform divide-y divide-yellow-100 overflow-hidden rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 transition-all p-8 bg-stone-800",
	},
});

export type Theme = keyof typeof themeMap;
