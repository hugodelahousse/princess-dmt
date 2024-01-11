export const DIVE_TYPES = [
	'dsd',
	'fun dive',
	'scuba review',
	'open water',
	'advanced',
	'other'
] as const;

const DIVE_TYPE_LABELS: Record<(typeof DIVE_TYPES)[number], string> = {
	dsd: 'DSD',
	'fun dive': 'Fun Dive',
	'scuba review': 'Scuba Review',
	'open water': 'Open Water',
	advanced: 'Advanced',
	other: 'Other'
};

export function getDiveTypeLabel(type: (typeof DIVE_TYPES)[number]) {
	return DIVE_TYPE_LABELS[type];
}
