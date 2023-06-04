// importing all the components + css (for styling) + react
import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Engielogo from './Components/engielogo';
import EngieBuildingLogo from './Components/engiebuildinglogo';
import PromineoTechLogo from './Components/promineotechlogo';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import RefactorApp from './Components/Refactor-App';
import WeatherForecast from './rest/WeatherApi';
// importing to be able to create and use a Router
import {
  BrowserRouter as Router,
  Switch, 
  Route, 
  Link,
  useRouteMatch
} from 'react-router-dom';

export default function App() {
  // an array with 3 objects w/ key:value properties
  const solutions = [
    {
      id: 1,
      title: 'Solar',
      content: 'Harnessing the power of the sun to fulfill energy needs and shape a sustainable future'
    },
    {
      id: 2,
      title: 'Wind',
      content: 'Wind farms help large companies, universities, utilities, municipalities meet clean energy goals'
    },
    {
      id: 3,
      title: 'Storage',
      content: '24/7 energy reliability and cost-efficiency with storage'
    },
  ];

  const engie = 'https://www.engie.com/en';

  return (
    <Container>
      {/* using the Router to be able to create a 'SPA' (single page application) */}
      <Router>
        <div>
          <ButtonGroup>
            {/* 'Button' - 'B' is capitalized, unlike 'button' in HTML, because this is a component from React Bootstrap */}
            <Button variant='outline-secondary'>
               {/* (below) 4 links/pages + customize URL display */}
              <Link to="/" className="hover-link">Home</Link>
            </Button>
            <Button variant='outline-secondary'>
              <Link to="/WeatherForecast" className="hover-link">Weather Forecast</Link>
            </Button>
            <Button variant='outline-secondary'>
              <Link to="/solutions" className="hover-link">Solutions</Link>
            </Button>
            <Button variant='outline-secondary'>
              <Link to="/bill" className="hover-link">Single Bill</Link>
            </Button>
            <Button variant='outline-secondary'>
              <Link to="/specialthanks" className="hover-link">Special Thanks</Link>
            </Button>
          </ButtonGroup>
            
          {/* switch = evaluate value(s) and based on the value, it will render 1 or the other view */}
          <Switch>
            {/* specifying what to render within the 'solutions' URL */}
            <Route path='/specialthanks'>
              <br/><br/>
              <SpecialThanks names={['Jamal Taylor - (Instructor)', 'Christopher Conway - (Mentor)', 'Jolene Melanson - (Mentor)', 
                'Kristina Macias - (Mentor)', 'Matthew Cox - (Mentor)', 'Nereida Rondon - (Mentor)', 'Nick Suwyn - (founder of Promineo Tech)']} />
              <br/><PromineoTechLogo/>
            </Route>
            <Route path='/solutions'>
              <Solutions solutions={solutions} />
              <Engielogo/>
            </Route>
            <Route path='/bill'>
            <br/><br/>
              <RefactorApp />
            </Route>
            <Route path='/WeatherForecast'>
              <div className='background-image-container'>
              <WeatherForecast />
              </div>
            </Route>
            <Route path='/'>
              <Home />
              <br/><EngieBuildingLogo/>
            </Route>
          </Switch>
        </div>        
      </Router>
    </Container>
  );
}

// component to display 'home' 
function Home() {
  return (
    <div>
      <center>
        <br/><h2 style={{ color: 'black', fontWeight: 'bold' }}>Welcome to Global Warming Solutions</h2>
        <br/><a href='https://www.engie.com/en' style={{fontSize: 20}}>Click if you think global warming is real!</a>
      </center>
    </div>
  );
}

// component to display 'SpecialThanks' array 
function SpecialThanks(props) {
  const { names } = props;
  return (
    <div style={{fontSize: 20, textAlign:'center', color: 'black', fontWeight: 'bold'}}>
        {/* mapping over 'names' (each person/'friend' array + pass index (so that each list 
          item has an index for better tracking) */}
        {names.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
    </div>
  );
}

// destructuring 'solutions' inline
function Solutions({ solutions }) {
  // to be able to target by ID from the URL
  const match = useRouteMatch();
  const findPostById = (id) => 
    // look at each post 
    solutions.filter((post) => post.id == id)[0];
  return (
    <div>
      <br/><h2 style={{color: 'black', fontWeight: 'bold'}}>Renewables - Net Zero Carbon</h2>
        {/* map over each solutions to create a link for each + pass index */}
        {solutions.map((post, index) => {
          return (
            <Alert key={index} variant="primary"> 
              {/* link w/ 2 values - 'match' will return current URL + 'match' the 'post.id' */}
              <Link to={`${match.url}/${post.id}`}>
                {/* display the title */}
                {post.title}
              </Link>
            </Alert>
          );
        })}
      
      <Switch>
        <Route
        // ':postId' = parameter (whatever the path is, take the next value)
          path={`${match.path}/:postId`}
          // closing Route with 'render' purposely to be able to have access to the Id in the URL (upon clicking) + 
          // for timing reasons 
          render={(props) => (
            <Post
              // spread operator + targeting a specific Id
              {...props}
              data={findPostById(props.match.params.postId)}
            />
          )} 
        />
        <Route path={match.path}>
          <h5 style={{color: 'white'}}> ^ Please make your selection</h5>
        </Route>
      </Switch>
    </div>
  ); 
}

// display data - referred to as 'subroutes' (retrieving data created from above)
function Post(props) {
  const { data } = props;
  // if a nonexistent URL is provided, it will display this error msg instead of crashing the code
  return data == undefined ? <h1>404 Not Found</h1> : (
    <Card>
      <Card.Header>{data.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle>{data.date}</Card.Subtitle>
        <Card.Text>{data.content}</Card.Text>
      </Card.Body>
    </Card>
  );
}