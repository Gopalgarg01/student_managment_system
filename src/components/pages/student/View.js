
import{ Button,TableCell,Paper,
    TableRow, TableHead,TableBody, Table, TableContainer,IconButton, Tooltip} from "@mui/material";
import { useParams,useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

    const View=() =>{
        const{id} = useParams();
        // console.log(id);
        const[student, setStudent] = useState([]);
        const history = useHistory();

        useEffect(()=>{
            getstudent();    
        },[])

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
        function handleClick(){
            history.push("/")
        }
        return(
            
            <>
            
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
                                    

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center">{student.id}</TableCell>
                                    <TableCell align="center">{student.stuname}</TableCell>

                                    <TableCell align="center">{student.email}</TableCell>
                                

                                    
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button type="submit" variant="contained" color="primary" 
                    onClick={handleClick} justify="center"           
                              >Back To Home</Button>

            </>

    )
}

export default View;