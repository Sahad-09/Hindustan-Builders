// app/admin/edit/[id]/page.tsx
import { getPropertyByIdAction } from "@/lib/actions/actions";
import EditPropertyForm from "@/components/EditPropertyForm";
import AdminProtected from '@/components/AdminProtected';


export default async function EditPropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    try {
        const { id } = await params;
        const response = await getPropertyByIdAction(id);

        if (!response.success) {
            return (
                <AdminProtected>
                    <div className="max-w-2xl mx-auto p-6">
                        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
                        <p>{response.error || "The property you're looking for doesn't exist."}</p>
                    </div>
                </AdminProtected>
            );
        }

        const property = response.data;

        return (
            <AdminProtected>
                <EditPropertyForm property={property} />
            </AdminProtected>
        );
    } catch (error) {
        return (
            <AdminProtected>
                <div className="max-w-2xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p>Failed to fetch property. Please try again later.</p>
                </div>
            </AdminProtected>
        );
    }
}
