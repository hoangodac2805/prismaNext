// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import qs from "query-string";

// export const useCreateQueryString = (query: Record<string, any>) => {
//   const route = useRouter();
//   const params = useSearchParams();
//   const pathname = usePathname();
//   let currentQuery = {};
//   if (params) {
//     currentQuery = qs.parse(params.toString());
//   }
//   const updateQuery: any = {
//     ...currentQuery,
//     ...query,
//   };

//   const url = qs.stringifyUrl(
//     {
//       url: pathname,
//       query: updateQuery,
//     },
//     {
//       skipNull: true,
//     }
//   );
//   route.push(url);
// };
