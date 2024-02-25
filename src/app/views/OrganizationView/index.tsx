import { OrganizationResponse } from "@/types/dataModel/organization";


interface OrganizationViewProps {
    organization: OrganizationResponse;
}

export function OrganizationView({
    organization, 
}: OrganizationViewProps) {
    return (
        <div>
            <h1>Organization</h1>
            <p>Name: {organization.name}</p>
        </div>
    );
}