import './about.css'
import cf_formula from '../../assets/img/cf_formula.png'
import ui_cf_formula from '../../assets/img/user_item_cf_formula.png'
import ui_cf_steps from '../../assets/img/user_item_cf_steps.png'
import user_follows from '../../assets/img/user_follows_formula.png'
import explainable1 from '../../assets/img/explainable_1.png'
import explainable2 from '../../assets/img/explainable_2.png'
import explainable3 from '../../assets/img/explainable_3.png'
import explainable4 from '../../assets/img/explainable_4.png'
import explainable5 from '../../assets/img/explainable_5.png'
import explainable6 from '../../assets/img/explainable_6.png'
import evaluation from '../../assets/img/evaluation.png'

function About(){

    return (
        <div>
            <div className='about-body'>

                <br />
                <h1 id="chef-it-up-final-project-report">Chef-It-Up: Final Project Report</h1>

                <div style={{textAlign: 'left'}}>
                    <h2 id="1-introduction">1. Introduction</h2>

                    <p>Cooking is a necessary survival skill that we use in our everyday lives. One of the most common challenges
                        with cooking is deciding what to make. Often, this can lead to people spending hours on the internet to find
                        something that aligns with what they like to cook/eat. This can be tedious and lead to people choosing
                        something that’s easy to make rather than trying something interesting.</p>

                    <p>Chef-it-Up aims to eliminate this cumbersome process of finding a recipe that you are comfortable making by
                        bringing the recipes to you. We want to map user preferences like their choice of ingredients, preferred
                        cooking methods, etc. to create tailor-made recipe recommendations for the users. These recommendations can
                        benefit all people, from amateur cooks to expert chefs.</p>

                    <p>Our goal is to make the process of choosing a recipe easy, so users can spend their time cooking rather than
                        looking for a dish to cook.</p>
                </div>

                <div style={{textAlign: 'left'}}>
                    <h2 id="2-proposed-solution--methods-used">2. Proposed Solution</h2>

                    <p>To develop Chef-It-Up, we used a combination of machine learning algorithms and user-centric design
                        principles. The platform consists of the following components:</p>

                    <ul>
                        <li>User Profile: Users create a profile that includes their search history and followers.</li>
                        <li>Recipe Search: Users can search for recipes based on their preferences and dietary requirements.</li>
                        <li>User Feedback: Users can rate recipes and chefs, providing feedback to improve the platform’s
                            recommendations.</li>
                    </ul>
                </div>

                <div style={{textAlign: 'left'}}>
                    <h2 id="3-Methods-used">3. Methods Used</h2>

                    <p>Our project comprises of 4 recommendation methods</p>

                    <ol>
                        <li>User User Collaborative Filtering: Our base recommendation model for recipes</li>
                        <li>User Item Collaborative Filtering: Hybrid model that uses User-User & Item-Item CF to recommend recipes when a user clicks on a particular item</li>
                        <li>User Follows Recommendations: Recommendations based on who a user follows</li>
                        <li>Explainable Recommendations: Tag based explanations for why a particular item was Recommended</li>
                    </ol>

                    <h4>User User Collaborative Filtering</h4>
                    <p>This algorithm is used to provide new unseen items as recommendations to a user. 
                        The 10 closest neighbors via user-rating similarity are considered for calculations.</p>
                    <p>The traditional User-User CF algorithm recommends 3 recipes.</p>
                    <img src={cf_formula} alt="Collaborative Filtering formula" />

                    <h4>User Item Collaborative Filtering</h4>
                    <p>This algorithm provides recommendations to a user-item pair. 
                        Recommendations are a mix of both seen and unseen items.</p>
                    <p>The hybrid User-Item CF algorithm recommends 3 recipes. </p>
                    <p>The formula used to compute the uer-item recommendations is shown below:</p>
                    <img src={ui_cf_formula} alt="Hyrbid User-Item Collaborative Filtering formula" />

                    <p>The steps to generate these recommendations are outlined below:</p>
                    <img src={ui_cf_steps} alt="Hyrbid User-Item Collaborative Filtering steps" />

                    <h4>User Follows Collaborative Filtering</h4>
                    <p>This algorithm biases the previous two algorithms by using a user's following list. 
                        The closest neighbors to a user are considered to be the ones followed by the user.</p>
                    <p>2 recipes are recommended based on the user’s follow network.</p>
                    <img src={user_follows} alt="User Follows Recommendations formula" />
                
                    <h4>Explainable Recommendations</h4>
                    <p>With explainable recommendations, we tell the user what contributed the most to their recommendations.</p>
                    <p>Let’s consider here that Pad Thai is being recommended to U-0. 
                        We start of with a User-Tag matrix which consists of U-0 and 3 most similar users to them.</p>
                    <img src={explainable1} alt="Explainable Recommendations step 1" />
                    <br />

                    <p>We then calculate the cosine similarity between U-0 and U-1,2 and 3.</p>
                    <img src={explainable2} alt="Explainable Recommendations step 2" />
                    <br />

                    <p>Next we move into the domain of User-User CF where multiply the cosine similarity 
                        by the ratings provided by the other 3 users.</p>
                    <img src={explainable3} alt="Explainable Recommendations step 3" />
                    <br />

                    <p>However, instead of calculating the cumulative sum per user we flip this to calculate the cumulative sum per tag.
                        This will give us the contribution of each tag towards the item’s final score.</p>
                    <img src={explainable4} alt="Explainable Recommendations step 4" />
                    <br />

                    <p>If you look at this cumulative table, we can see that U-0 gets recommended Pad thai 
                        due to interacting with the tags Saute and Braise</p>
                    <img src={explainable5} alt="Explainable Recommendations step 5" />
                    <br />

                    <p>Similarly, for user-Follows, we compute the contribution score of each user to the recommendation.</p>
                    <p>And in this table we can see that U-0 gets recommended Pad thai due to following U-4 and U-1</p>
                    <img src={explainable6} alt="Explainable Recommendations step 6" />
                    <br />

                </div>
                
                <div style={{textAlign: 'left'}}>
                    <h2 id="3-evaluation-and-analysis-of-results">3. Evaluation and Analysis of Results</h2>
                    <p>In order to evaluate our proposed methods, we created a train-test split of 80-20. 
                        We then measured the precision and recall at k = 5, 20 and 50.</p>
                    <p>The results are tabulated below:</p>
                    <img src={evaluation} alt="Evaluation Results" />
                    <br />
                    <p>Since the user follows were simulated, we could not verify the results of the User-Item and User-Follows algorithms. 
                        The above results instead are based on the User User Collaborative Filtering algorithm.
                    </p>
                    <p>Since we were looking for precise results, we chose to recommend 5 items at a time, seeing as that gave us the best precision.</p>
                </div>
                
                <div style={{textAlign: 'left'}}>
                    <h2 id="4-conclusions">4. Conclusions</h2>

                    <p>In conclusion, Chef-it-Up has successfully achieved its goal of making the process of choosing a recipe easy
                        for users. By mapping user preferences and leveraging machine learning algorithms, we were able to provide
                        tailor-made recipe recommendations that suit each user’s unique tastes. Our platform has the potential to
                        benefit all individuals, from amateur cooks to expert chefs, by simplifying the recipe selection process and
                        saving valuable time.</p>

                    <p>Throughout the development process, we focused on user-centric design principles and utilized the latest
                        technologies to create a user-friendly and efficient platform.</p>

                    <p>As we look towards the future, we plan to continue improving and expanding the platform, incorporating new
                        features and functionalities that will further enhance the user experience. Chef-it-Up has the potential to
                        revolutionize the way people approach cooking and eating, and we are excited to see the impact it will have
                        in the culinary world.</p>
                </div>
            
            </div>
        </div>
    )
}

export default About