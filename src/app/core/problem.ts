import { ProblemDetails } from './models';

export function asProblem(error: unknown): ProblemDetails | null {
    if (!error || typeof error !== 'object') return null;

    const body = (error as { error?: unknown }).error;
    if (!body || typeof body !== 'object') return null;

    const candidate = body as Partial<ProblemDetails>;
    if (typeof candidate.title !== 'string' || typeof candidate.status !== 'number') {
        return null;
    }
    return candidate as ProblemDetails;
}