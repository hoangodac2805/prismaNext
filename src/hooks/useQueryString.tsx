import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface Props {
    generate: (query: Record<string, any>) => void;
}


export const useQueryString = (): Props => {
    const route = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const generate = (query: Record<string, any>) => {
        let currentQuery = {}
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updateQuery: any = {
            ...currentQuery,
            ...query
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query: updateQuery
        }, {
            skipNull: true
        })
        route.push(url)
    }
    return {
        generate
    }
}