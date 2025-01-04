import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../Firebase/firebase';
import { Avatar, Box, Typography, Grid, Card, CardContent, Divider, Button } from '@mui/material';

const UserProfile = () => {
  const { userId } = useParams();  // Get userId from URL params
  const navigate = useNavigate();  // Initialize navigate hook
  const [userData, setUserData] = useState(null);
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersCollection = collection(db, 'Users');
        const q = query(usersCollection, where('uid', '==', userId));
        const userSnapshot = await getDocs(q);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const data = userDoc.data();
          setUserData(data);

          // Fetch posted jobs
          if (data.postedJobs && data.postedJobs.length > 0) {
            const jobsPromises = data.postedJobs.map(jobId => getJobDetails(jobId));
            const jobs = await Promise.all(jobsPromises);
            setPostedJobs(jobs);
          }

          // Fetch applied jobs if viewing own profile
          if (auth.currentUser?.uid === userId && data.appliedInJobs) {
            const appliedJobsPromises = data.appliedInJobs.map(jobId => getJobDetails(jobId));
            const jobs = await Promise.all(appliedJobsPromises);
            setAppliedJobs(jobs);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Fetch job details by ID
  const getJobDetails = async (jobId) => {
    const jobRef = doc(db, 'jobs', jobId);
    const jobSnapshot = await getDoc(jobRef);
    if (jobSnapshot.exists()) {
      return { id: jobSnapshot.id, ...jobSnapshot.data() };
    }
    return null;
  };

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  // Loading state
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // User not found
  if (!userData) {
    return <Typography>User not found.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Back Button */}
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Avatar sx={{ width: 100, height: 100 }} />
        </Grid>
        <Grid item>
          <Typography variant="h4">{userData.name || 'User Name'}</Typography>
          <Typography variant="subtitle1">{userData.email || 'Email not available'}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      {/* Posted Jobs Section */}
      <Typography variant="h5" gutterBottom>
        Posted Jobs
      </Typography>
      <Grid container spacing={3}>
        {postedJobs.length > 0 ? (
          postedJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{job.jobTitle}</Typography>
                  <Typography color="textSecondary">{job.location}</Typography>
                  <Typography>{job.description}</Typography>
                  <Typography sx={{ mt: 1 }}>
                    Salary: {job.salaryRange?.from} - {job.salaryRange?.to}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No jobs posted.</Typography>
        )}
      </Grid>

      {/* Applied Jobs Section (Visible to Owner Only) */}
      {auth.currentUser?.uid === userId && (
        <>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom>
            Applied Jobs
          </Typography>
          <Grid container spacing={3}>
            {appliedJobs.length > 0 ? (
              appliedJobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} key={job.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{job.jobTitle}</Typography>
                      <Typography color="textSecondary">{job.location}</Typography>
                      <Typography>{job.description}</Typography>
                      <Typography sx={{ mt: 1 }}>
                        Salary: {job.salaryRange?.from} - {job.salaryRange?.to}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No applied jobs found.</Typography>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default UserProfile;
