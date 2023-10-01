import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { API_ROUTE } from "../constants/ROUTES";
import { Grid } from "@mui/material";
import auth from "../utils/spotifyAuth";

function Generator() {
  const [token, setToken] = React.useState("");
  const [code, setCode] = React.useState<string | null>(null);
  const [name, setName] = React.useState<string>("");

  const requestAccess = async () => {
    const codeVerifier = localStorage.getItem("code_verifier");
    console.log(codeVerifier);
    console.log(code);
    const { data } = await axios.post(`${API_ROUTE}/requestSpotifyAccess`, {
      code: code,
      codeVerifier: codeVerifier,
    });
    setToken(data);
  };

  const getProfile = async () => {
    const { data } = await axios.post(`${API_ROUTE}/getCurrentProfile`, {
      token: token,
    });
    console.log(data);
    setName(data.display_name);
  };

  const location = useLocation();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    setCode(code);
  }, [location]);

  // React.useEffect(() => {
  //     requestAccess()
  // }, [])

  return (
    <PageLayout>
      <Grid container={true}>
        <Grid item={true} xs={4} onClick={auth}>
          Authenticate
        </Grid>
        <Grid item={true} xs={8}>
          {code}
        </Grid>
        <Grid item={true} xs={4} onClick={requestAccess}>
          Request Access
        </Grid>
        <Grid item={true} xs={8}>
          {token}
        </Grid>
        <Grid item={true} xs={4} onClick={getProfile}>
          Get Profile
        </Grid>
        <Grid item={true} xs={8}>
          {!!name ? "Hello" : ""} {name}
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Generator;
