import React from 'react';

export default class Searchbox extends React.Component {
    render () {
        return (
            <div className="row pb-4 pt-5" style={{backgroundColor: "orange"}}>
                <div className="col-1 col-sm-2 col-lg-4"></div>
                <div className="col-10 col-sm-8 col-lg-4">
                    
                    <h2 style={{color: "white"}} >The Beer Bank</h2>
                    <h6 style={{color: "white"}} className="mb-3">Find your favourite beer here</h6>
                    <input className="form-control" type="text" placeholder="Search for beer name..." onChange={(e) => this.props.getBeerListByName(e)} ></input>
                </div>
                <div className="col-1 col-sm-2 col-lg-4"></div>
            </div>
        )
    }
}