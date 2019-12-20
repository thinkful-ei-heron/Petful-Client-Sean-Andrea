import React, {Component} from 'react'
import { Queue, adoptionQueue, namesArray } from './Queue'
import PetfulApi from './Services/petful-api-service'

class AdoptionPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            wantsToRegister : false,
            firstName:'',
            lastName:'',
            registered:false,
            numberInLine:'',
            catQ:'',
            dogQ:''
        }
    }


    componentDidMount(){

        PetfulApi.getAllCats()
            .then(cat => this.setState({catQ:cat}))
            .catch({error:'An Error has Occurred'})
        
        PetfulApi.getAllDogs()
            .then(dog => this.setState({dogQ:dog}))
            .catch({error:'An Error has Occurred'})
        //console.log(list)

        
        const changeList=()=>{
            console.log('Hello')
            let temp = adoptionQueue.dequeue()
            let temp2 = namesArray.pop()
            adoptionQueue.enqueue(temp2)
            namesArray.push(temp)
            console.log(adoptionQueue.display())
        }

        let j = setInterval(changeList, 10000)

    }

    addToQ=(name)=>{
        adoptionQueue.enqueue(name)
    }


    clickHandler =(e)=>{
        this.setState({wantsToRegister : true})
    }

    submitHandler =(e)=>{
        e.preventDefault()
        let fullName = this.state.firstName + ' ' +  this.state.lastName
        this.setState({wantsToRegister:false,
                        registered:true})
        this.addToQ(fullName)
        console.log(fullName)
    }

    handleFirstName=(e)=>{
        e.preventDefault()
        this.setState({firstName:e.target.value})
    }

    handleLastName=(e)=>{
        e.preventDefault()
        this.setState({lastName:e.target.value})
    }
    
    render(){
        let cat = this.state.catQ[0]
        return(
            
        <div className = 'adoptionPage'>
            <div className = 'adoption'>
                <h1> Welcome to Petful Adoption Center! </h1>
                <h2> Adoption Page </h2>
                <div className = 'dog'>
                    <h3>Dogs</h3>
                </div>
                <div className = 'cat'>
                    <h3>Cats</h3>
                    <h4></h4>
                </div>
                <button type='button' onClick={this.clickHandler}>Register</button>
            </div>
            {this.state.wantsToRegister === true ? 
            <div className = 'registration'>
                <form>
                    <p>Please enter your first name: <input type='text' placeholder='First Name' name='firstName' onChange={this.handleFirstName}></input></p>
                    <p>Please enter your last name:  <input type='text' placeholder='Last Name'name='lastName' onChange={this.handleLastName}></input></p>
                    <button type='button' onClick={this.submitHandler}>Register For Adoption!</button>   
                </form> 
            </div> : null }
            {this.state.registered ? 
             <div className = 'registeredUser'>
                <h4>Thank you for your interest, {this.state.firstName} {this.state.lastName}! You are currently number {adoptionQueue.size()} in line</h4>
         </div> : null }
    
        </div>
    )
    }

}

export default AdoptionPage;
