// import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {Button} from '@mui/material';
import './recommendations.css'

const renderRecommendationCards = (recommendations, navigate, userId) => {
    return recommendations.map((recommendation, index) => {
        return (
            <Card key={recommendation.name} sx={{ minWidth: 350, maxWidth: 400, margin: '10px' }}>
                <CardContent sx={{marginBottom: '-20px'}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Recommendation {index+1}:
                    </Typography>
                    <Typography variant="h5" component="div">
                        {recommendation.name}
                    </Typography>
                    <Typography>
                        {recommendation.type === "Rating" ? (
                            <p>Because you've interacted with: <b>{recommendation.tags.join(', ')}</b></p>
                        ) : (
                            <p>Because you follow: <b>{recommendation.tags.join(', ')}</b></p>
                        )}
                    </Typography>
                </CardContent>
                <CardActions style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="small" onClick={() => {
                        navigate(`/recipe/${recommendation.id}?userId=${userId}`);
                    }}>Learn More</Button>
                </CardActions>
            </Card>
        )
    })
}

const recCardStyle = {
    "display": 'flex', 
    "flexDirection": 'row', 
    "flexWrap": 'wrap', 
    "justifyContent": 'center'
}

function Recommendations(props) {
    const {recipeList, userId} = props
    const navigate = useNavigate();

    return (
        <div style={recCardStyle}>
            {renderRecommendationCards(recipeList, navigate, userId)}
        </div>
    )
}

export default Recommendations