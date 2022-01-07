import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";


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
import { AlbumRouter } from "./AlbumRouter";

export const DashboardRoute = () => {
    return (
        <>
           <BrowserRouter>
                <Navbar />
                <main className="main d-flex pt-5">
                    <Sidebar/>
                {/* <div className="container-sm"> */}
                    <Routes>
                        <Route path="simple" element={<SimpleScreen />}/>
                        {/* <Route path="/" element={<AlbumScreen />}/> */}
                        <Route path="/album/*" element={

                                    <AlbumRouter />
                        }/>

                        


                    </Routes>
                    <div className="fill"></div>
                </main>
                
            </BrowserRouter> 
        </>
    )
}
