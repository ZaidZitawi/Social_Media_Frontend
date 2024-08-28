import React, { useState } from "react";
import { Box, Typography, Container, CssBaseline } from "@mui/material";
import Header from "../Components/landingHeader.jsx";
import Footer from "../Components/footer.jsx";
import SignIn from "../Components/SignIn.jsx"; // Ensure correct import paths
import SignUp from "../Components/SignUp.jsx"; // Ensure correct import paths

const LandingPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Header />
      <Container
        component="main"
        sx={{ flex: 1, mt: 4, display: "flex", alignItems: "center" }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            padding: 2,
          }}
        >
          <Box sx={{ flex: 1, pr: 4 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", mb: 2, color: "#120460" }}
            >
              Welcome to Our Platform!
            </Typography>
            <Typography variant="h6" sx={{ color: "#004696" }}>
              We’re excited to have you join our community. Connect, share, and
              grow with us. If you’re already a member, sign in to access your
              account. If you’re new, feel free to sign up and get started!
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              maxWidth: "500px",
              boxShadow: 3,
              padding: 4,
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              border: "2px solid #1E8EAB",
            }}
          >
            {showSignUp ? (
              <>
                <SignUp /> 
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 2, color: "#120460" }}
                >
                  Already have an account?{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", color: "#1E8EAB" }}
                    onClick={handleToggleForm}
                  >
                    Sign in here.
                  </Typography>
                </Typography>
              </>
            ) : (
              <>
                <SignIn /> 
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 2, color: "#120460" }}
                >
                  Don’t have an account?{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", color: "#1E8EAB" }}
                    onClick={handleToggleForm}
                  >
                    Sign up here.
                  </Typography>
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default LandingPage;
