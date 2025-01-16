import axios from 'axios';

export const fetchCourseDetails = async (courseId: string) => {
  const response = await axios.get(`/api/courses/${courseId}`);
  return response.data;
};

export const fetchInstructorDetails = async (instructorId: string) => {
  const response = await axios.get(`/api/instructors/${instructorId}`);
  return response.data;
};

export const fetchLessons = async (courseId: string) => {
  const response = await axios.get(`/api/courses/${courseId}/lessons`);
  return response.data;
};

export const fetchReviews = async (courseId: string) => {
  const response = await axios.get(`/api/courses/${courseId}/reviews`);
  return response.data;
};