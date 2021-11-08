import React from 'react'
import DraftLoader from "../components/Loader";

const LoadingPage = ({dark}) => {
    return <main className={dark ? "loadingPage loadingPage--dark" : "loadingPage"}>
        <DraftLoader />
    </main>
}

export default LoadingPage;
