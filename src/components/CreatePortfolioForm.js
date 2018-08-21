import React from 'react'

class CreatePortfolioForm extends React.Component {

  render(){
    return(
      <div className="row">
        <h4>Create New Portfolio</h4>
         <form className="col s12" onSubmit={this.handleSubmit}>
           <div className="row">
             <div className="input-field col s12">
               <input placeholder="Portfolio Name" id="name" type="text" />
               {/* <label for="username">Username</label> */}
             </div>
           </div>
           <button className="btn-small waves-effect waves-light material-icons right">Create</button>
         </form>
       </div>
    )
  }
}

export default CreatePortfolioForm
