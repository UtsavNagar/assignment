import React, { useEffect, useState } from 'react';
import { fetchJobsFromDatabase, applyToJob } from '../Firebase/database';
import { Grid, Card, CardContent, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase/firebase';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await fetchJobsFromDatabase();
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Show Details Dialog
  const handleShowDetails = (job) => {
    setSelectedJob(job);
    setOpen(true);
  };

  // Close Dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedJob(null);
  };

  // Apply to Job
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
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card>
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
        ))}
      </Grid>

      {/* Dialog for Job Details */}
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
