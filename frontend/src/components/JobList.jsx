import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { fetchJobsFromDatabase, applyToJob } from '../Firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchJobsFromDatabase();
        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (locationFilter) {
      filtered = filtered.filter((job) => job.location === locationFilter);
    }

    if (jobTypeFilter) {
      filtered = filtered.filter((job) => job.jobType === jobTypeFilter);
    }

    setFilteredJobs(filtered);
  }, [locationFilter, jobTypeFilter, jobs]);

  const handleShowDetails = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  const handleApply = async (jobId) => {
    if (!auth.currentUser) {
      alert('Please log in to apply.');
      return;
    }

    try {
      await applyToJob(auth.currentUser.uid, jobId);
      alert('You have successfully applied for this job!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply. Try again later.');
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>

      {/* Filter Section */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          alignItems: 'center',
          mb: 4,
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            label="Location"
          >
            <MenuItem value="">All Locations</MenuItem>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
            <MenuItem value="Hybrid">Hybrid</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 250 }}>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            label="Job Type"
          >
            <MenuItem value="">All Job Types</MenuItem>
            <MenuItem value="Full Time">Full Time</MenuItem>
            <MenuItem value="Part Time">Part Time</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Job Cards */}
      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {job.jobTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {job.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="body2" color="textPrimary" paragraph>
                    <strong>Salary:</strong> {job.salaryRange.from} - {job.salaryRange.to}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Location:</strong> {job.location}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleApply(job.id)}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    onClick={() => handleShowDetails(job)}
                    sx={{ mt: 1 }}
                  >
                    Show More Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No jobs found matching the filters.</Typography>
        )}
      </Grid>

      {/* Job Details Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Job Details</DialogTitle>
        <DialogContent>
          {selectedJob && (
            <>
              <Typography variant="h6">{selectedJob.jobTitle}</Typography>
              <Typography variant="body1" paragraph>
                {selectedJob.description}
              </Typography>
              <Typography variant="body2">
                <strong>Salary:</strong> {selectedJob.salaryRange.from} - {selectedJob.salaryRange.to}
              </Typography>
              <Typography variant="body2">
                <strong>Job Type:</strong> {selectedJob.jobType}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {selectedJob.location}
              </Typography>
              <Typography variant="body2">
                <strong>Technologies:</strong> {selectedJob.technologies.join(', ')}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                <strong>Posted By:</strong>{' '}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate(`/profile/${selectedJob.postedByUid}`)}
                >
                  {selectedJob.postedByName}
                </Link>
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button
            onClick={() => handleApply(selectedJob.id)}
            color="primary"
            variant="contained"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JobList;
