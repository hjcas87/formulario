import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";


import { InfoBasica } from "../components/album/InfoBasica";
import { DistServices } from "../components/album/DistServices";
import { ExtendSongs } from "../components/album/ExtendSongs";
import { GendersScreen } from "../components/album/GendersScreen";
import { IdArtist } from "../components/album/IdArtist";
import { IsrcCodes } from "../components/album/IsrcCodes";
import { SelectNumberOfAlbums } from "../components/album/SelectNumberOfAlbums";
import { Sidebar } from "../components/album/Sidebar";
import { SongList } from "../components/album/SongList";
import { SongScreen } from "../components/album/SongScreen";
import { SimpleScreen } from "../components/simple/SimpleScreen";
import { Navbar } from "../components/ui/Navbar";
import { UpcScreen } from "../components/album/UpcScreen";
import { PrivateRoute } from "./PrivateRoute";
import { Layout } from "../components/ui/Layout";
import { AlbumScreen } from "../components/ui/AlbumScreen";

export const DashboardRoute = () => {
    return (
        <>
           <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <Layout /> }>
                                
                            <Route path="/simple" element={<SimpleScreen />}/>
                            
                            <Route path="/album" element={ <AlbumScreen /> }>
                                <Route index element={<InfoBasica />}/>
                                <Route path="upc" element={
                                    
                                    <PrivateRoute>
                                        <UpcScreen />
                                    </PrivateRoute>
                                }/>

                                <Route path="selection" element={
                                    <PrivateRoute>
                                        <SelectNumberOfAlbums />
                                    </PrivateRoute>
                                }/>

                                <Route path="songs" element={
                                    
                                    <PrivateRoute>
                                        <SongList />
                                    </PrivateRoute>
                                }/>

                                <Route path="edit/:id" element={
                                    <PrivateRoute>
                                        <SongScreen />
                                    </PrivateRoute>
                                }/>

                                <Route path="genders" element={
                                    <PrivateRoute>
                                        <GendersScreen />
                                    </PrivateRoute>
                                }/>

                                <Route path="isrc" element={
                                    <PrivateRoute>
                                        <IsrcCodes />
                                    </PrivateRoute>
                                }/>

                                <Route path="distribution" element={
                                    <PrivateRoute>
                                        <DistServices />
                                    </PrivateRoute>
                                }/>

                                <Route path="artist" element={
                                    <PrivateRoute>
                                        <IdArtist />
                                    </PrivateRoute>
                                }/>

                                <Route path="extended-songs" element={
                                    <PrivateRoute>
                                        <ExtendSongs />
                                    </PrivateRoute>
                                }/>
                            </Route>

                            <Route path="*" element={ <Navigate replace to="/" /> } />
                            
                        </Route>
                    </Routes>
            </BrowserRouter> 
        </>
    )
}
