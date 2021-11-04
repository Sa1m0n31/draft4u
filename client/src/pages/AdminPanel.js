import React from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";

const AdminPanel = () => {
    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu />
        </main>
    </div>
}

export default AdminPanel;
