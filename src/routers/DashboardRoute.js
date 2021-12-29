import { BrowserRouter, Routes, Route } from "react-router-dom";


import { AlbumScreen } from "../components/album/AlbumScreen";
import { SelectNumberOfAlbums } from "../components/album/SelectNumberOfAlbums";
import { SongList } from "../components/album/SongList";
import { SongScreen } from "../components/album/SongScreen";
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
                            <SongList />
                    }/>

                    <Route path="edit/:id" element={
                        // <PrivateRoute>
                            <SongScreen />
                        // </PrivateRoute>
                    }/>

                </Routes>
            </BrowserRouter> 
        </>
    )
}
