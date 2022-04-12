import { useCategory } from '../context/category-context';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Category = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { categories } = useCategory();
  const [categoryValue, setCategoryValue] = useState('Chicken');

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [meals, setMeals] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryValue}`
    )
      .then(res => res.json())
      .then(
        result => {
          setIsLoaded(true);
          setMeals(result.meals);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [categoryValue]);

  const handleDeleteClick = id => {
    const removeItem = shoppingCart.filter(shopping => {
      return shopping.strMeal !== id;
    });

    setShoppingCart(removeItem);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
          style={{ overflow: 'scroll' }}
        >
          <Box sx={style}>
            {shoppingCart &&
              shoppingCart.map(shopping => {
                return (
                  <Card
                    key={shopping.strMeal}
                    onClick={() => handleDeleteClick(shopping.strMeal)}
                    sx={{ display: 'flex', marginBottom: '10px' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component='div' variant='h5'>
                          {shopping.strMeal}
                        </Typography>
                      </CardContent>
                    </Box>
                    <CardMedia
                      component='img'
                      sx={{ width: 151, height: '100%' }}
                      image={shopping.strMealThumb}
                      alt='Live from space album cover'
                    />
                  </Card>
                );
              })}
          </Box>
        </Modal>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          {categories.map(category => {
            return (
              <Button
                onClick={e => setCategoryValue(e.target.innerText)}
                key={category.idCategory}
              >
                {category.strCategory}
              </Button>
            );
          })}
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Grid container>
            {meals &&
              meals.map(meal => {
                return (
                  <Grid key={meal.strMeal} item sm={4} xs={12}>
                    <Card sx={{ padding: '20px' }}>
                      <CardHeader title={meal.strMeal} />
                      <Link to={meal.idMeal}>
                        <CardMedia
                          component='img'
                          height='194'
                          image={meal.strMealThumb}
                          alt='Paella dish'
                        />
                        <CardContent>
                          <Typography variant='body2' color='text.secondary'>
                            This impressive paella is a perfect party dish and a
                            fun meal to cook together with your guests. Add 1
                            cup of frozen peas along with the mussels, if you
                            like.
                          </Typography>
                        </CardContent>
                      </Link>
                      <CardActions disableSpacing>
                        <Button
                          onClick={() =>
                            setShoppingCart([...shoppingCart, meal])
                          }
                        >
                          Add to Cart
                        </Button>
                        <Button onClick={handleOpen} color='inherit'>
                          View Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </>
    );
  }
};

export default Category;
