import React from 'react';
import './App.css';
import LandingPage from './landingPage.js';
import AdoptionPage from './adoptionPage'

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      currentPage : 'LandingPage'
    }
  }
  
  updateCurrentPage(page){
    this.setState({currentPage:page})
  }


  render(){
    
    switch(this.state.currentPage){
    
      case('LandingPage'):
        return (
          <div className="App">
            <LandingPage changePage={(page) => this.updateCurrentPage(page)}/>
          </div>
        );     
      case('AdoptionPage'):
          return (
            <div className="App">
              <AdoptionPage changePage={(page) => this.updateCurrentPage(page)}/>
            </div>
          );
     }
}
}

export default App;
