import { apiService as api } from "app/store/apiService.js";

export const addTagTypes = ["ums_courses"];
const UniversityApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getCourses: build.query({
        query: ({
          pageNo,
          pageSize,
          sortField = "createDate",
          sortDir = "desc",
        }) => ({
          url: `/courses?pageNo=${pageNo}&pageSize=${pageSize}&sortField=${sortField}&sortDir=${sortDir}`,
        }),
        // providesTags: ["ums_courses"],
      }),
    }),
    overrideExisting: false,
  });

export default UniversityApi;

export const { useLazyGetCoursesQuery } = UniversityApi;
