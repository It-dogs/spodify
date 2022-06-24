import React, { useState, useEffect } from "react";
import { createUseStyles } from 'react-jss';
import NavBar from '../NavBar';
import Home from '../../home';
import emitter from '../../utils/emitter';
import spotifyWebApi from 'spotify-web-api-js';
import _ from 'lodash';

//create instance for spotify web api
const spotify = new spotifyWebApi();

const categories = ['toplists'];  //Global Top 50

const menuStyle = createUseStyles({
  container: {
    width: '100%',
    height: '100%',
    //overflowY: 'auto'
  }
})

const Menu = (props) => {
    const classes = menuStyle();
    const { token } = props;
    const [currentPage, setCurrentPage] = useState('home');
    const [topList, setTopList] = useState([]);

    //listen to the tab change
    useEffect(() => {
      emitter.on('home', ()=>setCurrentPage('home'));
      emitter.on('search', ()=>setCurrentPage('search'));
      emitter.on('library', ()=>setCurrentPage('library'));
      emitter.on('create_playlist', ()=>setCurrentPage('create_playlist'));
      emitter.on('liked_songs', ()=>setCurrentPage('liked_songs'));
      
      //if token exist, register that token to the api
      token && spotify.setAccessToken(token);

      /* //call spotify web api for list of categories
      spotify
        .getCategories()
          .then(data=>console.log(data))
            .catch(err=>console.log(err));
      */
      return () => {
        emitter.off('home');
        emitter.off('search');
        emitter.off('library');
        emitter.off('create_playlist');
        emitter.off('liked_songs');
      }
    }, [token]);

    useEffect(() => {
      spotify
        .getCategoryPlaylists('toplists')
          .then(data => {
            console.log(data.playlists.items);
            const playList = data.playlists.items;
            let list = [...topList];
            playList.forEach(item => {
              let temp = {};
              temp.id = item.id? item.id:null;
              temp.description = item.description? item.description:null;
              temp.url = item.images[0].url? item.images[0].url:null;
              temp.name = item.name? item.name:null;
              temp.tracks = item.tracks.href? item.tracks.href:null;
              !_.isEmpty(temp) && list.push(temp);
            });
            setTopList(list);
          })
            .catch(err=>console.log(err));
    }, []);


    const handleMenuContent = () => <>
      <div style={{display: currentPage==='home'? 'block':'none', height: '100%'}}>
        <Home topList={topList} />
      </div>
      
    </>

    return (
      <div className={classes.container}>
        <NavBar />
        {handleMenuContent()}
      </div>
    );
}

export default Menu;

/*

{
  "playlists" : {
    "href" : "https://api.spotify.com/v1/browse/categories/toplists/playlists?offset=0&limit=20",
    "items" : [ {
      "collaborative" : false,
      "description" : "Drake is on top of the Hottest 50!",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M",
      "id" : "37i9dQZF1DXcBWIGoYBM5M",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f00000003bdb19a8abe069e6345fcdf0d",
        "width" : null
      } ],
      "name" : "Today's Top Hits",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzIwMCwwMDAwMDU0ZDAwMDAwMTgxOTNkZGRlZDgwMDAwMDE4MTkyN2IyNTlh",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DXcBWIGoYBM5M"
    }, {
      "collaborative" : false,
      "description" : "New music from Roddy Ricch,  YG and All-RapCaviar's first team member, Lil Durk.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd",
      "id" : "37i9dQZF1DX0XUsuxWHRQd",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f0000000385b0edd4062cc291bcac3276",
        "width" : null
      } ],
      "name" : "RapCaviar",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzIwMCwwMDAwMDY3MTAwMDAwMTgxOTNkZGRmMTIwMDAwMDE4MThkN2QwYmNm",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUsuxWHRQd/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX0XUsuxWHRQd"
    }, {
      "collaborative" : false,
      "description" : "The latest from WILLOW along with the top Rock songs you need to know.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DXcF6B6QPhFDv"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcF6B6QPhFDv",
      "id" : "37i9dQZF1DXcF6B6QPhFDv",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f00000003e4643e4fcdd0aea36a78eb87",
        "width" : null
      } ],
      "name" : "Rock This",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzMyMCwwMDAwMDY5YjAwMDAwMTgxOTNkZmIzMTYwMDAwMDE4MThjMzcwMDZh",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DXcF6B6QPhFDv/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DXcF6B6QPhFDv"
    }, {
      "collaborative" : false,
      "description" : "The world's biggest dance hits. Featuring music from Dimitri Vegas, David Guetta, Nicole Scherzinger, & Aztek, Diplo & bbno$, Beyoncé and more!",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX4dyzvuaRJ0n"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4dyzvuaRJ0n",
      "id" : "37i9dQZF1DX4dyzvuaRJ0n",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f0000000333c058216fb18a5fc7f99f2e",
        "width" : null
      } ],
      "name" : "mint",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzI2MCwwMDAwMDRkYjAwMDAwMTgxOTNkZWM4Y2UwMDAwMDE4MTkwY2NhMWJi",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4dyzvuaRJ0n/tracks",
        "total" : 100
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n"
    }, {
      "collaborative" : false,
      "description" : "Today's top country hits of the week, worldwide! Cover: Luke Combs",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX1lVhptIYRda"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX1lVhptIYRda",
      "id" : "37i9dQZF1DX1lVhptIYRda",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f00000003701216ce0178683b85f389a6",
        "width" : null
      } ],
      "name" : "Hot Country",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzIwMCwwMDAwMDM1OTAwMDAwMTgxOTNkZGRlZGQwMDAwMDE4MTkyM2MzZjgy",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX1lVhptIYRda/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX1lVhptIYRda"
    }, {
      "collaborative" : false,
      "description" : "Today's top Latin hits, elevando nuestra música. Cover: Duki",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX10zKzsJ2jva"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva",
      "id" : "37i9dQZF1DX10zKzsJ2jva",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f00000003d9548c173a83d49809c0ccdd",
        "width" : null
      } ],
      "name" : "Viva Latino",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzI2MCwwMDAwMDYyYzAwMDAwMTgxOTNkZWM4ZTYwMDAwMDE4MTkxODEwMTRm",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX10zKzsJ2jva/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX10zKzsJ2jva"
    }, {
      "collaborative" : false,
      "description" : "The pulse of R&B music today.  Cover: Giveon",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX4SBhb3fqCJd"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4SBhb3fqCJd",
      "id" : "37i9dQZF1DX4SBhb3fqCJd",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f000000031181be1f32f06b21afc3383a",
        "width" : null
      } ],
      "name" : "Are & Be",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzIwMCwwMDAwMDU2YjAwMDAwMTgxOTNkZGRlY2YwMDAwMDE4MThkN2ZhMGQ3",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4SBhb3fqCJd/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX4SBhb3fqCJd"
    }, {
      "collaborative" : false,
      "description" : "Your daily update of the most played tracks right now - USA.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZEVXbLRQDuF5jeBp"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp",
      "id" : "37i9dQZEVXbLRQDuF5jeBp",
      "images" : [ {
        "height" : null,
        "url" : "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_us_large.jpg",
        "width" : null
      } ],
      "name" : "Top 50 - USA",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "NzA5MzkyNDYwLDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDY1NmU=",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZEVXbLRQDuF5jeBp"
    }, {
      "collaborative" : false,
      "description" : "Your daily update of the most played tracks right now - Global.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZEVXbMDoHDwVN2tF"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF",
      "id" : "37i9dQZEVXbMDoHDwVN2tF",
      "images" : [ {
        "height" : null,
        "url" : "https://charts-images.scdn.co/assets/locale_en/regional/daily/region_global_large.jpg",
        "width" : null
      } ],
      "name" : "Top 50 - Global",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "NzA5MzkyNDY5LDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDY1NmU=",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZEVXbMDoHDwVN2tF"
    }, {
      "collaborative" : false,
      "description" : "Your daily update of the most viral tracks right now - Global.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZEVXbLiRSasKsNU9"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9",
      "id" : "37i9dQZEVXbLiRSasKsNU9",
      "images" : [ {
        "height" : null,
        "url" : "https://charts-images.scdn.co/assets/locale_en/viral/daily/region_global_large.jpg",
        "width" : null
      } ],
      "name" : "Viral 50 - Global",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "NzA5Mzk2OTY5LDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDY1NmU=",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZEVXbLiRSasKsNU9"
    }, {
      "collaborative" : false,
      "description" : "Your daily update of the most viral tracks right now - USA.",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZEVXbKuaTI1Z1Afx"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbKuaTI1Z1Afx",
      "id" : "37i9dQZEVXbKuaTI1Z1Afx",
      "images" : [ {
        "height" : null,
        "url" : "https://charts-images.scdn.co/assets/locale_en/viral/daily/region_us_large.jpg",
        "width" : null
      } ],
      "name" : "Viral 50 - USA",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "NzA5Mzk2OTY0LDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDY1NmU=",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZEVXbKuaTI1Z1Afx/tracks",
        "total" : 50
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZEVXbKuaTI1Z1Afx"
    }, {
      "collaborative" : false,
      "description" : "New music from Lil Nas X, Beyoncé, Taylor Swift, Eminem, Gorillaz, and more!",
      "external_urls" : {
        "spotify" : "https://open.spotify.com/playlist/37i9dQZF1DX4JAvHpjipBk"
      },
      "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4JAvHpjipBk",
      "id" : "37i9dQZF1DX4JAvHpjipBk",
      "images" : [ {
        "height" : null,
        "url" : "https://i.scdn.co/image/ab67706f0000000309650bb935121a3bb660ee18",
        "width" : null
      } ],
      "name" : "New Music Friday",
      "owner" : {
        "display_name" : "Spotify",
        "external_urls" : {
          "spotify" : "https://open.spotify.com/user/spotify"
        },
        "href" : "https://api.spotify.com/v1/users/spotify",
        "id" : "spotify",
        "type" : "user",
        "uri" : "spotify:user:spotify"
      },
      "primary_color" : null,
      "public" : null,
      "snapshot_id" : "MTY1NjA0MzgwNSwwMDAwMDNiNTAwMDAwMTgxOTNlNzFhNjgwMDAwMDE4MTkyOWVjN2Fi",
      "tracks" : {
        "href" : "https://api.spotify.com/v1/playlists/37i9dQZF1DX4JAvHpjipBk/tracks",
        "total" : 100
      },
      "type" : "playlist",
      "uri" : "spotify:playlist:37i9dQZF1DX4JAvHpjipBk"
    } ],
    "limit" : 20,
    "next" : null,
    "offset" : 0,
    "previous" : null,
    "total" : 12
  }
}
*/