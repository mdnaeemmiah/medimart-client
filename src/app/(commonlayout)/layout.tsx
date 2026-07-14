import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({children} :{children:React.ReactNode}) => {
    return (
        <div className="flex min-h-screen flex-col bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.10),transparent_28rem),linear-gradient(180deg,#f8fafc_0%,#ffffff_48%,#f8fafc_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.10),transparent_28rem),linear-gradient(180deg,#020617_0%,#0f172a_52%,#020617_100%)] dark:text-slate-100">
          <Navbar></Navbar>
          <main className="min-h-screen w-full">
          {children}
          </main>
           <Footer></Footer>
        </div>
    );
};

export default CommonLayout;
