import Typesense from "typesense";
import {NextApiResponse} from "next";
import {NextRequest, NextResponse} from "next/server";

let client = new Typesense.Client({
    nodes: [{
        host: 'api.ingame.uz',
        port: 8108,
        protocol: 'http'
    }],
    apiKey: 'xyz',
});

export async function GET(req: NextRequest, res: NextApiResponse) {
    const url = new URL(req.url as string)
    const search = url.searchParams.get("q")
    try {
        if (!search) {
            return NextResponse.json({hits: []});
        }
        const searchResults = await client.collections('products').documents()
            .search({
                q: search,
                query_by: ["name"],
                highlight_full_fields: ["name"],
                exhaustive_search: true,
                num_typos: 2
            });

        return NextResponse.json(searchResults);
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: true});
    }
}
