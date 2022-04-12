import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WebIcon from '@mui/icons-material/Web';
import Box from '@mui/material/Box';
const SingleMeal = () => {
  let { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [singleMeal, setSingleMeal] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setSingleMeal(result.meals);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        {singleMeal.map(meal => {
          return (
            <Grid key={meal.strMeal} container spacing={2}>
              <Grid item xs={12} md={6}>
                <img src={meal.strMealThumb} width='100%' />
              </Grid>
              <Grid item xs={12} md={6} style={{ padding: '20px' }}>
                <Typography variant='h3'>{meal.strMeal}</Typography>
                <Box
                  sx={{
                    '& > :not(style)': {
                      m: 2,
                    },
                  }}
                >
                  <a target='blank' href={meal.strYoutube}>
                    <YouTubeIcon fontSize='large' />
                  </a>
                  <a target='blank' href={meal.strSource}>
                    <WebIcon fontSize='large' />
                  </a>
                </Box>
                <Typography variant='p'>{meal.strInstructions}</Typography>

                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                  aria-label='contacts'
                >
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure1} />
                      <ListItemText primary={meal.strIngredient1} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure2} />
                      <ListItemText primary={meal.strIngredient2} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure3} />
                      <ListItemText primary={meal.strIngredient3} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure4} />
                      <ListItemText primary={meal.strIngredient4} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure5} />
                      <ListItemText primary={meal.strIngredient5} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={meal.strMeasure6} />
                      <ListItemText primary={meal.strIngredient6} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  }
};

export default SingleMeal;
