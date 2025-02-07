'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Checkbox,
    Button,
    Typography,
    Stack,
    InputAdornment,
} from '@mui/material';
import { useRouter } from 'next/navigation';

const CourseForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        level: '',
        duration: { hours: '', weeks: '' },
        price: '',
        language: '',
        introduction: '',
        certification: false,
        instructorExperience: '',
        imageUrl: '',
    });

    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name.includes('duration.')) {
            const field = name.split('.')[1];
            setFormData({
                ...formData,
                duration: { ...formData.duration, [field]: value },
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, certification: e.target.checked });
    };

    const router = useRouter();
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/course/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            router.push(`/course/${data._id}/edit`);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <Box
            sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, border: '1px solid #ccc', borderRadius: 2 }}
        >
            <Typography variant="h5" align="center" gutterBottom>
                Create a New Course
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        select
                        label="Level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        {levels.map((level) => (
                            <MenuItem key={level} value={level}>
                                {level}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            label="Duration (Hours)"
                            name="duration.hours"
                            value={formData.duration.hours}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            required
                        />
                        <TextField
                            label="Duration (Weeks)"
                            name="duration.weeks"
                            value={formData.duration.weeks}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            required
                        />
                    </Stack>
                    <TextField
                        label="Price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        required
                    />
                    <TextField
                        label="Language"
                        name="language"
                        value={formData.language}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Introduction"
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Instructor Experience"
                        name="instructorExperience"
                        value={formData.instructorExperience}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <Box display="flex" alignItems="center">
                        <Checkbox
                            checked={formData.certification}
                            onChange={handleCheckboxChange}
                        />
                        <Typography>Provide Certification?</Typography>
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default CourseForm;
