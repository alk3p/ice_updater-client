import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const responses = await Promise.all(["nightly", "unofficial"]
        .map(buildtype => fetch(
            `https://otafsg-cost.project-ice.org/api/v1/${params.slug}/${buildtype}/-1`
        )
        .then(v => v.json())
        .then(v => (v.response) ? v.response : [])
        .catch(() => {
            throw error(500, 'Internal Server Error');
        })));
    const response = responses[0].concat(responses[1]);
    if (response.length > 0) {
        return {"response": response.sort((a,b) => b.datetime - a.datetime)};
    } else {
        throw error(404, 'Not Found');
    }
}
