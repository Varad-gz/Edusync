import DashboardNavbar from "@/components/DashboardNavbar"

export default function DashboardLayout({ children }) {

    return (
        <div className="flex flex-row">
            <DashboardNavbar />
            {children}
        </div>
    )

}