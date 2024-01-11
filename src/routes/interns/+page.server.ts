import { prisma } from '$lib/primsa';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = prisma.intern.findMany();

	return {
		interns: await response
	};
}) satisfies PageServerLoad;
