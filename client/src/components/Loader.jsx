import React from 'react'
import { LinearProgress } from '@mui/material'

function Loader() {
    return (
        <div className="h-[100vh] flex flex-col justify-center w-2/4 mx-auto " >
            <LinearProgress color="primary" />
        </div>
    )
}

export default Loader
