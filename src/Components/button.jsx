import { Button } from "@mui/material"; // Correct import path for Material UI components
import "../Styles/btnstyle.css"

function MyButton() {
  return (
    <>
      <Button class="btn"><p class="txt">Click me</p></Button>
    </>
  );
}


export default MyButton;
