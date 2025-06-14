import { apiService as api } from "app/store/apiService.js";

const UniversityApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPagedCourses: build.query({
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
    getAllCourses: build.query({
      query: (courseId) => ({
        url: `/courses/get-all/${courseId}`,
        method: "GET",
      }),
    }),
    createCoursePrerequisite: build.mutation({
      query: (newCoursePrerequisite) => ({
        url: `/course-prerequisites`,
        method: "POST",
        data: newCoursePrerequisite,
      }),
    }),
    updateCoursePrerequisite: build.mutation({
      query: (updatedCourse) => ({
        url: `/course-prerequisites/${updatedCourse.id}`,
        method: "PUT",
        data: updatedCourse,
      }),
    }),
    deleteCoursePrerequisite: build.mutation({
      query: (courseId) => ({
        url: `/course-prerequisites/${courseId}`,
        method: "DELETE",
      }),
    }),
    getPagedCoursePrerequisites: build.query({
      query: ({
        pageNo,
        pageSize,
        sortField = "createDate",
        sortDir = "desc",
        masterId,
      }) => ({
        url: `/course-prerequisites?pageNo=${pageNo}&pageSize=${pageSize}&sortField=${sortField}&sortDir=${sortDir}&courseId=${masterId}`,
        method: "GET",
      }),
    }),
    getAllColleges: build.query({
      query: () => ({
        url: `/university/get-all-colleges`,
        method: "GET",
      }),
    }),
    getDepartmentsByCollegeCode: build.query({
      query: (collegeCode) => ({
        url: `/university/get-departments-by-college-code/${collegeCode}`,
        method: "GET",
      }),
    }),
    getFieldOfStudyByDepartmentCode: build.query({
      query: (studyByDepartmentCode) => ({
        url: `/university/get-field-of-study-by-department-code/${studyByDepartmentCode}`,
        method: "GET",
      }),
    }),
    createCourseSchedule: build.mutation({
      query: (courseSchedule) => ({
        url: `/course-schedules`,
        method: "POST",
        data: courseSchedule,
      }),
    }),
    updateCourseSchedule: build.mutation({
      query: (courseSchedule) => ({
        url: `/course-schedules/${courseSchedule.id}`,
        method: "PUT",
        data: courseSchedule,
      }),
    }),
    deleteCourseSchedule: build.mutation({
      query: (id) => ({
        url: `/course-schedules/${id}`,
        method: "DELETE",
      }),
    }),
    getPagedCourseSchedule: build.query({
      query: ({
        pageNo,
        pageSize,
        sortField = "createDate",
        sortDir = "desc",
        masterId,
      }) => ({
        url: `/course-schedules?pageNo=${pageNo}&pageSize=${pageSize}&sortField=${sortField}&sortDir=${sortDir}&courseId=${masterId}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: ({ uid, body }) => ({
        url: `/student/${uid}`,
        method: "PUT",
        data: body,
      }),
    }),
    getUser: build.query({
      query: ({ uid }) => ({
        url: `/student/${uid}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export default UniversityApi;

export const {
  useLazyGetPagedCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useLazyGetPagedCoursePrerequisitesQuery,
  useCreateCoursePrerequisiteMutation,
  useUpdateCoursePrerequisiteMutation,
  useDeleteCoursePrerequisiteMutation,
  useGetAllCollegesQuery,
  useLazyGetDepartmentsByCollegeCodeQuery,
  useLazyGetFieldOfStudyByDepartmentCodeQuery,
  useCreateCourseScheduleMutation,
  useUpdateCourseScheduleMutation,
  useDeleteCourseScheduleMutation,
  useLazyGetPagedCourseScheduleQuery,
  useUpdateUserMutation,
  useLazyGetUserQuery,
} = UniversityApi;
