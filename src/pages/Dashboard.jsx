import SideMenu from "../components/layout/SideMenu";



const Dashboard = () => {
    return(

        <div className="flex min-h-screen">

            <SideMenu onMenuClick={(path) => {}}/>
                
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-4">Välkommen</h1>
            </div>

            
        </div>


    );
} 

export default Dashboard; 