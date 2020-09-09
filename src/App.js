import React, {useState, useEffect} from 'react';//Use effect function that happens when our code starts running(mounts)
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';


import Modal  from './components/Modal/Modal';
import NewsCards from './components/NewsCards/NewsCards.js';
import useStyles from './style';




const alanKey = '64b77db00ff5b1efdd0dbc28c89c09672e956eca572e1d8b807a3e2338fdd0dc/stage';
const App = () => {
    const [activeArticle, setActiveArticle] = useState(0);
  const [newsArticles, setNewsArticles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();

useEffect(()=>{
alanBtn({
    key : alanKey,
    onCommand: ({ command, articles, number }) =>{
        if (command === 'newHeadlines') {
            setNewsArticles(articles);
            setActiveArticle(-1);
          } else if (command === 'instructions') {
            setIsOpen(true);
          } else if (command === 'highlight') {
            setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
          } else if (command === 'open') {
            const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
            const article = articles[parsedNumber - 1];
  
            if (parsedNumber > 20) {
              alanBtn().playText('Please try that again...');
            } else if (article) {
              window.open(article.url, '_blank');
              alanBtn().playText('Opening...');
            } else {
              alanBtn().playText('Please try that again...');
            }
          }
    }
})


}, []);

return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
         <div><Typography variant="h5" component="h1">Abstrct News Platform</Typography> <br></br></div>
        </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!newsArticles.length ? (
        <div className={classes.footer}>
            
          <Typography variant="body1" component="h2">
            <span>Created by</span>
            <a className={classes.link} href="https://www.linkedin.com/in/tlholomakhene"> Tlholo Makhene</a> -
            <a className={classes.link} href="https://abstrctsolutions.com/"> Abstrct Solutions</a>
            <span> | Powered by</span>
            <a className={classes.link} href="https://alan.app/platform"> Alan&trade;</a>
            <span>&amp;</span> 
            <a className={classes.link} href="https://newsapi.org/"> News API&trade;</a>
          </Typography>
         
        </div>
      ) : null}
    </div>
  );
};



export default App;