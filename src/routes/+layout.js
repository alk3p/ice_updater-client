import { error } from '@sveltejs/kit';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
    const res = await fetch("https://otafsg-cost.project-ice.org/api/v2/oems")
        .catch(() => {
            error(500, 'Internal Server Error');
        });
    const data = await res.json();
    if (data && data.length) {
        return {"response": data};
    } else {
        error(404, 'Not Found');
    }
}
