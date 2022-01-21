import { makeStyles, styled } from '@mui/styles';
import { display, height } from '@mui/system';

const useStyles = makeStyles(props => ({
    gridHeader: {
        color: ({ color }) => color,
        background: ({ backGroundColor }) => backGroundColor,
        fontSize: "16px",
        fontFamily: "Times New Roman', Times, serif",
        textAlign: "center",
    },
    seachButton: {
        border: "none",
        borderRadius: "10px",
        padding: "5px 10px",
        backgroundColor: "white",
        color: "green",
        cursor: "pointer",
        marginRight: "20px"
      },
    editSearchButton: {
        border: "none",
        borderRadius: "10px",
        padding: "5px 10px",
        backgroundColor: "green",
        color: "white",
        cursor: "pointer",
        marginRight: "20px"
    },
    deleteSearchButton: {
        color: "red",
        cursor: "pointer"
    },
    statementSearchButton: {
        border: "none",
        borderRadius: "10px",
        padding: "5px 10px",
        backgroundColor: "yellow",
        color: "black",
        cursor: "pointer",
        marginRight: "20px"
    },
    imageContainer: {
        width: "100px",
        height: "80px",
        borderRadius: "10px",
        objectFit: "fill",
        display: "flex",
        alignContent: "center",
        marginTop: "-10px"
      },
      inputStyle: {
        background: props.backGroundColor || "white",
        width: ({ width }) => width || "65%",
        color: ({ color }) => color,
        height: ({ height }) => height || "30px",
        paddingBottom: "0",
        borderRadius: "10px",
        objectFit: "cover",
        fontWeight: "bold",
        marginTop: "4px",
        marginLeft: ({ marginLeft }) => marginLeft  || "0px",
    },
    textAreaStyle: {
        // background: props.backGroundColor || "white",
        //  color: props.color || "blak",
        width: ({ width }) => width || "65%",
        paddingBottom: "0",
        borderRadius: "10px",
        objectFit: "cover",
        fontWeight: "bold",
        marginTop: "4px",
        marginLeft: ({ marginLeft }) => marginLeft  || "0px",
        marginTop: ({ marginTop }) => marginTop  || "0px",
    },
    pageHeader: {
        color: ({ color }) => color || "white",
        background: ({ backGroundColor }) => backGroundColor || "darkBlue",
        marginTop: "4px",
        marginLeft: "4px",
        marginRight: "4px",
        width: "100%"
    },
    balanceStyle: {
        color:  "black",
        background: "yellow",
        fontSize: "13px",
        fontFamily: "Times New Roman', Times, serif",
        textAlign: "center",
        width: "100%",
        height: "85%"
    },
    radioButton: {
        fontSize: "10px",
        fontFamily: "Times New Roman', Times, serif",
        display: 'flex',
        alignContent: "center",
    },
}));



export default useStyles;




