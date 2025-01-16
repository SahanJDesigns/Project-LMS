import express from 'express';

const express = require('express');
const app = express();

app.get('/api/courses/:courseId', (req, res) => {
  // Fetch course details from the database
});

app.get('/api/instructors/:instructorId', (req, res) => {
  // Fetch instructor details from the database
});

app.get('/api/courses/:courseId/lessons', (req, res) => {
  // Fetch lessons for the course from the database
});

app.get('/api/courses/:courseId/reviews', (req, res) => {
  // Fetch reviews for the course from the database
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});