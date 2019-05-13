import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import values from '../values';
import { setTimeout } from 'timers';
const axios = require('axios');



function Conditional(props){
    if(props.condition){
        return (
            <div className={props.className}>
                {props.children}
            </div>
        )
    }else{
        return null;
    }
}
function UrlComponent(props){
    return(
        <div className={props.className}>
           
                <div className="alert alert-success">
                   <h4><a href={`${values.BASE}/${props.data.hash}`}>{`${values.BASE}/${props.data.hash}`}</a></h4>
                   <p><a target='_blank' href={`${props.data.destination}`}>{`${props.data.destination}`}</a></p>
                </div>
            
        </div>
    )
}
export default class Urls extends Component {
    state = {
        logedIn:true,
        loading:false,
        token:"",
        newHash:"",
        urlList:[]
    }
    componentWillMount(){
        var token = localStorage.getItem('access-token');
        if(!token){
            this.setState({logedIn:false})
        }else{
            this.setState({token},this.getUrllist)
        }
    }
    clrNewHash = ()=>{
        this.setState({newHash:""})
    }
    handelKeyUp = (evt)=>{
       
        if(evt.keyCode === 13 && !evt.target.value==""){
            var urlVal = evt.target.value;
            evt.target.value = "";
            if(urlVal && urlVal.match(/^https?:\/\/.{3,}/)){
                 this.setState({loading:true});
                axios.post(`${values.BASE}/api/v1/redirects`,
                    {url:urlVal},
                    {headers:{'auth-token':this.state.token}})
                    .then(success=>{
                        console.log(success);
                        //alert(`Direction created! ${values.BASE}/${success.data.hash}`)
                       // debugger
                       this.setState({newHash:success.data.hash});
                        this.getUrllist();
                       setTimeout(this.clrNewHash,10000);
                    })
                    .catch(e=>{
                        console.log(e.massage)
                       // debugger
                    }).finally(()=>{
                        this.setState({loading:false})
                        
                    })
            }
           
        }
    }
  
    getUrllist = ()=>{
        axios.get(`${values.BASE}/api/v1/redirects`,
        {headers:{'auth-token':this.state.token}})
        .then(d=>{
            this.setState({urlList:d.data})
        }).catch(e=>{
            console.log(e)
        })
    }
    logoutBtn = ()=>{
        localStorage.clear();
        this.setState({logedIn:false})
    }
 
    render() {
        if(!this.state.logedIn){
            return(<Redirect to="/" />)
        }
        return (
            <div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                          <div className="alert alert-info p-5">
                          <p style={{display:'block'}}>Enter your ulr</p>
                                <div className="row">
                                
                                    <div className="col-md-10">
                                        <input onKeyUp={this.handelKeyUp} className="form-control"
                                         type="url" placeholder="example.urls.think/somethigg/12" />
                                    </div>
                                    <div className="col-md-2">
                                        <input id="inp" type="button" className="btn btn-info" value="Get Url"></input>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    {/* success urls */}
                    <Conditional className="row" condition={this.state.newHash}>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="alert alert-success">
                                Your new shortend Url is : <a target='_blank' href={`${values.BASE}/${this.state.newHash}`}>{`${values.BASE}/${this.state.newHash}`}</a>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </Conditional>

                    {/* urls list */}
                    
                         <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-10">
                                     <h3><span className="badge badge-primary">Your Urls</span></h3>
                                </div>
                                <div className="col-md-2">
                                    <input type="button" onClick={this.logoutBtn} className="btn btn-warning" value="Log Out"/>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    
                        
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                {this.state.urlList.reverse().map((el,i)=><UrlComponent data={el} key={i} />)}
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                     
                        {/* empty state */}
                        <Conditional className="row" condition={!this.state.urlList.length}>
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <div className="alert alert-warning">
                                🧐 Could not find anything yet!!!
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </Conditional>
                    


                </div>
            </div>
        )
    }
}
