import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { type Action, error, fail, redirect, ServerLoad } from '@sveltejs/kit';
import { prisma } from '$lib/primsa';
import type { InternLog } from '@prisma/client';
import { DIVE_TYPES } from '$lib/diveType';

const diveType = z.enum(DIVE_TYPES);

const logEntrySchema = z
	.object({
		date: z.coerce.date().default(new Date()),
		internId: z.number(),

		morningDive: z.boolean(),
		morningDiveType: diveType.optional(),
		morningDiveGuided: z.boolean().optional(),
		afternoonDive: z.boolean(),
		afternoonDiveGuided: z.boolean().optional(),
		afternoonDiveType: diveType.optional(),

		lunchPacking: z.boolean(),
		eveningPacking: z.boolean()
	})
	.transform((data) => {
		if (!data.morningDive) {
			data.morningDiveType = undefined;
			data.morningDiveGuided = undefined;
		}

		if (!data.afternoonDive) {
			data.afternoonDiveType = undefined;
			data.afternoonDiveGuided = undefined;
		}

		return data;
	});

export type LogEntrySchema = typeof logEntrySchema;

export const load = (async ({ params }) => {
	const interns = prisma.intern.findMany({ select: { id: true, name: true } });

	const logEntry: InternLog | null = params.id
		? await prisma.internLog.findUnique({ where: { id: Number(params.id) } })
		: null;

	if (params.id && !logEntry) {
		throw error(404, 'Could not find entry');
	}

	const form = await superValidate(logEntry, logEntrySchema);
	return { form, logEntry, interns: await interns };
}) satisfies ServerLoad;

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, logEntrySchema);

		if (!form.valid) {
			return fail(400, { form });
		}

		await prisma.internLog.create({ data: form.data });

		return redirect(307, '/');
	}
} satisfies Record<string, Action>;
