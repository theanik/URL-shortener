import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import '../style.css';
import '../index.css';
import Swal from 'sweetalert2';
import values from '../values';
import bg1 from '../bg1.jpg';
const axios = require('axios');


export default class LoginSignup extends Component {
    state={
        isSingup:false,
        name:"",
        email:"",
        password:"",
        loginSuccess:false
    }
    SignupForm = ()=>{
        this.setState({isSingup:true})
    }
    LogForm = ()=>{
        this.setState({isSingup:false})
    }
    UpdateStateValue = (e)=>{
        
        var stateName = e.target.name;
        var val = e.target.value;

        this.setState({
            [stateName]:val
        },()=>{console.log(stateName)});
    }
    
    loginSignup = ()=>{
        let {name,email,password} = this.state;
        if(this.state.isSingup){
            //sign up case
            if(this.state.name && this.state.email && this.state.password){
                
                axios.post(`${values.BASE}/signup`,{name,email,password})
                    .then((d)=>{
                        Swal.fire({
                            type: 'success',
                            title: 'Congratulation',
                            text: 'Sign up complite'
                          })
                          this.setState({
                              isSingup:false
                          })
                    })
                    .catch(e=>{
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...! Log In Error',
                            text: 'Incorrect Info! Please try again'
                          })
                    }).finally(d=>{
                        this.setState({
                          name:null,
                          email:null,
                          password:null
                        });
                      })
                    
            }else{
                alert('Some parameter are missing');
            }
        }else{

            //Login case
            if(this.state.email && this.state.password){
               axios.post(`${values.BASE}/login`,{email,password})
                    .then((d)=>{
                        if(d.data.error === false){
                            localStorage.setItem('access-token',d.data.token);
                            this.setState({
                                loginSuccess:true
                            })
                        //console.log(d)
                        }else{
                            console.log('errir');
                                Swal.fire({
                                type: 'error',
                                title: 'Oops...! Sign up Error',
                                text: 'Something went wrong! Please try again'
                            })
                        }
                    })
                    // .catch(e=>{
                    //     Swal.fire({
                    //         type: 'error',
                    //         title: '222222222222222Oops...! Sign up Error',
                    //         text: 'Something went wrong! Please try again'
                    //       })
                    // })
                   
            }else{
                alert('Some parameter are missing');
            }
        }
    }
    componentWillMount(){
        if(localStorage.getItem('access-token')){
            this.setState({loginSuccess:true})
        }
    }
    render() {
        //if log in it's redirects
        if(this.state.loginSuccess){
            return(
                <Redirect to="/"></Redirect>
            )
        }
        return (
            <div className="loginsignup">
                {/* <input onChange={this.UpdateStateValue} style={{...styles.input,display:this.state.isSingup?'block':'none'}} type="text" name="name" placeholder="Enter Name"/>
                <input onChange={this.UpdateStateValue} style={styles.input} type="email" name="email" placeholder="Enter Email"/>
                <input onChange={this.UpdateStateValue} style={styles.input} type="password" name="password" placeholder="Enter Password"/>
                <div style={{display:this.state.isSingup?'none':'block'}} onClick={this.SignupForm}>Sign Up Now</div>
                <div style={{display:this.state.isSingup?'block':'none'}} onClick={this.LogForm}>Log in Now</div> */}
            <section className="signup">
            <div className="container">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 style={{display:this.state.isSingup?'block':'none'}} className="form-title">Sign up</h2>
                        <h2 style={{display:this.state.isSingup?'none':'block'}} className="form-title">Log In</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group" style={{display:this.state.isSingup?'block':'none'}}>
                                <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input onChange={this.UpdateStateValue} type="text" name="name" placeholder="Your Name"/>
                            </div>
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input onChange={this.UpdateStateValue} type="email" name="email"  placeholder="Your Email"/>
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input onChange={this.UpdateStateValue} type="password" name="password"  placeholder="Password"/>
                            </div>
                            
                            <div className="form-group">
                                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term form-cotrol" />
                                <label for="agree-term" className="label-agree-term"><span><span></span></span>I agree all statements in  <a href="#" class="term-service">Terms of service</a></label>
                            </div>
                            <div class="form-group form-button">
                                <input onClick={this.loginSignup} type="button" name="signup" id="signup" className="form-submit" value={this.state.isSingup?'Sign Up':'Log In'}/>
                            </div>
                        </form>
                    </div>
                    <div class="signup-image">
                        <figure><img src={bg1} alt="sing up image"/></figure>
                        {/* <p style={{display:this.state.isSingup?'none':'block'}} onClick={this.LogForm} class="signup-image-link">Have a account? Log In</p>
                        <p style={{display:this.state.isSingup?'block':'none'}} onClick={this.SignupForm} class="signup-image-link">New User? Sign in please</p> */}
                        <div style={{display:this.state.isSingup?'none':'block'}} onClick={this.SignupForm}>New User? Sign in please</div>
                <div style={{display:this.state.isSingup?'block':'none'}} onClick={this.LogForm}>Have a account? Log In</div> 
                    </div>
                </div>
            </div>
        </section>
            </div>
        )
    }
}

const styles = {
    input:{
        fontSize:16,
        padding:5,
        margin:10,
        display:'block'
    }
}