import { prisma } from '$lib/primsa';
import { error, type ServerLoad } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const intern = await prisma.intern.findUnique({
		where: { id: Number(params.id) },
		include: { InternLog: true }
	});

	if (!intern) {
		throw error(404, 'Could not find entry');
	}

	return { intern };
}) satisfies ServerLoad;
