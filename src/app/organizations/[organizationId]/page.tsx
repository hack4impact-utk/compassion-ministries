export default function Page({
  params,
}: {
  params: { organizationId: string };
}) {
  return <h1> Organizations Page {params.organizationId}</h1>;
}
