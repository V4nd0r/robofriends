//Imports
import React, { Component } from "react";
import {connect} from "react-redux";
import {setSearchfield, requestRobots} from '../actions';

import CardList from "../components/CardList";
import SearchBox from '../components/SearchBox';
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

import './App.css';

// Define mapStateToProps function to map the redux state to the props of the component
const mapStateToProps = (state) => {
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

// Define mapDispatchToProps function to map dispatching of actions to the props of the component
const mapDispatchToProps = (dispatch) => {
    return  {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

// Define App component
class App extends Component {
    // Call the onRequestRobots function after the component has mounted
    componentDidMount() {
        this.props.onRequestRobots();
    }

    //Define render 
    render() {
        const {robots, searchField, onSearchChange, isPending } = this.props;
        // Filter the robots array based on the searchField
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        
        // Render the component with the filtered robots
        return (
           <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    { isPending ? <h1>Loading</h1> :
                    <ErrorBoundary>
                        <CardList robots = {filteredRobots} />
                    </ErrorBoundary>
                    }
                </Scroll>
            </div>
        );
    }
}

// Connect the App component to the Redux store using the mapStateToProps and mapDispatchToProps functions
export default connect(mapStateToProps, mapDispatchToProps)(App);