import axios from "axios";
import { useState } from "react";
// import styled from "styled-components";

export const ArtistSearch = (props) => {
    const { token } = props;
    const [searchArtistName, setSearchArtistName] = useState("");
    const [resultArtistDatas, setResultArtistDatas] = useState([]);

    const handleSearchInputChanges = (e) => setSearchArtistName(e.target.value);

    // Event Search Artists
    const onClickSearchArtist = async () => {
        await axios
            .get(
                `https://api.spotify.com/v1/search?q=${searchArtistName}&type=artist&limit=20`,
                {
                    headers: { Authorization: "Bearer " + token },
                    data: {}
                }
            )
            .then((res) => {
                const result = [res.data.artists.items];
                setResultArtistDatas(result);
                console.log(resultArtistDatas[0]);
                console.log(result)
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <div>
            <div className="cards">
                <input className="form__field"
                    value={searchArtistName}
                    onChange={handleSearchInputChanges}
                    type="text"
                    placeholder="Type Artist..."
                />
                <button className="btn"
                    onClick={onClickSearchArtist} type="submit">
                    Let's go
                </button>
            </div>

            {resultArtistDatas.length ? (
                resultArtistDatas[0].map((artist) => (
                    <div className="users" key={artist.id}>
                        <img
                            height={160}
                            width={160}
                            src={artist?.images[2]?.url || ""}
                            alt={artist.name}
                        />
                        <h3>{artist.name}</h3>

                        <h3>Followers: {artist.followers.total}</h3>
                        <a href={artist.external_urls.spotify}>Spotify List</a>

                        <h3>Genres:
                            {artist.genres &&
                                artist.genres.map((genreName) => ` ${genreName}, `)}
                        </h3>

                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    );
};

