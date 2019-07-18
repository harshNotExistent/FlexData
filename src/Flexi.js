import React ,{Component} from 'react';
import { Container, Card, CardBody, CardHeader, CardFooter, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import PropTypes from "prop-types";
class Flexi extends Component{
    constructor(props){
        super(props);
        this.props.config.items.map((e,i)=>
            {
                if(e.type=="DropDown"){
                    let name=e.name;
                   let val= e.values[0]
                this.state={  
                    [name]: val
                }
            }
            }
        )    
    }
    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        if (this.props.onSubmit) this.props.onSubmit(this.state);
      };
    onChange = (e, name) => {
          this.setState(
            {
              [name]: e.target.value
            });
    }
    renderForm=()=>{
        let model = this.props.config;
        let formUI = model.items.map((m,i) => {
            let name = m.name;
            let key=m.name;
            let type = m.type || "text";
            let value = m.value;
      
            let target = name;
            value = this.state[target] || "";
            
            let input = (
              <Input
                type={type}
                name={name}
                value={value}
                onChange={e => {
                  this.onChange(e, target);
                }}
              />
            );

            if (type == "DropDown") {
                input = m.values.map((o,i) => {
                  return (
                    <option 
                        key={i}
                      className="form-input"
                      value={o}>
                      {o}
                    </option>
                  );
                });
                input = (
                  <Input
                    name={name}
                    type="select"
                    onChange={e => {
                    this.onChange(e, name);
                }}>
                    {input}
                  </Input>
                );
              }
        return (
            <div>
                <FormGroup>
              <Label className="form-label" htmlFor={name}>
                {m.label}
              </Label>
              </FormGroup>
              {input}
            </div>
          );
        }); 
        return formUI; 
    }
    render(){
        return(
         
            <div>
                <Container>
                    <Card>
                        <CardHeader>
                <h3>Flex Form</h3>
                </CardHeader>       
                <Form>
                <CardBody>
                    {this.renderForm()}
                    </CardBody>
                    <CardFooter>
                    <Button type="submit" className="px-4" color="primary" onClick={this.onSubmit}>Submit</Button>
                    </CardFooter>
                </Form>
                </Card>
                </Container>
            </div>


        );
    }

}
Flexi.propTypes={
    onSubmit:PropTypes.func.isRequired,
    config:PropTypes.shape({
        items:PropTypes.arrayOf(PropTypes.shape({
            name:PropTypes.string.isRequired,
            label:PropTypes.string.isRequired,
            type:PropTypes.string.isRequired,
            value:PropTypes.arrayOf(PropTypes.string.isRequired)
         })).isRequired
    }).isRequired
};

export default Flexi;