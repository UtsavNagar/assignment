import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Checkbox, ListItemText, Input, Grid } from '@mui/material';
import { Container, Box } from '@mui/system';
import { addJobDataToDatabase } from '../Firebase/database';
import { useNavigate } from 'react-router-dom';  // Use useNavigate instead of useHistory
import { auth } from '../Firebase/firebase';

const JobPostForm = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salaryFrom, setSalaryFrom] = useState('');
    const [salaryTo, setSalaryTo] = useState('');
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [jobType, setJobType] = useState(''); // New state for job type
    const [location, setLocation] = useState(''); // New state for job location

    // Technology options for multi-select
    const techOptions = [
        'firebase',
        'reactjs',
        'node js',
        'express js',
        'vue js',
        'Java',
        'python',
        'javascript',
        'C++',
        'game development',
        'graphic designer',
        'other'
    ];

    // Job type options
    const jobTypeOptions = ['Full Time', 'Part Time', 'Internship'];

    // Location options
    const locationOptions = ['Remote', 'Work from Home', 'Hybrid'];

    const navigate = useNavigate();  // Initialize useNavigate

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Constructing the job data object
        const jobData = {
            jobTitle,
            description,
            salaryRange: {
                from: salaryFrom,
                to: salaryTo
            },
            technologies: selectedTechnologies,
            jobType,  // Add jobType to the job data
            location,  // Add location to the job data
            postedByName: auth.currentUser?.displayName,
            postedByUid: auth.currentUser?.uid
        };

        // Logging the formatted data to the console
        console.log('Job Posted:', JSON.stringify(jobData, null, 2));
        
        addJobDataToDatabase(jobData)
            .then(docId => {
                alert('Job posted with ID:', docId);
            })
            .catch(error => {
                alert("Error posting job");
                console.error('Error posting job:', error);
            });

        // Reset the form (optional)
        setJobTitle('');
        setDescription('');
        setSalaryFrom('');
        setSalaryTo('');
        setSelectedTechnologies([]);
        setJobType('');
        setLocation('');
    };

    // Handle back button click
    const handleBack = () => {
        navigate(-1);  // Navigates to the previous page
    };

    return (
        <Container maxWidth="sm">
            <Box my={3}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Job Title */}
                        <Grid item xs={12}>
                            <TextField
                                label="Job Title"
                                variant="outlined"
                                fullWidth
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Job Description */}
                        <Grid item xs={12}>
                            <TextField
                                label="Job Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Grid>

                        {/* Salary Range */}
                        <Grid item xs={6}>
                            <TextField
                                label="Salary From"
                                variant="outlined"
                                fullWidth
                                value={salaryFrom}
                                onChange={(e) => setSalaryFrom(e.target.value)}
                                type="number"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Salary To"
                                variant="outlined"
                                fullWidth
                                value={salaryTo}
                                onChange={(e) => setSalaryTo(e.target.value)}
                                type="number"
                                required
                            />
                        </Grid>

                        {/* Technologies Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Technologies Required</InputLabel>
                                <Select
                                    multiple
                                    value={selectedTechnologies}
                                    onChange={(e) => setSelectedTechnologies(e.target.value)}
                                    input={<Input />}
                                    renderValue={(selected) => selected.join(', ')}
                                >
                                    {techOptions.map((tech) => (
                                        <MenuItem key={tech} value={tech}>
                                            <Checkbox checked={selectedTechnologies.indexOf(tech) > -1} />
                                            <ListItemText primary={tech} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Job Type Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Job Type</InputLabel>
                                <Select
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    label="Job Type"
                                    required
                                >
                                    {jobTypeOptions.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Location Selection */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Location</InputLabel>
                                <Select
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    label="Location"
                                    required
                                >
                                    {locationOptions.map((loc) => (
                                        <MenuItem key={loc} value={loc}>
                                            {loc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Post Job Button */}
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Post Job
                            </Button>
                        </Grid>

                        {/* Back Button */}
                        <Grid item xs={12}>
                            <Button variant="outlined" color="secondary" fullWidth onClick={handleBack}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default JobPostForm;
