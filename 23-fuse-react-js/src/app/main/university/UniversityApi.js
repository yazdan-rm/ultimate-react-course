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
    updateCourse: build.mutation({
      query: (updatedCourse) => ({
        url: `/courses/${updatedCourse.id}`,
        method: "PUT",
        data: updatedCourse,
      }),
    }),
    deleteCourse: build.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export default UniversityApi;

export const {
  useLazyGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = UniversityApi;
