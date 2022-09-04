
import "./Home.css"
import { blue, deepPurple, green ,orange } from "@mui/material/colors";
import{Typography, Box, Grid, TextField, Button, TableCell,Paper,
     TableRow, TableHead,TableBody, Table, TableContainer,IconButton, Tooltip} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";



const Home = () => {
    const [student, setStudent] = useState({
        stuname: "",
        email: ""

    });
    const [status, setStatus] = useState();

    const [students,setStudents] = useState([]);
    useEffect(()=>{
        getAllstudent();

    },[])
   
    async function getAllstudent(){
        try{
            const students= await axios.get("http://localhost:3004/students" )
            console.log(students.data);
            setStudents(students.data);
        }
             
            catch(error){
                console.log("something is wrong");
            }
            
        }
    function onTextFieldChange(e){
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
        
    }
    const handleDelete = async id =>{
        await axios.delete(`http://localhost:3004/students/${id}`)
        var newstudent = students.filter((item)=> {
            return item.id !== id;
        })
        setStudents(newstudent);
    
    }
    
    async function onFormSubmit(e){
        e.preventDefault()
        try{
            await axios.post(`http://localhost:3004/students`, student)
           setStatus(true);
           setStudent(student.data);
        }            
            catch(error){
                console.log("something is wrong");
            }
    }
   
    if(status){
        return <Home/>
    }else{
        return(
            <>
             <Box textAlign="center">
                <Typography className="grid1" variant="h2" mb={2}> React CRUD with API Call</Typography>
             </Box>
             <Grid container justify="center" spacing={4} >
                <Grid item md={6} xs ={12} >
                    <Box textAlign="center" p={2} mb={2} className="addstudent" > 
                    <Typography variant="h4">Add Student</Typography>
                    </Box>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs ={12}>
                                <TextField autoComplete="stuname" name="stuname"
                                variant="outlined" required fullWidth id="stuname"
                                label= "Name" onChange={e => onTextFieldChange(e)}/>
                            </Grid>
                            <Grid item xs ={12}>
                                <TextField autoComplete="email" name="email"
                                variant="outlined" required fullWidth id="email"
                                label= "Email" onChange={e => onTextFieldChange(e)}/>
                            </Grid>
                        </Grid>
                        <Box m={3}>
                            <Button type="submit" variant="contained" color="primary"
                            fullWidth onClick={e =>onFormSubmit(e)}>Add</Button>
                        </Box>
                    </form>
                </Grid>
                <Grid item md={6} xs ={12}>
                    <Box textAlign="center" p={2} className="studentlist" > 
                    <Typography variant="h4">Student List</Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className="row1">
                                    <TableCell align="center" style={{color:"white",fontWeight:"bold"}} className="tablecell">
                                        No.
                                    </TableCell>
                                    <TableCell align="center" style={{color:"white",fontWeight:"bold"}}>
                                        Name
                                    </TableCell>
                                    <TableCell align="center" style={{color:"white",fontWeight:"bold"}}>
                                        Email
                                    </TableCell>
                                    <TableCell align="center" style={{color:"white",fontWeight:"bold"}}>
                                        Action
                                    </TableCell>
    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                students.map((student,i)=>{
                                    return (
                                    <TableRow key ={i}>
                                    <TableCell align="center">{i+1}</TableCell>
                                    <TableCell align="center">{student.stuname}</TableCell>
    
                                    <TableCell align="center">{student.email }</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="View">
                                            <IconButton><Link to={`/view/${student.id}`}>
                                                <VisibilityIcon color="primary"/>
                                            </Link>
    
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton><Link to={`/edit/${student.id}`}>
                                                <EditIcon/>
                                            </Link>
     
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton onClick={()=> handleDelete(student.id)}><DeleteIcon color="secondary"
                                            />
                                        
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
    
                                    
                                </TableRow>
                            
    
                                        )
    
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                </Grid> 
             </Grid>
             
            
            </>
        )

    }
    
    
}


export default Home;