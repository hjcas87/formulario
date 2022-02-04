import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";

// import { SimpleScreen } from "../components/simple/SimpleScreen";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { PrivateSimpleRoute } from "./PrivateSimpleRoute";
import { PrivateAlbumRoute } from "./PrivateAlbumRoute";
import { Layout } from "../components/ui/Layout";
import { AlbumScreen } from "../components/ui/AlbumScreen";
import { StarterPage } from "../components/ui/StarterPage";
import { Resume } from "../components/ui/Resume";

import { BasicInfo } from "../components/album/basicInfo/BasicInfo";
import { BasicInfo as SimpleBasicInfo } from "../components/simple/basicInfo/BasicInfo";
import { UpcScreen } from "../components/album/upc/UpcScreen";
import { UpcScreen as SimpleUpcScreen } from "../components/simple/upc/UpcScreen";
import { AlbumInformation } from "../components/album/albumInfo/AlbumInformation";
import { SongList } from "../components/album/songs/SongList";
import { SongScreen } from "../components/album/songs/SongScreen";
import { SongScreen as SimpleSongScreen } from "../components/simple/song/SongScreen";
import { DistServices } from "../components/album/DistServices";
import { ExtendSongs } from "../components/album/ExtendSongs";
import { GendersScreen } from "../components/album/GendersScreen";
import { IdArtist } from "../components/album/IdArtist";
import { IsrcCodes } from "../components/album/IsrcCodes";
import { GendersScreen as SimpleGendersScreen } from "../components/simple/GendersScreen";
import { IsrcCodes as SimpleIsrcCodes } from "../components/simple/IsrcCodes";
import { DistServices as SimpleDistServices } from "../components/simple/DistServices";
import { IdArtist as SimpleIdArtist } from "../components/simple/IdArtist";
import { ExtendSongs as SimpleExtendSongs } from "../components/simple/ExtendSongs";


export const DashboardRoute = () => {
    return (
        <>
           <HashRouter>
                <Routes>
                    <Route path="/" element={ <Layout /> }>
                        
                        <Route index element={
                            <PublicRoute>
                                <StarterPage />
                            </PublicRoute>
                        }/>

                        <Route path="/resume" element={
                            <PrivateRoute>
                                <AlbumScreen />
                            </PrivateRoute>
                        }>
                            <Route index element={<Resume />}/>      
                        </Route>

                        <Route path="/simple" element={
                            <PrivateSimpleRoute>
                                <AlbumScreen />
                            </PrivateSimpleRoute>
                        }>
                            <Route index element={<SimpleBasicInfo />}/>

                            <Route path="upc" element={<SimpleUpcScreen />}/>  
                            
                            <Route path="songs" element={<SimpleSongScreen />}/>

                            <Route path="genders" element={<GendersScreen />}/>

                            <Route path="isrc" element={<IsrcCodes />}/>

                            <Route path="distribution" element={<SimpleDistServices />}/>

                            <Route path="artist" element={<SimpleIdArtist />}/>

                            <Route path="extended-songs" element={<SimpleExtendSongs />}/>
                        </Route>
                        
                        <Route path="/album" element={ 
                            <PrivateAlbumRoute>
                                <AlbumScreen />
                            </PrivateAlbumRoute>
                         }>
                            <Route index element={<BasicInfo />}/>

                            <Route path="upc" element={<UpcScreen />}/>

                            <Route path="selection" element={<AlbumInformation />}/>

                            <Route path="songs" element={<SongList />}/>

                            <Route path="songs/edit/:id" element={<SongScreen />}/>

                            <Route path="genders" element={<GendersScreen />}/>

                            <Route path="isrc" element={<IsrcCodes />}/>

                            <Route path="distribution" element={<DistServices />}/>

                            <Route path="artist" element={<IdArtist />}/>

                            <Route path="extended-songs" element={<ExtendSongs />}/>
                        </Route>

                        <Route path="*" element={ <Navigate replace to="/" /> } />
                        
                    </Route>
                </Routes>
            </HashRouter> 
        </>
    )
}
