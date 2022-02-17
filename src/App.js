import axios from "axios";
import { useEffect, useState } from "react";
import { ArtistSearch } from "./components/ArtistSearch";
import { Credentials } from "./Credentials";


export default function App() {
  const spotifyClientInfo = Credentials();
  const [accessToken, setAccessToken] = useState("");

  // ID'S
  console.log(
    "Basic " +
    btoa(spotifyClientInfo.ClientId + ":" + spotifyClientInfo.ClientSecret)
  );

  // RE-RENDER CONTENT
  useEffect(() => {
    axios
      .request("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            btoa(
              spotifyClientInfo.ClientId + ":" + spotifyClientInfo.ClientSecret
            )
        },
        data: "grant_type=client_credentials",
        method: "POST"
      })
      .then((res) => {
        setAccessToken(res.data.access_token);
        console.log(res.data.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [spotifyClientInfo.ClientId, spotifyClientInfo.ClientSecret]);

  return (
    <div className="App">
      <ArtistSearch token={accessToken} />
    </div>
  );
}
