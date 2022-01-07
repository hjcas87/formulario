import { Route, Routes } from "react-router-dom"
import { AlbumScreen } from "../components/album/AlbumScreen"
import { DistServices } from "../components/album/DistServices"
import { ExtendSongs } from "../components/album/ExtendSongs"
import { GendersScreen } from "../components/album/GendersScreen"
import { IdArtist } from "../components/album/IdArtist"
import { IsrcCodes } from "../components/album/IsrcCodes"
import { SelectNumberOfAlbums } from "../components/album/SelectNumberOfAlbums"
import { SongList } from "../components/album/SongList"
import { SongScreen } from "../components/album/SongScreen"
import { UpcScreen } from "../components/album/UpcScreen"
import { PrivateRoute } from "./PrivateRoute"



export const AlbumRouter = () => {
    return (
        <>
            <Routes>
            
                    <Route path="/" element={ <AlbumScreen />} />
                    
                    <Route path="/upc" element={ <PrivateRoute><UpcScreen /></PrivateRoute>  } />

                    <Route path="/selection" element={
                            <PrivateRoute>
                                <SelectNumberOfAlbums />
                            </PrivateRoute>
                        }/>

                        <Route path="/songs" element={
                            
                            <PrivateRoute>
                                <SongList />
                            </PrivateRoute>
                        }/>

                        <Route path="/edit/:id" element={
                            <PrivateRoute>
                                <SongScreen />
                            </PrivateRoute>
                        }/>

                        <Route path="/genders" element={
                            <PrivateRoute>
                                <GendersScreen />
                            </PrivateRoute>
                        }/>

                        <Route path="/isrc" element={
                            <PrivateRoute>
                                <IsrcCodes />
                            </PrivateRoute>
                        }/>

                        <Route path="/distribution" element={
                            <PrivateRoute>
                                <DistServices />
                            </PrivateRoute>
                        }/>

                        <Route path="/artist" element={
                            <PrivateRoute>
                                <IdArtist />
                            </PrivateRoute>
                        }/>

                        <Route path="/extended-songs" element={
                            <PrivateRoute>
                                <ExtendSongs />
                            </PrivateRoute>
                        }/>
                </Routes> 
        </>
    )
}
