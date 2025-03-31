import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface GeoLocationState{
    error : string | null,
    coords : Coordinates | null,
    isloading : boolean
}

export function useGeolocationData() {

    const [geolocation,setGeolocation] = useState<GeoLocationState>({
        error : null,
        coords : null,
        isloading : false
    })

    const getLocation = () => {
      

        setGeolocation((prev) => ({
            ...prev,
            isloading : true
        }))

        if(!navigator.geolocation){
            setGeolocation((prev) => ({
                ...prev,
                error : "Geolocation is not supported by your browser",
            }))

            return;
        }

        navigator.geolocation.getCurrentPosition((position)=>{
            setGeolocation({
                error : null,
                coords : {
                    lat : position.coords.latitude,
                    lon : position.coords.longitude,
                },
                isloading : false
            })

        }, (error)=> {
            let errorMessage : string
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location sharing is denied by user."
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    errorMessage = "The request to get user location timed out."
                    break;
                default:
                    errorMessage = "An unknown error occurred."
                    break;
            }

            setGeolocation({
                coords : null,
                isloading : false,
                error : errorMessage
            })
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        })
    }

    useEffect(()=>{

        getLocation();
    },[])

    return {
        ...geolocation,
        getLocation
    }

}