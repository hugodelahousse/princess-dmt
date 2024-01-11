import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Action, redirect, error, type ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/primsa';

const internSchema = z.object({
	id: z.number(),
	name: z.string().trim().min(1),
	startDate: z.coerce.date(),
	endDate: z.coerce.date()
});

const internCrudSchema = internSchema
	.extend({
		id: internSchema.shape.id.optional()
	})
	.refine((data) => data.startDate < data.endDate, {
		message: 'Start date must be before end date',
		path: ['startDate']
	});

export const load = (async ({ params }) => {
	const intern = params.id
		? await prisma.intern.findUnique({
				where: {
					id: Number(params.id)
				}
			})
		: null;

	if (params.id && !intern) {
		throw error(404, 'Could not find intern');
	}

	const form = await superValidate(intern, internCrudSchema);
	return { form, intern };
}) satisfies ServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, internCrudSchema);

		// Convenient validation check:
		if (!form.valid) {
			// Again, return { form } and things will just work.
			return fail(400, { form });
		}

		if (form.data.id) {
			await prisma.intern.update({
				where: { id: form.data.id },
				data: {
					name: form.data.name,
					startDate: form.data.startDate,
					endDate: form.data.endDate
				}
			});
		} else {
			await prisma.intern.create({
				data: {
					name: form.data.name,
					startDate: form.data.startDate,
					endDate: form.data.endDate
				}
			});
		}

		return redirect(307, '/interns');
	}
} satisfies Record<string, Action>;
