import { BrowserRouter, Routes, Route } from "react-router-dom";


import { AlbumScreen } from "../components/album/AlbumScreen";
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

export const DashboardRoute = () => {
    return (
        <>
           <BrowserRouter>
                <Navbar />
                <main className="main d-flex pt-5">
                {/* <div className="container-sm"> */}
                    <Routes>
                        <Route path="album" element={<AlbumScreen />}/>
                        <Route path="simple" element={<SimpleScreen />}/>
                        <Route path="/*" element={<AlbumScreen />}/>
                        <Route path="upc" element={
                            <PrivateRoute>
                                <Sidebar />
                                <UpcScreen />
                            </PrivateRoute>
                        }/>

                        <Route path="selection" element={
                            <PrivateRoute>
                                <Sidebar />
                                <SelectNumberOfAlbums />
                            </PrivateRoute>
                        }/>

                        <Route path="songs" element={
                            
                            <PrivateRoute>
                                <Sidebar />
                                <SongList />
                            </PrivateRoute>
                        }/>

                        <Route path="edit/:id" element={
                            <PrivateRoute>
                                <Sidebar />
                                <SongScreen />
                            </PrivateRoute>
                        }/>

                        <Route path="genders" element={
                            <PrivateRoute>
                                <Sidebar />
                                <GendersScreen />
                            </PrivateRoute>
                        }/>

                        <Route path="isrc" element={
                            <PrivateRoute>
                                <Sidebar />
                                <IsrcCodes />
                            </PrivateRoute>
                        }/>

                        <Route path="distribution" element={
                            <PrivateRoute>
                                <Sidebar />
                                <DistServices />
                            </PrivateRoute>
                        }/>

                        <Route path="artist" element={
                            <PrivateRoute>
                                <Sidebar />
                                <IdArtist />
                            </PrivateRoute>
                        }/>

                        <Route path="extended-songs" element={
                            <PrivateRoute>
                                <Sidebar />
                                <ExtendSongs />
                            </PrivateRoute>
                        }/>


                    </Routes>
                </main>
            </BrowserRouter> 
        </>
    )
}
