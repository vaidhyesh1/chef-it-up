import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './recipe.css'
import Recommendations from '../Recommendations/Recommendations';
import {getRecipe, getRecommendations} from '../../Api.js';

const renderSteps = (steps) => {
    
    return typeof steps == 'object' && steps.map((step, index) => {
        return (
            <Typography variant="body1">
                {index+1}. {step}
            </Typography>
            
        )
    })
}

const renderTags = (tags, navigate) => {
    
    return typeof tags == 'object' && tags.map((tag) => {
        return (
            <Button onClick={() => {
                navigate(`/recipes`, {state: {tag}});
            }} variant="outlined" value={tag}>{tag}</Button>
        )
    })
}

const formatSteps = (steps) => {
    const strippedString = steps.replace(/[\\"]/g,"'").replace(/[[\]]/g,"")
    const stepsArr = strippedString.split(", '").map(str => str.replace(/[']/g,""))
    return stepsArr
}


function Recipe () {
    const navigate = useNavigate(); 
    let { recipeId } = useParams();
    const [searchParams] = useSearchParams();
    const [recipeName, setRecipeName] = useState('');
    const [minutes, setMinutes] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [tags, setTags] = useState('')
    const [description, setDescription] = useState('');
    const [steps, setSteps] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const userId = searchParams.get('userId')

    useEffect(() => {
        getRecipe(recipeId).then(recipe => {
            // console.log("Recipe", recipe)
            setRecipeName(recipe.name)
            setMinutes(recipe.minutes)
            const ingredients = recipe.ingredients.replace(/[[\]']/g,'');
            setIngredients(ingredients)
            var tags = recipe.tags.replace(/[[\]']/g,'');
            tags = tags.split(',')
            tags = tags.map((entry) => {return entry.trim()});
            setTags(tags)
            setDescription(recipe.description)
            setSteps(formatSteps(recipe.steps))
            getRecommendations(recipeId, userId).then((recommendations) => {
                setRecommendations(recommendations)
            })
        });
    }, [recipeId, userId])

    return (
        <div>
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
                <Paper key={recipeName} elevation={3} >
                    <Typography id="modal-modal-title" variant="h5" component="h2">
                        {recipeName}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" style={{textAlign: 'left'}}>
                        <b>Minutes:</b> {minutes}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" style={{textAlign: 'left'}}>
                        <b>Ingredients:</b> {ingredients}
                    </Typography>
                    <br/>
                    <Typography variant="subtitle1" style={{textAlign: 'left'}}>
                        <b>Description:</b> {description}
                    </Typography>
                    <br/>
                    <Typography variant="body1" style={{textAlign: 'left'}}>
                        <b>Steps: </b>{renderSteps(steps)}
                    </Typography>
                    <br />
                    <Typography variant="body1" style={{textAlign: 'left'}}>
                        <b>Tags: </b>{renderTags(tags, navigate)}
                    </Typography>
                    <br />
                    <Typography variant="body1" className='recommendation-heading'>
                        <b>Recommendations based on this recipe:</b>
                    </Typography>
                    <div className='recommendation-cards'>
                        <Recommendations recipeList={recommendations} userId={userId} />
                    </div>
                </Paper>
            </Box>
        </div>
    )
}

export default Recipe