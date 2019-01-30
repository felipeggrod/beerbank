import React from 'react';

export default class Modal extends React.Component {
    
    render () {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                { (this.props.beer === undefined) ? 
                    ( <div>undefined</div> )
                    : 
                    (  
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">

                                <div className="modal-header">
                                    
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                        
                                <div className="modal-body">
                                    <div className="row">
                                        <img 
                                            className="col-3"
                                            style={{height: "20%"}}  
                                            src={this.props.beer.image_url} 
                                            alt="Beer"
                                        />
                                        <div className="col-9">
                                            <h3 className="mt-0 mb-2 modal-title orange text-left" id="exampleModalLabel">{this.props.beer.name}</h3>
                                            <p className="text-black-50 text-left"> {this.props.beer.tagline} </p>
                                            <div className="my-3" style={{height: "5px", width: "100px", backgroundColor:"#cb61ef"}}></div>
                                            <p className="text-black-50 text-left">
                                                <b>IBU:</b>&ensp;{this.props.beer.ibu}&emsp;
                                                <b>ABV:</b>&ensp;{this.props.beer.abv}%&emsp;
                                                <b>EBC:</b>&ensp;{this.props.beer.ebc}
                                            </p>
                                            <p className="text-black-50 text-left pr-2"> {this.props.beer.description} </p>
                                            <div className="my-3 text-black-50 text-left">
                                                <b>Best served with:</b>
                                                <ul>
                                                    {this.props.beer.food_pairing.map((food) => { 
                                                        return (<li key = {food}>{food}</li>);
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <div className="container">
                                        <h5 className="orange p-0 row col-12">You might also like:</h5>
                                        <div className="row">
                                            <div className="col-4" style={{height: "230px"}}  > 
                                                <div className="border" style={{blockSize: "100%"}}>
                                                    <img 
                                                        className="col-3 my-3"
                                                        style={{height: "60%", maxWidth: "100%", width:"auto"}}  
                                                        src={this.props.similarBeers[0].image_url} 
                                                        alt="Beer"
                                                    /> 
                                                    <h6 className="pb-4 text-secondary"> {this.props.similarBeers[0].name}  </h6>
                                                </div>
                                            </div>
                                            <div className="col-4" style={{height: "230px"}}  >
                                                <div className="border" style={{blockSize: "100%"}}>
                                                    <img 
                                                        className="col-3 my-3"
                                                        style={{height: "60%", maxWidth: "100%", width:"auto"}}  
                                                        src={this.props.similarBeers[1].image_url} 
                                                        alt="Beer"
                                                    /> 
                                                    <h6 className="pb-4 text-secondary"> {this.props.similarBeers[1].name}  </h6>
                                                </div>
                                            </div>
                                            <div className="col-4" style={{height: "230px"}}  >
                                                <div className="border" style={{blockSize: "100%"}}>
                                                    <img 
                                                        className="col-3 my-3"
                                                        style={{height: "60%", maxWidth: "100%", width:"auto"}}  
                                                        src={this.props.similarBeers[2].image_url} 
                                                        alt="Beer"
                                                    /> 
                                                    <h6 className="pb-4 text-secondary"> {this.props.similarBeers[2].name}  </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        ); 
    }
}