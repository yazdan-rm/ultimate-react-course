import { apiService as api } from "app/store/apiService.js";

const UniversityApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: ({
        pageNo,
        pageSize,
        sortField = "createDate",
        sortDir = "desc",
      }) => ({
        url: `/courses?pageNo=${pageNo}&pageSize=${pageSize}&sortField=${sortField}&sortDir=${sortDir}`,
        method: "GET",
      }),
    }),
    createCourse: build.mutation({
      query: (newCourse) => ({
        url: `/courses`,
        method: "POST",
        data: newCourse,
      }),
    }),
  }),
  overrideExisting: false,
});

export default UniversityApi;

export const { useLazyGetCoursesQuery, useCreateCourseMutation } =
  UniversityApi;
