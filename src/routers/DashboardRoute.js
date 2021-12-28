import { BrowserRouter, Routes, Route } from "react-router-dom";


import { AlbumScreen } from "../components/album/AlbumScreen";
import { SelectNumberOfAlbums } from "../components/album/SelectNumberOfAlbums";
import { SongsScreen } from "../components/album/SongsScreen";
import { SimpleScreen } from "../components/simple/SimpleScreen";
import { Navbar } from "../components/ui/Navbar";
import { UpcScreen } from "../components/ui/UpcScreen";
import { PrivateRoute } from "./PrivateRoute";

export const DashboardRoute = () => {
    return (
        <>
           <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="album" element={<AlbumScreen />}/>
                    <Route path="simple" element={<SimpleScreen />}/>
                    <Route path="/" element={<AlbumScreen />}/>

                    <Route path="upc" element={
                        <PrivateRoute>
                            <UpcScreen />
                        </PrivateRoute>
                    }/>

                    <Route path="album/selection" element={
                        <PrivateRoute>
                            <SelectNumberOfAlbums />
                        </PrivateRoute>
                    }/>

                    <Route path="album/songs" element={
                        <PrivateRoute>
                            <SongsScreen />
                        </PrivateRoute>
                    }/>

                </Routes>
            </BrowserRouter> 
        </>
    )
}
