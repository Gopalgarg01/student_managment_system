import "./Edit.css"
import { Typography,Box,makeStryles, Grid, TextField, Button, makeStyles } from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios';
const Edit=() =>{
    const{id} = useParams();
    const history = useHistory();
    const [student, setStudent] = useState({
        stuname:"",
        email:""
    });
    useEffect(()=>{
        

        async function getstudent(){
            try{
                const student= await axios.get(`http://localhost:3004/students/${id}`)
                // console.log(student.data);
                setStudent(student.data);
            }
                    
            catch(error){
                console.log("something is wrong");
            }
                
        }
        getstudent();
    },[id])
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        
    }

    async function onFormSubmit(e){
        e.preventDefault()
        try{
            await axios.put(`http://localhost:3004/students/${id}`, student)
            
            setStudent(student.data);
            history.push("/");
        }            
        catch(error){
            console.log("something is wrong");
        }
    }
        
    function handleClick(){
        history.push("/")
    }
    
    return(
        <>
           <Box textAlign="center" p={2} className ="heading" mb={2}>
            <Typography variant="h2">React CRUD with API Call</Typography>

           </Box>
           <Grid container justify="center" spacing={4}>
            <Grid item md={6} xs={12}>
                <Box textAlign="center" p={2} className="subheading" mb={2}>
                    <Typography variant="h4">Edit Student</Typography>
                </Box>
                <form>
                    <Grid container spacing ={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="id" name="id"
                            variant="outlined" required fullWidth id="id"
                            label ="ID" autoFocus value={id} disabled/>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="stuname" name="stuname"
                            variant="outlined" required fullWidth id="stuname"
                            label ="ID" value={student.stuname} onChange={e =>onTextFieldChange(e)}/>
                        </Grid>
                        <Grid item xs={12} >
                            <TextField autoComplete="email" name="email"
                            variant="outlined" required fullWidth id="email"
                            label ="Email Address" value={student.email} onChange={e =>onTextFieldChange(e)}/>
                        </Grid>
                    </Grid>
                    <Box m={3} >
                    <Button type="button" variant="contained"
                    color="primary" fullWidth onClick={e =>onFormSubmit(e)}>
                        Update
                    </Button> 
                </Box>
                </form>
                 
                <Box m={3} textAlign="center">
                    <Button variant="contained" color="primary"onClick={handleClick}>
                        Back to Home
                    </Button>
                </Box>


            </Grid>
           </Grid>
        </>
    )
}

export default Edit;