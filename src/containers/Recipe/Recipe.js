import { useEffect, useState } from 'react'
import { useParams,useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Header from '../../components/Header/Header.js'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import './recipe.css'

const getRecipe = async (recipeId) => {
    const recipe = await axios.get(`https://vaidhyesh.pythonanywhere.com/recipe?recipeId=${recipeId}`)
    return recipe.data
}

const getRecommendations = async (recipeId, userId) => {
    const res = await axios.get(`https://vaidhyesh.pythonanywhere.com/recommendationBasedOnClick?userId=${userId}&recipeId=${recipeId}`)
    return res.data
}

const renderRecommendationCards = (recommendations, navigate, userId) => {
    return recommendations.map((recommendation, index) => {
        return (
            <Card sx={{ minWidth: 275, margin: '10px' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Recommendation {index+1}:
                    </Typography>
                    <Typography variant="h5" component="div">
                    {recommendation.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => {
                        navigate(`/recipe/${recommendation.id}?userId=${userId}`);
                    }}>Learn More</Button>
                </CardActions>
            </Card>
        )
    })
}

const renderSteps = (steps) => {
    
    return typeof steps == 'object' && steps.map((step, index) => {
        return (
            <Typography variant="body1">
                   {index+1}. {step}
            </Typography>
        )
    })
}

const formatSteps = (steps) => {
    const strippedString = steps.replace(/[\\\"]/g,"'").replace(/[\[\]]/g,"")
    const stepsArr = strippedString.split(", '").map(str => str.replace(/[\']/g,""))
    return stepsArr
}


function Recipe(){
    let { recipeId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();
    const userId = searchParams.get('userId')

    useEffect(() => {
        getRecipe(recipeId).then(recipe => {
            setRecipeName(recipe.name)
            const ingredients = recipe.ingredients.replace(/[\[\]\']/g,'');
            setIngredients(ingredients)
            setSteps(formatSteps(recipe.steps))
            getRecommendations(recipeId, userId).then((recommendations) => {
                setRecommendations(recommendations)
            })
        });
    }, [recipeId])

    return (
        <div>
            <Header/>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                    m: 1,
                    width: '80%',
                    minWidth: 300,
                    padding: '20px'
                    },
                }}
            >
                <Paper elevation={3} >
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {recipeName}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1">
                        <b>Ingredients:</b> {ingredients}
                    </Typography>
                    <br/>
                    <Typography variant="body1">
                        <b>Steps: </b>{renderSteps(steps)}
                    </Typography>
                    <Typography variant="body1" className='recommendation-heading'>
                        <b>Recommendations based on this recipe:</b>
                    </Typography>
                    <div className='recommendation-cards'>
                        {renderRecommendationCards(recommendations, navigate, userId)}
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Recipe