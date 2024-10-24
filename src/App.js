import React from 'react';
import {AppBar, Button, Card, CardContent, Container, List, ListItem, Toolbar, Typography,} from '@mui/material';
import {ArrowLeft} from 'lucide-react';

// Mock data for jobs
const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Tech Corp' },
  { id: 2, title: 'Product Manager', company: 'Innovation Inc' },
  { id: 3, title: 'UX Designer', company: 'Design Studio' },
];

// JobList component - This will be shown in the first tab
const JobList = () => {
  const openJobDetails = (jobId) => {
    // Store current window name before opening new tab
    window.name = 'jobsListWindow';
    localStorage.setItem('jobsListWindow', window.name);

    // Open job details in new tab
    window.open(`#/job/${jobId}`, '_blank');
  };

  return (
      <div>
        <AppBar position="static" className="mb-4">
          <Toolbar>
            <Typography variant="h6">Jobs List</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <List>
            {jobs.map((job) => (
                <ListItem
                    key={job.id}
                    onClick={() => openJobDetails(job.id)}
                    className="cursor-pointer hover:bg-gray-100"
                >
                  <Card className="w-full">
                    <CardContent>
                      <Typography variant="h6">{job.title}</Typography>
                      <Typography color="textSecondary">{job.company}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
            ))}
          </List>
        </Container>
      </div>
  );
};

// JobDetails component - This will be shown in the second tab
const JobDetails = ({ jobId }) => {
  const goBackToJobsList = () => {
    if (window.opener) {
      window.opener.focus();
      window.close();
    } else {
      // Fallback if window.opener is not available
      const opener = window.open('', localStorage.getItem('jobsListWindow'));
      if (opener) {
        opener.focus();
        window.close();
      }
    }
  };

  // Find job details
  const job = jobs.find(j => j.id === parseInt(jobId));

  return (
      <div>
        <AppBar position="static" className="mb-4">
          <Toolbar>
            <Button
                color="inherit"
                onClick={goBackToJobsList}
                startIcon={<ArrowLeft />}
            >
              Back to Jobs List
            </Button>
          </Toolbar>
        </AppBar>
        <Container>
          {job ? (
              <Card>
                <CardContent>
                  <Typography variant="h4" className="mb-4">{job.title}</Typography>
                  <Typography variant="h6" color="textSecondary" className="mb-4">
                    {job.company}
                  </Typography>
                  <Typography>
                    This is a detailed view of the job posting. You can add more details here.
                  </Typography>
                </CardContent>
              </Card>
          ) : (
              <Typography>Job not found</Typography>
          )}
        </Container>
      </div>
  );
};

// Main App component
const App = () => {
  // Simple routing based on hash
  const hash = window.location.hash;
  const jobMatch = hash.match(/#\/job\/(\d+)/);

  if (jobMatch) {
    return <JobDetails jobId={jobMatch[1]} />;
  }

  return <JobList />;
};

export default App;
