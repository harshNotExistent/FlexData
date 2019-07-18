import React ,{Component} from 'react';
import {Table} from 'reactstrap';
import './App.css';
import Flexi from './Flexi.js';
const flexiConfig = {
  items: [
  {
  "name": "person_name",
  "label": "Person's Name",
  "type": "TextField",
  },
  {
  "name": "states",
  "label": "Person's state",
  "type": "DropDown",
            "values": [
                 "Maharashtra",
                 "Kerala", 
                 "Tamil Nadu"
  ]}
  ]
 };
function User(props){
    let userRow=props.user;
    let key=props.key;
    return (
      <tr>
        <td>
          {userRow.person_name}
        </td>
        <td>
          {userRow.states}
        </td>
      </tr>
    )
}
class App extends Component {
  state={
    data:[]
  }

onSubmit(newData){
  
  this.setState({
    data:[...this.state.data,newData]
  });
  
}
 render(){ 
   let {data}=this.state
   return (
    <div className="">
      <h3>Flex Data</h3>
     {(data.length===0) ? "No Data Found, Please fill in the form !": (<Table responsive>
        <thead>
          <tr>
            <td>Name</td>
            <td>States</td>
          </tr>
        </thead>
        <tbody>
        {  data.map((e,i)=>
            <User user={e} key={i}/>
        )}
        </tbody>
     </Table>) }
     
      <Flexi onSubmit={(data)=>this.onSubmit(data)} config={flexiConfig}/>
      
    </div>

  );
}
}
export default App;
