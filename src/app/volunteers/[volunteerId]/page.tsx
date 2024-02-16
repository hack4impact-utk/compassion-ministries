// page that will eventually contain information about a single volunteer

export default function VolunteerPage({
  params,
}: {
  params: { volunteerId: string };
}) {
  return <h1> Volunteer Page {params.volunteerId} </h1>;
}
